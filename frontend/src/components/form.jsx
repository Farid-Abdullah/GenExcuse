import React from 'react'

function Form() {
  return (
    <form action="" method='POST'>
      <div>
      <label htmlFor="tone">Choose tone: </label>
      <select name="tome" id="tone" style={{height:"1.1rem"}}>
        <option value="serious">Serious and professional</option>
        <option value="casual">casual</option>
        <option value="stupid and untrue">Stupid and untrue</option>
        <option value="bragging">Bragging</option>
        <option value="mysterious">Mysterious</option>
      </select>
      </div>
      <br />

    <div>
      <label htmlFor="opponent">Opponent: </label>
      <input type="text" placeholder='e.g. Boss or Brother' />
    </div>

    <br />

      <div>
      <label htmlFor="situation">What's the situation: </label> <br />
      <textarea style={{width:"80%", height:"100px"}} name="situation" id="situation" placeholder='e.g. I forgot to go to work in the morning'></textarea>
      </div>

      <button>Generate</button>
    </form>
  )
}

export default Form