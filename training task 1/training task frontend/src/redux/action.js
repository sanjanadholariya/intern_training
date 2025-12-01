import axios from "axios"
const registerUser = (formData) => {
    return async (dispatch) => {
        dispatch({
            type: "register_request"
        })

        try {
            const res = await axios.post(`http://localhost:9000/api/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch({
                type: "register_success",
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: "register_fail",
                payload: error.response?.data?.message || error.message || "something went wrong"
            })


        }
    }
}

const loginUser = (formData, navigate) => {
    return async (dispatch) => {
        dispatch({
            type: "login_request"
        })

        try {
            const res = await axios.post(`http://localhost:9000/api/login`, formData)

            localStorage.setItem('token', res.data.token)

            navigate('/dashboard')

            console.log(res.data)

            dispatch({
                type: "login_success",
                payload: res.data
            })


        } catch (error) {
            dispatch({
                type: "login_error",
                error: error.response.data.message
            })
        }
    }
}


const profile = () => {
    return async (dispatch) => {

        dispatch({
            type: "profile_request"
        })

        const token = localStorage.getItem('token')
        console.log(token)
        try {
            const res = await axios.get(`http://localhost:9000/api/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            dispatch({
                type: "profile_success",
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: "profile_error",
                payload: error.data.error.message
            })
        }
    }
}


const employeeList = () => {
    return async (dispatch) => {
        try {

            const token = localStorage.getItem('token')
            // console.log(token)
            const res = await axios(`http://localhost:9000/api/admin/allEmployeeProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res.data)

            dispatch({
                type: "employee_list_success",
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: "employee_list_error",
                payload: error.data.error.message
            })
        }
    }
}


const assignLead = (input, navigate) => {

    return async (dispatch) => {
        try {

            const token = localStorage.getItem('token')

            let res = await axios.post(`http://localhost:9000/api/admin/assignLead`, input, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            navigate('/leadList')
            console.log(res.data.lead)
            dispatch({
                type: "assignLead_success",
                payload: res.data
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: "assignLead_error",
                payload: error.data.error.message
            })
        }
    }
}

const leadList = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:9000/api/getLeads`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res.data.data)

            dispatch({
                type: "leadList_success",
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "leadList_error",
                payload: error.data.response.message
            })
        }
    }
}

const getSingleLead = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:9000/api/getSingleLead/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.lead)

            dispatch({
                type: "singleLead_success",
                payload: res.data.lead
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: "singleLead_error",
                payload: error.data.response.message
            })
        }
    }
}

const updateLead = (id, input) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.put(`http://localhost:9000/api/updateLead/${id}`, input, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            dispatch({
                type: "updateLead_success",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "updateLead_error",
                payload: error.data.response.message
            })
        }
    }
}

const deleteLead = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.delete(`http://localhost:9000/api/admin/deleteLead/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
        } catch (error) {
            console.log(error)
            dispatch({
                type: "deleteLead_error",
                payload: error.data.response.message
            })
        }
    }
}

export { registerUser, loginUser, profile, employeeList, assignLead, leadList, updateLead, getSingleLead, deleteLead }