import React from "react";
import { CssBaseline } from "@material-ui/core";
import "./App.css";
import { Provider } from "react-redux";
import AppRoutes from "../components/routes/AppRoutes";
import config from "../redux/store/config";
import * as utils from "../utils";

// Redux store
const store = config();

const App = () => {
	React.useEffect(() => {
		const test = async () => {
			if (
				window.location.pathname != "/reset" &&
				window.location.pathname != "/signup"
			) {
				await utils.checkAuthToken(store);
			}
		};
		
		test();
	}, []);
	
	document.addEventListener("contextmenu", (e) => e.preventDefault());
	return(
		<Provider store={store}>
			<CssBaseline />
			<AppRoutes />
		</Provider>
	);
};

export default App;