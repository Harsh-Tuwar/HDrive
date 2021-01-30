import { Grid, Container, makeStyles, CssBaseline, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import React from "react";
import { auth } from "../../firebase";
import clsx from "clsx";
import PropTypes from "prop-types";
import InfoContainer from "./InfoContainer";
import Folder from "./Folder";
import { updateFolder, setChildFolders } from "../../redux/modules/folder/folderActions";

const useStyles = makeStyles((theme) => ({
	dashFont: {
		fontFamily: "futura-pt,system-ui,Helvetica Neue,sans-serif",
	},
	boldFont: {
		fontWeight: "bold"
	},
	greetings: {
		fontSize: "33px",
	},
	caption: {
		color: "RGB(119, 129, 138)",
		fontSize: 14
	},
	gridItem: {
		marginTop: 20
	},
	portcards: {
		height: 150,
		overflow: "auto",
	},
	infoContainer: {
		marginTop: theme.spacing(1)
	},
	foldersContainer: {
		marginTop: theme.spacing(3)
	}
}));

const Dashboard = (props) => {
	const me = auth.currentUser;
	const classes = useStyles();
	const { folder, childFolders } = props.folder;
	let uname = "User";

	React.useEffect(() => {
		props.updateFolder(folder.id);
		props.setChildFolders(folder.id, me.uid);
	}, []);

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

	if (me && me.displayName && me.displayName != "") { uname = me.displayName; }

	return (
		<Container>
			<CssBaseline />
			<Grid container component="main" direction="column" spacing={4}>
				<CssBaseline />
				<Grid item >
					<Typography component="h4" className={clsx(classes.greetings, classes.dashFont, classes.boldFont)} variant="h4" gutterBottom paragraph>
						{getGreetings()},  {uname}!
					</Typography>
				</Grid>
			</Grid>
			<div className={classes.infoContainer}>
				<InfoContainer currentFolder={folder} />
			</div>
			<Grid container direction="column" spacing={3} className={classes.foldersContainer}>
				{childFolders &&
					childFolders.length > 0 &&
					childFolders.map((fld) => {
						return <Grid item key={fld.id} style={{ maxWidth: 250, padding: 5 }}><Folder folder={fld} /></Grid>;
					})
				}
			</Grid>
		</Container>
	);
};

Dashboard.propTypes = {
	folder: PropTypes.object.isRequired,
	updateFolder: PropTypes.func.isRequired,
	setChildFolders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	folder: state.folder
});
 
export default connect(
	mapStateToProps,
	{ updateFolder, setChildFolders }
)(Dashboard);