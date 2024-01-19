
import './App.css'
import {Signup} from "./signup.jsx";
import {Login} from "./login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {About} from "./About.jsx";
import {Home} from "./Home.jsx";
import {ResetPass} from "./ResetPass.jsx";
import {SetNewPass} from "./SetNewPass.jsx";
import {Resetfinal} from "./ResetFinal.jsx";

function App() {
  return (
      <BrowserRouter>
         <Routes>
             <Route path = '/' element={<Home />} />
             <Route path = '/login' element={<Login />} />
             <Route path = '/signup' element={<Signup />} />
             <Route path = '/about' element={<About /> } />
             <Route path = '/reset-password' element={<ResetPass /> } />
             <Route path = '/reset-final' element={<Resetfinal /> } />
             <Route path = '/reset' element={<SetNewPass />} />
         </Routes>
      </BrowserRouter>
  )
}

export default App
