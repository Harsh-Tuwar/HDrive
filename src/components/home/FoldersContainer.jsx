import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Folder } from "./index";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(3)
	}
}));

const FoldersContainer = ({ childFolders, handleClick }) => {
	const classes = useStyles();

	return (
		<Grid container direction="row" className={classes.root}>
			{childFolders &&
				childFolders.length > 0 &&
				childFolders.map((fld) => {
					return <Grid item key={fld.id} id={fld.id} onContextMenu={(e) => handleClick(e, fld)} style={{ cursor: "context-menu" }}>
						<Folder folder={fld} />
					</Grid>;
				})
			}
		</Grid>
	);
};

FoldersContainer.propTypes = {
	childFolders: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default FoldersContainer;