import React, { Component } from "react";
import { Row, Col, Card, Divider, Button } from "antd";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Notify from "../../components/Toastify/Toastify";
import "./Homepage.css";

const { Meta } = Card;

class Homepage extends Component {
  state = {
    clickAddButton: false,
    blanketHoodies: [],
    blanketOnesies: [],
    kidBlanketOnesies: [],
    blanketThrows: [],
    allCartData: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getBlanketOnesies();
    this.getBlanketHoodies();
    this.getKidBlanketOnesies();
    this.getSofaBlanketThrows();
  }

  getBlanketOnesies = () => {
    axios
      .get(
        `${process.env.REACT_APP_DATABASE_BASE_URL}/collections/snuggs-blanket-onesie-adults/products.json`
      )
      .then((response) => {
        this.setState({ blanketOnesies: response.data.splice(1, 4) });
      });
  };

  getBlanketHoodies = () => {
    axios
      .get(
        `${process.env.REACT_APP_DATABASE_BASE_URL}/collections/snuggs-blanket-hoodie/products.json`
      )
      .then((response) => {
        this.setState({ blanketHoodies: response.data.splice(0, 4) });
      });
  };

  getKidBlanketOnesies = () => {
    axios
      .get(
        `${process.env.REACT_APP_DATABASE_BASE_URL}/collections/kids-blanket-animal-onesie/products.json`
      )
      .then((response) => {
        this.setState({ kidBlanketOnesies: response.data.splice(0, 4) });
      });
  };

  getSofaBlanketThrows = () => {
    axios
      .get(
        `${process.env.REACT_APP_DATABASE_BASE_URL}/collections/normal-blanket/products.json`
      )
      .then((response) => {
        this.setState({ blanketThrows: response.data.splice(0, 4) });
      });
  };

  handleSubmit = (product, productLink) => {
    this.setState({ clickAddButton: true });
    let isFoundProduct = false;
    let productBuyData = null;
    productBuyData = {
      quantityNumber: 1,
      productName: product.title,
      productPrice: product.variants[0].price,
      productImage: product.images[0].src,
      productLink: productLink,
    };
    if (
      localStorage.getItem("cartData") != null &&
      localStorage.getItem("userId") === null
    ) {
      let currentCartData = [];
      currentCartData = JSON.parse(localStorage.getItem("cartData"));
      for (let i = 0; i < currentCartData.length; i++) {
        if (productBuyData.productImage === currentCartData[i].productImage) {
          isFoundProduct = true;
          currentCartData[i].quantityNumber += 1;
        } else if (
          isFoundProduct === false &&
          i === currentCartData.length - 1
        ) {
          currentCartData.push({
            quantityNumber: 1,

            productName: productBuyData.productName,
            productPrice: productBuyData.productPrice,
            productImage: productBuyData.productImage,
            productLink: productBuyData.productLink,
          });
          break;
        }
      }
      localStorage.removeItem("cartData");
      localStorage.setItem("cartData", JSON.stringify(currentCartData));
      Notify("Item added successfully", "success");
      this.setState({ clickAddButton: false });
    } else if (
      localStorage.getItem("cartData") === null &&
      localStorage.getItem("userId") === null
    ) {
      this.state.allCartData.push({
        quantityNumber: productBuyData.quantityNumber,
        productName: productBuyData.productName,
        productPrice: productBuyData.productPrice,
        productImage: productBuyData.productImage,
        productLink: productBuyData.productLink,
      });
      localStorage.setItem("cartData", JSON.stringify(this.state.allCartData));
      Notify("Item added successfully", "success");
      this.setState({ clickAddButton: false });
    } else if (localStorage.getItem("userId") != null) {
      axios
        .get(
          `${
            process.env.REACT_APP_DATABASE_BASE_URL
          }/cart/${localStorage.getItem("userId")}/.json`
        )
        .then((response) => {
          let currentCartData = [];
          for (let key in response.data) {
            currentCartData.push({
              ...response.data[key],
              key: key,
            });
          }
          if (response.data === null) {
            axios
              .post(
                `${
                  process.env.REACT_APP_DATABASE_BASE_URL
                }/cart/${localStorage.getItem("userId")}/.json`,
                productBuyData
              )
              .then((response) => this.setState({ clickAddButton: false }));
          }
          for (let i = 0; i < currentCartData.length; i++) {
            if (
              productBuyData.productImage === currentCartData[i].productImage
            ) {
              isFoundProduct = true;
              currentCartData[i].quantityNumber += 1;
              axios
                .put(
                  `${
                    process.env.REACT_APP_DATABASE_BASE_URL
                  }/cart/${localStorage.getItem("userId")}/${
                    currentCartData[i].key
                  }/.json`,
                  currentCartData[i]
                )
                .then((response) => this.setState({ clickAddButton: false }));
            } else if (
              isFoundProduct === false &&
              i === currentCartData.length - 1
            ) {
              currentCartData.push({
                quantityNumber: 1,
                productName: productBuyData.productName,
                productPrice: productBuyData.productPrice,
                productImage: productBuyData.productImage,
                productLink: productBuyData.productLink,
              });
              axios
                .post(
                  `${
                    process.env.REACT_APP_DATABASE_BASE_URL
                  }/cart/${localStorage.getItem("userId")}/.json`,
                  currentCartData[i + 1]
                )
                .then((response) => this.setState({ clickAddButton: false }));
              break;
            }
          }
        });
      Notify("Item added successfully", "success");
    }
  };

