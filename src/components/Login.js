import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Motion, spring } from "react-motion";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Container,
  Col,
  Spinner,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import StudentNav from "./dashboard/Nav";
import { connect } from "react-redux";
import { login } from "./actions/actions";

const Login = (props) => {
  const history = useHistory();

  // const goHome = () => {
  //   console.log("Going home");
  //   history.push("/");
  // };

  const goRegister = () => {
    console.log("Going to register");
    history.push("/register");
  };

  //Set the state for user
  const [user, setUser] = useState({ email: "", password: "" });

  //Set the state for error
  const [errors, setErrors] = useState({ email: "", password: "" });

  //Set the state for server error
  const [serverError, setServerError] = useState("");

  //Set the state for button
  const [button, setButton] = useState(true);

  const [text, setText] = useState({ open: false });

  const handleMouseDown = () => {
    setText({ open: !text.open });
  };

  //Form schema for login
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must contain @ and .com")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one Special Case Character"
    // ),
  });

  //Form validation function for login
  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name ? e.target.value : null)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "", //Clear any error messages
        });
      })
      .catch((err) => {
        console.log(err);
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0], //Display the error message
        });
      });
  };

  //Handle user input changes for login
  const handleChanges = (e) => {
    e.persist();
    // console.log("new input here!", e.target.value);
    // const newUser = { ...user, [e.target.name]: e.target.value };
    validateChange(e);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //Submit form function for login
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log(user);
    props.login(user)
    history.push('/dashboard')
    }


  //If everything checks, then button is enabled
  useEffect(() => {
    formSchema.isValid(user).then((isValid) => {
      setButton(!isValid);
    });
  }, [user]);

  if (!user) return <Spinner color="info" />;

  return (
    <div>
      <StudentNav />
      <div className="login">
        <h2>We're here to help.</h2>
        <p>
          Create a help ticket and we'll connect you <br></br> with a Lambda
          School Helper.
        </p>

        <Container className="form">
          <Form onSubmit={submitForm} className="formGroup">
            {serverError ? <p>{serverError}</p> : null}

            {/* Username Field */}
            <Col>
              <FormGroup className="username">
                <Label htmlFor="email" xl={4} className="label">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChanges}
                  ></Input>
                  {errors.email.length > 0 ? (
                    <p className="error">{errors.email}</p>
                  ) : null}
                </Label>
              </FormGroup>
            </Col>

            {/* Password Field */}
            <Col>
              <FormGroup>
                <Label htmlFor="password" xl={4} className="label">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChanges}
                  ></Input>
                  {errors.password.length > 0 ? (
                    <p className="error">{errors.password}</p>
                  ) : null}
                </Label>
              </FormGroup>
            </Col>

            <FormGroup check>
              <Label htmlFor="check" check>
                <Input type="checkbox" name="check" id="check" /> Remember me
              </Label>
            </FormGroup>

            <NavLink
            // onMouseDown={handleMouseDown}
            >
              Forgot username/password?
            </NavLink>

            <Button
              type="submit"
              disabled={button}
              // onClick={goStudentDashboard}
              className="buttonForm"
              style={{ backgroundColor: "#74CBC1" }}
            >
              Login
            </Button>
          </Form>
        </Container>

        {/* If user hasn't registered, they would click the Register button instead and go to Eric's Register page*/}
        <div className="navRegister">
          <NavLink className="nonClick">Haven't registered? </NavLink>
          <NavLink onClick={goRegister} className="click">
            Click here
          </NavLink>
        </div>
      </div>
      <i
        className="far fa-comment"
        style={{
          color: "#74CBC1",
          marginLeft: "50%",
          fontSize: "200%",
          marginTop: "1%",
        }}
        onMouseDown={handleMouseDown}
      ></i>
      {/* <span>Chat</span> */}
      <Motion style={{ x: spring(text.open ? 100 : -1000) }}>
        {({ x }) => (
          <div>
            <p
              className="play"
              style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}
            >
              Hello! How can I help?
            </p>
          </div>
        )}
      </Motion>
    </div>
  );
};

const mapsStateToProps = (state) => {
  return {
    tickets: state.tickets,
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(mapsStateToProps, { login })(Login);
