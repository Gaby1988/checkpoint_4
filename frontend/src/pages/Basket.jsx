import React, { useEffect, useState } from "react";
import api from "../services/api";

function Basket() {
	const [articleByUser, setArticleByUser] = useState([]);

	useEffect(() => {
		api
			.get("/article/articles-prices-by-user")
			.then((responses) => {
				setArticleByUser(responses.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	console.info(articleByUser);

	return (
		<>
			{articleByUser.map((item, index) => (
				<article className="article_container__basket__page" key={index}>
					<h3 className="article_shopping__h__name">{item.productName}</h3>
					<p className="article_shopping__p__origin">{item.quantity}</p>
					<p className="article_shopping__p__description">{item.totalPrice}</p>
				</article>
			))}
		</>
	);
}
export default Basket;
