import React from "react";
import PropTypes from "prop-types";

function ContainerArticleSendAndBuy({
	picture,
	nameArticle,
	originArticle,
	descriptionArticleOrQuantity,
	rising,
	handleClick,
	classContainer,
	classPicture,
	classTitle,
	classOrigin,
	classDescriptionOrQuantity,
	classRising,
	classButton,
	background,
	children,
}) {
	return (
		<article className={classContainer}>
			<img className={classPicture} src={picture} />
			<h3 className={classTitle}>{nameArticle}</h3>
			<p className={classOrigin}>{originArticle}</p>
			<p className={classDescriptionOrQuantity}>
				{descriptionArticleOrQuantity}
			</p>
			<p className={classRising}>{rising} €</p>
			<button onClick={handleClick} className={classButton}>
				{children}
			</button>
			<div className={background} />
		</article>
	);
}
ContainerArticleSendAndBuy.propTypes = {
	picture: PropTypes.string,
	nameArticle: PropTypes.string.isRequired,
	originArticle: PropTypes.string,
	descriptionArticleOrQuantity: PropTypes.node.isRequired,
	rising: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
	classContainer: PropTypes.string,
	classPicture: PropTypes.string,
	classTitle: PropTypes.string,
	classOrigin: PropTypes.string,
	classDescriptionOrQuantity: PropTypes.string,
	classRising: PropTypes.string,
	classButton: PropTypes.string,
	background: PropTypes.string,
	children: PropTypes.node.isRequired,
};
export default ContainerArticleSendAndBuy;
