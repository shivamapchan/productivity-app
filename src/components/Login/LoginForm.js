import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { RiTodoLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/auth-context";

const LoginForm = () => {
	const history = useHistory();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const loginContext = useContext(AuthContext);

	const signInHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCng2R_ZvRmT0dtZmg7dgW-Pm65-UjGIHk",
			{
				method: "POST",
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((data) => {
						let errorMessage =
							"Authentication failed";
						if (
							data &&
							data.error &&
							data.error.message
						) {
							errorMessage =
								data.error
									.message;
						}

						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				loginContext.login(data.idToken);
				history.replace("/taskspage");
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	return (
		<div>
			<div className={classes.icon}>
				<RiTodoLine />
			</div>
			<section className={classes.login}>
				<h2>Login</h2>
				<form onSubmit={signInHandler}>
					<div className={classes.control}>
						<label htmlFor="email">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							ref={emailInputRef}
							placeholder="Your Email"
							required
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							ref={passwordInputRef}
							placeholder="Your passward"
							required
						/>
					</div>
					
					<div className={classes.actions}>
						<button
							className={
								classes.login_button
							}
						>
							{"Login"}
						</button>
						<Link to="/signup">
							<button
								type="button"
								className={
									classes.toggle
								}
							>
								{
									"Sign up a new account?"
								}
							</button>
						</Link>
					</div>
				</form>
			</section>
		</div>
	);
};

export default LoginForm;
