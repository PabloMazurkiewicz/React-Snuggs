import React, { Component } from "react";
import { Col, Row, Card, Divider, Button, Select, Form } from "antd";
import { connect } from "react-redux";
import Media from "react-media";
import { Link } from "react-router-dom";
import Notify from "../../components/Toastify/Toastify";
import * as actions from "../../store/actions/index";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Category.css";
import axios from "axios";

const { Meta } = Card;
const { Option } = Select;
var i;
let categoryName =
  window.location.pathname.split("/")[1] === "collections"
    ? window.location.pathname.split("/")[2]
    : null;
const categoryNameMatchLength = categoryName
  ? categoryName.match(/-/g).length
  : null;
for (i = 0; i < categoryNameMatchLength; i++) {
  categoryName = categoryName.replace("-", " ");
}

class Category extends Component {
  state = {
    clickAddButton: false,
    sizeValue: null,
    sizeValueChanged: false,
    categoryNameHeader: null,
    allCartData: [],
  };

  componentDidMount() {
    var i;
    window.scrollTo(0, 0);
    this.props.loadCategoryData(
      `${process.env.REACT_APP_DATABASE_BASE_URL}/collections/${
        window.location.pathname.split("/")[2]
      }.json`
    );
    let categoryName =
      window.location.pathname.split("/")[1] === "collections"
        ? window.location.pathname.split("/")[2]
        : null;
    const categoryNameMatchLength = categoryName
      ? categoryName.match(/-/g).length
      : null;
    for (i = 0; i < categoryNameMatchLength; i++) {
      categoryName = categoryName.replace("-", " ");
    }
    this.setState({ categoryNameHeader: categoryName });
  }

  handleChange = (value) => {
    this.setState({ sizeValue: value, sizeValueChanged: true });
  };

