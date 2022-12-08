import React from "react";
import classes from "./ProfileContent.module.css";
import { Link } from "react-router-dom";
import { RiTodoLine } from "react-icons/ri";
import {emailer, tasksTotal, completedTotal, output} from "../Tasks/TasksPageContent"

function ProfileContent() {

	return (
		<div className={classes.App}>
		   <div className={classes.icon}>
		   <RiTodoLine />
		   </div>
		<div className={classes.todoContainer}>
		   <div className={classes.bigHeader}> Your Account Information </div>
		    <div className={classes.header}> Account Email: {emailer}</div>
		    <div className={classes.header}> 
			<Link to="/changepassword">
			Go to Password Management ➡️
			</Link></div>
		    </div>
			<br></br>
		<div className={classes.todoContainerSub}>
		<div className={classes.bigHeader}> Your Achievements! </div>
		<div className={classes.header}> Number of Tasks Completed: ({completedTotal})</div>
		<div className={classes.header}> Badges: 0/4 </div>
		<div className={classes.header}> First Task Badge: 🙂 </div>
		<div className={classes.header}> 5 Tasks Badge: 👍 </div>
		<div className={classes.header}> 10 Tasks Badge: 🌟 </div>
		<div className={classes.header}> 15 Tasks Badge: 🚀 </div>
		</div>
		<div className={classes.todoContainerSub}>
		<div className={classes.bigHeader}> Task Archive: </div>
		<div className={classes.header}> Number of Tasks Completed: ({completedTotal})</div>
		<ul>
        {output.map(item => {
          return <li key={Math.random()}><p>{JSON.stringify(item)}</p></li>;
        })}
      </ul>
		</div>
		</div>
		 );
		 };


export default ProfileContent;

