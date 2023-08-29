/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 22:26:13 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 22:36:18
 * @Description: Contains the AddItem component. This component is used to add items to the store. We don't link it in the navbar since we don't want uses to be able to add items to the store.
 * We have a state with a title, description, category, and price of the item.
 * We have a similar onChange function to the one we had in the RegisterModal component. We use the onChange function to update the state as the user types in the form.
 * We have a form with all of these fields and a button to add the item to the cart. 
 * We display an alert on addition 
 * We have a mapStateToProps function that brings in the isAuthenticated state from the auth props.
 * Finally, we use the connect function to bind the mapStateToProps function to the AddItem component.
 */
import { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';
import AppNavBar from "./AppNavBar";

// AddItem Component
class AddItem extends Component {
    state = {
        title: '',
        description: '',
        category: '',
        price: 0,
        // msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    // onChange function
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // onSubmit function
    onSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            price: this.state.price
        }
        await this.props.addItem(newItem);
        alert('Item added successfully');
    }

    // Render the AddItem Component
    render() {
        return (
            <div>
                <AppNavBar />
                <Container>
                    <h2 className="text-center mb-3"> Add a new Item </h2>
                    {this.props.isAuthenticated ?
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" placeholder="Title" onChange={this.onChange} />
                                <br />
                                <Label for="description">Description</Label>
                                <Input type="text" name="description" id="description" placeholder="Description" onChange={this.onChange} />
                                <br />

                                <Label for="category">Category</Label>
                                <Input type="text" name="category" id="category" placeholder="Category" onChange={this.onChange} />
                                <br />

                                <Label for="price">Price</Label>
                                <Input type="number" name="price" id="price" placeholder="Price" onChange={this.onChange} />

                                <Button color="dark" style={{ marginTop: '2rem' }} block>Add Item</Button>
                            </FormGroup>
                        </Form> : <Alert className="text-center" color="danger"> Please login to add an item </Alert>}

                </Container>
            </div>
        );
    }
}

// Map state to props
const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

// Export the AddItem Component
export default connect(mapStateToProps, { addItem })(AddItem);
