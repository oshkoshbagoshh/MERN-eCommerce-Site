/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 22:12:14 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 22:25:08
 * @Description: Home page of the application. We display all of our items and give the user an option to add the items to the cart. 
 * We bring in getItems and addToCart functions from the actions folder and use them to fetch the items and add the items to the cart. 
 *  We fetch all items using the getItems function and define an AddToCart function that triggers when we click Add to Cart button on the item.
 * It receives a userId and productId and then adds the item to the cart.
 * TODO: add an option to choose the number of items 
 * TODO: add an option to choose the size of the item
 * TODO: add an option to choose the color of the item
 * we use a grid-based layout system to display the items as cards. 
 * We use the map function to map through the items and display the data for each item.
 * We have an add to cart Button for each product that is only displayed when the user is authenticated.
 * We also have a mapStateToProps function that brings in the item and auth states from the props.
 * Finally, we use the connect function to bind the actions and the mapStateToProps function to the Home component.
 */

import { Component } from "react";
import AppNavBar from "./AppNavBar";
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container}from 'reactstrap';
import { ReactPropTypes } from "react";
import {connect} from 'react-redux';
import {getItems} from '../actions/itemActions';
import {addToCart} from '../actions/cartActions';

// Home Component
class Home extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    // static prop types
    static propTypes = {
        getItems: ReactPropTypes.func.isRequired,
        item: ReactPropTypes.object.isRequired,
        isAuthenticated: ReactPropTypes.bool,
        addToCart: ReactPropTypes.func.isRequired,
        user: ReactPropTypes.object.isRequired
    }

    // Add to Cart function
    onAddToCart = async (userId, productId) => {
        await this.props.addToCart(userId, productId, 1);
        alert('Item added to cart');
    }
    
    // Render the Home Component
    render() {
        const {items} = this.props.item;
        const user = this.props.user;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    <div className="row">
                        {items.map((item) => (
                            <div className="col-md-4">
                                <Card className="mb-4">
                                    <CardBody>
                                        <CardTitle tag="h5">{item.title}</CardTitle>
                                        <CardSubtitle tag="h6"> Rs. {item.price} </CardSubtitle>
                                        <CardText>{item.category}</CardText>
                                        {this.props.isAuthenticated ?
                                            <Button
                                                color="success"
                                                size="sm"
                                                onClick={() => this.onAddToCart.bind(this)(user._id, item._id)}
                                            > Add to Cart </Button> : null}
                                    </CardBody>
                                </Card>
                            </div>

                        ))}
                    </div>
                </Container>
                </div>
        );
    }

}

// Map state to props
const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

// Export the Home Component
export default connect(mapStateToProps, {getItems, addToCart})(Home);





            </div>
