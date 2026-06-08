import React from 'react'
import { useState } from 'react'
function Form({callServerResponse}) {
    const [tone, setTone] = useState("")
    const [target, setTarget] = useState("")
    const [situation, setSituation] = useState("")
    async function getExcuse(){
      event.preventDefault();
          try{
            const SERVER_URL = import.meta.env.VITE_SERVER_URL
            const res = await fetch(`${SERVER_URL}/api/create-excuse`,{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body: JSON.stringify({tone, target, situation})
            })

            if(!res.ok){
              callServerResponse({success:false, response:"Failed to fetch the results"})
              return
            
            }
            const data = await res.json()
            console.log(data)
            callServerResponse({success: true, response:data})
            return
         

          } catch(err){
            callServerResponse({success: false, response: `An error occured during the 'try' block` })
            console.log(err)
       
          }
    }
  return (
    <form onSubmit={getExcuse} method='POST'>
      <div>
      <label htmlFor="tone">Choose tone: </label>
      <select 
        name="tone" id="tone" 
        style={{height:"1.1rem"}} 
        value={tone} 
        onChange={(e) => setTone(e.target.value)} 
      >
        <option value="serious">Serious and professional</option>
        <option value="casual">casual</option>
        <option value="stupid and untrue">Stupid and untrue</option>
        <option value="bragging">Bragging</option>
        <option value="mysterious">Mysterious</option>
      </select>
      </div>
      <br />

    <div>
      <label htmlFor="target">Target: </label>
      {/* I shouldn't have named target hook 'target' because now i have <e className="target value">
          'target' in e.target references to the html tag that caused the event to fire.
      */}
      <input value ={target} onChange={e => setTarget(e.target.value)} name="target" type="text" placeholder='e.g. Boss or Brother' />
    </div>

    <br />

      <div>
      <label htmlFor="situation">What's the situation: </label> <br />
      <textarea 
       style={{width:"80%", height:"100px"}} 
       name="situation" id="situation" 
       placeholder='e.g. I forgot to go to work in the morning'
       value={situation}
       onChange={e => setSituation(e.target.value)}
       ></textarea>
      </div>

      <button type='submit'>submit</button>
    </form>
  )
}

export default Form