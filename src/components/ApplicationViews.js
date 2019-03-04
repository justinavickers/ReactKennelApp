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
import login from './authentication/login'
import { Route, Redirect } from "react-router-dom"



// Check if credentials are in local storage


class ApplicationViews extends Component {
  state = {
    owners: [],
    animalOwners: [],
    locations: [],
    animals: [],
    employees: []
  }


  addAnimal = animal =>
    AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals =>
        this.setState({
          animals: animals
        })
      )

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

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null
  render() {
    return (
      <React.Fragment>
        <Route path="/login" component={login} />

        <Route exact path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal}
            animals={this.state.animals} />
        }} />
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <LocationList {...props} locations={this.state.locations} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/animals" render={(props) => {
          if(this.isAuthenticated()) {
            return <AnimalList {...props} animals={this.state.animals}
              owners={this.state.owners}
              dischargeAnimal={this.dischargeAnimal}
              animalOwners={this.state.animalOwners}
              loadAnimals={this.getAllAnimalsAgain} />
          } else {
            return <Redirect to="./login"/>
          }
        }} />
        <Route exact path="/employees" render={props => {
          if (this.isAuthenticated()) {
            return <EmployeeList fireEmployee={this.fireEmployee}
              employees={this.state.employees} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/owners" render={(props) => {
          if (this.isAuthenticated()) {
            return <OwnersList {...props} owners={this.state.owners}
              cancelService={this.cancelService} />
          } else {
            return <Redirect to="./login" />
          }
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews