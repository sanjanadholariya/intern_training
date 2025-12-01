import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeList, getSingleLead, updateLead } from "../redux/action";
import { useEffect, useState } from "react";

const EditLead = () => {

    const { id } = useParams();  // <-- Lead ID from URL
    const dispatch = useDispatch();
    const lead = useSelector(state => state.user.singleLead)
    const navigate = useNavigate()

    const employees = useSelector(state => state.user.employeeList)


    const [input, setInput] = useState({
        name: "",
        email: "",
        phone: "",
        budget: "",
        status: ""
    });

    useEffect(() => {
        dispatch(getSingleLead(id))
        dispatch(employeeList())

    }, [])

    useEffect(() => {
        if (lead) {
            setInput({
                name: lead.name || "",
                email: lead.email || "",
                phone: lead.phone || "",
                budget: lead.budget || "",
                status: lead.status || "",
                assignedTo: lead.assignedTo || "",
            });
        }
    }, [lead]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateLead(id, input));
        navigate('/leadList')
    };

    return (
        <div align="center">

            <form onSubmit={handleSubmit} >

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ margin: 20 }}>Edit List</h1>
                    <h3 style={{ margin: 20 }}>
                        <button onClick={() => addLead()}>Lead List</button>
                    </h3>
                </div>

                <table>
                    <tr>
                        <td>Name :-</td>
                        <td>
                            <input type="text" name="name" onChange={handleChange} value={input.name} />
                        </td>
                    </tr>
                    <tr>
                        <td>Email :-</td>
                        <td>
                            <input type="text" name="email" onChange={handleChange} value={input.email} />
                        </td>
                    </tr>
                    <tr>
                        <td>Phone :-</td>
                        <td>
                            <input type="text" name="phone" onChange={handleChange} value={input.phone} />
                        </td>
                    </tr>
                    <tr>
                        <td>Budget "-</td>
                        <td>
                            <input type="text" name="budget" onChange={handleChange} value={input.budget} />
                        </td>
                    </tr>
                    <tr>
                        <td>Status :-</td>
                        <td>
                            <select name="status" onChange={handleChange} value={input.status}>
                                <option value="new">New</option>
                                <option value="in-progress">In Progress</option>
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
                    <button type="submit">Update</button>
                </table>











            </form>
        </div>
    );
};

export default EditLead;
