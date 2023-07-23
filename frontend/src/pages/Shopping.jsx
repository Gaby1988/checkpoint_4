import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import ContainerArticleSendAndBuy from "../components/ContainerArticleSendAndBuy";
import { QuantityAndPriceContext } from "../context/QuantityAndPriceContext";

function Shopping() {
	const { setNumber } = useContext(QuantityAndPriceContext);
	const [dataArticleToSend, setDataArticleToSend] = useState([]);
	const [dataItems, setDataItems] = useState([]);
	const [idUser1, setIdUser1] = useState([]);
	const [refresh, setRefresh] = useState([]);
	console.info(dataArticleToSend);

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
		setNumber((prev) => prev + 1);
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
				console.info("if", id);
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
					<ContainerArticleSendAndBuy
						key={item.produitID}
						classContainer="article_shopping"
						classPicture="article_shopping__img__picture"
						classTitle="article_shopping__h__name"
						classOrigin="article_shopping__p__origin"
						classDescriptionOrQuantity="article_shopping__p__description"
						classRising="article_shopping__p__price"
						classButton="article_shopping__button__up"
						picture={item.picture}
						nameArticle={item.name}
						originArticle={item.origin}
						descriptionArticleOrQuantity={item.description}
						rising={item.price}
						background="article_shopping__div__background"
						handleClick={() =>
							buyArticleOrUpdate(item.produitID, 1, item.price)
						}
					>
						➕
					</ContainerArticleSendAndBuy>
				))}
		</div>
	);
}
export default Shopping;
