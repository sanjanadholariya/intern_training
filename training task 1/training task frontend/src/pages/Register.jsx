import { useState } from "react";
import { useDispatch } from "react-redux"
import { registerUser } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import '../css/register.css'

const Register = () => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        profile: "",
        role: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "profile") {
            setInput({
                ...input,
                profile: files[0]
            })
        }
        else {
            setInput({
                ...input,
                [name]: value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("name", input.name);
        formData.append("email", input.email)
        formData.append("password", input.password)
        formData.append("role", input.role)
        formData.append("profile", input.profile)

        const result = dispatch(registerUser(formData))

        setInput({
            name: "",
            email: "",
            password: '',
            role: "",
            profile: ""
        })


        alert("Registered Successfully!");
        navigate("/");

    }

    const googleSignIn = () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data

            )
        })
    }


    return (
        <>
            <div className="registerPage">
                <div className="container" align="center">
                    <div className="box col-12">
                        <div className="col-6 first">

                        </div>
                        <div className="col-6 second">
                            <div className="title">
                                <h1>Welcome,</h1>
                                <h1>  Register Here...</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <table>
                                    <tr>
                                        <td className="label">Name :-</td>
                                        <td><input type="text" name="name" value={input.name} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td className="label">Email :-</td>
                                        <td><input type="text" name="email" value={input.email} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td className="label">Password :-</td>
                                        <td><input type="text" name="password" value={input.password} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td className="label">Role :-</td>
                                        <td>
                                            <select name="role" value={input.role} onChange={handleChange} id="">
                                                <option value="">---- Select Role ----</option>
                                                <option value="admin">Admin</option>
                                                <option value="employee">Employee</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="label">Profile photo :-</td>
                                        <td><input type="file" name="profile" onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><input className="button" type="submit" value="Register" /></td>
                                    </tr>
                                </table>
                            </form>

                            <p className="or">-----------------------OR---------------------</p>

                            <div className="google">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2y_QMd2QxGtLiRFHWIx_5XxTEFCPxsr7Rag&s" width={30} height={30} alt="" />
                                <button className="googleButton" onClick={() => googleSignIn()}>Sign In With Google</button>
                            </div>



                            <span>
                                <p>Already Have Account ?  </p>
                                <Link to={'/'}>Login    </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;