import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/action";
import "../css/loginCss.css";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(loginUser(input, navigate))

    }

    return (
        <>
            <div className="loginPage">
                <div className="container" align="center">
                    <div className="box col-12">
                        <div className="first cols-6">
                            <div className="title">
                                <span>Hello,</span>
                                <h1>Welcome Back to Login Page</h1>
                            </div>
                            <p>Hey, Welcome Back To Your Special Place</p>
                            <form onSubmit={handleSubmit}>
                                <table>
                                    <tr>

                                        <td><input type="text" name="email" value={input.email} onChange={handleChange} placeholder="Enter Email..." /></td>
                                    </tr>
                                    <tr>

                                        <td><input type="text" name="password" value={input.password} onChange={handleChange} placeholder="Enter Password..." /></td>
                                    </tr>
                                    <tr>
                                        <td><input className="button" type="submit" value="Login" /></td>
                                    </tr>
                                </table>
                            </form>

                            <div className="bottom">
                                <div>
                                    <span>No Account ?  <Link to={'/register'}>Register</Link></span>
                                </div>

                            </div>
                        </div>
                        <div className="second cols-6">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;