import React, { Component } from "react";
import { Form, Input, Col, Button, Row } from "antd";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as actions from "../../store/actions/index";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Login.css";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    forgotPasswordClick: false,
  };

  submitHandlerForgotPassword = (values) => {
    console.log(values);
  };

  submitHandler = (values) => {
    this.props.sendLoginData(values.email, values.password);
  };

  render() {
    const { forgotPasswordClick } = this.state;
    return (
      <>
        <Navbar />
        {forgotPasswordClick ? (
          <>
            <Row justify="center">
              <h1 className="LoginResetPassword">RESET YOUR PASSWORD</h1>
            </Row>
            <Row justify="center" data-aos="zoom-in-up">
              <p>We will send you an email to reset your password.</p>
            </Row>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => this.submitHandlerForgotPassword(values)}
              initialValues={{
                email: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                handleBlur,
                errors,
              }) => (
                <Form
                  size="large"
                  onFinish={(event) => {
                    handleSubmit(values);
                  }}
                >
                  <Row className="LoginRow">
                    <Col
                      xs={23}
                      sm={19}
                      md={9}
                      lg={10}
                      xl={8}
                      data-aos="zoom-in-up"
                    >
                      <Form.Item {...layout} label="Email">
                        <Input
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <label className="LoginLabel">{errors.email}</label>
                        ) : null}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center" data-aos="zoom-in-up">
                    <Form.Item>
                      <Button className="LoginSend" htmlType="submit">
                        SUBMIT
                      </Button>
                    </Form.Item>
                  </Row>
                  <Row justify="center" data-aos="zoom-in-up">
                    <p
                      onClick={() =>
                        this.setState({ forgotPasswordClick: false })
                      }
                      className="LoginForgotPassword"
                    >
                      Cancel
                    </p>
                  </Row>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <Row justify="center">
              <h1 className="LoginHeader" data-aos="fade-up">
                Login
              </h1>
            </Row>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => this.submitHandler(values)}
              initialValues={{
                email: "",
                password: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                handleBlur,
                errors,
              }) => (
                <Form
                  size="large"
                  onFinish={(event) => {
                    handleSubmit(values);
                  }}
                >
                  <Row className="LoginRow">
                    <Col
                      xs={23}
                      sm={19}
                      md={9}
                      lg={10}
                      xl={8}
                      data-aos="zoom-in-up"
                    >
                      <Form.Item {...layout} label="Email">
                        <Input
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <label className="LoginLabel">{errors.email}</label>
                        ) : null}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="LoginRow">
                    <Col
                      xs={23}
                      sm={19}
                      md={9}
                      lg={10}
                      xl={8}
                      data-aos="zoom-in-up"
                    >
                      <Form.Item {...layout} label="Password">
                        <Input.Password
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <label className="LoginLabel">
                            {errors.password}
                          </label>
                        ) : null}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center" data-aos="zoom-in-up">
                    <p
                      onClick={() =>
                        this.setState({ forgotPasswordClick: true })
                      }
                      className="LoginForgotPassword"
                    >
                      Forgot your password?
                    </p>
                  </Row>
                  <Row justify="center" data-aos="zoom-in-up">
                    <Form.Item>
                      <Button className="LoginSend" htmlType="submit">
                        SIGN IN
                      </Button>
                    </Form.Item>
                  </Row>
                  <Row justify="center" data-aos="zoom-in-up">
                    <p className="LoginForgotPassword">
                      <a className="LoginHref" href="/account/register">
                        Create account
                      </a>
                    </p>
                  </Row>
                </Form>
              )}
            </Formik>
          </>
        )}
        <Footer />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendLoginData: (email, password) =>
      dispatch(actions.loginReducer(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
