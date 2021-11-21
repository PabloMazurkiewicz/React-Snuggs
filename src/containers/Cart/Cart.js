import React, { Component } from "react";
import { Row, Button, InputNumber } from "antd";
import DataTable from "react-data-table-component";
import { ArrowRightOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CurrencyFormat from "react-currency-format";
import Notify from "../../components/Toastify/Toastify";
import * as actions from "../../store/actions/index";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Cart.css";

class Cart extends Component {
  state = {
    allCartData: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (localStorage.getItem("cartData") !== null) {
      this.setState({
        cartEmpty: false,
        allCartData: JSON.parse(localStorage.getItem("cartData")),
      });
      if (JSON.parse(localStorage.getItem("cartData")).length === 0) {
        localStorage.removeItem("cartData");
      }
    } else if (localStorage.getItem("userId") !== null) {
      this.props.loadCartData();
    }
  }

  onChangeQuantity = (key) => (value) => {
    if (localStorage.getItem("userId") != null) {
      axios
        .put(
          `${
            process.env.REACT_APP_DATABASE_BASE_URL
          }/cart/${localStorage.getItem("userId")}/${
            key.key
          }/quantityNumber.json`,
          value
        )
        .then((response) => window.location.reload())
        .catch((error) => Notify("Failed to change quantity", "error"));
    } else {
      let index = this.state.allCartData.findIndex(
        (product) => product.productName === key.productName
      );
      let clonedCartData = [];
      clonedCartData = [...this.state.allCartData];
      clonedCartData[index].quantityNumber = value;
      this.setState({ allCartData: clonedCartData });
      localStorage.setItem("cartData", JSON.stringify(this.state.allCartData));
      window.location.reload();
    }
  };

  onClickRemoveHandler = (key) => {
    if (localStorage.getItem("userId") !== null) {
      axios
        .delete(
          `${
            process.env.REACT_APP_DATABASE_BASE_URL
          }/cart/${localStorage.getItem("userId")}/${key.key}.json`
        )
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => Notify("Failed to remove item", "error"));
    } else {
      let index = this.state.allCartData.findIndex(
        (product) =>
          product.productName === key.productName &&
          product.sizeValue === key.sizeValue
      );
      this.state.allCartData[index] = null;
      var filteredCartData = this.state.allCartData.filter(function (element) {
        return element != null;
      });
      localStorage.setItem("cartData", JSON.stringify(filteredCartData));
      window.location.reload();
    }
  };

  handleCheckout = (date, time, money) => {
    if (localStorage.getItem("userId") != null) {
      let cartData = null;
      let DateAndTime = date + "," + time;
      cartData = [
        {
          date: DateAndTime,
          money: money,
          previousPurchases: this.props.cartData,
        },
      ];
      axios
        .post(
          `${
            process.env.REACT_APP_DATABASE_BASE_URL
          }/orders/${localStorage.getItem("userId")}.json`,
          cartData
        )
        .then((response) =>
          axios
            .delete(
              `${
                process.env.REACT_APP_DATABASE_BASE_URL
              }/cart/${localStorage.getItem("userId")}/.json`
            )
            .then((response) => {
              Notify("Checkout successful", "success");
              setTimeout(() => this.props.history.push("/history"), 3000);
            })
            .catch((error) =>
              Notify("Failed to start checkout procedure", "error")
            )
        )
        .catch((error) => Notify("Failed to checkout", "error"));
    } else {
      Notify("You must be signed in ", "error");
    }
  };

  render() {
    var i;
    let newDate = new Date();
    let minutes = newDate.getMinutes();
    let hours = newDate.getHours();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let FullDayTime = null;
    let FullDayDate = `${day}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
    if (minutes < 10) {
      minutes = `0` + minutes;
    }
    if (hours > 12) {
      hours = hours - 12;
      FullDayTime = hours + ":" + minutes + " PM";
    } else {
      FullDayTime = hours + ":" + minutes + " AM";
    }
    let subTotalCalculations = 0;
    if (localStorage.getItem("userId") != null) {
      for (i = 0; i < this.props.cartData.length; i++) {
        subTotalCalculations +=
          this.props.cartData[i].productPrice *
          this.props.cartData[i].quantityNumber;
      }
    } else {
      for (i = 0; i < this.state.allCartData.length; i++) {
        subTotalCalculations +=
          this.state.allCartData[i].productPrice *
          this.state.allCartData[i].quantityNumber;
      }
    }

    const columns = [
      {
        name: "",
        cell: (row) => (
          <>
            <a className="CartHref" href={row.productLink}>
              <img
                className="CartProductImage"
                alt={row.productName}
                src={row.productImage}
              />
            </a>
          </>
        ),
      },
      {
        name: "Product",
        selector: "productName",
        cell: (row) => (
          <>
            <a className="CartHref" href={row.productLink}>
              <h1 className="CartProductHeader">{row.productName}</h1>
              {row.sizeValue ? (
                <p className="CartProductHeader">Size: {row.sizeValue}</p>
              ) : null}
            </a>
          </>
        ),
      },
      {
        name: "",
        selector: "year",
        right: true,
        cell: (row) => (
          <Button
            onClick={() => this.onClickRemoveHandler(row)}
            className="CartRemoveButton"
          >
            REMOVE
          </Button>
        ),
      },
      {
        name: "Price",
        right: true,
        grow: 0.2,
        cell: (row) => (
          <h1 className="CartProductHeader">
            <CurrencyFormat
              value={row.productPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"LE "}
              renderText={(value) => <>{value}</>}
            />
          </h1>
        ),
      },
      {
        name: "Quantity",
        selector: "quantityNumber",
        right: true,
        grow: 0.2,
        cell: (row) => (
          <InputNumber
            className="ProductInputNumber"
            size="large"
            min={1}
            max={50}
            value={row.quantityNumber}
            onChange={this.onChangeQuantity(row)}
          />
        ),
      },
      {
        name: "Total",
        selector: "year",
        right: true,
        grow: 0.2,
        cell: (row) => (
          <h1 className="CartProductHeader">
            <CurrencyFormat
              value={row.productPrice * row.quantityNumber}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"LE "}
              renderText={(value) => <>{value}</>}
            />
          </h1>
        ),
      },
    ];
    return (
      <>
        <Navbar />
        {this.props.cartData[0] || localStorage.getItem("cartData") ? (
          <>
            <Row className="CartRowItems" justify="center">
              <h1 className="CartYourCart" data-aos="zoom-in-down">
                Your cart
              </h1>
            </Row>
            <Row className="CartRowData" justify="center" data-aos="zoom-in-up">
              {this.props.cartData[0] ? (
                <DataTable columns={columns} data={this.props.cartData} />
              ) : (
                <DataTable
                  columns={columns}
                  data={this.state.allCartData || this.props.cartData[0]}
                />
              )}
            </Row>
            <Row className="CartSubtotal" data-aos="zoom-in-up">
              <h1>
                Subtotal:{" "}
                <CurrencyFormat
                  value={subTotalCalculations}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"LE "}
                  renderText={(value) => <>{value}</>}
                />
              </h1>
            </Row>
            <Row className="CartRow CartSubtotal" data-aos="zoom-in-up">
              <Button
                onClick={() =>
                  this.handleCheckout(
                    FullDayDate,
                    FullDayTime,
                    subTotalCalculations
                  )
                }
                className="CartCheckoutButton"
              >
                CHECK OUT
              </Button>
            </Row>
          </>
        ) : (
          <div className="CartRow">
            <Row justify="center" data-aos="zoom-in-down">
              <h1 className="CartYourCart">Your cart</h1>
            </Row>
            <Row justify="center" data-aos="zoom-in-down">
              <p className="CartEmptyParagraph">
                Your cart is currently empty.
              </p>
            </Row>
            <Row justify="center" data-aos="fade-right">
              <Button
                className="CartContinueShopping"
                onClick={() => (window.location.href = "/")}
              >
                CONTINUE SHOPPING <ArrowRightOutlined />
              </Button>
            </Row>
          </div>
        )}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cartReducer.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCartData: () => dispatch(actions.cartReducer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
