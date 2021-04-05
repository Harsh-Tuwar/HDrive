import React from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PropTypes from "prop-types";
import { OpenInNew, Share, Edit, Delete, Info } from "@material-ui/icons";

const MyContextMenu = ({ posX, posY, handleClose, handleOpen }) => {
	return (
		<Menu
			keepMounted
			open={posY !== null}
			onEnter={handleOpen}
			onClose={handleClose}
			anchorReference="anchorPosition"
			anchorPosition={
				posY !== null && posX !== null
					? { top: posY, left: posX }
					: undefined
			}
		>
			<MenuItem onClick={handleClose} id="open" style={{width: 225}}>
				<ListItemIcon>
					<OpenInNew fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Open"></ListItemText>
			</MenuItem>
			<MenuItem onClick={handleClose} id="share" style={{width: 225}}>
				<ListItemIcon>
					<Share fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Share"></ListItemText>
			</MenuItem>
			<MenuItem onClick={handleClose} id="rename" style={{width: 225}}>
				<ListItemIcon>
					<Edit fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Rename"></ListItemText>
			</MenuItem>
			<MenuItem onClick={handleClose} id="delete" style={{width: 225}}>
				<ListItemIcon>
					<Delete fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Delete"></ListItemText>
			</MenuItem>
			<MenuItem onClick={handleClose} id="moreinfo" style={{width: 225}}>
				<ListItemIcon>
					<Info fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="More Info"></ListItemText>
			</MenuItem>
		</Menu>
	);
};

MyContextMenu.propTypes = {
	posX: PropTypes.number.isRequired,
	posY: PropTypes.number.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleOpen: PropTypes.func.isRequired
};
 
export default MyContextMenu;