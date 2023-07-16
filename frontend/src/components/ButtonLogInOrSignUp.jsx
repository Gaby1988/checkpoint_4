import React from "react";
import PropTypes from "prop-types";

function ButtonLogInOrSignUp({ child, handleClick, active }) {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={active ? "registration_sign__up" : "registration_log__in"}
		>
			<h2>{child}</h2>
		</button>
	);
}
ButtonLogInOrSignUp.propTypes = {
	child: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
};
export default ButtonLogInOrSignUp;
