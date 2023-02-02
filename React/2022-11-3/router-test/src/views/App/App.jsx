import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
} from 'react-router-dom'
import './App.css'
import Home from '../Home/Home'
import About from '../About/About'
import Topics from '../Topics/Topics'

function App () {
    return (
        <Router>
            <div>
                <ul>
                    <li><NavLink to="/" activeClassName='active' exact>Home</NavLink></li>
                    <li><NavLink to="/about" activeClassName='active'>About</NavLink></li>
                    <li><NavLink to="/topics" activeClassName='active'>Topics</NavLink></li>
                </ul>

                <hr />

                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/topics" element={<Topics/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
