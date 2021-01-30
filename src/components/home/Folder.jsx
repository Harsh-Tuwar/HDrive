import React from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";
import { Folder as FolderIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	btn: {
		margin: theme.spacing(1),
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	}
}));

const Folder = ({ folder }) => {
	const classes = useStyles();

	return (
		<Button
			variant="contained"
			color="secondary"
			className={classes.btn}
			startIcon={<FolderIcon />}
		>
			{folder.name}
		</Button>
	);
};

Folder.propTypes = {
	folder: PropTypes.object,
};
 
export default Folder;