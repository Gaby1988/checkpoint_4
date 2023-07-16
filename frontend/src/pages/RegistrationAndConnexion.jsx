import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import LabelInputPassword from "../components/LabelInputPassword";
import LabelInputEmail from "../components/LabelInputEmail";
import ButtonLogInOrSignUp from "../components/ButtonLogInOrSignUp";

function RegistrationAndConnexion() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSignUpActive, setIsSignUpActive] = useState(true);

	const handleClickChangeLogIn = () => {
		setIsSignUpActive(false);
	};
	const handleClickChangeSignUp = () => {
		setIsSignUpActive(true);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const body = { email, password };
		if (password === confirmPassword) {
			try {
				await api.post("/registration", body);
				toast.success("Utilisateur enregistré");
			} catch (error) {
				toast.error(error.response.data.message);
			}
		} else {
			toast.error("Les deux mots de passe doivent être les mêmes");
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
		case "email":
			setEmail(value);
			break;
		case "password":
			setPassword(value);
			break;
		default:
		}
	};

	const handleSubmitConfirm = async (event) => {
		event.preventDefault();
		const body = { email, password };
		try {
			const response = await api.post("/connexion", body);
			const token = response.data;
			localStorage.setItem("token", token);
			// setIsLoggedIn(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="registration_page__container">
			<div className="container_button__sign_up__log__in">
				<ButtonLogInOrSignUp
					child="Inscription"
					handleClick={handleClickChangeSignUp}
					active={isSignUpActive}
				/>
				<ButtonLogInOrSignUp
					child="Déja inscrit"
					handleClick={handleClickChangeLogIn}
					active={!isSignUpActive}
				/>
			</div>
			{isSignUpActive && (
				<form className="registration_form" onSubmit={(e) => handleSubmit(e)}>
					<>
						<LabelInputEmail
							child="email"
							placeholder="exemple@gmail.com"
							handle={(e) => setEmail(e.target.value)}
						/>
						<LabelInputPassword
							htmlFor="password"
							classNameDiv="registration_div__label__password"
							child="Mot de passe"
							id="password"
							name="password"
							className="registration_label__input__password"
							placeholder="**********"
							required={true}
							value={password}
							handle={(e) => setPassword(e.target.value)}
						/>
						<LabelInputPassword
							htmlFor="confirmPassword"
							classNameDiv="registration_div__label__password__confirm"
							child="Confirmer votre mot de passe"
							id="confirmPassword"
							name="confirmPassword"
							className="registration_label__input__password__confirm"
							placeholder="**********"
							required={true}
							value={confirmPassword}
							handle={(e) => setConfirmPassword(e.target.value)}
						/>
						<button className="registration_button__submit" type="submit">
							Inscription
						</button>
					</>
				</form>
			)}
			{!isSignUpActive && (
				<form
					className="registration_form__connexion"
					onSubmit={handleSubmitConfirm}
				>
					<>
						<LabelInputEmail child="email" placeholder="exemple@gmail.com" />
						<LabelInputPassword
							htmlFor="password"
							classNameDiv="registration_div__label__password"
							child="Mot de passe"
							id="password"
							name="password"
							className="registration_label__input__password"
							placeholder="**********"
							required={true}
							value={password}
							handle={(e) => handleInputChange(e.target.value)}
						/>
						<button
							className="registration_button__submit__connexion"
							type="submit"
						>
							Connexion
						</button>
						<p className="registration_password__forget">
							Mot de passe oublié ?
						</p>
					</>
				</form>
			)}
		</div>
	);
}
export default RegistrationAndConnexion;
