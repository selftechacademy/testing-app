import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RequireAuth from "./components/require-auth/RequireAuth";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import TodoApp from "./pages/todoApp/TodoApp";
import Dashboard from "./pages/dashboard/Dashboard";
import TestPage from "./pages/testPage/TestPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route
        path="dashboard/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route path="todoapp" element={<TodoApp />} />
      </Route> */}
      <Route
        index
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route
          path="todoapp"
          element={
            <RequireAuth>
              <TodoApp />
            </RequireAuth>
          }
        />{" "}
        {/*A nested route!*/}
        <Route path="testpage" element={<TestPage />} />
      </Route>
    </Routes>
  );
}

export default App;
