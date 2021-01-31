import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs } from "@material-ui/core";
import { Link } from "react-router-dom";

const MyBreadCrumbs = ({ currentFolder }) => {
	const handleClick = () => {
		console.log("hasd");
	};

	const rootFolder = { id: "root_folder", name: "Root", path: [] };
	const route = (!currentFolder?.name) ? "/" : `/dash/folder/${currentFolder.id}`;
	const name = currentFolder?.name ?? "Root"; 
	let path = currentFolder === rootFolder ? [] : [];
	
	if (currentFolder) path = [...path, ...currentFolder.path];

	return (
		<Breadcrumbs aria-label="breadcrumb" separator="/" maxItems={5}>
			{path.map((folder, index) => {
				return <Link
					key={index}
					to={`/dash/folder/${folder.id}`}
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

MyBreadCrumbs.propTypes = {
	currentFolder: PropTypes.object
};
 
export default MyBreadCrumbs;