// import logo from '../../logo.svg';
// import './App.css';
import React, { Component } from 'react';
import Welcome from '../../components/Welcome/Welcome';
// import CpnOne from '../../components/CpnOne/CpnOne';
import CpnTwo from '../../components/CpnTwo/CpnTwo';

// function Hello (props) {
//     return <h1>Hello,{props.wff}</h1>
// }

// class WelcomeOne extends React.Component {
//   render() {
//     return <h1>Hello,{this.props.wff}</h1>
//   }
// }

// function App() {
//   let name = 'wff';
//   let age = 18;
//   let numbers = [1, 2, 3, 4, 5];
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <Hello wff={name} />
//         <Welcome name={name} age={age} />
//         {/* <WelcomeOne wff={name} /> */}
//         <ul>
//           {numbers.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '王发发',
            age: 18,
            isShow: false
        }
        // this.changeName = this.changeName.bind(this)
    }
    componentDidMount () {

    }
    changeName = (val) => {
        // console.log(val);
        // console.log(this.state.name);
        let age = this.state.age
        age++
        this.setState({
            name: 'wff',
            age,
            isShow: !this.state.isShow
        }, () => {
            this.ifText()
        })
    }
    ifText () {
        if (this.state.age > 18) {
            console.log(222);
        }
    }
    render () {
        let { name, age, isShow } = this.state
        // if (isShow) {
        //     return (
        //         <CpnOne />
        //     )
        // } else {
        //     return (
        //         <CpnTwo />
        //     )
        // }
        return (
            <div>
                App
                <Welcome name={name} age={age} />
                {/* <button onClick={this.changeName}>点击</button> */}
                <button onClick={() => this.changeName('传递的参数')}>点击</button>
                {/* <CpnTwo isShow={isShow} /> */}
                {/* {
                    isShow ? <CpnTwo isShow={isShow} /> : <CpnOne />
                } */}
                {
                    isShow && <CpnTwo />
                }
            </div>
        )
    }
}
