import classes from "./LogoutContent.module.css";
import React from "react";
import { RiTodoLine } from "react-icons/ri";

const LogoutContent = () => {
	return (
		<div>
			<div className={classes.icon}>
				<RiTodoLine />
			</div>
			<div>
				<section className={classes.logout}>
					<h2>
						Thank You For Visiting | Your
						To-Do Manager...
					</h2>
				</section>
			</div>
		</div>
	);
};

export default LogoutContent;
