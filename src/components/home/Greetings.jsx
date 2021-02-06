import { masterAuth as auth } from "../../firebase";
import { Grid, CssBaseline, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(() => ({
	greetings: {
		fontSize: "33px"
	},
	dashFont: {
		fontFamily: "futura-pt,system-ui,Helvetica Neue,sans-serif",
	},
	boldFont: {
		fontWeight: "bold"
	}
}));

const Greetings = () => {
	const classes = useStyles();
	const me = auth.currentUser;
	let uname = "User";

	if (me && me.displayName && me.displayName != "") { uname = me.displayName; }
	
	const getGreetings = () => {
		const today = new Date();
		const currHr = today.getHours();

		if (currHr < 12) {
			return "Good Morning";
		} else if (currHr < 18) {
			return "Good Afternoon";
		} else {
			return "Good Evening";
		}
	};

	return (
		<Grid container component="main" direction="column" spacing={4}>
			<CssBaseline />
			<Grid item >
				<Typography component="h4" className={clsx(classes.greetings, classes.dashFont, classes.boldFont)} variant="h4" gutterBottom paragraph>
					{getGreetings()},  {uname}!
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Greetings;