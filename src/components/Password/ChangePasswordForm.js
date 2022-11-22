import React, { useRef, useContext } from "react";
import classes from "./ChangePasswordForm.module.css";
import { RiTodoLine } from "react-icons/ri";
import AuthContext from "../../context/auth-context";

const ChangePasswordForm = () => {
	const newPasswordRef = useRef();
	const newPasswordConfirmRef = useRef();
	const AuthCtx = useContext(AuthContext);

	const submitHandler = (e) => {
		e.preventDefault();

		const newPassword = newPasswordRef.current.value;
		const newConfirmPassword = newPasswordConfirmRef.current.value;

		function clearInput() {
			newPasswordRef.current.value = "";
			newPasswordConfirmRef.current.value = "";
		}

		if (newPassword === newConfirmPassword) {
			fetch(
				"https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCng2R_ZvRmT0dtZmg7dgW-Pm65-UjGIHk",
				{
					method: "POST",
					body: JSON.stringify({
						idToken: AuthCtx.token,
						password: newPassword,
						returnSecureToken: false,
					}),
					headers: {
						"Content-Type":
							"application/json",
					},
				}
			).then((res) => {
				alert("Password change successful!😁");
				clearInput();
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
			<section className={classes.password_change}>
				<form
					className={classes.form}
					onSubmit={submitHandler}
				>
					<div className={classes.control}>
						<label htmlFor="new-password">
							New Password
						</label>
						<input
							type="password"
							id="new-password"
							minLength="6"
							ref={newPasswordRef}
						/>
						<label htmlFor="new-password">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirm-password"
							ref={
								newPasswordConfirmRef
							}
						/>
					</div>
					<div className={classes.action}>
						<button>Change Password</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default ChangePasswordForm;
