
const initialState = {
    loading: false,
    loginUser: null,
    profile: null,
    employeeList: [],
    assignLead: [],
    leadList: [],
    singleLead: null,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        // REGISTER
        case "register_request":
            return { ...state, loading: true }

        case "register_success":
            return { ...state, loading: false, error: null }

        case "register_fail":
            return { ...state, loading: false, error: action.payload }


        // LOGIN
        case "login_request":
            return { ...state, loading: true }

        case "login_success":
            return { ...state, loading: false, loginUser: action.payload, error: null }

        case "login_error":
            return { ...state, loading: false, error: action.payload }


        // PROFILE
        case "profile_request":
            return { ...state, loading: true }

        case "profile_success":
            return {
                ...state,
                loading: false,
                profile: action.payload.data,
                error: null
            }

        case "profile_error":
            return { ...state, loading: false, error: action.payload }


        // EMPLOYEE LIST
        case "employee_list_success":
            return {
                ...state,
                loading: false,
                employeeList: action.payload.data,
                error: null
            }

        case "employee_list_error":
            return { ...state, loading: false, error: action.payload }


        //ASSIGN LEAD
        case "assignLead_success":
            return {
                ...state,
                assignLead: action.payload.lead,
                error: null
            }

        case "assignLead_error":
            return {
                ...state,
                error: action.payload
            }


        //LEAD LIST
        case "leadList_success":
            return {
                ...state,
                leadList: action.payload
            }

        default:
            return state;

        // SINGLE LEAD
        case "singleLead_success":
            return {
                ...state,
                singleLead: action.payload
            }
    }
}

export default userReducer;
