import React from 'react'
import { Form } from '../Form'
import './request.scss'
import { useSelector } from 'react-redux';

function Request({total}) {

  const mussum = useSelector((state) => state.mussumData.mussum)

  const [formActive, setFormActive] = React.useState(false)

  const [error, setError] = React.useState(false)

  const checkError = () => {

    if (mussum.length === 0) {
      setError(true)
      setFormActive(false)
      return
    } else {
      setError(false)
      setFormActive(true)
    }
  }

  return (
    <div className="request">
      <div className="request__title">
        <h1>ANSÖKAN</h1>
        <p><span></span> Har du redan ett projekt och vill veta vad det kostar? Ladda upp din befintliga information så hjälper vi dig med en uppskattning.</p>
      </div>

      <span></span>

      <div className="request__coast">
      Total kostnad: <>{!isNaN(total) ? total : '0'} kr</>
      </div>

      <button onClick={() => checkError()} >Lämna en förfrågan</button>

      {error ? <p style={{color: "red"}}>Du har inte valt något ännu</p> : ''}

      <Form formActive={formActive} setFormActive={setFormActive} />
    </div>
  )
}

export default Request