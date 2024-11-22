import React from 'react'; 
import { useRoutes, BrowserRouter } from 'react-router-dom';
import Dashboard from './generalComponents/dashboard/Dashboard';
import SignIn from './generalComponents/sign-in/SignIn';
import './App.css'
import MyAccount from './generalComponents/modules/User/Account/MyAccount';
import SaveUser from './generalComponents/modules/User/create-user/CreateUser';
import { SaveUserProvider } from './context/User/saveUserContext';

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
          { path: 'user/create-user', element: <SaveUserProvider><SaveUser /></SaveUserProvider>},
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
