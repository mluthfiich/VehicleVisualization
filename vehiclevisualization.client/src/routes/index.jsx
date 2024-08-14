import { Route, Routes } from "react-router-dom";
import Login from "../views/login/index";
import Main from "../components/main/main";
import AuthRouted from "../services/authRouted";
import Unauthorized from "../views/Unauthorized";
import Analytic from "../views/analytic";
import DataVehicle from "../views/dataVehicle";

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
            </Routes>
          </AuthRouted>
        }
      />
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
}

export default Router;