  render() {
    const {
      clickAddButton,
      blanketHoodies,
      blanketOnesies,
      kidBlanketOnesies,
      blanketThrows,
    } = this.state;
    return (
      <>
        <Row className="HomepageFirstRow">
          <p>
            Easy &amp; quick returns and exchanges for any reason within 7 days
          </p>
        </Row>
        <Navbar />
        <Slider />
        <h2 className="HomepageCategoriesHeader" data-aos="fade-up">
          Snuggs Wearable Blanket Onesie
        </h2>
        <Row className="HomepageRow">
          {blanketOnesies
            ? blanketOnesies.map((blanketOnesie, index) => (
                <>
                  <Card
                    key={index}
                    className="CardOverrideStyle"
                    bordered={false}
                    cover={
                      <div className="CardStyle">
                        <a href={`/snuggs-blanket-onesie-adults/${index + 1}`}>
                          <img
                            className="HomepageCardImage"
                            alt={blanketOnesie.title}
                            src={blanketOnesie.images[0].src}
                          />
                          <Meta
                            className="HomepageCardMeta"
                            title={blanketOnesie.title}
                            description={
                              "LE " + blanketOnesie.variants[0].price
                            }
                          />
                        </a>
                      </div>
                    }
                    data-aos="fade-up"
                  >
                    <Button
                      className="HomepageAddButton"
                      type="primary"
                      disabled={clickAddButton}
                      onClick={() =>
                        this.handleSubmit(
                          blanketOnesie,
                          `/snuggs-blanket-onesie-adults/${index + 1}`
                        )
                      }
                    >
                      ADD TO CART
                    </Button>
                  </Card>
                  <Divider type="vertical" />
                </>
              ))
            : null}
        </Row>
        <Row className="HomepageRow" data-aos="fade-up">
          <Button
            className="HomepageViewButton"
            type="primary"
            onClick={() =>
              this.props.history.push(
                "/collections/snuggs-blanket-onesie-adults"
              )
            }
          >
            <span>View all</span>
          </Button>
        </Row>
        <h2 className="HomepageCategoriesHeader" data-aos="fade-up">
          Hoodie Wearable Blanket Hoodie
        </h2>
        <Row className="HomepageRow">
          {blanketHoodies
            ? blanketHoodies.map((blanketHoodie, index) => (
                <>
                  <Card
                    key={index}
                    className="CardOverrideStyle"
                    bordered={false}
                    cover={
                      <div className="CardStyle">
                        <a href={`/snuggs-blanket-hoodie/${index}`}>
                          <img
                            className="HomepageCardImage"
                            alt={blanketHoodie.title}
                            src={blanketHoodie.images[0].src}
                          />
                          <Meta
                            className="HomepageCardMeta"
                            title={blanketHoodie.title}
                            description={
                              "LE " + blanketHoodie.variants[0].price
                            }
                          />
                        </a>
                      </div>
                    }
                    data-aos="fade-up"
                  >
                    <Button
                      className="HomepageAddButton"
                      type="primary"
                      disabled={clickAddButton}
                      onClick={() =>
                        this.handleSubmit(
                          blanketHoodie,
                          `/snuggs-blanket-hoodie/${index}`
                        )
                      }
                    >
                      ADD TO CART
                    </Button>
                  </Card>
                  <Divider type="vertical" />
                </>
              ))
            : null}
        </Row>
        <Row className="HomepageRow" data-aos="fade-up">
          <Button
            className="HomepageViewButton"
            type="primary"
            onClick={() =>
              this.props.history.push("/collections/snuggs-blanket-hoodie")
            }
          >
            View all
          </Button>
        </Row>
        <h2 className="HomepageCategoriesHeader" data-aos="fade-up">
          Kids Blanket Onesie
        </h2>
        <Row className="HomepageRow">
          {kidBlanketOnesies
            ? kidBlanketOnesies.map((kidBlanketOnesie, index) => (
                <>
                  <Card
                    key={index}
                    className="CardOverrideStyle"
                    bordered={false}
                    cover={
                      <div className="CardStyle">
                        <a href={`/kids-blanket-animal-onesie/${index}`}>
                          <img
                            className="HomepageCardImage"
                            alt={kidBlanketOnesie.title}
                            src={kidBlanketOnesie.images[0].src}
                          />
                          <Meta
                            className="HomepageCardMeta"
                            title={kidBlanketOnesie.title}
                            description={
                              "LE " + kidBlanketOnesie.variants[0].price
                            }
                          />
                        </a>
                      </div>
                    }
                    data-aos="fade-up"
                  >
                    <Button
                      className="HomepageAddButton"
                      type="primary"
                      disabled={clickAddButton}
                      onClick={() =>
                        this.handleSubmit(
                          kidBlanketOnesie,
                          `/kids-blanket-animal-onesie/${index}`
                        )
                      }
                    >
                      ADD TO CART
                    </Button>
                  </Card>
                  <Divider type="vertical" />
                </>
              ))
            : null}
        </Row>
        <Row className="HomepageRow" data-aos="fade-up">
          <Button
            className="HomepageViewButton"
            type="primary"
            onClick={() =>
              this.props.history.push("/collections/kids-blanket-animal-onesie")
            }
          >
            View all
          </Button>
        </Row>
        <h2 className="HomepageCategoriesHeader" data-aos="fade-up">
          Sofa Blanket Throws
        </h2>
        <Row className="HomepageRow">
          {blanketThrows
            ? blanketThrows.map((blanketThrow, index) => (
                <>
                  <Card
                    key={index}
                    className="CardOverrideStyle"
                    bordered={false}
                    cover={
                      <div className="CardStyle">
                        <a href={`/normal-blanket/${index}`}>
                          <img
                            className="HomepageCardImage"
                            alt={blanketThrow.title}
                            src={blanketThrow.images[0].src}
                          />
                          <Meta
                            className="HomepageCardMeta"
                            title={blanketThrow.title}
                            description={"LE " + blanketThrow.variants[0].price}
                          />
                        </a>
                      </div>
                    }
                    data-aos="fade-up"
                  >
                    <Button
                      className="HomepageAddButton"
                      type="primary"
                      disabled={clickAddButton}
                      onClick={() =>
                        this.handleSubmit(
                          blanketThrow,
                          `/normal-blanket/${index}`
                        )
                      }
                    >
                      ADD TO CART
                    </Button>
                  </Card>
                  <Divider type="vertical" />
                </>
              ))
            : null}
        </Row>
        <Row className="HomepageRow" data-aos="fade-up">
          <Button
            className="HomepageViewButton"
            type="primary"
            onClick={() =>
              this.props.history.push("/collections/normal-blanket")
            }
          >
            View all
          </Button>
        </Row>
        <Row className="HomepageRow">
          <Col
            xs={16}
            sm={16}
            md={16}
            lg={8}
            xl={8}
            style={{ display: "flex", justifyContent: "center" }}
            data-aos="zoom-in-right"
          >
            <img
              className="HomepageStoryImage"
              alt="Our Story"
              src={`${process.env.REACT_APP_SHOPIFY_BASE_URL}/LX0A2876_436x545.jpg`}
            />
          </Col>
          <Divider type="vertical" />
          <Col
            xs={16}
            sm={16}
            md={16}
            lg={8}
            xl={8}
            className="StoryParagraph"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            data-aos="zoom-in-right"
          >
            <h1>Story Behind Snuggs</h1>
            <p style={{ fontSize: "1.1em", color: "#788188" }}>
              It all started with a girl going to Norway, <br />
              and a guy who wanted to blow her mind away. <br />
              He found the gift on Ebay, <br />
              but the time of delivery was a delay. <br />
              So He had to make it his own way, <br />
              he got a blanket.. It was grey.
              <br /> Then added some sleeves, <br />
              needless to say he made her day. <br />
              However she ran away, <br />
              he wanted to get the blanket back anyway. <br />
              So SNUGGS came along the way, <br />
              and now its here in Egypt and not only on Ebay.
            </p>
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

export default Homepage;
