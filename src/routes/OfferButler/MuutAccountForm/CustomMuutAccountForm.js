import React, { useEffect, useState } from "react";

import {
	MuutAccountBodyContainer,
	MuutAccountFooterContainer,
} from "./commonComponents";
import ColoredInput from "../../../commonComponents/ColoredInput";
import ErrorNotification from "../../../commonComponents/Notification/ErrorNotification";
import Title from "../../../commonComponents/Title";

function CustomMuutAccountForm({
	submitMuutCredentials,
	userData,
	requestChangeAccount,
	cancelChangeAccount,
}) {
	const [muutUsername, setMuutUsername] = useState("");
	const [muutUsernameError, setMuutUsernameError] = useState(
		"username is a required field"
	);
	const [muutPassword, setMuutPassword] = useState("");
	const [muutPasswordError, setMuutPasswordError] = useState(
		"password is a required field"
	);

	const [submitError, setSubmitError] = useState(false);

	useEffect(() => {
		return setSubmitError(false);
	}, [userData, muutPassword, muutUsername]);

	const handleMuutUsernameChange = (event) => {
		const newValue = event.target.value;

		const unacceptableCharactersRegex = /[^a-z0-9\-_]/;

		if (newValue.match(unacceptableCharactersRegex)) {
			setMuutUsernameError(
				"only a-z 0-9 underscore and hyphen characters allowed"
			);
		} else if (newValue === "") {
			setMuutUsernameError("username is a required field");
		} else {
			setMuutUsernameError(false);
		}
		return setMuutUsername(newValue);
	};

	const handleMuutPasswordChange = (event) => {
		const newValue = event.target.value;

		if (newValue.length < 5) {
			setMuutPasswordError("password has a minimum length of 5");
		} else if (newValue === "") {
			setMuutPasswordError("password is a required field");
		} else {
			setMuutPasswordError(false);
		}

		return setMuutPassword(newValue);
	};

	const handleUpdatePost = (event) => {
		event.preventDefault();

		if (!userData) {
			return setSubmitError(
				"You must be logged in to be able to set up offer butler service!"
			);
		}

		if (muutPasswordError || muutUsernameError) {
			return setSubmitError("Invalid password or username!");
		}

		console.log(
			"this is the muut username: " +
				muutUsername +
				". This is the muut password: " +
				muutPassword
		);
		return submitMuutCredentials(muutUsername, muutPassword);
	};

	return (
		<>
			<MuutAccountBodyContainer>
				<Title
					style={{
						backgroundColor: "#fcf0f0",
						fontWeight: "lighter",
					}}
				>
					<span>
						If you want to use a custom account, the account must
						already exist in the forum and please use a{" "}
						<span
							style={{
								fontStyle: "italic",
								fontWeight: "bold",
								color: "#f96c6c",
							}}
						>
							non risky password
						</span>{" "}
						that you do not use elsewhere for the account. This is
						because we have to keep the original form of the
						password in our database in order for Offer Buttler to
						be able to sign in to the forum.
					</span>
				</Title>
				<label htmlFor="muutUsername">Username </label>
				<ColoredInput
					error={muutUsernameError}
					type="text"
					value={muutUsername}
					onChange={handleMuutUsernameChange}
					id="muutUsername"
					style={{ flexGrow: 0 }}
				/>
				{!!muutUsernameError && (
					<ErrorNotification>{muutUsernameError}</ErrorNotification>
				)}
				<label htmlFor="muutPassword">Password </label>
				<ColoredInput
					error={muutPasswordError}
					type="password"
					value={muutPassword}
					onChange={handleMuutPasswordChange}
					id="muutPassword"
					style={{ flexGrow: 0 }}
				/>
				{!!muutPasswordError && (
					<ErrorNotification>{muutPasswordError}</ErrorNotification>
				)}
			</MuutAccountBodyContainer>
			<MuutAccountFooterContainer>
				{requestChangeAccount && (
					<button
						style={{ flexGrow: 1 }}
						onClick={cancelChangeAccount}
					>
						Cancel Change Account
					</button>
				)}
				<button onClick={handleUpdatePost}>Use This Account</button>
				{!!submitError && (
					<ErrorNotification>{submitError}</ErrorNotification>
				)}
			</MuutAccountFooterContainer>
		</>
	);
}

export default CustomMuutAccountForm;
