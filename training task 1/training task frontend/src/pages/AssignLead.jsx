import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assignLead, employeeList } from "../redux/action";

const AssignLead = () => {


    const [input, setInput] = useState({
        name: "",
        email: "",
        phone: "",
        status: "",
        budget: "",
        assignedTo: ""

    })


    const employees = useSelector(state => state.user.employeeList)
    // console.log(employees)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(employeeList())
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(assignLead(input, navigate))

    }


    return (
        <>
            <div align="center">
                <h1>Assign Lead</h1>

                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td>Name :-</td>
                            <td>
                                <input type="text" name="name" value={input.name} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Email :-</td>
                            <td>
                                <input type="text" name="email" value={input.email} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Phone :-</td>
                            <td>
                                <input type="text" name="phone" value={input.phone} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Budget :-</td>
                            <td>
                                <input type="text" name="budget" value={input.budget} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Status :-</td>
                            <td>
                                <select name="status" id="" value={input.status} onChange={handleChange}>
                                    <option value="">---- Select Status ----</option>
                                    <option value="new">New</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="won">Won</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Assign To :-</td>
                            <td>
                                <select name="assignedTo" onChange={handleChange} value={input.assignedTo}>
                                    <option value="">---- Select Employee ----</option>
                                    {

                                        employees.map((val) => {
                                            return (
                                                <option value={val._id}>{val.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                    </table>
                </form>
                <Link to={'/employeeList'}>Back to Employee List</Link>
            </div>
        </>
    )
}

export default AssignLead;