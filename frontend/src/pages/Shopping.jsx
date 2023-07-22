import React, { useEffect, useState } from "react";
import api from "../services/api";

function Shopping() {
	const [dataArticleToSend, setDataArticleToSend] = useState([]);
	const [dataItems, setDataItems] = useState([]);
	const [idUser1, setIdUser1] = useState([]);
	const [refresh, setRefresh] = useState([]);
	console.info(idUser1);

	useEffect(() => {
		const promises = [
			api.get("/article/articles-prices"),
			api.get("/article"),
			api.get("/article/items"),
		];
		Promise.all(promises)
			.then((responses) => {
				const data = responses.map((response) => response.data);
				setDataArticleToSend(() => [data[0]]);
				setDataItems(() => [data[2]]);
				setIdUser1(() => [data[1]]);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [refresh]);

	const buyArticleOrUpdate = async (id, quantity, price) => {
		const user1ID = idUser1[0][0].userID;
		const articleExists = dataItems[0].some(
			(item) => item.product_id === id && item.user_id === user1ID
		);
		try {
			setRefresh(dataItems);
			if (!articleExists) {
				const response = await api.post("article", {
					user_id: user1ID,
					product_id: id,
					quantity: quantity,
					total: parseFloat(price),
				});
				console.info(response.data);
				console.info("if");
			} else {
				const response = await api.put(`article/${id}`, {
					quantity: quantity,
					total: parseFloat(price),
				});
				console.info(response.data);
				console.info("else", id);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container_shopping">
			{dataArticleToSend.length > 0 &&
				dataArticleToSend[0].map((item) => (
					<>
						<article className="article_shopping" key={item.id}>
							<img
								className="article_shopping__img__picture"
								src={item.picture}
							/>
							<h3 className="article_shopping__h__name">{item.name}</h3>
							<p className="article_shopping__p__origin">{item.origin}</p>
							<p className="article_shopping__p__description">
								{item.description}
							</p>
							<p className="article_shopping__p__price">{item.price}</p>
							<button
								onClick={() => buyArticleOrUpdate(item.id, 1, item.price)}
								className="article_shopping__button__up"
							>
								➕
							</button>
						</article>
					</>
				))}
		</div>
	);
}
export default Shopping;
