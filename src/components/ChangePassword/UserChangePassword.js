import ChangePasswordForm from "./ChangePasswordForm";
import classes from "./UserChangePassword.module.css";
import React from "react";

const UserChangePassword = () => {
	return (
		<section className={classes.password}>
			<ChangePasswordForm />
		</section>
	);
};

export default UserChangePassword;
