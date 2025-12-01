import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeList } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(state => state.user.employeeList)
    console.log(data)

    useEffect(() => {
        dispatch(employeeList())
    }, [])


    const addEmployee = () => {
        navigate('/addEmployee')
    }

    return (
        <>
            <div align="center">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ margin: 20 }}>Employee List</h1>
                    <h3 style={{ margin: 20 }}>
                        <button onClick={() => addEmployee()}>Add Employee</button>
                    </h3>
                </div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((val) => {
                                const { _id, name, email, role, profile } = val;
                                return (
                                    <tr key={_id}>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{role}</td>
                                        <td>
                                            <img src={`http://localhost:9000/uploads/${profile}`} width={120} height={120} alt="" />
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <Link to={'/dashboard'}>Back To Dashboard</Link>

            </div>
        </>
    )
}


export default EmployeeList;
