import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animalList'
import LocationList from './locationList'
import EmployeeList from './employeeList'
import OwnersList from './ownersList'


class ApplicationViews extends Component {
  state = {
    owners: [],
    animalOwners: [],
    locations: [],
    animals: [],
    employees: []
}

componentDidMount() {
  const newState = {}

  fetch("http://localhost:3002/animals")
      .then(r => r.json())
      .then(animals => newState.animals = animals)
      .then(() => fetch("http://localhost:3002/employees")
      .then(r => r.json()))
      .then(employees => newState.employees = employees)
      .then(() => fetch("http://localhost:3002/owners")
      .then(r => r.json()))
      .then(owners => newState.owners = owners)
      .then(() => fetch("http://localhost:3002/locations")
      .then(r => r.json()))
      .then(locations => newState.locations = locations)
      .then(() => this.setState(newState))
}

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route path="/animals" render={(props) => {
          return <AnimalList animals={this.state.animals}
                             owners={this.state.owners}
                             animalOwners={this.state.animalOwners} />
        }} />
        <Route path="/employees" render={(props) => {
          return <EmployeeList employees={this.state.employees} />
        }} />
        <Route path="/owners" render={(props) => {
          return <OwnersList owners={this.state.owners} />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews