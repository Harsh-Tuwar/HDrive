import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

const MyDialog = ({
	isOpen,
	handleClose,
	handleSuccessClose,
	title,
	subtitle,
	children
}) => {
	return (
		<Dialog
			fullWidth
			maxWidth="md"
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{subtitle}</DialogContentText>
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">Close</Button>
				<Button variant="contained" onClick={handleSuccessClose} color="primary">Save</Button>
			</DialogActions>
		</Dialog>
	);
};

MyDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleSuccessClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	children: PropTypes.element.isRequired
};
 
export default MyDialog;