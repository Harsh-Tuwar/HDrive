import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AuthenticatedPage } from "../layout";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route {...rest} render={props => auth.loggedIn ? (<AuthenticatedPage component={Component} properties={props} />) : (<Redirect to="/" />)} />
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.object
	])
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps
)(PrivateRoute);