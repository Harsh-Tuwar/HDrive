import React from "react";
import { Grid, Button, makeStyles, FormControl, Input, InputLabel } from "@material-ui/core";
import { Add, CloudUpload } from "@material-ui/icons";
import { database, auth, storage } from "../../firebase";
import { MyBreadCrumbs } from "./index";
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
	},
	input: {
		display: "none",
	},
}));

const InfoContainer = ({ currentFolder }) => {
	const classes = useStyles();
	const [isOpen, setIsOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const { currentUser } = auth;

	const handleUpload = (e) => {
		const file = e.target.files[0];
		
		console.log("asdasd", currentFolder);		
		
		if (!currentFolder || !file) return;

		const parentPath = currentFolder.path.length > 0 ? `${Object.values(currentFolder.path).map(({ id }) => id).join("/")}` : "";
		const filePath = [parentPath, currentFolder.id, file.name].join("/");

		const uploadTask = storage
			.ref(`/files/${currentUser.uid}/${filePath}`)
			.put(file);
		
		uploadTask.on("state_chaned", snapshot => {

		}, () => {
				
		}, () => {
			uploadTask
				.snapshot
				.ref
				.getDownloadURL()
				.then(url => {
					database.files.add({
						url,
						name: file.name,
						createdAt: database.getCurrentTimeStamp(),
						folderID: currentFolder.id,
						userID: currentUser.uid
					});
				});
		});
	};

	const handleSuccessClose = () => {
		const path = (currentFolder?.path) ? [...currentFolder.path] : [];

		if (currentFolder.id !== "folder_root") {
			path.push({
				name: currentFolder.name,
				id: currentFolder.id
			});
		}

		if (name.length && currentFolder) {
			database.folders.add({
				name: name,
				parentID: currentFolder.id,
				userID: currentUser.uid,
				path,
				createdAt: database.getCurrentTimeStamp()
			});
		}

		setIsOpen(false);
		setName("");
	};

	return (
		<Grid container direction="row" alignItems="center">
			<div className={classes.breadcrumb}>
				<MyBreadCrumbs currentFolder={currentFolder} />
			</div>
			<div className={classes.btnContainer}>
				<input
					accept="image/*"
					className={classes.input}
					id="contained-button-file"
					type="file"
					onChange={handleUpload}
				/>
				<label htmlFor="contained-button-file">
					<Button
						variant="outlined"
						color="default"
						component="span"
						className={classes.button}
						startIcon={<CloudUpload />}
					>
						Upload
        			</Button>
				</label>
				{/* <Button
					type="file"
					variant="outlined"
					color="default"
					className={classes.button}
					startIcon={<CloudUpload />}
					onChange={handleUpload}
				>
					Upload
				</Button> */}
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