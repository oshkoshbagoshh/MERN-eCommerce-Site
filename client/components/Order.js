/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 23:06:51 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 23:07:12
 * @Description: Page that displays all the orders of the user. We use the getOrders action to get the orders of the user.
 * Once authenticated, we call the getOrders action to get the orders of the user. We then display the orders in a card format.
 * If the user is not authenticated, we display an alert asking the user to login. If the user is authenticated but has no orders,
 * we display an alert asking the user to place an order.
 * 
 */

import { Component, Fragment } from 'react';
import AppNavbar from './AppNavbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orderActions';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap';

class Orders extends Component {

    state = {
        loaded: false,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
        getOrders: PropTypes.func.isRequired
    }

    ongetOrders = async (id) => {
        await this.props.getOrders(id);
        this.state.loaded = true;
    }

    render(){
        const user = this.props.user;
        if(this.props.isAuthenticated && !this.props.order.loading && !this.state.loaded){
            this.ongetOrders(user._id);
        }
        return(
            <div>
                <AppNavbar/>
                {this.props.isAuthenticated ?
                    <Fragment>
                        {this.props.order.orders!==[] ? null :
                            <Alert color="info" className="text-center">You have no orders!</Alert>
                        }
                    </Fragment>
                    : <Alert color="danger" className="text-center">Login to View!</Alert>
                }

                {this.props.isAuthenticated && !this.props.order.loading && this.state.loaded && this.props.order.orders.length?
                    <Container>
                        <div className="row">
                            {this.props.order.orders.map((order)=>(
                                <div className="col-md-12">
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h4">{order.items.length} items - Total cost: Rs. {order.bill}</CardTitle>
                                            <div className="row">
                                            {order.items.map((item)=>(
                                                <div className="col-md-4">
                                                    <Card className="mb-2">
                                                        <CardBody>
                                                            <CardTitle tag="h5">{item.name} ({item.quantity} pieces)</CardTitle>
                                                            <CardSubtitle tag="h6">Rs. {item.price}/piece</CardSubtitle>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <br/>
                                </div>
                                
                            ))}
                        </div>
                    </Container>
                :null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    order: state.order,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, {getOrders})(Orders);
