import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout";
import ChangePasswordPage from "./pages/PasswordChangePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";
import TasksPage from "./pages/TasksPage";
import WelcomePage from "./pages/WelcomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./context/auth-context";
import { useContext } from "react";

function App() {
	const authCtx = useContext(AuthContext);
	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<WelcomePage />
				</Route>
				{!authCtx.isLoggedIn && (
					<Route path="/login">
						<LoginPage />
					</Route>
				)}
				{!authCtx.isLoggedIn && (
					<Route path="/signup">
						<SignupPage />
					</Route>
				)}

				<Route path="/logout">
					<LogoutPage />
				</Route>

				<Route path="/taskspage">
					<TasksPage />
				</Route>
				{authCtx.isLoggedIn && (
					<Route path="/changepassword">
						<ChangePasswordPage />
					</Route>
				)}
				{authCtx.isLoggedIn && (
					<Route path="/profile">
						<ProfilePage />
					</Route>
				)}
				<Route path="*">
					<Redirect to="/" />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;

