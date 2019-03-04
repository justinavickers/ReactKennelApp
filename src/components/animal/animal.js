import React, { Component } from 'react'
import dog from "./DogIcon.png"
import "./animal.css"
import { Link } from "react-router-dom";


class Animal extends Component {
    render() {

        return (
            <div key={this.props.animal.id} className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <img src={dog} className="icon--dog" />
                    <div>{this.props.animal.name}</div>
                    <div className="ownerList">({this.props.owners.join(", ")})</div>
                    <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link>
                    <button
                        onClick={() => this.props.dischargeAnimal(this.props.animal.id)}
                        className="card-link">Delete</button>
                </h5>
            </div>
        </div>
        )
    }
}

export default Animal