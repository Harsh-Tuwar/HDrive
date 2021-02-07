import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MyBreadCrumbs = ({ currentFolder, project }) => {
	const handleClick = () => {
		return;
	};

	const rootFolder = { id: "root_folder", name: "Root", path: [] };
	const route = (!currentFolder?.name) ? "/" : `drives/${project.currentProject}/dash/${currentFolder.id}`;
	const name = currentFolder?.name ?? "Root"; 
	let path = currentFolder === rootFolder ? [] : [];
	
	if (currentFolder) path = [...path, ...currentFolder.path];

	return (
		<Breadcrumbs aria-label="breadcrumb" separator="/" maxItems={5}>
			{path.map((folder, index) => {
				return <Link
					key={index}
					to={`drives/0/dash/${folder.id}`}
					onClick={handleClick}
					aria-current="page"
				>
					{folder.name}
				</Link>;
			})}
			{currentFolder && (
				<Link
					to={route}
					onClick={handleClick}
					aria-current="page"
				>
					{name}
				</Link>
			)}
		</Breadcrumbs>
	);
};

const mapStateToProps = state => ({
	project: state.project
});

MyBreadCrumbs.propTypes = {
	currentFolder: PropTypes.object,
	project: PropTypes.object.isRequired
};
 
export default connect(
	mapStateToProps
)(MyBreadCrumbs);