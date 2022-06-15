import React, { Component } from "react";
import { Row, Col, InputNumber, Form, Button, Select } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import Notify from "../../components/Toastify/Toastify";
import * as actions from "../../store/actions/index";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Product.css";

class Product extends Component {
  state = {
    quantityNumber: 1,
    clickAddButton: false,
    mouseActivation: MOUSE_ACTIVATION.CLICK,
    touchActivation: TOUCH_ACTIVATION.TAP,
    dragToMove: true,
    sizeValueChanged: false,
    sizeValue: null,
    allCartData: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadProductData(
      `${process.env.REACT_APP_DATABASE_BASE_URL}/collections/${
        window.location.pathname.split("/")[1]
      }/products/${window.location.pathname.split("/")[2]}.json`
    );
    if (localStorage.getItem("cartData") != null) {
      this.setState({
        allCartData: JSON.parse(localStorage.getItem("cartData")),
      });
    }
  }

  onClickEnter = () => {
    this.setState({ quantityNumber: 1 });
  };

  onChangeQuantity = (value) => {
    if (typeof value === "number") {
      this.setState({ quantityNumber: value });
    }
  };

  handleChange = (value) => {
    this.setState({ sizeValue: value, sizeValueChanged: true });
  };

  handleSubmit = () => {
    this.setState({ clickAddButton: true });
    let productBuyData = null;
    let isFoundProduct = false;
    this.props.productData.options[0].values[1]
      ? this.state.sizeValue
        ? (productBuyData = {
            quantityNumber: this.state.quantityNumber,
            sizeValue: this.state.sizeValue,
            productName: this.props.productData.title,
            productPrice: this.props.productData.variants[0].price,
            productImage: this.props.productData.images[0].src,
            productLink: window.location.pathname,
          })
        : (productBuyData = {
            quantityNumber: this.state.quantityNumber,
            sizeValue: this.state.sizeValueChanged
              ? this.state.sizeValue
              : this.props.productData.options[0].values[0],
            productName: this.props.productData.title,
            productPrice: this.props.productData.variants[0].price,
            productImage: this.props.productData.images[0].src,
            productLink: window.location.pathname,
          })
      : (productBuyData = {
          quantityNumber: this.state.quantityNumber,
          productName: this.props.productData.title,
          productPrice: this.props.productData.variants[0].price,
          productImage: this.props.productData.images[0].src,
          productLink: window.location.pathname,
        });
    if (localStorage.getItem("userId") !== null) {
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
              productBuyData.productImage === currentCartData[i].productImage &&
              productBuyData.sizeValue === currentCartData[i].sizeValue
            ) {
              isFoundProduct = true;
              if (
                currentCartData[i].quantityNumber +
                  productBuyData.quantityNumber >
                50
              ) {
                currentCartData[i].quantityNumber = 50;
              } else {
                currentCartData[i].quantityNumber +=
                  productBuyData.quantityNumber;
              }
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
                quantityNumber: productBuyData.quantityNumber,
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
    } else {
      if (localStorage.getItem("cartData") != null) {
        let currentCartData = [];
        currentCartData = JSON.parse(localStorage.getItem("cartData"));
        for (let i = 0; i < currentCartData.length; i++) {
          if (
            productBuyData.productImage === currentCartData[i].productImage &&
            productBuyData.sizeValue === currentCartData[i].sizeValue
          ) {
            isFoundProduct = true;
            if (
              currentCartData[i].quantityNumber +
                productBuyData.quantityNumber >
              50
            ) {
              currentCartData[i].quantityNumber = 50;
            } else {
              currentCartData[i].quantityNumber +=
                productBuyData.quantityNumber;
            }
          } else if (
            isFoundProduct === false &&
            i === currentCartData.length - 1
          ) {
            currentCartData.push({
              quantityNumber: productBuyData.quantityNumber,
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
      } else {
        this.state.allCartData.push({
          quantityNumber: productBuyData.quantityNumber,
          sizeValue: productBuyData.sizeValue,
          productName: productBuyData.productName,
          productPrice: productBuyData.productPrice,
          productImage: productBuyData.productImage,
          productLink: productBuyData.productLink,
        });
        localStorage.setItem(
          "cartData",
          JSON.stringify(this.state.allCartData)
        );
        Notify("Item added successfully", "success");
        this.setState({ clickAddButton: false });
      }
    }
  };

  render() {
    const { mouseActivation, touchActivation, dragToMove, clickAddButton } =
      this.state;
    return (
      <>
        <Navbar />
        {this.props.productData.variants ? (
          <Row justify="center" className="ProductRow">
            <Col
              className="ProductImageCol"
              xs={24}
              sm={24}
              md={11}
              lg={11}
              xl={11}
              data-aos="zoom-in-right"
            >
              <Magnifier
                className="input-position"
                style={{ cursor: "zoom-in" }}
                imageSrc={this.props.productImage}
                largeImageSrc={this.props.productImage}
                mouseActivation={mouseActivation}
                touchActivation={touchActivation}
                dragToMove={dragToMove}
              />
              {this.props.productData.images.map((image) => (
                <img
                  key={image.src}
                  onClick={() => this.props.setImageProduct(image.src)}
                  className="ProductImage"
                  alt="Product"
                  src={image.src}
                />
              ))}
            </Col>
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              xl={11}
              data-aos="zoom-in-left"
            >
              <h1 className="ProductHeader">{this.props.productData.title}</h1>
              <h2 className="ProductPrice">
                LE {this.props.productData.variants[0].price}
              </h2>
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={(event) => {
                  this.handleSubmit();
                }}
              >
                {this.props.productData.options[0].values[1] ? (
                  <Form.Item className="ProductSizeNumber" label="Size">
                    <Select
                      defaultActiveFirstOption={true}
                      onSelect={this.handleChange}
                      defaultValue={this.props.productData.options[0].values[0]}
                    >
                      {this.props.productData.options[0].values.map((value) => (
                        <Select.Option key={value} value={value}>
                          {value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}
                <Form.Item label="Quantity">
                  <InputNumber
                    onPressEnter={this.onClickEnter}
                    type="number"
                    className="ProductInputNumber"
                    size="large"
                    min={1}
                    max={50}
                    defaultValue={1}
                    onChange={this.onChangeQuantity}
                  />
                  <Button
                    className="ProductAddCart"
                    htmlType="submit"
                    disabled={clickAddButton}
                  >
                    ADD TO CART
                  </Button>
                </Form.Item>
              </Form>
              <div
                className="ProductDetails"
                dangerouslySetInnerHTML={{
                  __html: this.props.productData.body_html,
                }}
              ></div>
            </Col>
          </Row>
        ) : null}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productData: state.productReducer.productData,
    productImage: state.productReducer.productImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProductData: (url) => dispatch(actions.productReducer(url)),
    setImageProduct: (data) => dispatch(actions.imageReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
