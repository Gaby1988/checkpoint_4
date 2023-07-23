import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import garbage from "../assets/icons/garbage.svg";
import ContainerArticleSendAndBuy from "../components/ContainerArticleSendAndBuy";
import { QuantityAndPriceContext } from "../context/QuantityAndPriceContext";

function Basket() {
	const { number, setNumber } = useContext(QuantityAndPriceContext);
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
	}, [number]);
	console.info(articleByUser);
	console.info("number", number);

	const handleDelete = (id) => {
		api
			.delete(`article/${id}`)
			.then((response) => console.info(response.data))
			.catch((error) => console.error(error));
		setNumber((prev) => (prev += 1));
	};

	return (
		<div className="container_basket">
			{articleByUser.map((item) => (
				<ContainerArticleSendAndBuy
					key={item.itemID}
					classContainer="article_container__basket__card"
					classTitle="article_basket__h__name"
					classDescriptionOrQuantity="article_basket__p__quantity"
					classRising="article_basket__p__rising"
					classButton="article_basket__button__delete"
					nameArticle={item.productName}
					descriptionArticleOrQuantity={`Quantité ${item.quantity}`}
					rising={`Prix ${item.totalPrice}`}
					background="article_basket__div__background"
					handleClick={() => handleDelete(item.itemID)}
				>
					<img
						className="article_basket__img__garbage"
						src={garbage}
						alt="garbage"
					/>
				</ContainerArticleSendAndBuy>
			))}
		</div>
	);
}
export default Basket;
