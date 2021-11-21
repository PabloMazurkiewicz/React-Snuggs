import React from "react";
import { Row } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./ReturnPolicy.css";

const ReturnPolicy = () => (
  <>
    <Navbar />
    <Row justify="center" data-aos="fade-up">
      <h1 className="ReturnPolicyHeader">Return &amp; Exchange policy</h1>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph">
        * If you received the item &amp; would like to return or exchange it for
        any reason, you can do so by sending us a message on our facebook page:{" "}
        <a
          className="ReturnPolicyParagraphHref"
          href="https://www.fb.com/snuggsegypt"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.fb.com/snuggsegypt
        </a>{" "}
        or through our contact us{" "}
        <a
          className="ReturnPolicyParagraphHref"
          href="/pages/contact-us"
          target="_blank"
          rel="noopener noreferrer"
        >
          form
        </a>{" "}
        within 7 days from receiving the order.
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph">
        * If you received the item &amp; decided to return or exchange it within
        7 days, you will be charged for return/exchange shipping fees based on
        your city and the rest of the money will be refunded to you.
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph">
        * If there is something wrong with the item received, we will exchange
        the item without any extra fees.
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph">
        * If you received the item &amp; you would like to exchange the size, we
        will exchange the size without any extra fees. Free exchanges are only
        applicable for items with different sizes.{" "}
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph">
        * If you paid for your order online using your credit card &amp; would
        like to return the item &amp; refund your money, your money will be
        refunded back to your credit card. Refund process will take 7-14 working
        days from the bank side.
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph">
        * We can not refund the money in cash if you paid online through your
        credit card.
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph ReturnPolicyRefund">
        * For hygiene purposes, no refunds or exchanges are allowed for the
        boxer shorts.
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <p className="ReturnPolicyParagraph ReturnPolicyShipping">
        <strong>Shipping fees:</strong>
      </p>
    </Row>
    <Row className="ReturnPolicyRow">
      <ol>
        <li className="ReturnPolicyParagraph">
          Shipping is for <strong>35</strong> EGP for Cairo
        </li>
        <li className="ReturnPolicyParagraph">
          Shipping is for <strong>40</strong> EGP for Alex
        </li>
        <li className="ReturnPolicyParagraph">
          Shipping is for <strong>50</strong> EGP for Sharqia, Beheira, Beni
          suef, Dakahlia, Damietta, Fayium,Gharbia, Kafr el-Sheikh, Monufia,
          Qalyubia, Ismailia, Port Said, Suez
        </li>
        <li className="ReturnPolicyParagraph">
          Shipping is for <strong>100</strong> EGP for Aswan, Asyt, Luxor,
          Matrouh, Minya, New valley, North Sinai, South Sinai, Qena, Red sea,
          Sohag
        </li>
      </ol>
    </Row>
    <Footer />
  </>
);

export default ReturnPolicy;
