import classes from "./StartingPageContent.module.css";
import React from "react";
import { RiTodoLine } from "react-icons/ri";

const StartingPageContent = () => {
	return (
		<div>
			<div className={classes.icon}>
				<RiTodoLine />
			</div>
			<div>
				<section className={classes.starting}>
					<h1 className={classes.heading}>
						<span
							className={
								classes.heading_primary
							}
						>
							Welcome to Your |
						</span>
						<span
							className={
								classes.heading_secondary
							}
						>
							To-Do Manager
						</span>
					</h1>
				</section>
			</div>
		</div>
	);
};

export default StartingPageContent;
