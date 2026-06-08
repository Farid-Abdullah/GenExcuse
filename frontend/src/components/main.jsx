// !!!!!!!!!!!!! components files should named with capital letter, always !!!!!!! maybe i'll change this later.
// calling this main is also a big mistake, main.jsx already exists outside the component folder.

import React, { useState } from 'react'
import Form from './form'
function Main() {
    const [serverResponse, setServerResponse] = useState(null)
    return (
      <div>
          <h2>Need an excuse? </h2> <br />
          <Form callServerResponse={setServerResponse} /> <br />
          
      </div>
    )
  }

export default Main