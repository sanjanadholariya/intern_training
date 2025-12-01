import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import EmployeeList from "./pages/EmployeeList"
import Register from "./pages/Register"
import AssignLead from "./pages/AssignLead"
import LeadList from "./pages/LeadList"
import EditLead from "./pages/EditLead"
import AddEmployee from "./pages/AddEmployee"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/assignLead" element={<AssignLead />} />
          <Route path="/leadList" element={<LeadList />} />
          <Route path="/editLead/:id" element={<EditLead />} />
          <Route path="/addEmployee" element={<AddEmployee />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
