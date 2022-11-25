
import * as React from "react";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { RiTodoLine } from "react-icons/ri";
import classes from "./TasksPageContent.module.css";
/* importing the firebase config file */
import { db } from "../../firebase-config"; 
/* collection is to reference the collection and addDoc adds data into the db.*/ 
import { collection, addDoc } from 'firebase/firestore'; 


/*
DB To-do:
1. The first thing to do is to add each task value to the database's "tasks" collection.
2. Figure out how to capture the current user's email.
3. After collecting the email, add the email and task to each document so that they are associated.
*/

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

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");
/* Tasks has its own collection in the DB, so it is referenced differently: */
  const tasksCollectionRef = collection(db, "tasks");
/* 
- This function will be invoked upon hitting the "Create Account" button.
- It adds the email and the password to the database.
*/
  const createTask = async () => {
  await addDoc(tasksCollectionRef, {task: value});
  };

  const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTask(value);
      setValue("");
      createTask();
  };

  return (
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              className="input"
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
  };

  const deleteTask = index => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
  };




  return (
         <div className={classes.App}>
         <div className={classes.icon}>
         <RiTodoLine />
         </div>
         <div className={classes.todoContainer}>
         <div className={classes.bigHeader}> Your To-Do List</div>
          <div className={classes.header}> Number of Tasks Left to Complete: ({tasksRemaining})</div>
          <div className={classes.header}> Number of Tasks Completed: ({tasksDone})</div>
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
          </div>
  );
}

export default App;