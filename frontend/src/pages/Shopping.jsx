import React, { useEffect, useState } from "react";
import api from "../services/api";

function Shopping() {
	const [dataArticleToSend, setDataArticleToSend] = useState([]);
	const [idUser, setIdUser] = useState([]);
	console.info(idUser);

	useEffect(() => {
		const promises = [api.get("/article/articles-prices"), api.get("/article")];
		Promise.all(promises)
			.then((responses) => {
				const data = responses.map((response) => response.data);
				setDataArticleToSend(data);
				setIdUser(data[1].map((item) => item.userID));
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	console.info(dataArticleToSend);
	const buyArticleUpdate = (id, quantity, price) => {
		api
			.put(`article/${id}`, {
				quantity: quantity,
				total: parseFloat(price),
			})
			.then((response) => {
				console.info(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<div className="container_shopping">
			{dataArticleToSend.length > 0 &&
				dataArticleToSend[0].map((item) => (
					<>
						<article className="article_shopping" key={item.id}>
							<img className="article_shopping__img__picture" src={item.picture} />
							<h3 className="article_shopping__h__name">{item.name}</h3>
							<p className="article_shopping__p__origin">{item.origin}</p>
							<p className="article_shopping__p__description">
								{item.description}
							</p>
							<p className="article_shopping__p__price">{item.price}</p>
							<button
								onClick={() => buyArticleUpdate(idUser, 1, item.price)}
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

// const buyArticle = (quantity, price) => {
// 	api
// 		.post("/article", {
// 			quantity: quantity,
// 			total: parseFloat(price),
// 		})
// 		.then((response) => {
// 			console.info(response.data);
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };
