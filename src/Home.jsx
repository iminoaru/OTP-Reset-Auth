import './App.css'
import {Link} from "react-router-dom";

export const Home = () => {
    return(
        <>
            <h2>You Are On The Grand HomePage</h2>

            <br/><br/>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Signup</button>
            </Link>
            <Link to="/about">
                <button>About</button>
            </Link>

        </>
    )
}