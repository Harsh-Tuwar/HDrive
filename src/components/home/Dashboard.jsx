import { Grid, Container, makeStyles, CssBaseline, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import React from "react";
import { auth } from "../../firebase";
import clsx from "clsx";
import PropTypes from "prop-types";
import InfoContainer from "./InfoContainer";
import { useParams } from "react-router-dom";
import { Folder, File } from "./index";
import { updateFolder, setChildFolders, setChildFiles } from "../../redux/modules/folder/folderActions";

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
	const { folderID } = useParams();
	const classes = useStyles();
	const { folder, childFolders, childFiles } = props.folder;
	let uname = "User";

	React.useEffect(() => {
		props.updateFolder(folderID);
		props.setChildFolders(folderID, me.uid);
		props.setChildFiles(folderID, me.uid);
	}, [folderID]);

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
			<Grid container direction="row" spacing={1} className={classes.foldersContainer}>
				{childFolders &&
					childFolders.length > 0 &&
					childFolders.map((fld) => {
						return <Grid item key={fld.id}><Folder folder={fld} /></Grid>;
					})
				}
			</Grid>
			{childFolders.length > 0 && childFiles.length > 0 && <hr style={{ margin: "40px 0px" }}/>}
			<Grid container direction="row" spacing={1} className={classes.foldersContainer}>
				{childFiles &&
					childFiles.length > 0 &&
					childFiles.map((file) => {
						return <Grid item key={file.id}><File file={file} /></Grid>;
					})
				}
			</Grid>
		</Container>
	);
};

Dashboard.propTypes = {
	folder: PropTypes.object.isRequired,
	updateFolder: PropTypes.func.isRequired,
	setChildFolders: PropTypes.func.isRequired,
	setChildFiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	folder: state.folder
});
 
export default connect(
	mapStateToProps,
	{ updateFolder, setChildFolders, setChildFiles }
)(Dashboard);