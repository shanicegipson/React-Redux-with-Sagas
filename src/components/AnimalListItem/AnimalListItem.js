import React, { Component } from 'react';
import { connect } from 'react-redux';


// DO NOT MODIFY THIS FILE FOR BASE MODE!

class AnimalListItem extends Component {
    // Renders the list of animals
    removeAnimal = (event) => {
        console.log('clickty click', this.props.classData.id);
        this.props.dispatch({ type: 'REMOVE_ANIMAL', payload: this.props.classData.id });
    }
    render() {

        return (
            <tr>
                <td>{this.props.classData.species_name}</td>
                <td>{this.props.classData.class_name}</td>
                <td><button onClick={this.removeAnimal}>Transfer</button></td>
            </tr>
        );
    }
}

export default connect()(AnimalListItem);
