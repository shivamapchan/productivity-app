import { Link } from "react-router-dom";
import React from "react";

import classes from "./MainNavigation.module.css";
import { CgProfile } from "react-icons/cg";

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>Home</div>
			</Link>

			<nav>
				<ul>
					<li>
						<Link to="/auth">Login</Link>
					</li>
					<li>
						<CgProfile
							className={classes.icon}
						></CgProfile>
						<Link to="/profile">
							Profile
						</Link>
					</li>
					<li>
						<Link to="/">
							<button>Logout</button>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
