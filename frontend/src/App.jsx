
import Signup from './components/Signup';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './components/Profile';

function App() {

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: '/',
          element: <Home />
        },
                {
          path: '/profile',
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
        {
      path: "/signup",
      element: <Signup/>
    },
  ])

  return (
    <>
<RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
