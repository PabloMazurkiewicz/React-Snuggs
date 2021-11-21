import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import "./Footer.css";

const layout = {
  labelCol: {
    span: 24,
  },
};

const Footer = () => (
  <>
    <Row className="FooterRow">
      <Col xs={18} sm={18} md={8} lg={10} xl={8}>
        <ul className="FooterUl">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/pages/contact-us">Contact us</a>
          </li>
          <li>
            <a href="/pages/return-exchange-policy">
              Return &amp; Exchange policy
            </a>
          </li>
          <li>
            <a href="/pages/our-story">Our story</a>
          </li>
          <li>
            <a href="/pages/faqs">FAQs</a>
          </li>
        </ul>
      </Col>
      <Col xs={18} sm={18} md={8} lg={10} xl={8}>
        <Form size="large" name="basic" className="FooterForm">
          <Form.Item
            {...layout}
            label="Join our mailing list"
            name="mail"
            rules={[
              {
                message: "Please write down your email address",
                type: "email",
              },
            ]}
          >
            <Input className="FooterInput" />
          </Form.Item>
          <Form.Item>
            <Button className="FooterSubscribe" size="large" htmlType="submit">
              subscribe
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default Footer;
