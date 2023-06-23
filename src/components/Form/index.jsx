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
                    <h2>Lämna ditt nummer och vi kommer att ge dig råd inom 30 minuter.</h2>
                    <div className='formt'>
                        <input type="text" value={`${total} kr`} readonly  />
                        <input type="text" className={nameError ? 'red' : ''} placeholder='Namn' onChange={(e) => setName(e.target.value)}  />
                        <input type="email" className={emailError ? 'red' : ''}  placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                        <textarea name="comment" id="comment" placeholder='Kommentar' onChange={(e) => setComment(e.target.value)}></textarea>
                        <input type="tel" className={telError ? 'red' : ''}  placeholder='Telefon' onChange={(e) => setTel(e.target.value)} />
                        <button onClick={() => buttonClick()} >Консультация</button>
                    </div>
                    <p>Genom att klicka på knappen godkänner du avtalet om det offentliga erbjudandet och behandlingen av dina personuppgifter.</p>
                    <div className="cs">
                        <a href="/">Avtal om offentligt uppköpserbjudande</a>
                        <a href="/">Integritetspolicy</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
