import React, { Component } from 'react'

export default class Welcome extends Component {
    render() {
        let { name, age } = this.props;
        return (
            <div>Welcome {name} {age}</div>
        )
    }
}
