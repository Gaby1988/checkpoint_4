import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

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
	console.info(article);
	return (
		<nav className="container_navbar">
			{article.length > 0 && (
				<ul className="list_ul__li__navbar">
					<li className="list_li__name__people">{article[0].mail.split("@").slice(0, 1)}</li>
					<li>
						<Link to="/achat">Quantité {article[0].totalQuantity}</Link>
					</li>
					<li>
						<Link to="/panier">Prix {article[0].totalPanier} €</Link>
					</li>
				</ul>
			)}
		</nav>
	);
}
export default Navbar;
