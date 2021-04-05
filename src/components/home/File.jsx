import React from "react";
import PropTypes from "prop-types";
import { InsertDriveFile } from "@material-ui/icons";
import { CardActionArea, makeStyles, Card, CardMedia, Divider, CardContent, Typography } from "@material-ui/core";
// import { Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	btn: {
		margin: theme.spacing(1),
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		width: 300,
		justifyContent: "flex-start"
	},
	card: {
		width: 110,
		margin: theme.spacing(1),
		borderRadius: 10
	},
	media: {
		height: 100,
		width: 100,
		margin: "auto"
	},
	link: {
		color: "black"
	}
}));

const File = ({ file }) => {
	const classes = useStyles();

	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		// <a target="_blank" href={file.url}>
		// 	<Button 
		// 		variant="contained"
		// 		color="default"
		// 		className={classes.btn}
		// 		startIcon={<InsertDriveFile />}
		// 	>
		// 		{(file.name.length > 29) ? file.name.slice(0, 25).concat("...") : file.name}
		// 	</Button>
		// </a>
		<Card className={classes.card} elevation={2}>
			<a target="_blank" rel="noreferrer" href={file.url}>
				<CardActionArea>
					<img src={file.url} height="110px" width="110px" />
				</CardActionArea>
				<Divider variant="middle" />
				<CardContent style={{ padding: "10px 16px"}}>
					<Typography variant="subtitle1" noWrap>{file.name}</Typography>
				</CardContent>
			</a>
		</Card>
	);
};

File.propTypes = {
	file: PropTypes.object.isRequired
};
 
export default File;