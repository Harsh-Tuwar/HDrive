import { auth } from "../../firebase";
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	CssBaseline,
	FormControlLabel,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { Copyright } from "../misc";
import { Link } from "react-router-dom";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { setCurrentUser } from "../../redux/modules/auth/authActions";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn = (props) => {
	const classes = useStyles();
	const [email, setEmail] = React.useState("");
	const [pass, setPass] = React.useState("");
	const [err, setErr] = React.useState({});

	const handleSubmit = (e) => {
		auth.signInWithEmailAndPassword(email, pass)
			.then(async ({ user }) => {
				const tkn = await user.getIdTokenResult();

				const uData = {
					id: user.uid,
					token: tkn?.token,
					expireOn: tkn?.expirationTime,
					n: user.displayName,
					e: user.email
				};

				props.setCurrentUser(uData);
			}).catch((err) => {
				setErr(err);
			});
		
		e.preventDefault();
	};

	useEffect(() => {
		if (props.auth.loggedIn) {
			props.history.push("dash");
		}
	});

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">Sign in</Typography>
					<form className={classes.form} noValidate>
						<TextField
							error={Object.keys(err).length > 0}
							helperText={Object.keys(err).length > 0 ? "Incorrect Email Address!": ""}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setEmail(e.currentTarget.value)}
							onFocus={() => setErr({})}
						/>
						<TextField
							error={Object.keys(err).length > 0}
							helperText={Object.keys(err).length > 0 ? "Incorrect Email Address!": ""}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPass(e.currentTarget.value)}
							onFocus={() => setErr({})}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="/reset" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

SignIn.propTypes = {
	auth: PropTypes.object,
	history: PropTypes.object.isRequired,
	setCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {
	setCurrentUser
})(SignIn);