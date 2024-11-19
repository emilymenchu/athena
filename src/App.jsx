import React from 'react'; 
import { useRoutes, BrowserRouter } from 'react-router-dom';
import Dashboard from './generalComponents/dashboard/Dashboard';
import SignIn from './generalComponents/sign-in/SignIn';
import './App.css'
import MyAccount from './generalComponents/modules/User/Account/MyAccount';

function App() {

  const AppRoutes = () => {
    let routes = useRoutes([
      { path: '/', element: <SignIn /> },
      { path: '/sign-in', element: <SignIn /> },
      { 
        path: '/dashboard', 
        element: <Dashboard />, // Componente padre
        children: [ // Rutas hijas
          { path: 'my-account', element: <MyAccount /> },
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
