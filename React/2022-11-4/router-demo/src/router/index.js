import Home from '../views/Home/Home';
import About from '../views/About/About';
import Picture from '../views/Picture/Picture';
import Theme from '../views/Theme/Theme';
import Style from '../views/Style/Style';
import Equipment from '../views/Equipment/Equipment';
import Region from '../views/Region/Region';
import Author from '../views/Author/Author';
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
        path: '/picture',
        component: <Picture />,
        mata: {
            title: '图片管理'
        }
    },
    {
        path: '/theme',
        component: <Theme />,
        mata: {
            title: '题材管理'
        }
    },
    {
        path: '/style',
        component: <Style />,
        mata: {
            title: '风格管理'
        }
    },
    {
        path: '/equipment',
        component: <Equipment />,
        mata: {
            title: '设备管理'
        }
    },
    {
        path: '/region',
        component: <Region />,
        mata: {
            title: '地区管理'
        }
    },
    {
        path: '/author',
        component: <Author />,
        mata: {
            title: '摄影师管理'
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
