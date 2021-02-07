import { masterAuth as auth } from "../../firebase";
import { connect } from "react-redux";
import { FilesContainer, FoldersContainer, Greetings} from "./index";
import { Container, makeStyles, CssBaseline } from "@material-ui/core";
import { updateFolder, setChildFolders, setChildFiles } from "../../redux/modules/folder/folderActions";
import { useParams } from "react-router-dom";
import InfoContainer from "./InfoContainer";
import PropTypes from "prop-types";
import React from "react";
import { MyContextMenu } from "../layout";

const useStyles = makeStyles((theme) => ({
	infoContainer: {
		marginTop: theme.spacing(1)
	}
}));

const Dashboard = (props) => {
	const me = auth.currentUser;
	const initialState = { x: null, y: null };
	const [state, setState] = React.useState(initialState);
	const [item, setItem] = React.useState(null);
	const { folderID } = useParams();
	const classes = useStyles();
	const { folder, childFolders, childFiles } = props.folder;

	const handleClose = (e) => {
		setState({ x: null, y: null });
		
		if (item.hasOwnProperty("url")) { // file
			switch (e.currentTarget.id) {
				case "open":
					window.open(item.url, "_blank");
					break;
				
				default: return;
			}
		} else { // folder
			switch (e.currentTarget.id) {
				case "open":
					const s = document.getElementById(`${item.id}`);
					const link = s.firstChild;
					link.click();
					break;
				
				default: return;
			}
		}
	};

	React.useEffect(() => {
		props.updateFolder(folderID);
		props.setChildFolders(folderID, me.uid);
		props.setChildFiles(folderID, me.uid);
	}, [folderID]);

	const handleClick = (event, item) => {
		event.preventDefault();
		setState({
			x: event.clientX - 2,
			y: event.clientY - 4,
		});

		setItem(item);
	};

	return (
		<Container>
			<CssBaseline />
			<Greetings />
			<div className={classes.infoContainer}>
				<InfoContainer currentFolder={folder} />
			</div>
			<br /><br />
			<FoldersContainer childFolders={childFolders} handleClick={handleClick} />
			{childFolders.length > 0 && childFiles.length > 0 && <hr style={{ margin: "40px 0px" }} />}
			<FilesContainer childFiles={childFiles} handleClick={handleClick} />
			{state.x && state.y && <MyContextMenu posX={state.x} posY={state.y} handleClose={handleClose} />}
		</Container>
	);
};

Dashboard.propTypes = {
	folder: PropTypes.object.isRequired,
	updateFolder: PropTypes.func.isRequired,
	setChildFolders: PropTypes.func.isRequired,
	setChildFiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	folder: state.folder
});
 
export default connect(
	mapStateToProps,
	{ updateFolder, setChildFolders, setChildFiles }
)(Dashboard);