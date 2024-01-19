import {useState} from 'react'
import './App.css'
import axios from "axios";
import {Link} from "react-router-dom";

export const SetNewPass = () =>  {
    const [pass , setPass] = useState('')
    const [pass2 , setPass2] = useState('')
    const [msg , setMsg] = useState('')
    const setValues = (e) => {
        e.preventDefault();
        if(pass !== pass2){
            return <h2>passwords dont match</h2>
        }
        sendToBackend();
    };

    const sendToBackend = async () => {
        try {
            const response = await axios.post('http://localhost:4001/new-pass', {
                newPass: pass
            });
            setMsg(response.data.msg)
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    return (
        <>

            <form onSubmit={setValues}>

                <input
                    type='text'
                    placeholder='new password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='re-enter new password'
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                />

                <button type='submit'>submit</button>
                {msg && <h1>{msg}</h1> && <Link to={'/'}>
                <button>home</button>
            </Link> }
            </form>

        </>
    )
}

