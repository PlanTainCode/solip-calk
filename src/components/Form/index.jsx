import axios from 'axios';
import React from 'react'
import '../../styles/form.scss'


export const Form = ({formActive, setFormActive, total}) => {

    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [tel, setTel] = React.useState(null);
    const [comment, setComment] = React.useState(null);


    const buttonClick = () => {

        const data = {
            name: name,
            email: email,
            tel: tel,
            comment: comment !== null ? comment : 'Комментарий не оставили',
        }

        axios.post('https://solipadmin.tech/api/form-calks', {data})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={formActive ? 'form active' : 'form'}>
            <div className={formActive ? 'form__area active' : 'form__area'}></div>
            <div className="form__body">
                <div className="form__body--close" onClick={() => setFormActive(false)}>
                    <span></span>
                    <span></span>
                </div>
                <div className="form__body--content">
                    <h2>Оставте свой номер и мы будем рады проконсультировать вас уже через 30 минут.</h2>
                    <div className='formt'>
                        <input type="text" className='standart' placeholder='Имя' onChange={(e) => setName(e.target.value)} />
                        <input type="email" className='email' placeholder='Почта' onChange={(e) => setEmail(e.target.value)} />
                        <textarea name="comment" id="comment" placeholder='Комментарий' onChange={(e) => setComment(e.target.value)}></textarea>
                        <input type="tel" className='tel' placeholder='8-800-555-35-35' onChange={(e) => setTel(e.target.value)} />
                        <button onClick={() => buttonClick()} disabled={name || tel || email !== null ? false : true}>Консультация</button>
                    </div>
                    <p>Нажимая на кнопку, ты соглашаешься с Договором Публичной Оферты и обработкой своих персональных данных.</p>
                    <div className="cs">
                        <a href="/">Договор Публичной Оферты</a>
                        <a href="/">Политика конфиденциальности</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
