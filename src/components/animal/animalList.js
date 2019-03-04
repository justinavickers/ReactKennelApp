import React, { Component } from 'react'
import Animal from './animal'
import './animalList.css'


class AnimalList extends Component {
    render() {
        return (
            <section className="animals list">
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/animals/new")
                    }
                    }>
                    Admit Animal
                    </button>
                {
                    this.props.animals.map(animal =>
                        <Animal key={`animal-${animal.id}`}
                            animal={animal}
                            dischargeAnimal={this.props.dischargeAnimal}
                            owners={
                                this.props.animalOwners
                                    .filter(ao => ao.animalId === animal.id)
                                    .map(ao =>
                                        this.props.owners.find(
                                            o => o.id === ao.ownerId
                                        ).name
                                    )
                            }
                        />
                    )
                }
                <button onClick={() =>
                    this.props.loadAnimals()
                }>Reload Animals</button>
            </section>
        )
    }
}

export default AnimalList