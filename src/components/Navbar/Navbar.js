import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col, Input, Row, Menu, Dropdown, Divider, Modal } from "antd";
import Media from "react-media";
import Popup from "reactjs-popup";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import BurgerMenu from "../BurgerMenu/Menu";
import BurgerIcon from "../BurgerMenu/BurgerMenu";
import "./Navbar.css";

const blanketsMenu = (
  <Menu>
    <Menu.Item>
      <a href="/collections/snuggs-blanket-hoodie">Snuggs Blanket Hoodie</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/collections/snuggs-monk-blanket">Snuggs Blanket Monk</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/collections/kids-blanket-animal-onesie">Kids Blanket Onesie</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/collections/snuggs-blanket-onesie-adults">
        Snuggs Blanket Adult Onesies
      </a>
    </Menu.Item>
  </Menu>
);
const footwearMenu = (
  <Menu>
    <Menu.Item>
      <a href="/collections/winter-women-slippers">Winter Women Slippers</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/collections/the-snugg-boots">The Snugg Boots</a>
    </Menu.Item>
  </Menu>
);

const navbarLis = [
  {
    name: "Sofa Blanket Throws",
    href: "/collections/normal-blanket",
    className: "NavbarLi",
  },
  {
    name: "Women Winter Pajama Sets",
    href: "/collections/women-winter-pajama-sets",
    className: "NavbarLi",
  },
  {
    name: "Men Winter Pajama Sets",
    href: "/collections/men-pajama-sets-winter-collection",
    className: "NavbarLi",
  },
  {
    name: "Cart",
    href: "/cart",
    className: "NavbarLi",
  },
  {
    name: "Contact us",
    href: "/pages/contact-us",
    className: "NavbarLi",
  },
  {
    name: "Return & Exchange policy",
    href: "/pages/return-exchange-policy",
    className: "NavbarLi",
  },
  {
    name: "Our story",
    href: "/pages/our-story",
    className: "NavbarLi",
  },
  {
    name: "FAQs",
    href: "/pages/faqs",
    className: "NavbarLi",
  },
];

const { Search } = Input;

class Navbar extends Component {
  state = {
    clickSignOut: false,
  };

  signOutHandler() {
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    if (this.props.history.location.pathname === "/") {
      window.location.reload();
    } else this.props.history.push("/");
  }

