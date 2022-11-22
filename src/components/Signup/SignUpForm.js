import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SignUpForm.module.css";
import { RiTodoLine } from "react-icons/ri";
/* importing the firebase config file */
import { db } from "../../firebase-config"; 
/* collection is to reference the collection and addDoc adds data into the db.*/ 
import { collection, addDoc } from 'firebase/firestore'; 

const SignUpFormContent = () => {
    
	/* I added the useState variable for emails so I can capture the email for the db */
	const [email, setEmail] = useState('');
	/* I added the useState variable for passwords so I can capture the password for the db */
	const [password, setPassword] = useState('');
	/* this is a named reference to the database collection, "users" */
	const usersCollectionRef = collection(db, "users");
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

     /* 
	 - This function will be invoked upon hitting the "Create Account" button.
	 - It adds the email and the password to the database.
	 */
      const createUser = async () => {
      await addDoc(usersCollectionRef, {email: email, password: password});
	  };



	const signUpHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailRef.current.value;
		const enteredPassword = passwordRef.current.value;
		const enterPasswordConfirm = passwordConfirmRef.current.value;

		function clearInput() {
			emailRef.current.value = "";
			passwordRef.current.value = "";
			passwordConfirmRef.current.value = "";
		}



		if (enteredPassword === enterPasswordConfirm) {
			fetch(
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCng2R_ZvRmT0dtZmg7dgW-Pm65-UjGIHk",
				{
					method: "POST",
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPassword,
						returnSecureToken: true,
					}),
					headers: {
						"Content-Type":
							"application/json",
					},
				}
			).then((res) => {
				if (res.ok) {
					alert("Sign Up Successful!");
					clearInput();
				} else {
					return res.json().then((data) => {
						let errorMessage =
							"Authentication failed";
						if (
							data &&
							data.error &&
							data.error.message
						) {
							errorMessage =
								data.error
									.message;
						}
						alert(errorMessage);
					});
				}
			});
		} else {
			alert("Passwords do not match");
		}
	};

	return (
		<div>
			<div className={classes.icon}>
				<RiTodoLine />
			</div>
			<section className={classes.signup}>
				<h2>Sign-Up</h2>
				<form onSubmit={signUpHandler}>
					<div className={classes.control}>
						<label htmlFor="email">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							placeholder="Email"
							required
							ref={emailRef}
							/* 
							This means that when the text changes, the useState variable
							email is set to the text field value. 
							*/
							onChange={(event)=>{setEmail(event.target.value)}}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Password"
							required
							ref={passwordRef}
							/* 
							This means that when the text changes, the useState variable
							password is set to the text field value. 
							*/
							onChange={(event)=>{setPassword(event.target.value)}}
						/>
					</div>

					<div className={classes.control}>
						<label htmlFor="password">
							Password Confirmation
						</label>
						<input
							type="password"
							id="password"
							placeholder="Re-enter password"
							required
							ref={passwordConfirmRef}
						/>
					</div>

					<div className={classes.actions}>
						<button
						    /* 
							This onClick controls the addition of data to the DB. 
							It invokes the createUser function once the
							create account button is clicked.
							*/
						    onClick={createUser}
							className={
								classes.login_button
							}
						>
							{"Create Account"}
						</button>
						<Link to="/login">
							<button
								type="button"
								className={
									classes.toggle
								}
							>
								{
									"Login with existing account"
								}
							</button>
						</Link>
					</div>
				</form>
			</section>
		</div>
	);
};

export default SignUpFormContent;
