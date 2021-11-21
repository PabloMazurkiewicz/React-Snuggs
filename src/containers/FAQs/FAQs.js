import React from "react";
import { Row } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./FAQs.css";

const FAQs = () => (
  <>
    <Navbar />
    <Row justify="center" data-aos="fade-up">
      <h1 className="FAQsHeader">FAQs</h1>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsSubHeader">FREQUENTLY ASKED QUESTIONS</p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        Have questions and want fast answers? We’ve made a list of the most
        common questions customers ask us on this page. If you still have
        unanswered questions after reading this, please feel free to reach out
        to us directly through Facebook or Instagram.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsQuestion">Q- HOW DO I PLACE AN ORDER?</p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Step 1:</strong> Go to one of our product pages
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Step 2:</strong> Choose a product you like by clicking on it
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Step 3:</strong> Click on "add to cart" button
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Step 4:</strong> If you want to add other products to your cart,
        click on continue shopping button
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Step 5:</strong> Press on "Proceed to Checkout" button from the
        cart page
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Step 6:</strong> Fill in your personnal info &amp; addres
        details
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Step 7:</strong> Choose payment method "Cash on delivery or
        credit card"
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>Final Step:</strong> Click on "Place order" button
      </p>
    </Row>
    <br />
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        Done! Your order is now in our system and will be processed.
      </p>
    </Row>
    <br />
    <Row className="FAQsRow">
      <p className="FAQsQuestion">Q-HOW MUCH DOES SHIPPING/DELIVERY COST?</p>
    </Row>
    <Row className="FAQsRow">
      <ol>
        <li className="FAQsParagraph">
          Shipping is for <strong>35</strong> EGP for Cairo
        </li>
        <li className="FAQsParagraph">
          Shipping is for <strong>40</strong> EGP for Alex
        </li>
        <li className="FAQsParagraph">
          Shipping is for <strong>50</strong> EGP for Sharqia, Beheira, Beni
          suef, Dakahlia, Damietta, Fayium,Gharbia, Kafr el-Sheikh, Monufia,
          Qalyubia, Ismailia, Port Said, Suez
        </li>
        <li className="FAQsParagraph">
          Shipping is for <strong>100</strong> EGP for Aswan, Asyt, Luxor,
          Matrouh, Minya, New valley, North Sinai, South Sinai, Qena, Red sea,
          Sohag
        </li>
      </ol>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsQuestion">Q-HOW LONG DOES DELIVERY TAKE?</p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>A-</strong> Delivery takes 4-7 working days for Cairo and Alex
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>B-</strong> Delivery takes 7-10 working days for other
        governorates
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        (Weekends and official holidays are excluded).
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsQuestion">
        Q-I DON’T LIKE ORDERING THINGS ONLINE. WHAT IF ANYTHING GOES WRONG?
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>A-</strong> Here at Snuggs, you can choose to always pay on
        delivery. If there’s anything wrong with the product, we have a very
        simple return/exchange policy. You can get your full money back or
        exchange the product for a similar or a different one except for boxer
        shorts. For hygiene purposes refunds and exchanges are not allowed for
        the boxer shorts.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsQuestion">Q-HOW DO I EXCHANGE OR RETURN A PRODUCT?</p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>A-</strong> If you received the item &amp; would like to return
        or exchange it for any reason, you can do so by sending a message on our
        facebook page:{" "}
        <a
          className="FAQsParagraphHref"
          href="https://www.facebook.com/snuggsegypt"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.facebook.com/snuggsegypt
        </a>{" "}
        or through our contact us{" "}
        <a
          className="FAQsParagraphHref"
          href="/pages/contact-us"
          target="_blank"
          rel="noopener noreferrer"
        >
          form
        </a>{" "}
        within 7 days from receiving the order.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>B-</strong> If you received the item &amp; decided to return or
        exchange it within 7 days, you will be charged for return/exchange
        shipping fees based on your city and the rest of the money will be
        refunded to you.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>C-</strong> If there is something wrong with the item received,
        we will exchange the item without any extra fees.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>D-</strong> If you received the item &amp; you would like to
        exchange the size, we will exchange the size without any extra fees.
        This is only applicable for items with sizes.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>E-</strong> If you paid for your order online using your credit
        card &amp; would like to return the item &amp; refund your money, your
        money will be refunded back to your credit card. Refund process will
        take 7-14 working days from the bank side.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>F-</strong> We can not refund the money in cash if you paid
        online through your credit card.
      </p>
    </Row>
    <Row className="FAQsRow">
      <p className="FAQsParagraph">
        <strong>G-</strong> For hygiene purposes, refunds and exchanges are not
        allowed for the boxer shorts.
      </p>
    </Row>
    <Footer />
  </>
);

export default FAQs;
