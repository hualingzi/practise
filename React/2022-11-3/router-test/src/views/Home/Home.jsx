import React from 'react'
import {
    useNavigate
} from 'react-router-dom'

export default function Home (props) {
    // let wff = "王发发"
    const router = useNavigate()
    const toAbout = () => {
        // props.history.push({
        //     pathname: '/about',
        //     state: {
        //         wff
        //     }
        // })
        // console.log(props);
        router('/about', {
            state: {
                name: 'wff'
            }
        })
    }
    return (
        <div>Home
            <button onClick={toAbout}>跳转</button>
        </div>
    )
}
