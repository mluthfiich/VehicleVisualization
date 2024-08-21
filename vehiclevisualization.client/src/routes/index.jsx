import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from '../views/login/index';
import Main from '../components/main/main';
import AuthRouted from '../services/authRouted';
import Unauthorized from '../views/Unauthorized';
import UserManagement from '../views/management/user';
import MenuPermission from '../views/management/menu';
import DataVehicle from '../views/dashboard/dataVehicle';
import Analytic from '../views/dashboard/analytic';

function useMenuData() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuData = async () => {
    setLoading(true);
    const token = localStorage.getItem("Bearer ");
    if (token == null) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('/api/MenuPermission/Permission', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMenuData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return { menuData, loading, error, fetchMenuData };
}

const components = {
  'Analytic': Analytic,
  'DataVehicle': DataVehicle,
  'UserManagement': UserManagement,
  'MenuPermission': MenuPermission
};

function Router() {
  const [refreshMenu, setRefreshMenu] = useState(false);
  const { menuData, fetchMenuData } = useMenuData();

  useEffect(() => {
    if (refreshMenu) {
      fetchMenuData();
      setRefreshMenu(false);
    }
  }, [refreshMenu]);

  const handleLoginSuccess = () => {
    setRefreshMenu(true);
  };

  const filteredMenuData = menuData.filter(item => item.parentMenuId !== null);

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/401" element={<Unauthorized />} />
      <Route
        path="/*"
        element={
          <AuthRouted>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/home" element={<Main />} />
              {filteredMenuData.map((menu) => {
                const Component = components[menu.actionName];
                return (
                  <Route
                    key={menu.id ? menu.id : ''}
                    path={menu.actionName ? menu.actionName : '/401'}
                    element={Component ? <Component /> : <Unauthorized />}
                  />
                );
              })}
            </Routes>
          </AuthRouted>
        }
      />
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
}

export default Router;
