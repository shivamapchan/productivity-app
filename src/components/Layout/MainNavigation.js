import { Link } from "react-router-dom";
import React, { useContext } from "react";

import classes from "./MainNavigation.module.css";
import { CgProfile } from "react-icons/cg";
import AuthContext from "../../context/auth-context";

const MainNavigation = () => {
	const AuthCtx = useContext(AuthContext);
	const isLoggedIn = AuthCtx.isLoggedIn;

	const logoutHandler = () => {
		AuthCtx.logout();
	};

	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>
					Your To-Do Manager
				</div>
			</Link>

			<nav>
				<ul>
					{!isLoggedIn && (
						<li>
							<Link to="/login">
								Login
							</Link>
						</li>
					)}
					{!isLoggedIn && (
						<li>
							<Link to="/signup">
								Sign Up
							</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<CgProfile
								className={
									classes.icon
								}
							></CgProfile>
							<Link to="/profile">
								Profile
							</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<Link to="/taskspage">
								To-Do
							</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<Link to="/logout">
								<button
									onClick={
										logoutHandler
									}
								>
									Logout
								</button>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
