import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from "@material-ui/core";
import { Cloud, ExitToApp } from "@material-ui/icons";
import { setCurrentUser } from "../../redux/modules/auth/authActions";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		color: "white"
	},
	content: {
		paddingTop: theme.spacing(2)
	}
}));

const AuthenticatedPage = ({ component: Component, properties, setCurrentUser}) => {
	const classes = useStyles();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<Link to="/" style={{color: "white"}}><Cloud /></Link>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Link to="/" style={{color: "white"}}>HDrive</Link>
          			</Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
							onClick={() => setCurrentUser()}
						>
							<ExitToApp />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<div className={classes.content}>
				<Component {...properties} />
			</div>
		</>
	);
};

AuthenticatedPage.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.func
	]),
	properties: PropTypes.object,
	setCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {setCurrentUser})(AuthenticatedPage);