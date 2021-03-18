import React from "react";
import { Container, CssBaseline, Grid, makeStyles, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { Greetings } from "./index";
import { setProject } from "../../redux/modules/project/projectActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateFolder } from "../../redux/modules/folder/folderActions";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(3)
	},
	card: {
		height: 100,
		textAlign: "center",
		display: "flex",
		margin: "auto"
	},
	media: {
		height: 100
	}
}));

const Drives = ({ setProject, history, project, folder, updateFolder }) => {
	const classes = useStyles();

	if (project.currentProject != null) {
		project.currentProject = null;
		folder.folderID = null;
		folder.folder = null;
		folder.childFolders = [];
		folder.childFiles = [];
	}

	React.useEffect(() => {
		updateFolder();
	}, []);

	const handleProjectSelect = (i) => {
		if (i != null) {
			setProject(i);
			history.push(`drives/${i}/dash/drive_root`);
		}
	};

	return (
		<Container>
			<CssBaseline />
			<Greetings />
			<Grid container direction="row" spacing={4} className={classes.root}>
				<Grid item xs={6} md={4}>
					<Card className={classes.card} onClick={() => handleProjectSelect(0)}>
						<CardActionArea >
							<CardContent>
								<Typography gutterBottom variant="body1" color="textPrimary" component="p">
									Drive 0
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
				<Grid item xs={6} md={4}>
					<Card className={classes.card} onClick={() => handleProjectSelect(1)}>
						<CardActionArea>
							<CardContent>
								<Typography gutterBottom variant="body1" color="textPrimary" component="p">
									Drive 1
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

Drives.propTypes = {
	setProject: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	folder: PropTypes.object.isRequired,
	updateFolder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	project: state.project,
	folder: state.folder
});

export default connect(
	mapStateToProps,
	{ setProject, updateFolder }
)(Drives);