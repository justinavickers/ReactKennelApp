import React, { Component } from 'react'
import './animalList.css'
import Animal from './animal'
import './animalList.css'

class AnimalList extends Component {
    render() {
        return (
            <section className="animals list">
            {
                this.props.animals.map(animal =>
                    <Animal key={`animal-${animal.id}`}
                   animal={animal}
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
            </section>
        )
    }
}

export default AnimalList