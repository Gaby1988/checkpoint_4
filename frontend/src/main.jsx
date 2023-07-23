import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./App.scss";
import RegistrationAndConnexion from "./pages/RegistrationAndConnexion";
import { QuantityAndPriceProvider } from "./context/QuantityAndPriceContext";
import Shopping from "./pages/Shopping";
import Basket from "./pages/Basket";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <RegistrationAndConnexion />,
			},
			{
				path: "/achat",
				element: <Shopping />,
			},
			{
				path: "/panier",
				element: <Basket />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QuantityAndPriceProvider>
			<RouterProvider router={router} />
			<ToastContainer />
		</QuantityAndPriceProvider>
	</React.StrictMode>
);