  render() {
    const { clickSignOut } = this.state;
    return (
      <>
        <Modal
          title="Sign Out"
          visible={clickSignOut}
          onOk={() => this.signOutHandler()}
          onCancel={() => this.setState({ clickSignOut: false })}
          okButtonProps={{
            children: "Custom OK",
          }}
          cancelButtonProps={{
            children: "Custom Cancel",
          }}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to sign out?</p>
        </Modal>
        {this.props.location.pathname === "/" ? (
          <Row className="NavbarRow">
            <Col xs={12} sm={12} md={8} lg={8} xl={6} data-aos="zoom-in-up">
              <a className="NavbarLogoA" href="/">
                <img
                  className="NavbarLogo"
                  alt="Snuggs Logo"
                  src={`${process.env.REACT_APP_SHOPIFY_BASE_URL}/black.png`}
                />
              </a>
            </Col>

            <Col xs={0} sm={0} md={8} lg={8} xl={12} data-aos="zoom-in-down">
              <ul className="NavbarUl">
                <li className="NavbarLi">
                  <Dropdown className="NavBarliA" overlay={blanketsMenu}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Winter Wearable Blankets <DownOutlined />
                    </a>
                  </Dropdown>
                </li>
                <li className="NavbarLi">
                  <Dropdown className="NavBarliA" overlay={footwearMenu}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Footwear <DownOutlined />
                    </a>
                  </Dropdown>
                </li>
                {navbarLis.map((navbarLi) => (
                  <li key={navbarLi.name} className={navbarLi.className}>
                    <a className="NavBarliA" href={navbarLi.href}>
                      {navbarLi.name}
                    </a>
                  </li>
                ))}
                {localStorage.getItem("userId") !== null ? (
                  <li className="NavbarLi">
                    <a
                      className="NavBarliA"
                      onClick={() => this.setState({ clickSignOut: true })}
                    >
                      Sign Out
                    </a>
                  </li>
                ) : null}
              </ul>
            </Col>
            <Col
              className="NavbarRightCol"
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              data-aos="zoom-in-up"
            >
              <Search
                placeholder="Search"
                allowClear
                className="NavbarSearch"
              />
              {localStorage.getItem("userId") ? (
                <a className="NavbarIconsA" href="/history">
                  <UserOutlined className="NavbarIcons" />
                </a>
              ) : (
                <a className="NavbarIconsA" href="/account/login">
                  <UserOutlined className="NavbarIcons" />
                </a>
              )}
              <a className="NavbarIconsA" href="/cart">
                <ShoppingCartOutlined className="NavbarIcons" />
              </a>
            </Col>
            <Media query={{ maxWidth: 767 }}>
              {(matches) =>
                matches ? (
                  <div className="popupDiv">
                    <Popup
                      className="popupContent"
                      modal
                      overlayStyle={{ background: "rgba(255,255,255,0.98" }}
                      closeOnDocumentClick={false}
                      trigger={(open) => <BurgerIcon open={open} />}
                    >
                      {(close) => <BurgerMenu close={close} />}
                    </Popup>
                  </div>
                ) : null
              }
            </Media>
          </Row>
        ) : (
          <Row className="NavbarRow">
            <Col xs={12} sm={12} md={8} lg={8} xl={6}>
              <a className="NavbarLogoA" href="/">
                <img
                  className="NavbarLogo"
                  alt="Snuggs Logo"
                  src={`${process.env.REACT_APP_SHOPIFY_BASE_URL}/black.png`}
                />
              </a>
            </Col>

            <Col xs={0} sm={0} md={8} lg={8} xl={12}>
              <ul className="NavbarUl">
                <li className="NavbarLi">
                  <Dropdown className="NavBarliA" overlay={blanketsMenu}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Winter Wearable Blankets <DownOutlined />
                    </a>
                  </Dropdown>
                </li>
                <li className="NavbarLi">
                  <Dropdown className="NavBarliA" overlay={footwearMenu}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Footwear <DownOutlined />
                    </a>
                  </Dropdown>
                </li>
                {navbarLis.map((navbarLi) => (
                  <li key={navbarLi.name} className={navbarLi.className}>
                    <a className="NavBarliA" href={navbarLi.href}>
                      {navbarLi.name}
                    </a>
                  </li>
                ))}
                {localStorage.getItem("userId") !== null ? (
                  <li className="NavbarLi">
                    <a
                      className="NavBarliA"
                      onClick={() => this.setState({ clickSignOut: true })}
                    >
                      Sign Out
                    </a>
                  </li>
                ) : null}
              </ul>
            </Col>
            <Col
              className="NavbarRightCol"
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={6}
            >
              <Search
                placeholder="Search"
                allowClear
                className="NavbarSearch"
              />
              {localStorage.getItem("userId") ? (
                <a className="NavbarIconsA" href="/history">
                  <UserOutlined className="NavbarIcons" />
                </a>
              ) : (
                <a className="NavbarIconsA" href="/account/login">
                  <UserOutlined className="NavbarIcons" />
                </a>
              )}
              <a className="NavbarIconsA" href="/cart">
                <ShoppingCartOutlined className="NavbarIcons" />
              </a>
            </Col>
            <Media query={{ maxWidth: 767 }}>
              {(matches) =>
                matches ? (
                  <div className="popupDiv">
                    <Popup
                      className="popupContent"
                      modal
                      overlayStyle={{ background: "rgba(255,255,255,0.98" }}
                      closeOnDocumentClick={false}
                      trigger={(open) => <BurgerIcon open={open} />}
                    >
                      {(close) => <BurgerMenu close={close} />}
                    </Popup>
                  </div>
                ) : null
              }
            </Media>
          </Row>
        )}

        <Divider className="NavbarDivider" />
      </>
    );
  }
}

export default withRouter(Navbar);
