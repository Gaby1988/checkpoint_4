import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import coffeeMug from "../assets/icons/coffee-mug.svg";

function Navbar() {
	const [article, setArticle] = useState([]);

	useEffect(() => {
		api
			.get("/article")
			.then((response) => {
				setArticle(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className="container_navbar">
			<ul className="list_ul__li__navbar">
				<li>{article[0].mail.slice(0,5)}</li>
				<li>
					<img className="list_ul__li__img__coffee_mug" src={coffeeMug} />
				</li>
				<li>
					<Link to="/achat">Nombre {article[0].totalQuantity}</Link>
				</li>
				<li>
					<Link to="/panier">Prix {article[0].totalPanier} €</Link>
				</li>
			</ul>
		</div>
	);
}
export default Navbar;
