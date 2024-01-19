import {useState} from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import axios from "axios";

export const Resetfinal = () =>  {
    const [otp , setOtp] = useState('')
    const [msgFromBackend , setMsgFromBackend] = useState('')

    const setValues = (e) => {
        e.preventDefault();
        sendToBackend();
    };

    const sendToBackend = async () => {
        try {
            const response = await axios.post('http://localhost:4001/verify-otp', {
                otp: otp
            });
            setMsgFromBackend(response.data.msg)
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    return (
        <>

            <form onSubmit={setValues}>

                <input
                    type='number'
                    placeholder='OTP'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button type='submit'>submit</button>
            </form>
            {msgFromBackend && <p>{msgFromBackend}</p>}
            {msgFromBackend === 'otp validated' && <Link to={'/reset'}>
                <button>set new password</button>
            </Link>}

        </>
    )
}

