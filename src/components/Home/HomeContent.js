import classes from "./HomeContent.module.css";
import React from "react";
import { RiTodoLine } from "react-icons/ri";

const HomeContent = () => {
	return (
		<div>
			<div className={classes.icon}>
				<RiTodoLine />
			</div>
			<div>
				<section className={classes.home}>
					<h1>
						Home Page After User
						Successfully Login
					</h1>
				</section>
			</div>
		</div>
	);
};

export default HomeContent;
