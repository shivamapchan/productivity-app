import React from "react";
import classes from "./ProfileContent.module.css";
import { Link } from "react-router-dom";
import {emailer, tasksTotal, completedTotal} from "../Tasks/TasksPageContent"

function ProfileContent() {

	return (
		<div>
			<h1> Task Management App</h1>
			<container className={classes.profile}>
				<row>
					<div>
						<img
							src ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw0NZAmfBvkzl55ery9JTRKQ&ust=1669925433444000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCNj70JPb1vsCFQAAAAAdAAAAABAE"
							alt="Profile Pic"
						></img>
						<p> Your email is: {emailer} </p>
						<div>
							<Link to="/changepassword">
								Go to Password Management ➡️
							</Link>
						</div>
						<div>
							<h3>
								{" "}
								Your Task Archive:
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
								Number of Tasks Total:
							</h3>
							<h4> {tasksTotal} </h4>
							<h3>
								{" "}
								Number of Completed Tasks:
							</h3>
							<h4> {completedTotal} </h4>
						</div>
					</div>
					<div>
						<div>
							<h3 className="card">
								{" "}
								Achievments List
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
										🙂
									</td>
								</tr>
								<tr>
									<td>
										{" "}
										Complete
										5
										Tasks										
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
										10 
										Tasks
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

