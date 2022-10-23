import classes from "./ChangePasswordForm.module.css";
import React from "react";
import { RiTodoLine } from "react-icons/ri";

const ChangePasswordForm = () => {
	return (
		<div>
			<div className={classes.icon}>
				<RiTodoLine />
			</div>
			<form className={classes.form}>
				<div className={classes.control}>
					<label htmlFor="new-password">
						New Password
					</label>
					<input
						type="password"
						id="new-password"
					/>
					<label htmlFor="new-password">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirm-password"
					/>
				</div>
				<div className={classes.action}>
					<button>Change Password</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePasswordForm;
