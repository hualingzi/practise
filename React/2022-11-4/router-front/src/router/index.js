import Home from '../views/Home/Home';
import About from '../views/About/About';
import Explore from '../views/Explore/Explore';
import Label from '../views/Label/Label';
import Camerist from '../views/Camerist/Camerist'
import Sign from '../views/Sign/Sign';
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
        path: '/explore',
        component: <Explore />,
        mata: {
            title: '探索'
        }
    },
    {
        path: '/label',
        component: <Label />,
        mata: {
            title: '标签'
        }
    },
    {
        path: '/camerist',
        component: <Camerist />,
        mata: {
            title: '摄影师'
        }
    },
    {
        path: '/sign',
        component: <Sign />,
        mata: {
            title: '签约摄影师招募'
        }
    },

    {
        path: '/about',
        component: <About />,
        mata: {
            title: '关于'
        }
    },
];

export default routes;
