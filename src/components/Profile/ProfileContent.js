import React from "react";
import classes from "./ProfileContent.module.css";
import { Link } from "react-router-dom";

function ProfileContent() {
	return (
		<div>
			<h1> Task Management App</h1>
			<container className={classes.profile}>
				<row>
					<div>
						<img
							src="C:\Users\owner\Pictures\Saved Pictures\822711_user_512x512.png"
							alt=""
						></img>
						<p> Username </p>
						<div>
							<Link to="/changepassword">
								Change Password
								?
							</Link>
						</div>
						<div>
							<h3>
								{" "}
								Task To Do List
							</h3>
							<ol>
								<li>Task 1 </li>
								<li>Task 2 </li>
								<li>Task 3 </li>
								<li>Task 4 </li>
							</ol>
							<br></br>
							<h3>
								{" "}
								Task Completed
								this week
							</h3>
							<h4> 0 </h4>
						</div>
					</div>
					<div>
						<div>
							<h3 className="card">
								{" "}
								Achievment List
							</h3>
							<table>
								<tr>
									<td>
										{" "}
										Complete
										your
										first
										task
									</td>
									<td>
										{" "}
										Incomplete
									</td>
								</tr>
								<tr>
									<td>
										{" "}
										Complete
										all
										of
										your
										tasks
										in
										one
										week
									</td>
									<td>
										{" "}
										Incomplete
									</td>
								</tr>
								<tr>
									<td>
										{" "}
										Don't
										skip
										any
										tasks
										in
										one
										week
									</td>
									<td>
										{" "}
										Incomplete
									</td>
								</tr>
							</table>
						</div>
						<h3 className="card">Badges</h3>
						<h5>Achievement Badge</h5>
						<h6> Insert badge</h6>
						<h5>Active Badge</h5>
						<h6> Insert badge</h6>
						<h5>Follow Through Badge</h5>
						<h6> Insert badge</h6>
						<h5>Refer a friend</h5>
						<h6> Insert badge</h6>
					</div>
				</row>
			</container>
		</div>
	);
}

export default ProfileContent;

