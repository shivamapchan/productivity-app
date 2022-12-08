import * as React from "react";
import {useState, useEffect, useContext} from "react";
import { RiTodoLine } from "react-icons/ri";
import classes from "./TasksPageContent.module.css";
/* importing the firebase config file */
import { db } from "../../firebase-config"; 
/* collection is to reference the collection and addDoc adds data into the db.*/ 
import { collection, addDoc, doc, getDocs, onSnapshot, query, setDoc, getCountFromServer, where } from 'firebase/firestore'; 

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
let output = [];
export {emailer};
export {tasksTotal};
export {completedTotal};
export {output};
function Task({ task, index, completeTask, deleteTask }) {
  return (
      <div
          className="task"
          style={{ textDecoration: task.completed ? "line-through" : "" }}
      >
          {task.title}

          <button style={{ background: "#FF6347" }} onClick={() => deleteTask(index)}>Delete X</button>
          <button style={{ background: "#8FBC8F" }} onClick={() => completeTask(index)}>Complete ✓</button>

      </div>
  );
}


function CreateTask({ addTask }) {
/* value refers to what the user entered as their task e.g. "groceries, study, etc." */
  const [value, setValue] = useState("");
/* Tasks makes the user re-enter their email (only once) to ensure that the email and tasks are properly associated */
  const [email, setEmail] = useState("");
/* numLeft is the number of tasks the user has to complete */
  const [numLeft, setNumLeft] = useState();
/* Tasks has its own collection in the DB, so it is referenced differently: */
  const tasksCollectionRef = collection(db, "tasks");

  /*
   getNumToDo is a counter function that queries the DB.
   It's job is to essentially say 
   "count instances where the useremail in the DB matches 
   the email that was entered on the task page."
   Then the export const tasksTotal is set to the snapshot result
   so it can be used both in other components here and on the
   profile page.
   */
  const getNumToDo = async () => {
    const coll = collection(db, "tasks");
    const query_ = query(coll, where('useremail', '==', emailer));
    const snapshot = await getCountFromServer(query_);
    console.log('count: ', snapshot.data().count);
    setNumLeft(snapshot.data().count);
    tasksTotal = snapshot.data().count + 1;
  }

/* 
- This function will be invoked upon hitting the "Add Task" button.
- It adds the task name and the user's email to the "tasks" collection 
in the db.
*/
  const createTask = async () => {
  await addDoc(tasksCollectionRef, {task: value, useremail: email});
  };

  /*
  This returns all of the tasks associated with the current user's email.
  It also adds each of the current user's tasks docs to an array.
  That array is then parsed for redundant values and the non-redundant
  array is used for the export const.  
   */
  const getTasksArchive = async () => {
    const coll = collection(db, "tasks");
    const query_ = query(coll, where('useremail', '==', emailer));
    const snapshot = await getDocs(query_);
    snapshot.forEach((doc) => {
        taskArchive.push(doc.data());
      //  console.log(doc.data());
    })
    output = [...new Map(taskArchive.map(o => [o.task, o])).values()]
    console.log(taskArchive);
    console.log(output);
};


/* a TON of functions are invoked once the "Add Task" button is hit */
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
          {/* START THE TASKS ARCHIVE */}
          <div className={classes.todoContainer}>
         <div className={classes.bigHeader}> Your Task Archive</div>
         <ul>
        {output.map((item, index) => {
          return <li key={index}>
          <p>{JSON.stringify(item)}</p>
          </li>;
        })}
      </ul>
          </div>
          {/* END TASKS ARCHIVE */}
          </div>
  );
}

export default App;