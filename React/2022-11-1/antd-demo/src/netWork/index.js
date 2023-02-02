import axios from 'axios';
function ajax(options) {
    return new Promise((resolve, reject) => {
        const axiosIntance = axios.create({
            baseURL: '/api',
            timeout: 5000
        });
        axiosIntance.interceptors.request.use((config) => {
            if (localStorage.getItem('token')) {
                let token = localStorage.getItem('token');
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        axiosIntance.interceptors.response.use((response) => {
            return response.data;
        });
        axiosIntance(options)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                // if (err.request.status === 401) {
                //     alert('登录失效，请从新登录');
                //     router.push('/login');
                // }
                reject(err);
            });
    });
}
export default ajax;
