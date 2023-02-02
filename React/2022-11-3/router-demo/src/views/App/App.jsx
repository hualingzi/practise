import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import Layout from '../../Layout/Layout'
import Login from '../Login/Login'
import './App.css'

export default function App () {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/*' element={<Layout />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}
