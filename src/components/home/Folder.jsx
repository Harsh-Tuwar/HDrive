import React from "react";
import PropTypes from "prop-types";
import { CardActionArea, makeStyles, Card, CardMedia, Divider, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

const Folder = ({ folder }) => {
	const classes = useStyles();

	return (
		<Card className={classes.card} elevation={2}>
			<Link to={`${folder.id}`} className={classes.link}>
				<CardActionArea>
					<CardMedia component="img" className={classes.media} src="/images/folder.png" title="folder"/>
				</CardActionArea>
				<Divider variant="middle" />
				<CardContent style={{ padding: "10px 16px"}}>
					<Typography variant="subtitle1" noWrap>{folder.name}</Typography>
				</CardContent>
			</Link>
		</Card>
	);
};

Folder.propTypes = {
	folder: PropTypes.object,
};
 
export default Folder;