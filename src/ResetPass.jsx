import {useState} from 'react'
import './App.css'
import axios from "axios";
import {Link} from "react-router-dom";


export const ResetPass = () =>  {
    const [email , setEmail] = useState('')
    const [msgFromBackend , setMsgFromBackend] = useState('')

    const setValues = (e) => {
        e.preventDefault();
        sendToBackend();
    };

    const sendToBackend = async () => {
        try {
            const response = await axios.post('http://localhost:4001/otp', {
                email: email
            });
            setMsgFromBackend(response.data.msg)
            setEmail('')
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    return (
        <>
            <h2>enter registered email</h2>
            <h4>not registered?</h4>
            <Link to={'/signup'}>
                <button>register</button>
            </Link>

                <form onSubmit={setValues}>

                <input
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            {msgFromBackend && <p>{msgFromBackend}</p>}
            {msgFromBackend && <Link to={'/reset-final'}>
                <button>reset password</button>
            </Link>}
        </>
    )
}

