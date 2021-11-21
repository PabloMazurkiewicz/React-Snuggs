import React, { Component } from "react";
import { Form, Input, Col, Button, Row } from "antd";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as actions from "../../store/actions/index";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./ContactUs.css";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phoneNumber: Yup.number()
    .positive("Phone Number must be positive")
    .integer("Phone Number must be integer")
    .required("Phone Number is required")
    .typeError("Phone Number must contain only numbers"),
  message: Yup.string().required("Message is required"),
});
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class ContactUs extends Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  submitHandler = (values) => {
    this.props.sendContactUsData(values);
  };

  render() {
    return (
      <>
        <Navbar />
        <Row justify="center" data-aos="fade-up">
          <h1 className="ContactUsHeader">Contact Us</h1>
        </Row>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => this.submitHandler(values)}
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            message: "",
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
              <Row className="ContactUsRow">
                <Col
                  className="ContactUsNameInput"
                  xs={18}
                  sm={18}
                  md={8}
                  lg={10}
                  xl={6}
                  data-aos="zoom-in-right"
                >
                  <Form.Item {...layout} label="Name">
                    <Input
                      name="name"
                      type="string"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <label className="ContactUsLabel">{errors.name}</label>
                    ) : null}
                  </Form.Item>
                </Col>
                <Col
                  xs={18}
                  sm={18}
                  md={8}
                  lg={10}
                  xl={6}
                  data-aos="zoom-in-left"
                >
                  <Form.Item {...layout} label="Email">
                    <Input
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <label className="ContactUsLabel">{errors.email}</label>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="ContactUsRow">
                <Col
                  xs={18}
                  sm={18}
                  md={17}
                  lg={21}
                  xl={13}
                  data-aos="zoom-in-up"
                >
                  <Form.Item {...layout} label="Phone Number">
                    <Input
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <label className="ContactUsLabel">
                        {errors.phoneNumber}
                      </label>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="ContactUsRow">
                <Col
                  xs={18}
                  sm={18}
                  md={17}
                  lg={21}
                  xl={13}
                  data-aos="zoom-in-up"
                >
                  <Form.Item {...layout} label="Message">
                    <Input.TextArea
                      name="message"
                      type="string"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.message && touched.message ? (
                      <label className="ContactUsLabel">{errors.message}</label>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="ContactUsRow">
                <Col
                  xs={18}
                  sm={18}
                  md={17}
                  lg={21}
                  xl={13}
                  data-aos="zoom-in-up"
                >
                  <Form.Item>
                    <Button className="ContactUsSend" htmlType="submit">
                      Send
                    </Button>
                  </Form.Item>
                </Col>
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
    sendContactUsData: (data) => dispatch(actions.contactusReducer(data)),
  };
};

export default connect(null, mapDispatchToProps)(ContactUs);
