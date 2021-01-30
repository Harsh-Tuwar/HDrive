import React from "react";
import { Grid, Button, makeStyles, FormControl, Input, InputLabel } from "@material-ui/core";
import { Add, CloudUpload } from "@material-ui/icons";
import { database, auth } from "../../firebase";
import { MyDialog } from "../misc";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	breadcrumb: {
		display: "flex",
		flexGrow: 1
	},
	button: {
		margin: "0 5px"
	},
	margin: {
		marging: theme.spacing(1)
	}
}));

const InfoContainer = ({ currentFolder }) => {
	const classes = useStyles();
	const [isOpen, setIsOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const { currentUser } = auth;

	const handleSuccessClose = () => {
		if (name.length && currentFolder) {
			database.folders.add({
				name: name,
				parentID: currentFolder.id,
				userID: currentUser.uid,
				// path,
				createdAt: database.getCurrentTimeStamp()
			});
		}

		setIsOpen(false);
		setName("");
	};

	return (
		<Grid container direction="row" alignItems="center">
			<div className={classes.breadcrumb}>
				<h4>breadcrumb</h4>
			</div>
			<div className={classes.btnContainer}>
				<Button
					variant="outlined"
					color="default"
					className={classes.button}
					startIcon={<CloudUpload />}
				>
					Upload
				</Button>
				<Button
					variant="outlined"
					color="default"
					className={classes.button}
					startIcon={<Add />}
					onClick={() => setIsOpen(true)}
				>
					New Folder
				</Button>
				<MyDialog
					isOpen={isOpen}
					handleClose={() => setIsOpen(false)}
					title="New Folder"
					subtitle="What should we call this folder?"
					handleSuccessClose={handleSuccessClose}
				>
					<>
						<FormControl className={classes.frmCtrl} fullWidth>
							<InputLabel htmlFor="reset-pass-field">Folder name</InputLabel>
							<Input
								color="primary"
								fullWidth
								type="email"
								placeholder="My Folder"
								required
								onChange={(e) => setName(e.currentTarget.value)}
							></Input>
						</FormControl>
					</>
				</MyDialog>
			</div>
		</Grid>
	);
};

InfoContainer.propTypes = {
	currentFolder: PropTypes.object
};

export default InfoContainer;