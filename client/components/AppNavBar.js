/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 22:01:32 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 22:12:05
 * @Description: Contains the navigation bar of the application. Has a Login Modal, Register Modal, and a Logout Modal, as well as links to various pages on our website. 
 * We are using reactstrap to build out the navbar.
 * We define a state to assess whether the Navbar is open or not. We have a toggl to change the state of the Navbar.
 * We get the user and isAuthenticated states from the auth props and then we check whether we are authenticated or not. If we are, we then display the username, link to home, cart,  orders, and logout button. If not, we display the login and register buttons.
 * We also display a Navbar brand, and then when we are authenticated, we display the authlinnks, and when we are not, we display the guestlinks.
 * finally, we define the mapStateToProps and add the auth state in there. 
 */
import {Component, Fragment} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, NavLink} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// AppNavBar Component
class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    
    // Toggle the Navbar
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // Render the Navbar
    render() {
        const {isAuthenticated, user} = this.props.auth;

        // Auth Links
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/cart">Cart</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/orders">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        // Guest Links
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        // Return the Navbar
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-b">
                    <Container>
                        <NavbarBrand href="/"> Not Another E Commerce Store </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto">
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

// Map the state to the props

const mapStateToProps = state => ({
    auth: state.auth
});

// Export the AppNavBar Component
export default connect(mapStateToProps, null)(AppNavBar);


