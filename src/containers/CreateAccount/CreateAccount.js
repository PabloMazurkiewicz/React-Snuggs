import React, { Component } from "react";
import { Form, Input, Col, Button, Row } from "antd";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as actions from "../../store/actions/index";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./CreateAccount.css";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class CreateAccount extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  submitHandler = (values) => {
    this.props.sendSignupData(
      values.email,
      values.password,
      values.firstName + " " + values.lastName
    );
  };

  render() {
    return (
      <>
        <Navbar />
        <Row justify="center" data-aos="fade-up">
          <h1 className="CreateAccountHeader">Create Account</h1>
        </Row>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => this.submitHandler(values)}
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
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
              <Row className="CreateAccountRow">
                <Col
                  xs={23}
                  sm={19}
                  md={9}
                  lg={10}
                  xl={8}
                  data-aos="zoom-in-up"
                >
                  <Form.Item {...layout} label="First Name">
                    <Input
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? (
                      <label className="CreateAccountLabel">
                        {errors.firstName}
                      </label>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="CreateAccountRow">
                <Col
                  xs={23}
                  sm={19}
                  md={9}
                  lg={10}
                  xl={8}
                  data-aos="zoom-in-up"
                >
                  <Form.Item {...layout} label="Last Name">
                    <Input
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName ? (
                      <label className="CreateAccountLabel">
                        {errors.lastName}
                      </label>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="CreateAccountRow">
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
                      <label className="CreateAccountLabel">
                        {errors.email}
                      </label>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="CreateAccountRow">
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
                      <label className="CreateAccountLabel">
                        {errors.password}
                      </label>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center" data-aos="zoom-in-up">
                <Form.Item>
                  <Button className="CreateAccountSend" htmlType="submit">
                    CREATE
                  </Button>
                </Form.Item>
              </Row>
              <Row justify="center" data-aos="zoom-in-up">
                <p className="CreateAccountGotAccount">
                  Already have an account?{" "}
                  <a className="CreateAccountHref" href="/account/login">
                    Sign In
                  </a>
                </p>
              </Row>
            </Form>
          )}
        </Formik>
        <Footer />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendSignupData: (email, password, displayName) =>
      dispatch(actions.signupReducer(email, password, displayName)),
  };
};

export default connect(null, mapDispatchToProps)(CreateAccount);
