import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { File } from "./index";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(3)
	}
}));

const FilesContainer = ({ childFiles, handleClick }) => {
	const classes = useStyles();

	return (
		<Grid container direction="row" spacing={1} className={classes.root}>
			{childFiles &&
				childFiles.length > 0 &&
				childFiles.map((file) => {
					return <Grid item key={file.id} onContextMenu={(e) => handleClick(e, file)} style={{ cursor: "context-menu" }}>
						<File file={file} />
					</Grid>;
				})
			}
		</Grid>
	);
};

FilesContainer.propTypes = {
	childFiles: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired
};
 
export default FilesContainer;