import React, { Component } from 'react'


class OwnersList extends Component {
    render() {
        return (
            <section className="owners list">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id}>
                        {owner.name}
                        <button onClick={() => {
                            this.props.cancelService(owner.id)
                        }}>Cancel Service</button>
                    </div>
                )
            }
            </section>
        )
    }
}

export default OwnersList