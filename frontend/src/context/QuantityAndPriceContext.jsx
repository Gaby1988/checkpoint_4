import React, { createContext, useState, useEffect, useMemo } from "react";
import api from "../services/api";
import PropTypes from "prop-types";

export const QuantityAndPriceContext = createContext();

export function QuantityAndPriceProvider({ children }) {
	const [article, setArticle] = useState([]);
	const [number, setNumber] = useState(0);
	console.info("number", number);
	useEffect(() => {
		api
			.get("/article")
			.then((response) => {
				setArticle(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [number]);

	const contextValueQuantityAndPrice = useMemo(
		() => ({ article, setArticle, number, setNumber }),
		[article, setArticle, number, setNumber]
	);

	return (
		<QuantityAndPriceContext.Provider value={contextValueQuantityAndPrice}>
			{children}
		</QuantityAndPriceContext.Provider>
	);
}
QuantityAndPriceProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
