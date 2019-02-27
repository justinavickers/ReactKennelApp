import React, { Component } from 'react'
import './owner.css'


class OwnersList extends Component {
    render() {
        return (
            <section className="owners list">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id}>
                        {owner.name}
                        <br/>
                        {owner.phoneNumber}
                    </div>
                )
            }
            </section>
        )
    }
}

export default OwnersList