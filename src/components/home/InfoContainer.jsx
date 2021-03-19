import { Add, CloudUpload, Close } from "@material-ui/icons";
import { AlertTitle, Alert } from "@material-ui/lab";
import { Grid, Button, makeStyles, FormControl, Input, InputLabel, LinearProgress, IconButton } from "@material-ui/core";
import { masterAuth as auth } from "../../firebase";
import { MyBreadCrumbs } from "./index";
import { MyDialog } from "../misc";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { getCurrentInstances } from "../../utils";

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

const InfoContainer = ({ currentFolder, project }) => {
	const classes = useStyles();
	const [uploadingFiles, setUploadingFiles] = React.useState([]);
	const [isOpen, setIsOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const { currentUser } = auth;
	const { storage, database } = getCurrentInstances(project.currentProject);

	const handleUpload = (e) => {
		const file = e.target.files[0];

		if (!currentFolder || !file) {
			console.log("No File");
			return;
		}

		const id = v4();

		setUploadingFiles(prevUploadingFiles => [
			...prevUploadingFiles,
			{ id, name: file.name, progress: 0, error: false }
		]);

		const parentPath = currentFolder.path.length > 0 ? `${Object.values(currentFolder.path).map(({ id }) => id).join("/")}` : "";
		const filePath = [parentPath, currentFolder.id, file.name].join("/");

		const uploadTask = storage
			.ref(`/files/${currentUser.uid}/${filePath}`)
			.put(file);
		
		uploadTask.on("state_chaned", snapshot => {
			const progress = snapshot.bytesTransferred / snapshot.totalBytes;

			setUploadingFiles(prevUploadingFiles => {
				return prevUploadingFiles.map(uploadFile => {
					if (uploadFile.id === id) {
						return { ...uploadFile, progress: progress };
					}

					return uploadFile;
				});
			});
		}, () => {
			setUploadingFiles(prevUploadingFiles => {
				return prevUploadingFiles.map(uploadFile => {
					if (uploadFile.id === id) {
						return { ...uploadFile, error: true };
					}

					return uploadFile;
				});
			});
		}, () => {
			setUploadingFiles(prevUploadingFiles => {
				return prevUploadingFiles.filter((uploadFile) => uploadFile.id !== id);
			});

			uploadTask
				.snapshot
				.ref
				.getDownloadURL()
				.then(url => {
					database.files
						.where("name", "==", file.name)
						.where("userID", "==", currentUser.uid)
						.where("folderID", "==", currentFolder.id)
						.get()
						.then(existingFile => {
							const extFile = existingFile.docs[0];

							if (extFile) {
								extFile.ref.update({ url: url });
							} else {
								database.files.add({
									url,
									name: file.name,
									createdAt: database.getCurrentTimeStamp(),
									folderID: currentFolder.id,
									userID: currentUser.uid
								});
							}
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
		<>
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
			{uploadingFiles.length > 0 && 
				ReactDOM.createPortal(
					<div style={{
						position: "absolute",
						bottom: 20,
						padding: "0 24px",
						right: "0"
					}}>
						{
							uploadingFiles.map((file) => {
								return (
									<Alert
										key={file.id}
										severity={file.error ? "error" : "info"}
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
												onClick={() => {
													setUploadingFiles(prevUploadingFiles => {
														return prevUploadingFiles.filter((uploadFile) => uploadFile.id !== file.id);
													});
												}}
											>
												<Close fontSize="inherit" />
											</IconButton>
										}
									>
										<AlertTitle>Uploading {file.name}</AlertTitle>
										<LinearProgress
											style={{margin: "20px 0"}}
											color={file.error ? "secondary" : "primary"}
											value={file.error ? 100 : Math.round(file.progress * 100)}
											variant="determinate"
										/>
									</Alert>
								);
							})
						}
					</div>,
					document.body
				)
			}
		</>
	);
};

const mapStateToProps = state => ({
	project: state.project
});

InfoContainer.propTypes = {
	currentFolder: PropTypes.object,
	project: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps
)(InfoContainer);