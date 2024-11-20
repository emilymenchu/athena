import React from 'react'; 
import { useRoutes, BrowserRouter } from 'react-router-dom';
import Dashboard from './generalComponents/dashboard/Dashboard';
import SignIn from './generalComponents/sign-in/SignIn';
import './App.css'
import MyAccount from './generalComponents/modules/User/Account/MyAccount';
import CreateUser from './generalComponents/modules/User/create-user/CreateUser';

function App() {

  const AppRoutes = () => {
    let routes = useRoutes([
      { path: '/', element: <SignIn /> },
      { path: '/sign-in', element: <SignIn /> },
      { 
        path: '/dashboard', 
        element: <Dashboard />, // Componente padre
        children: [ // Rutas hijas
          { path: 'account/my-account', element: <MyAccount /> },
          { path: 'user/create-user', element: <CreateUser /> },
        ]
      },
    ]);
    return routes;
  }
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App;
