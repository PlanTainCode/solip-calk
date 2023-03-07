import axios from 'axios';
import React from 'react'
import '../../styles/form.scss'
import { useDispatch, useSelector } from 'react-redux';

export const Form = ({formActive, setFormActive}) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [nameError, setNameError] = React.useState(false)
    const [telError, setTelError] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)

    const reset = () => {
        setName('');
        setTel('');
        setEmail('');
        setComment('');
        setEmailError(false);
        setNameError(false);
        setTelError(false);
    };
    
    const total = useSelector((state) => state.totalData.total)
    const buttonClick = () => {

        const data = {
            name: name,
            email: email,
            tel: tel,
            sum: total,
            comment: comment !== '' ? comment : 'Комментарий не оставили',
        }

        if (name.length === 0) {
            setNameError(true)
            return
        } else {
            setNameError(false)
        }

        if (email.length === 0) {
            setEmailError(true)
            return
        } else {
            setEmailError(false)
        }

        if (tel.length === 0) {
            setTelError(true)
            return
        } else {
            setTelError(false)
        }
        
        if (name.length !== 0 && tel.length !== 0 && email.length !== 0) {
            axios.post('https://solipadmin.tech/api/form-calks', {data})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            
            reset()
            setFormActive(false)
        } else {
            console.log('error')
        }

        
        


        
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
                        <input type="text" value={`${total} kr`} readonly  />
                        <input type="text" className={nameError ? 'red' : ''} placeholder='Имя' onChange={(e) => setName(e.target.value)}  />
                        <input type="email" className={emailError ? 'red' : ''}  placeholder='Почта' onChange={(e) => setEmail(e.target.value)} />
                        <textarea name="comment" id="comment" placeholder='Комментарий' onChange={(e) => setComment(e.target.value)}></textarea>
                        <input type="tel" className={telError ? 'red' : ''}  placeholder='8-800-555-35-35' onChange={(e) => setTel(e.target.value)} />
                        <button onClick={() => buttonClick()} >Консультация</button>
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