  handleSubmit = (product, index) => {
    this.setState({ clickAddButton: true });
    let isFoundProduct = false;
    let productBuyData = null;
    product.options[0].values[1]
      ? this.state.sizeValue
        ? (productBuyData = {
            quantityNumber: 1,
            sizeValue: this.state.sizeValue,
            productName: product.title,
            productPrice: product.variants[0].price,
            productImage: product.images[0].src,
            productLink: window.location.pathname.split("/")[2] + "/" + index,
          })
        : (productBuyData = {
            quantityNumber: 1,
            sizeValue: this.state.sizeValueChanged
              ? this.state.sizeValue
              : product.options[0].values[0],
            productName: product.title,
            productPrice: product.variants[0].price,
            productImage: product.images[0].src,
            productLink: window.location.pathname,
          })
      : (productBuyData = {
          quantityNumber: 1,
          productName: product.title,
          productPrice: product.variants[0].price,
          productImage: product.images[0].src,
          productLink: window.location.pathname.split("/")[2] + "/" + index,
        });
    if (
      localStorage.getItem("cartData") != null &&
      localStorage.getItem("userId") === null
    ) {
      let currentCartData = [];
      currentCartData = JSON.parse(localStorage.getItem("cartData"));
      for (i = 0; i < currentCartData.length; i++) {
        if (
          productBuyData.productImage === currentCartData[i].productImage &&
          productBuyData.sizeValue === currentCartData[i].sizeValue
        ) {
          isFoundProduct = true;
          currentCartData[i].quantityNumber += 1;
        } else if (
          isFoundProduct === false &&
          i === currentCartData.length - 1
        ) {
          currentCartData.push({
            quantityNumber: 1,
            sizeValue: productBuyData.sizeValue,
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
        sizeValue: productBuyData.sizeValue,
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
          for (i = 0; i < currentCartData.length; i++) {
            if (
              productBuyData.productImage === currentCartData[i].productImage &&
              productBuyData.sizeValue === currentCartData[i].sizeValue
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
                sizeValue: productBuyData.sizeValue,
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
    const { clickAddButton } = this.state;
    return (
      <>
        <Navbar />
        <Row justify="center">
          <h1 className="CategoryNameHeader" data-aos="zoom-in">
            {categoryName}
          </h1>
        </Row>
        <Divider className="CategoryDivider" />
        <Row className="CategorySecondRow">
          <Col
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            style={{ textAlign: "center" }}
          >
            <Media query={{ minWidth: 500 }}>
              {(matches) =>
                matches ? (
                  <Select
                    defaultValue="Filter"
                    style={{ width: 120, fontSize: "1.25em" }}
                    bordered={false}
                  >
                    <Option value="all_products">All products</Option>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>
                ) : (
                  <Select
                    defaultValue="Filter"
                    className="CategorySelector"
                    bordered={false}
                  >
                    <Option value="all_products">All products</Option>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>
                )
              }
            </Media>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8} className="ProductLengthCol">
            {this.props.categoryData.products.length ? (
              <span>{this.props.categoryData.products.length} Products</span>
            ) : null}
          </Col>
          <Col
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            style={{ textAlign: "center" }}
          >
            <Media query={{ minWidth: 500 }}>
              {(matches) =>
                matches ? (
                  <Select
                    defaultValue="Sort"
                    style={{ width: 131, fontSize: "1.25em" }}
                    bordered={false}
                  >
                    <Option value="featured">Featured</Option>
                    <Option value="AtoZ">A-Z</Option>
                    <Option value="ZtoA">Z-A</Option>
                    <Option value="LowHighPrice">Price, low to high</Option>
                    <Option value="HighLowPrice">Price, high to low</Option>
                    <Option value="NewOldDate">Date, new to old</Option>
                    <Option value="OldNewDate">Date, old to new</Option>
                  </Select>
                ) : (
                  <Select
                    defaultValue="Sort"
                    className="CategorySelector"
                    bordered={false}
                  >
                    <Option value="featured">Featured</Option>
                    <Option value="AtoZ">A-Z</Option>
                    <Option value="ZtoA">Z-A</Option>
                    <Option value="LowHighPrice">Price, low to high</Option>
                    <Option value="HighLowPrice">Price, high to low</Option>
                    <Option value="NewOldDate">Date, new to old</Option>
                    <Option value="OldNewDate">Date, old to new</Option>
                  </Select>
                )
              }
            </Media>
          </Col>
        </Row>
        <Divider className="CategoryDivider" />
        <Row justify="center" className="CategoryThirdRow">
          {this.props.categoryData.products &&
            this.props.categoryData.products.map((product, index) => (
              <>
                <Col style={{ marginBottom: "50px" }}>
                  <Media query={{ minWidth: 500 }}>
                    {(matches) =>
                      matches ? (
                        <Card
                          data-aos="fade-up"
                          style={{ width: 500 }}
                          cover={
                            <Link
                              to={`/${
                                window.location.pathname.split("/")[2]
                              }/${index}`}
                            >
                              <div className="CardStyle">
                                <img
                                  style={{ width: "500px", height: "500px" }}
                                  alt={product.title}
                                  src={product.images[0].src}
                                />
                                <Meta
                                  className="HomepageCardMeta"
                                  title={product.title}
                                  description={
                                    "LE " + product.variants[0].price
                                  }
                                />
                              </div>
                            </Link>
                          }
                        >
                          <Form
                            onFinish={(event) => {
                              this.handleSubmit(product, index);
                            }}
                          >
                            {product.options[0].values[1] ? (
                              <Form.Item
                                className="ProductSizeNumber"
                                label="Size"
                              >
                                <Select
                                  onSelect={this.handleChange}
                                  defaultValue={product.options[0].values[0]}
                                >
                                  {product.options[0].values.map((value) => (
                                    <Select.Option key={index} value={value}>
                                      {value}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            ) : null}
                            <Button
                              className="CategoryAddButton"
                              type="primary"
                              htmlType="submit"
                              disabled={clickAddButton}
                            >
                              ADD TO CART
                            </Button>
                          </Form>
                        </Card>
                      ) : (
                        <Card
                          style={{ width: "100%" }}
                          cover={
                            <Link
                              to={`/${
                                window.location.pathname.split("/")[2]
                              }/${index}`}
                            >
                              <div className="CardStyle">
                                <img
                                  style={{ width: "100%", height: "400px" }}
                                  alt={product.title}
                                  src={product.images[0].src}
                                />
                                <Meta
                                  className="HomepageCardMeta"
                                  title={product.title}
                                  description={
                                    "LE " + product.variants[0].price
                                  }
                                />
                              </div>
                            </Link>
                          }
                        >
                          <Form
                            onFinish={(event) => {
                              this.handleSubmit(product, index);
                            }}
                          >
                            {product.options[0].values[1] ? (
                              <Form.Item
                                className="ProductSizeNumber"
                                label="Size"
                              >
                                <Select
                                  onSelect={this.handleChange}
                                  defaultValue={product.options[0].values[0]}
                                >
                                  {product.options[0].values.map((value) => (
                                    <Select.Option key={index} value={value}>
                                      {value}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            ) : null}
                            <Button
                              className="CategoryAddButton"
                              type="primary"
                              htmlType="submit"
                              disabled={clickAddButton}
                            >
                              ADD TO CART
                            </Button>
                          </Form>
                        </Card>
                      )
                    }
                  </Media>
                </Col>
                <Divider type="vertical" />
              </>
            ))}
        </Row>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryData: state.categoryReducer,
    categoryDataLoading: state.categoryReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategoryData: (url) => dispatch(actions.categoryReducer(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
