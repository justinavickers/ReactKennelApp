import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/animalList'
import LocationList from './location/locationList'
import EmployeeList from './employee/employeeList'


class ApplicationViews extends Component {
  state = {
    owners: [],
    animalOwners: [],
    locations: [],
    animals: [],
    employees: []
  }


  dischargeAnimal = (id) => {
    fetch(`http://localhost:3002/animals/${id}`, {
      "method": "DELETE"
    })
      .then(() => fetch("http://localhost:3002/animals"))
      .then(r => r.json())
      .then(animals => this.setState({ animals: animals }))
  }

  fireEmployee = (id) => {
    fetch(`http://localhost:3002/employees/${id}`, {
      "method": "DELETE"
    })
      .then(() => fetch("http://localhost:3002/employees"))
      .then(r => r.json())
      .then(employees => this.setState({ employees: employees }))
  }

  getAllAnimalsAgain = () => {
    fetch("http://localhost:3002/animals")
      .then(r => r.json())
      .then(animals => this.setState({ animals: animals }))
  }

  componentDidUpdate() {
    console.log("componentDidUpdate -- ApplicationViews")
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
      .then(() => fetch("http://localhost:3002/animalOwners")
      .then(r => r.json()))
      .then(animalOwners => newState.animalOwners = animalOwners)
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
            dischargeAnimal={this.dischargeAnimal}
            animalOwners={this.state.animalOwners} />
        }} />
        <Route path="/employees" render={(props) => {
          return <EmployeeList employees={this.state.employees}
            fireEmployee={this.state.fireEmployee} />
        }} />
        {/* <Route path="/owners" render={(props) => {
          return <OwnersList owners={this.state.owners} />
        }} /> */}
      </React.Fragment>
    )
  }
}

export default ApplicationViews