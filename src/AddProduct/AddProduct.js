import React, { Component } from 'react';
import "./AddProduct.scss"
import img from '../kanapka.jpg';

class AddProduct extends Component {

    render() {
        return (

            <div className="form_card">
                <form method="post" id="form">
                    <div className="form_input">
                        <label htmlFor="fname">Name</label>
                        <input type="text" id="name" name="name" placeholder="Product Name"></input>
                    </div>
                    <div className="form_input">
                        <label htmlFor="Price">Price</label>
                        <input type="number" id="price" name="price" placeholder="0" step="0.01"></input>
                    </div>
                    <div className="form_input">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image" />
                    </div>
                </form>
                <button className="form_button" type="submit" form="form" value="Add"> Add </button>
            </div>

        )
    }
}

export default AddProduct

// <div className="form_input">
// <label htmlFor="category">Choose a category</label>
// <select name="category" id="category">
//     <option value="kanapki">Kanapki</option>
//     <option value="Lunche">Lunche</option>
// </select>
// </div>