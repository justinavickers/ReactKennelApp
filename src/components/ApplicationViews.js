import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/animalList'
import LocationList from './location/locationList'
import EmployeeList from './employee/employeeList'
import OwnersList from './owners/ownersList'
import AnimalManager from "../modules/AnimalManager"
import LocationManager from '../modules/LocationManager';
import EmployeeManager from '../modules/EmployeeManager'
import OwnerManager from '../modules/OwnerManager'
import AnimalDetail from './animal/animalDetail'


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

  cancelService = (id) => {
    fetch(`http://localhost:3002/owners/${id}`, {
      "method": "DELETE"
    })
      .then(() => fetch("http://localhost:3002/owners"))
      .then(r => r.json())
      .then(owners => this.setState({ owners: owners }))
  }

  componentDidUpdate() {
    console.log("componentDidUpdate -- ApplicationViews")
  }

  componentDidMount() {
    AnimalManager.getAll().then(allAnimals => {
      this.setState({
        animals: allAnimals
      })
    })
    const newState = {}

    AnimalManager.getAll()
      .then(animals => newState.animals = animals)
      .then(() => EmployeeManager.getAll())
      .then(employees => newState.employees = employees)
      .then(r => OwnerManager.getAll())
      .then(owners => newState.owners = owners)
      .then(r => LocationManager.getAll())
      .then(locations => newState.locations = locations)
      .then(() => fetch("http://localhost:3002/animalOwners")
        .then(r => r.json()))
      .then(animalOwners => newState.animalOwners = animalOwners)
      .then(() => this.setState(newState))
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal}
          animals={this.state.animals} />
        }} />
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route exact path="/animals" render={(props) => {
          return <AnimalList animals={this.state.animals}
            owners={this.state.owners}
            dischargeAnimal={this.dischargeAnimal}
            animalOwners={this.state.animalOwners}
            loadAnimals={this.getAllAnimalsAgain} />
        }} />
        <Route path="/employees" render={(props) => {
          return <EmployeeList employees={this.state.employees}
            fireEmployee={this.fireEmployee} />
        }} />
        <Route path="/owners" render={(props) => {
          return <OwnersList owners={this.state.owners}
            cancelService={this.cancelService} />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews