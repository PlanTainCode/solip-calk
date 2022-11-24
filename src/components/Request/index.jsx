import React from 'react'
import './request.scss'


function Request({total}) {
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

      <button>Оставить заявку</button>
    </div>
  )
}

export default Request