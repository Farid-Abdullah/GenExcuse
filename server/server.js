import "dotenv/config"
import express from "express"
import cors from "cors" // allows server and frontedn to communicate even if deployed in different places
// import from an LLM API
import rateLimit from "express-rate-limit"
import helmet from "helmet" // helps reduce common web security risks by setting protective HTTP headers
