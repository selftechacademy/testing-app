import { useState } from "react";
import reactLogo from "../logo.svg";
import { signInWithEmail } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import ".././App.css";

const defaultFormFields = {
  email: "",
  password: "",
};

function Home() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the email and password to firebase
      const userCredential = await signInWithEmail(email, password);

      if (userCredential) {
        resetFormFields();
        navigate("/profile");
      }
    } catch (error) {
      console.log("User Sign In Failed", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="App">
      {/* <SignIn /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input id="recaptcha" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Home;
