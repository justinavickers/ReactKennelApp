import React, { Component } from "react"


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
        this.props.history.push("/")
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal list">Please sign in</h1>
                <label htmlFor="inputEmail">
                </label>
                <input onChange={this.handleFieldChange} type="email"
                       id="email"
                       placeholder="Email address"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <button type="submit">
                    Sign in
                </button>
            </form>
        )
    }
}