import { Route, Routes } from "react-router-dom";
import Login from "../views/login/index";
import Main from "../components/main/main";
import AuthRouted from "../services/authRouted";
import Unauthorized from "../views/Unauthorized";
import Analytic from "../views/dashboard/analytic";
import DataVehicle from "../views/dashboard/dataVehicle";
import UserManagement from "../views/management/user";
import MenuManagement from "../views/management/menu";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <AuthRouted>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/401" element={<Unauthorized />} />
              <Route path="/home" element={<Main />} />
              <Route path="/Analytic" element={<Analytic />} />
              <Route path="/DataVehicle" element={<DataVehicle />} />
              <Route path="/UserManagement" element={<UserManagement />} />
              <Route path="/MenuPermission" element={<MenuManagement />} />
            </Routes>
          </AuthRouted>
        }
      />
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
}

export default Router;