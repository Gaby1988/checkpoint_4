import React, { useEffect, useState } from "react";
import api from "../services/api";
import garbage from "../assets/icons/garbage.svg";
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
					classContainer="article_container__basket__card"
					classTitle="article_basket__h__name"
					classDescriptionOrQuantity="article_basket__p__quantity"
					classRising="article_basket__p__rising"
					classButton="article_basket__button__delete"
					nameArticle={item.productName}
					descriptionArticleOrQuantity={`Quantité ${item.quantity}`}
					rising={`Prix ${item.totalPrice}`}
					background="article_basket__div__background"
					handleClick={() => handleDelete(item.productsID)}
				>
					<img className="article_basket__img__garbage" src={garbage} alt="garbage" />
				</ContainerArticleSendAndBuy>
			))}
		</div>
	);
}
export default Basket;
