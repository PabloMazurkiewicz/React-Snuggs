import React from "react";
import { Row } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./OurStory.css";

const OurStory = () => (
  <>
    <Navbar />
    <Row justify="center" data-aos="fade-up">
      <h1 className="OurStoryHeader">Our story</h1>
    </Row>
    <Row justify="center">
      <img
        className="OurStoryImage"
        src={`${process.env.REACT_APP_SHOPIFY_BASE_URL}/LX0A2876_436x545.jpg`}
        alt="OurStoryImage"
      />
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        "It all started with a girl going to Norway,
      </p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        and a guy who wanted to blow her mind away.
      </p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">He found the gift on Ebay,</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">but the time of delivery was a delay.</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">So He had to make it his own way,</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">he got a blanket.. It was grey.</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">Then added some sleeves,</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">needless to say he made her day.</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">However she ran away,</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        he wanted to get the blanket back anyway.
      </p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">So SNUGGS came along the way,</p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        and now its here in Egypt and not only on Ebay"
      </p>
    </Row>
    <br />
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        Since then, we specialized in making high quality, soft &amp; trendy
        looking home wear products that will make you feel extra comfortable
        just wearing them.
      </p>
    </Row>
    <br />
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        Customer satisfaction is our number one concern. We strongly believe
        that if you as a customer do not like any of our products upon arrival,
        you can easily refund or exchange any items for any reason within 7 days
        of its' arrival. Just send us a message through our contact form &amp;
        will get back to you within 1 working day.
      </p>
    </Row>
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        Contact form link:{" "}
        <a href="/pages/contact-us" className="OurStoryParagraphHref">
          https://www.snuggsegypt.com/pages/contact-us
        </a>
      </p>
    </Row>
    <br />
    <Row className="OurStoryRow">
      <p className="OurStoryParagraph">
        Our adults onesie collection is now available, check them out through
        this link:{" "}
        <a
          href="/collections/snuggs-blanket-onesie-adults"
          className="OurStoryParagraphHref"
        >
          https://snuggsegypt.com/collections/snuggs-blanket-onesie-adults
        </a>
      </p>
    </Row>
    <Footer />
  </>
);

export default OurStory;
