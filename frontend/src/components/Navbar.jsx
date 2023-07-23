import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QuantityAndPriceContext } from "../context/QuantityAndPriceContext";

function Navbar() {
	const { article } = useContext(QuantityAndPriceContext);
	return (
		<nav className="container_navbar">
			{article.length > 0 && (
				<ul className="list_ul__li__navbar">
					<li className="list_li__name__people">
						{article[0].mail.split("@").slice(0, 1)}
					</li>
					<Link to="/achat">
						<li>Quantité {article[0].totalQuantity}</li>
					</Link>
					<Link to="/panier">
						<li>Prix {article[0].totalPanier} €</li>
					</Link>
				</ul>
			)}
		</nav>
	);
}
export default Navbar;
