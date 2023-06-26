import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RequireAuth from "./components/require-auth/RequireAuth";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import TestPage from "./pages/testPage/TestPage";
import FlashCards from "./components/flashcards/Flashcards";
import FieldDropDown from "./components/fieldDropdown/FieldDropdown";
import QuestionsMain from "./components/questionsMain/QuestionsMain";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
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
          path="flashcards"
          element={
            <RequireAuth>
              <FlashCards />
            </RequireAuth>
          }
        />
        <Route
          path="quiz"
          element={
            <RequireAuth>
              <FieldDropDown />
            </RequireAuth>
          }
        />
        <Route
          path="createquestions"
          element={
            <RequireAuth>
              <QuestionsMain />
            </RequireAuth>
          }
        />
        <Route path="testpage" element={<TestPage />} />
      </Route>
    </Routes>
  );
}

export default App;
