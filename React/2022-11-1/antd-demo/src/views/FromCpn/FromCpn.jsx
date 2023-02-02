import React, { Component } from 'react'

export default class FromCpn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            emil:''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault();
    }

    render () {
        let { value,emil } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字:
                    <input type="text" name='value' value={value} onChange={this.handleChange} />
                </label>
                <label>
                    邮箱:
                    <input type="text" name='emil' value={emil} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }
}
