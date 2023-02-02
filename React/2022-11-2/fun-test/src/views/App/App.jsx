
import React, { useState, useEffect } from 'react'
import './App.css';
import Antd from '../Antd/Antd';
import Login from '../Login/Login';

export default function App () {
    let [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    })
    return (
        <div>
            {isLogin ? <Antd /> : <Login />}
        </div>
    )
}




// export default function App () {
//     // let [name, setName] = useState('wff')
//     // let [pagNum, setPageNum] = useState('1')
//     // let [info, setInfo] = useState({
//     //     name: 'wff',
//     //     age: 18
//     // })
//     // const changeName = () => {

//     //     setName('王发发')
//     //     setPageNum(pagNum++)
//     // }
//     // useEffect(() => {
//     //     console.log(111);
//     // }, [])
//     // useEffect(() => {

//     // }, [])
//     return (
//         <div>
//             {/* {name}
//             {pagNum}
//             <button onClick={changeName}>改变名称</button> */}
//             <Antd />

//         </div>
//     )
// }
