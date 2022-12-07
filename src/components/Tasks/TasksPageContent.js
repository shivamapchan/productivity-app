import * as React from "react";
import {useState, useEffect, useContext} from "react";
import { RiTodoLine } from "react-icons/ri";
import classes from "./TasksPageContent.module.css";
/* importing the firebase config file */
import { db } from "../../firebase-config"; 
/* collection is to reference the collection and addDoc adds data into the db.*/ 
import { collection, addDoc, doc, getDocs, updateDoc, query, setDoc, getCountFromServer, where } from 'firebase/firestore'; 

/*
DB To-do:
1. The first thing to do is to add each task value to the database's "tasks" collection.
2. Figure out how to capture the current user's email.
3. After collecting the email, add the email and task to each document so that they are associated.
https://react-query-firebase.invertase.dev/firestore/querying-collections
*/

let emailer = "";
let tasksTotal = 0;
let completedTotal = 0;
let taskArchive = [];
export {emailer};
export {tasksTotal};
export {completedTotal};
export {taskArchive};
function Task({ task, index, completeTask, deleteTask }) {
  return (
      <div
          className="task"
          style={{ textDecoration: task.completed ? "line-through" : "" }}
      >
          {task.title}

          {/*
          IMPORTANT: When ready, create a useState variable for indexing
          <text>     (task index = {index})</text>
          */}
          

          <button style={{ background: "#FF6347" }} onClick={() => deleteTask(index)}>Delete X</button>
          <button style={{ background: "#8FBC8F" }} onClick={() => completeTask(index)}>Complete ✓</button>

      </div>
  );
}

function DbTask({ task, index, completeTask, deleteTask }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}
  
            {/*
            IMPORTANT: When ready, create a useState variable for indexing
            <text>     (task index = {index})</text>
            */}
            
  
            <button style={{ background: "#FF6347" }} onClick={() => deleteTask(index)}>Delete X</button>
            <button style={{ background: "#8FBC8F" }} onClick={() => completeTask(index)}>Complete ✓</button>
  
        </div>
    );
  }

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [numLeft, setNumLeft] = useState();
/* Tasks has its own collection in the DB, so it is referenced differently: */
  const tasksCollectionRef = collection(db, "tasks");

  const getNumToDo = async () => {
    const coll = collection(db, "tasks");
    const query_ = query(coll, where('useremail', '==', emailer));
    const snapshot = await getCountFromServer(query_);
    console.log('count: ', snapshot.data().count);
    setNumLeft(snapshot.data().count);
    tasksTotal = snapshot.data().count;
  }

/* 
- This function will be invoked upon hitting the "Add Task" button.
- Currently, it only adds the task's value (e.g. "grocery shopping") to the db.
*/
  const createTask = async () => {
  await addDoc(tasksCollectionRef, {task: value, useremail: email});
  };

  const getTasksArchive = async () => {
    const coll = collection(db, "tasks");
    const query_ = query(coll, where('useremail', '==', emailer));
    const snapshot = await getDocs(query_);
    snapshot.forEach((doc) => {
        taskArchive.push(doc.data());
      //  console.log(doc.data());
    })
    console.log(taskArchive);
};

  const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTask(value);
      setValue("");
      createTask();
      emailSetter();
      tasksSetter();
      getNumToDo();
      getTasksArchive();
      tasksTotal = numLeft;
  };

   const emailSetter = () => {
    emailer = email;
   };
    
   const tasksSetter = () => {
    tasksTotal = numLeft;
   };


  return (
      <form onSubmit={handleSubmit}>
      <p>{tasksTotal}</p>
       <label>
			*You Must Confirm Your Email Address*
			</label>
            <br></br>
			<input
			type="email"
			id="email"
			placeholder="Email"
           /* 
			This means that when the text changes, the useState variable
			email is set to the text field value. 
			*/
			onChange={(event)=>{setEmail(event.target.value)}}
			/>
          <input
              type="text"
              className="input"
              /* The text box for entering tasks is disabled if the email hasn't been entered */
              disabled={!email} 
              value={value}
              placeholder="Add a new task..."
              onChange={e => setValue(e.target.value)}
          />
          <button className={classes.addButton} onClick={handleSubmit}>Add Task</button>
      </form>
  );
}

function App() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasksDone, setTasksDone] = useState(0);
  const [tasks, setTasks] = useState([]);


  useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) });
  useEffect(() => { setTasksDone(tasks.filter(task => task.completed).length) });

  const addTask = title => {
      const newTasks = [...tasks, { title, completed: false }];
      setTasks(newTasks);
  };


  const completeTask = index => {
      const newTasks = [...tasks];
      newTasks[index].completed = true;
      setTasks(newTasks);
      completedTotal++;
      tasksTotal--;
  };
  

  const deleteTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    tasksTotal--;
};
 
  

  return (
         <div className={classes.App}>
         <div className={classes.icon}>
         <RiTodoLine />
         </div>
         <div className={classes.todoContainer}>
         <div className={classes.bigHeader}> To-Do List Session</div>
          <div className={classes.header}> The email you entered: {emailer}</div>
          <div className={classes.header}> Number of Tasks Left to Complete: ({tasksRemaining})</div>
          <div className={classes.header}> Number of Tasks Completed: ({completedTotal})</div>
          <div className={classes.task}>
              {tasks.map((task, index) => (
                  <Task
                  task={task}
                  index={index}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                  key={index}
                  />
              ))}
          </div>
          <div className="create-task" >
              <CreateTask addTask={addTask} />
          </div>
          </div>
          {/* MAYBE A BAD IDEA */}
          <div className={classes.todoContainer}>
         <div className={classes.bigHeader}> Your Task Archive</div>
         <ul>
        {taskArchive.map(item => {
          return <li key={Math.random()}><p>{JSON.stringify(item)}</p><button>Delete</button></li>;
        })}
      </ul>
          <div className={classes.header}> Number of Tasks Left to Complete: ({tasksTotal})</div>
          <div className={classes.header}> Number of Tasks Completed: ({completedTotal})</div>
          <div className={classes.task}>
              {tasks.map((task, index) => (
                  <DbTask
                  task={task}
                  index={index}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                  key={task}
                  />
              ))}
          </div>
          </div>
          {/* END BAD IDEA */}
          </div>
  );
}

export default App;