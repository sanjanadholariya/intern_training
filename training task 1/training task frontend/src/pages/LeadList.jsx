import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLead, leadList } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import '../css/leadList.css'

const LeadList = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.user.leadList)
    const navigate = useNavigate()

    // console.log(data)

    const addLead = () => {
        navigate('/assignLead')
    }

    useEffect(() => {
        dispatch(leadList())
    }, [data])

    return (
        <>
            <div className="leadList" align="center">

                <div className="container">
                    <div className="top">
                        <h1>Lead Management</h1>
                        <div className="end">
                            <button onClick={() => addLead()}> ➕ Add Lead</button>
                            <Link className="button" to={'/dashboard'}> ⬅ Go To Dashboard</Link>
                        </div>
                    </div>

                    <div className="list">
                        <table border={1} cellPadding={3} cellSpacing={3}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Budget</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((val) => {
                                        const { _id, name, email, phone, budget, status, assignedTo } = val;
                                        return (
                                            <tr key={_id}>
                                                <td>{name}</td>
                                                <td>{email}</td>
                                                <td>{phone}</td>
                                                <td>{budget}</td>
                                                <td>{status}</td>
                                                <td>
                                                    <img src={`http://localhost:9000/uploads/${assignedTo.profile}`} width={15} height={15} alt="profile" style={{ borderRadius: 100 }} />&nbsp;&nbsp;&nbsp;
                                                    {assignedTo.name}</td>
                                                <td>
                                                    <button id="editbtn" onClick={() => navigate(`/editLead/${_id}`)}>Edit</button>

                                                    <button id="deletebtn" onClick={() => dispatch(deleteLead(_id))}>Delete</button>

                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        </>
    )
}

export default LeadList;