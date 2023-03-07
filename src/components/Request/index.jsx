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
        <h1>Заявка</h1>
        <p><span></span> У вас уже есть проект, и вы хотите узнать его стоимость? Загрузите имеющуюся информацию и мы поможем вам с предварительным расчетом.</p>
      </div>

      <span></span>

      <div className="request__coast">
        Итогоговая стоимость: <>{!isNaN(total) ? total : '0'} kr</>
      </div>

      <button onClick={() => checkError()} >Оставить заявку</button>

      {error ? <p style={{color: "red"}}>Вы еще ничего не выбрали</p> : ''}

      <Form formActive={formActive} setFormActive={setFormActive} />
    </div>
  )
}

export default Request