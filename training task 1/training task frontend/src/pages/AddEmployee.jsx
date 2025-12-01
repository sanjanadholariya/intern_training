import { useState } from "react";
import { useDispatch } from "react-redux"
import { registerUser } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";

const AddEmployee = () => {

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
        navigate("/employeeList");

    }


    return (
        <>
            <div align="center">
                <h1>Add Employee</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td>Name :-</td>
                            <td><input type="text" name="name" value={input.name} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Email :-</td>
                            <td><input type="text" name="email" value={input.email} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Password :-</td>
                            <td><input type="text" name="password" value={input.password} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Role :-</td>
                            <td><input type="text" name="role" value={input.role} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Profile photo :-</td>
                            <td><input type="file" name="profile" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Submit" /></td>
                        </tr>
                    </table>
                </form>


            </div>
        </>
    )
}

export default AddEmployee;