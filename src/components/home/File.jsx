import React from "react";
import PropTypes from "prop-types";
import { InsertDriveFile } from "@material-ui/icons";
import { Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	btn: {
		margin: theme.spacing(1),
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		width: 300,
		justifyContent: "flex-start"
	}
}));

const File = ({ file }) => {
	const classes = useStyles();

	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a target="_blank" href={file.url}>
			<Button 
				variant="contained"
				color="default"
				className={classes.btn}
				startIcon={<InsertDriveFile />}
			>
				{(file.name.length > 29) ? file.name.slice(0, 25).concat("...") : file.name}
			</Button>
		</a>
	);
};

File.propTypes = {
	file: PropTypes.object.isRequired
};
 
export default File;