import React from 'react'
import { Form } from '../Form'
import './request.scss'


function Request({total}) {
  const [st, setSt] = React.useState()


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

      <button onClick={() => setSt(!st)}>Оставить заявку</button>

      {st ? <p>хуй</p> : <p>пизда</p>}

      <Form />
    </div>
  )
}

export default Request