import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import DeleteSingle from "./pages/deleteSingle/DeleteSingle";
import New from "./pages/new/New";
import Casual from "./pages/casual/Casual";
import NonCasual from "./pages/noncasual/NonCasual";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Profile from "./pages/profile/Profile";
import LeaveHistory from "./pages/leaveHistory/LeaveHistory";
import Submit from "./pages/submit/Submit";
import ApproveApplication from "./pages/approveApplication/ApproveApplication";
import ApproveHistory from "./pages/approveHistory/ApproveHistory";
import AdminHome from "./pages/adminHome/AdminHome";
import ModifyUser from "./pages/modifyUser/ModifyUser";
import DeleteUser from "./pages/deleteUser/DeleteUser";
import NewUser from "./pages/newUser/NewUser";
import EditPassword from "./pages/editPassword/EditPassword";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import EditSingle from "./pages/editSingle/EditSingle";
import SingleApproveApplication from "./pages/singleApproveApplication/SingleApproveApplication";
import ViewApplication from "./pages/viewApplication/ViewApplication";
import LeavePage from "./pages/deleteSingle/leavePage/LeavePage";
import Remarks from "./pages/remarks/Remarks";
import ApproveCancellationRequests from "./pages/approveCancellationRequests/ApproveCancellationRequests";
import ApproveLeavePage from "./pages/approveLeave/ApproveLeavePage";
import CancelForm from "./pages/cancelForm/CancelForm";
import ExcelSheet from "./pages/excelSheet/ExcelSheet";

// export const user = {
//   name: "Test2",
//   isAuthority: true,
// };

export const user = {
  name: "",
  role: "",
  latestLeave : [],
  isLoggedIn: false,
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="leavehistory" element={<LeaveHistory />} />
            <Route path="approvehistory" element={<ApproveHistory />} />
            <Route path="submit" element={<Submit />} />
            <Route path="editpassword" element={<EditPassword />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="viewapplication" element={<ViewApplication />} />
            <Route path="leave" element={<LeavePage />} />
            <Route path="approveleave" element={<ApproveLeavePage />} />
            <Route path="remarks" element={<Remarks />} />
            <Route path="cancelform" element={<CancelForm />} />
            <Route path="admin">
              <Route index element={<AdminHome/>} />
              <Route path="user">
                <Route path="add" element={<NewUser/>} />
                <Route path="excelsheet" element={<ExcelSheet/>} />
                <Route path="delete/single" element={<DeleteSingle />} />
                <Route path="modify/single" element={<EditSingle />} />
                <Route path="modify" element={<ModifyUser/>} />
                <Route path="delete" element={<DeleteUser/>} />
              </Route>
            </Route>
            <Route path="approveapplication" element={<ApproveApplication />} />
            <Route path="approvecancellationrequests" element={<ApproveCancellationRequests />} />
            <Route path="approveapplication/singleapproveapplication" element={<SingleApproveApplication />} />
            <Route path="new">
              <Route path="casual" element={<Casual/>} />
              <Route path="noncasual" element={<NonCasual/>} />
            </Route>
            <Route path="users">
              <Route index element={<List/>} />
              <Route path="new" element={<New/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
