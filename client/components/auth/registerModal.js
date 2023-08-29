/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 21:15:56 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 21:27:02
 * @Description:  set up the registerModal component. Similar to the login modal but we will use the register action instead of the login action. 
 * We have three fields this time, name, email, and password.
 * We call the register action when the user submits the form and pass the three values to it. 
 * 
 */
import { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import the register action
import { register } from "../../actions/authActions";
// import the clearErrors action
import { clearErrors } from "../../actions/errorActions";

// set up the register modal component
class RegisterModal extends Component {
    state = {
        modal: false,
        name: "",
        email: "",
        password: "",
        msg: null
    };

    // set up the proptypes
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    // set up the componentDidUpdate lifecycle method
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // check for register error
            if (error.id === "REGISTER_FAIL") {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
        
        // if authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }
    // set up the toggle method
    toggle = () => {
        // clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }
    // set up the onChange method
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    // set up the onSubmit method
    onSubmit = e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        // create user object
        const newUser = {
            name,
            email,
            password
        };
        // attempt to register
        this.props.register(newUser);
    
    }
//  render the component
    render() {
        return (
            <div className="container">
                <Button color="info" className="btn btn-sm">
                    <NavLink onClick={this.toggle} href="#"><span className="text-dark"> <b> Register</b></span></NavLink>
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button color="dark" style={{ marginTop: "2rem" }} block>Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}
// set up the mapStateToProps method
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
// export the register modal component
export default connect(
    mapStateToProps,
    { register, clearErrors }
)(RegisterModal);

