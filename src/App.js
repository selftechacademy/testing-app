import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RequireAuth from "./components/require-auth/RequireAuth";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import TodoApp from "./pages/todoApp/TodoApp";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // NOTE: console log for testing purposes
  console.log("User:", currentUser);

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="dashboard/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route path="todoapp" element={<TodoApp />} />
      </Route>
    </Routes>
  );
}

export default App;
