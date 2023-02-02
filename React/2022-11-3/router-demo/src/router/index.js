import Home from '../views/Home/Home';
import About from '../views/About/About';
import { Navigate } from 'react-router-dom';

const routes = [
    {
        path: '/',
        component: <Navigate to='/home' />,
        mata: {
            title: '首页'
        }
    },
    {
        path: '/home',
        component: <Home />,
        mata: {
            title: '首页'
        }
    },
    {
        path: '/about',
        component: <About />,
        mata: {
            title: '关于'
        }
    }
];

export default routes;
