import React from 'react'
import './footer.scss'


function Footer() {
  return (
    <footer className='footer'>
      <div className="footer__fc">
        <ul>
          <li>
            <a href="https://solipbyggnad.se/" target='_blank'>huvudsidan</a>
          </li>
          <li>
            <a href="https://solipbyggnad.se/services" target='_blank'>tjänster</a>
          </li>
          <li>
            <a href="https://solipbyggnad.se/projects" target='_blank'>portfölj</a>
          </li>
          <li>
            <a href="https://solipbyggnad.se/news" target='_blank'>nyheter</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="https://solipbyggnad.se/resources" target='_blank'>användbar information</a>
          </li>
          <li>
            <a href="https://solipbyggnad.se/about" target='_blank'>om oss</a>
          </li>
          <li>
            <a href="/">rotvältranedräkning</a>
          </li>
          <li>
            <a href="/">Integritetspolicy</a>
          </li>
        </ul>
      </div>
      <div className="footer__sc">
        <ul>
          <li><a href="tel:+46735427622">+46 73 542 76 22</a></li>
          <li><a href="mailto:info@solipbygg.se">info@solipbygg.se</a></li>
          <li><p>Måndag-fredag 10:00-18:00</p></li>
          <li><a href="/">skatteinformation</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer