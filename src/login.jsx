import {useState} from 'react'
import './App.css'
import axios from "axios";
import {Link} from "react-router-dom";

export const Login = () =>  {
    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')
    const [msgFromBackend , setMsgFromBackend] = useState('')

    const setValues = (e) => {
        e.preventDefault();
        sendToBackend();
    };

    const sendToBackend = async () => {
        try {
            const response = await axios.post('http://localhost:4001/login', {
                email: email,
                pass: pass,
            });
            setMsgFromBackend(response.data.msg)
            setEmail('')
            setPass('')
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const resetPass = async () => {
        try {
            const response = await axios.post('http://localhost:4001/otp', {
                email: email
            });
            localStorage.setItem('token', response.data.token);

            setMsgFromBackend(response.data.msg)
            setEmail('')
            setPass('')
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    return (
        <>
            <h2>You Are On The Grand Login Page</h2>

            <form onSubmit={setValues}>

                <input
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            <Link to="/reset-password">
                <button>forgot Password?</button>
            </Link>
            {msgFromBackend && <p>{msgFromBackend}</p>}
        </>
    )
}

