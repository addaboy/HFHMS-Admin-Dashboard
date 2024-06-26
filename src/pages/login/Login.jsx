import { useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from "../../firebase"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import { type } from "@testing-library/user-event/dist/type";

const Login = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const {dispatch } = useContext(AuthContext)

  const handleLogin = (e)=>{
    e.preventDefault()

    signInWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    dispatch({type:"LOGIN", payload:user})
    navigate("/")
    // ...
  })
  .catch((error) => {
    setError(true)
    // ..
  });
  }
  return (
    <div className="login">
    
    <form onSubmit={handleLogin}>
    <div className="title">
    <h2>Sign In</h2>
    </div>
      <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
      {error && <span>Wrong email or password !</span>}
    </form>
    </div>
  )
}

export default Login