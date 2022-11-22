import React from 'react'
import './footer.scss'


function Footer() {
  return (
    <footer className='footer'>
      <div className="footer__fc">
        <ul>
          <li>
            <a href="/">главная</a>
          </li>
          <li>
            <a href="/">услуги</a>
          </li>
          <li>
            <a href="/">портфолио</a>
          </li>
          <li>
            <a href="/">новости</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/">полезные статьи</a>
          </li>
          <li>
            <a href="/">о нас</a>
          </li>
          <li>
            <a href="/">корневой вычет</a>
          </li>
          <li>
            <a href="/">политика конфиденциальности</a>
          </li>
        </ul>
      </div>
      <div className="footer__sc">
        <ul>
          <li><a href="tel:+46735427622">+46 73 542 76 22</a></li>
          <li><a href="mailto:info@solipbygg.se">info@solipbygg.se</a></li>
          <li><p>пн-пт 10:00-18:00</p></li>
          <li><a href="/">налоговая информация</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer