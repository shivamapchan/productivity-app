import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SignUpForm.module.css";
import { RiTodoLine } from "react-icons/ri";

const SignUpFormContent = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const signUpHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailRef.current.value;
		const enteredPassword = passwordRef.current.value;
		const enterPasswordConfirm = passwordConfirmRef.current.value;

		function clearInput() {
			emailRef.current.value = "";
			passwordRef.current.value = "";
			passwordConfirmRef.current.value = "";
		}

		if (enteredPassword === enterPasswordConfirm) {
			fetch(
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCng2R_ZvRmT0dtZmg7dgW-Pm65-UjGIHk",
				{
					method: "POST",
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPassword,
						returnSecureToken: true,
					}),
					headers: {
						"Content-Type":
							"application/json",
					},
				}
			).then((res) => {
				if (res.ok) {
					alert("Sign Up Successful!");
					clearInput();
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
						alert(errorMessage);
					});
				}
			});
		} else {
			alert("Passwords do not match");
		}
	};

	return (
		<div>
			<div className={classes.icon}>
				<RiTodoLine />
			</div>
			<section className={classes.signup}>
				<h2>Sign-Up</h2>
				<form onSubmit={signUpHandler}>
					<div className={classes.control}>
						<label htmlFor="email">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							placeholder="Email"
							required
							ref={emailRef}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Passward"
							required
							ref={passwordRef}
						/>
					</div>

					<div className={classes.control}>
						<label htmlFor="password">
							Password Confirmation
						</label>
						<input
							type="password"
							id="password"
							placeholder="Re-enter passward"
							required
							ref={passwordConfirmRef}
						/>
					</div>

					<div className={classes.actions}>
						<button
							className={
								classes.login_button
							}
						>
							{"Create Account"}
						</button>
						<Link to="/login">
							<button
								type="button"
								className={
									classes.toggle
								}
							>
								{
									"Login with existing account"
								}
							</button>
						</Link>
					</div>
				</form>
			</section>
		</div>
	);
};

export default SignUpFormContent;
