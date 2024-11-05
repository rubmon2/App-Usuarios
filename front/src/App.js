import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Page/Principales/HomePage.js';
import { LoginPage } from './Page/Principales/LoginPage.js';
import { RegisterPage } from './Page/Principales/RegisterPage.js';
import { DashBoard } from './Page/AuthPages/DashBoard.js';
import { RoterProtected } from './Component/RoterProtected.js';
import { PortalLayout } from './Component/PortalLayout.js';

function App() {
  


  const router = createBrowserRouter([
  
    {
      path: "/",
      element: <HomePage />, 
    },
    {
      path: "/login",
      element: <LoginPage />, 
    },
    {
      path: "/register",
      element: <RegisterPage />, 
    },
    {path:"/",
      element:<RoterProtected></RoterProtected>,
      children:[
        {
          path:"/dashboard",
          element:<DashBoard></DashBoard>
        },
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}>
        <PortalLayout />
      </RouterProvider>
    </div>
  );
}

export default App;
