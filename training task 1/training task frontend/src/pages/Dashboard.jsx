import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import "../css/dashboard.css"

const Dashboard = () => {


    const dispatch = useDispatch();
    const data = useSelector(state => state.user.profile);
    const navigate = useNavigate()



    useEffect(() => {
        dispatch(profile());
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <>
            <div className="dashboard">
                <div className="container" align="center">
                    <div className="title">
                        <h1> Personal Profile</h1>
                    </div>
                    <div className="col-8 info">
                        {
                            !data ? (
                                <h3>Loading...</h3>
                            ) : (
                                <div className="image">
                                    <img
                                        src={`http://localhost:9000/uploads/${data.profile}`}

                                        alt=""
                                    />
                                </div>

                            )
                        }
                        <div >
                            {
                                !data ? (
                                    <h3>Loading...</h3>
                                ) : (
                                    <div className="content">
                                        <p>{data.name}</p>
                                        <p>{data.email}</p>
                                        <p>{data.role}</p>
                                        <p className="button"><Link to={'/leadList'}>Lead List 📃</Link></p>
                                        {
                                            data.role == "admin" && (

                                                <p className="button"><Link to={'/employeeList'}>Employee List 📃</Link></p>
                                            )


                                        }



                                        <button onClick={logout}>Logout</button>
                                    </div>
                                )
                            }

                        </div>

                    </div>




                </div>
            </div>
        </>
    );
}

export default Dashboard;
