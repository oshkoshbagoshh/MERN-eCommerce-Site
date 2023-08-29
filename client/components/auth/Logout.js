/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 21:28:10 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 21:34:38
 * @Description: 
 * Uses a navlink and a button that displays logout. On clicking, we connect to the redux store and call the logout action and then export it.
 */

import { Component, Fragment } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, Button } from "reactstrap";

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };
    render() {
        return (
            <div>
                <Fragment>
                    <Button color="danger" className="btn btn-sm">
                        <NavLink onClick={this.props.logout} href="#">
                            <span className="text-light">
                                <b> Logout </b>
                            </span>
                        </NavLink>
                    </Button>
                </Fragment>

            </div>
        )
    }
}

export default connect(null, { logout })(Logout);


