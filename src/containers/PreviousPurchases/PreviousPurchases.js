import React, { Component } from "react";
import { Collapse, Row } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { List } from "antd";
import axios from "axios";
import "./PreviousPurchases.css";

const { Panel } = Collapse;

class PreviousPurchases extends Component {
  state = {
    purchasedDatas: null,
    previousPurchasesBool: false,
  };
  componentWillMount() {
    axios
      .get(
        `${
          process.env.REACT_APP_DATABASE_BASE_URL
        }/orders/${localStorage.getItem("userId")}/.json`
      )
      .then((response) => {
        if (response.data !== null) {
          this.setState({ previousPurchasesBool: true });
          let tempPurchase = [];
          for (let key in response.data) {
            tempPurchase.push({
              ...response.data[key],
              key: key,
            });
          }
          this.setState({ purchasedDatas: tempPurchase });
        }
      });
  }

  render() {
    const { previousPurchasesBool, purchasedDatas } = this.state;
    return (
      <>
        <Navbar />
        <Row justify="center" data-aos="fade-up">
          <h1 className="OurStoryHeader">Previous Purchases</h1>
        </Row>
        <Row className="PreviousPurchasesRow">
          <>
            {previousPurchasesBool ? (
              <Collapse
                style={{ width: "-webkit-fill-available" }}
                defaultActiveKey={["0"]}
              >
                {purchasedDatas &&
                  purchasedDatas.map((purchasedData) => (
                    <Panel header={<b>{`${purchasedData[0].date}`}</b>}>
                      <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={purchasedData[0].previousPurchases}
                        footer={
                          <div>
                            Total Items Price:{" "}
                            <b> LE {`${purchasedData[0].money}`}</b>
                          </div>
                        }
                        renderItem={(item) => (
                          <List.Item
                            key={item.key}
                            extra={
                              <img
                                width={272}
                                alt="logo"
                                src={item.productImage}
                              />
                            }
                          >
                            <List.Item.Meta
                              title={
                                <a href={item.productLink}>
                                  {item.productName}
                                </a>
                              }
                              description={`Quantity Number: ${
                                item.quantityNumber
                              } ${
                                item.sizeValue
                                  ? `, Size: ${item.sizeValue} `
                                  : " "
                              }, Price Each Piece: LE ${item.productPrice}`}
                            />
                            <p>
                              Items Price:{" "}
                              <b>
                                {" LE "}
                                {item.quantityNumber * item.productPrice}
                              </b>
                            </p>
                          </List.Item>
                        )}
                      />
                    </Panel>
                  ))}
              </Collapse>
            ) : (
              <Row className="PreviousPurchasesRow" data-aos="fade-up">
                <h1>You haven't bought any items yet</h1>
              </Row>
            )}
          </>
        </Row>
        <Footer />
      </>
    );
  }
}

export default PreviousPurchases;
