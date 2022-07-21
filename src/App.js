import { useState } from "react";
import "./App.css";

import moment from 'moment';
import FormInput from "./components/FormInput";
import { useAlert } from "react-alert"

const App = () => {
  const alert = useAlert()

  const [values, setValues] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be between 3-16 characters and should not contain any special characters!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "anything@something.com",
      errorMessage: "Please enter a valid email address!",
      label: "Email Address",
      required: true,
    },
    {
      id: 3,
      name: "dateOfBirth",
      type: "date",
      placeholder: "Date of Birth",
      label: "Date of Birth",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be between 8-20 characters and must contain at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Password do not match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const age = moment().diff(e.target[0].value, 'years');
    if(age < 18) {
      alert.error("Minimum age required for signup is 18!")
      return false;
    }

    alert.show("Form submitted successfully!", {
      type: "success",
      onClose: () => {
        window.location.reload();
      }
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1><br/>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
