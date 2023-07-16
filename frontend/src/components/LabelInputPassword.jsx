import React, { useState } from "react";
import PropTypes from "prop-types";
import visible from "../assets/icons/visible.png";
import invisible from "../assets/icons/invisible.png";

function LabelInputPassword({
	htmlFor,
	child,
	classNameDiv,
	id,
	name,
	className,
	placeholder,
	required,
	value,
	handle,
}) {
	const [showPassword, setShowPassword] = useState(false);
	const handleVisible = () => {
		setShowPassword(!showPassword);
	};
	return (
		<>
			<div className={classNameDiv}>
				<label htmlFor={htmlFor}>{child}</label>
				<input
					id={id}
					name={name}
					className={className}
					placeholder={placeholder}
					type={showPassword ? "text" : "password"}
					required={required}
					value={value}
					onChange={handle}
				/>
				<button
					type="button"
					onClick={handleVisible}
					className="button_show__password"
				>
					{!showPassword ? (
						<img
							src={visible}
							alt="visible"
							className="show_password__image__change"
						/>
					) : (
						<img
							src={invisible}
							alt="invisible"
							className="show_password__image__change"
						/>
					)}
				</button>
			</div>
		</>
	);
}
LabelInputPassword.propTypes = {
	htmlFor: PropTypes.string,
	classNameDiv: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.string,
	handle: PropTypes.func,
	child: PropTypes.node,
};
export default LabelInputPassword;
