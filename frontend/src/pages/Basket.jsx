import React, { useEffect, useState } from "react";
import api from "../services/api";
import ContainerArticleSendAndBuy from "../components/ContainerArticleSendAndBuy";

function Basket() {
	const [articleByUser, setArticleByUser] = useState([]);
	const [refresh, setRefresh] = useState("");

	useEffect(() => {
		api
			.get("/article/articles-prices-by-user")
			.then((responses) => {
				setArticleByUser(responses.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [refresh]);
	console.info(articleByUser);

	const handleDelete = (id) => {
		api
			.delete(`article/${id}`)
			.then((response) => console.info(response.data))
			.catch((error) => console.error(error));
		setRefresh(id);
		console.info(id);
	};

	return (
		<div className="container_basket">
			{articleByUser.map((item) => (
				<ContainerArticleSendAndBuy
					key={item.productsID}
					classContainer="article_container__basket__page"
					classTitle="article_basket__h__name"
					classDescriptionOrQuantity="article_basket__p__quantity"
					classRising="article_basket__p__rising"
					classButton="article_basket__button__delete"
					nameArticle={item.productName}
					descriptionArticleOrQuantity={item.quantity}
					rising={item.totalPrice}
					handleClick={() => handleDelete(item.productsID)}
				>
					➖
				</ContainerArticleSendAndBuy>
			))}
		</div>
	);
}
export default Basket;
