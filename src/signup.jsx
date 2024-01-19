import {useState} from 'react'
import './App.css'
import axios from "axios";

export const Signup = () =>  {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')
    const [msgFromBackend , setMsgFromBackend] = useState('')
    const setValues = (e) => {
        e.preventDefault();
        sendToBackend();
    };

    const sendToBackend = async () => {
        try {
            const response = await axios.post('http://localhost:4001/signup', {

                        name: name,
                        email: email,
                        pass: pass,

            });
            setMsgFromBackend(response.data.msg)
            setName('')
            setEmail('')
            setPass('')
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };


    return (
        <>
            <h2>You Are On The Grand Signup Page</h2>

            <form onSubmit={setValues}>
                <input
                    type='text'
                    placeholder='username'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type='submit'>Signup</button>
            </form>
            {msgFromBackend && <p>{msgFromBackend}</p>}
        </>
    )
}

