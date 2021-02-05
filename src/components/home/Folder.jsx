import React from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";
import { Folder as FolderIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	btn: {
		margin: theme.spacing(1),
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		width: 300,
		justifyContent: "flex-start"
	}
}));

const Folder = ({ folder }) => {
	const classes = useStyles();

	return (
		<Button
			variant="contained"
			color="default"
			className={classes.btn}
			startIcon={<FolderIcon />}
			component={Link}
			to={`/dash/folder/${folder.id}`}
		>
			{(folder.name.length > 29) ? folder.name.slice(0, 25).concat("...") : folder.name}
		</Button>
	);
};

Folder.propTypes = {
	folder: PropTypes.object,
};
 
export default Folder;