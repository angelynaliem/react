import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import Nav from "./dashboard/Nav";

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const FormCont = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 3px solid lightblue;
  width: 400px;
  padding: 50px;

  label {
    margin: 0px 0px 15px 0px;
    align-items: center;
    padding: 5px;
  }
  input {
    padding: 10px;
  }

  input[type="text"],
  input[type="checkbox"] {
    border: none;
    padding: 8px 15px 8px 15px;
    background: lightblue;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
  }
  button {
    color: black;
    border-radius: 10px;
    background-color: #0066cc;
    justify-content: center;
    height: 50px;
    width: 200px;

    font-size: 20px;
    &:hover {
      cursor: pointer;
      background-color: blue;
      color: white;
    }
  }
`;

const ErrorMsg = styled.p`
  font-size: 1.2rem;
  color: red;
`;

const Register = (props) => {
  const [newReg, setNewReg] = useState({
    name: "",
    email: "",
    password: "",
    roles: [false],
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    roles: [""],
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  // const phoneRegex = RegExp(
  //   /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  // );

  const formSchema = yup.object().shape({
    //fname: yup.string().required('Enter Your First Name'),
    //lname: yup.string().required('Enter Your Last Name'),
    name: yup.string().required("Enter Your Name"),
    //number: yup.string().matches(phoneRegex, "Invalid phone number").required("Enter A Valid Number"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email"),
    //username:yup.string().required('Username is required'),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    helper: yup.boolean(),
    student: yup.boolean(),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log(err);

        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };



  const inputChange = (e) => {
    e.persist();
    if (e.target.name === "helper") {
      setNewReg({...newReg, roles : !newReg.roles[0]})
    //} else {
      //[e.target.name] : e.target.value
    //}

    //const newSetUp = {
      //...newReg,
  
      //e.target.name === "helper" ? newReg["helper"] = !newReg["helper"] : [e.target.name] = e.target.value
        //e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };


    validateChange(e);
    setNewReg(newReg);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("posted");
    axios
      .post("https://devdeskqueue3-pt.herokuapp.com/api/auth/register", {
        ...newReg,
        roles: newReg.roles ? ["helper"] : ["student"],
      })
      .then((response) => {
        console.log("POST is successful!", response.data);
        window.localStorage.setItem("token", response.data.token);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    formSchema.isValid(newReg).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  }, [newReg]);
  return (
    <div>
      <Nav />

      <FormDiv>
        <FormCont onSubmit={formSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              data-cy="name"
              name="name"
              placeholder="Name"
              value={newReg.name}
              onChange={inputChange}
            />
            {errors.name.length > 0 ? <ErrorMsg>{errors.name}</ErrorMsg> : null}
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              data-cy="email"
              name="email"
              placeholder="Email"
              value={newReg.email}
              onChange={inputChange}
            />
            {errors.email.length > 0 ? (
              <ErrorMsg>{errors.email}</ErrorMsg>
            ) : null}
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="text"
              id="password"
              data-cy="password"
              name="password"
              placeholder="Password"
              value={newReg.password}
              onChange={inputChange}
            />
            {errors.password.length > 0 ? (
              <ErrorMsg>{errors.password}</ErrorMsg>
            ) : null}
          </label>

          <label htmlFor="role">
            Are you a Helper?
            <div>
              <input
                type="checkbox"
                id="helper"
                data-cy="helper"
                name="helper"
                value={newReg.roles[0]}
                onChange={inputChange}
              />
            </div>
            {/* <div>
                 <input 
                  type="checkbox" 
                  id="student" 
                  data-cy="student" 
                  name="student" 
                  value={newReg.student}
                  onChange={inputChange}
                  />Student</div> */}
          </label>
          <button data-cy="submit" type="submit" disabled={buttonDisabled}>
            Register
          </button>
        </FormCont>
      </FormDiv>
    </div>
  );
};
export default Register;

////NEED TO FIX ERROR WITH THE CONFIRM PASSWORD ERROR MSG DISPLAYING
