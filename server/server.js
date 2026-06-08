import "dotenv/config"
import express from "express"
import cors from "cors" // allows server and frontedn to communicate even if deployed in different places
import OpenAI from "openai";
import rateLimit from "express-rate-limit"
import helmet from "helmet" // helps reduce common web security risks by setting protective HTTP headers

const app = express()
const API_KEY = process.env.LLM_API_KEY

// middlewares:
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}))

app.use(express.json({ limit: "10mb" }))

// rate limiting:
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //  
    max: 50, 
    handler: (req, res) => {
        res.status(429).json({ error: "Too many requests from this IP, try again later." });
    }
});
app.use(limiter)

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000", 
        "X-Title": "GenExcuse App",
    }
}
)

// excuse making end point, aka the sauce

app.post("/api/create-excuse", async (req, res) => {
    try {
        const { excuseType, excuseTarget, situation } = req.body

        if (!situation) {
            return res.status(400).json({ error: "A situation is needed to make an excuse for" })
        }
        const messages = [
            {
                role: "user",
                content: `Give an excuse that a 10x full-stack developer will give in ${excuseType || "Normal"} tone to ${excuseTarget || "stranger"} for the following situation:
            \n \`\`\`${situation || ""}\n \`\`\`,
            `
            },
        ]
        const response = await openai.chat.completions.create({
            model: "openrouter/free", 
           messages,
           temperature:0.4,
           max_tokens:300,
        })
        

        // ?. is an optional chaining operator, it allows you to use propreties or methods that might be deeper rather in the first level.
        const fullExcuse = response?.choices[0]?.message?.content;

        if(!fullExcuse){
            return res.status(500).json({error:"llm failed to make an excuse"})
        }

        res.json({fullExcuse})


    } catch (err) {
        console.error("GenExcuse API error:", err)
        res.status(500).json({ error: "server error", details: err.message })
    }
})

// health check route: allows monitor tools and devs to verify that backend is running and connected to its essential things
app.get("/api/health", (req, res)=>{
    res.json({
        status:"healthy",
        timestamp: new Date().toISOString(),
        hasApiKey: !!API_KEY, // double exclamation converts API_KEY to boolean, so that if exists its true else false.
        uptime: process.uptime(),
    })
})

// error handling middleware
app.use((err, req, res, next)=>{
    console.log("unhandled error: ", err)
    res.status(500).json({error: "Internal server error"})
})

// 404 handler:
app.use("/*splat", (req, res)=>{
    res.status(404).json({error: "Route not found, No excuse huh?"})
})

// PORT defined in the .env file for security and reusability.
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>{
    console.log(`server running on API: http://localhost:${PORT}`)
    console.log(`HEalth check: http://localhost:${PORT}/api/health`)
    console.log(`API key configured: ${!!API_KEY}`)
})