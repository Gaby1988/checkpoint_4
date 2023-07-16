import React from "react";
import PropTypes from "prop-types";

function LabelInputEmail({ child, handle, placeholder, email }) {
	return (
		<div className="container_input__email">
			<label htmlFor="email">{child}</label>
			<input
				id="email"
				name="email"
				placeholder={placeholder}
				type="email"
				required
				value={email}
				onChange={handle}
			/>
		</div>
	);
}
LabelInputEmail.propTypes = {
	child: PropTypes.node,
	placeholder: PropTypes.string,
	email: PropTypes.string,
	handle: PropTypes.func,
};
export default LabelInputEmail;
