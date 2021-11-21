import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Dropdown, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
  },
  {
    name: "Women Winter Pajama Sets",
    href: "/collections/women-winter-pajama-sets",
  },
  {
    name: "Men Winter Pajama Sets",
    href: "/collections/men-pajama-sets-winter-collection",
  },
  {
    name: "Cart",
    href: "/cart",
  },
  {
    name: "Contact us",
    href: "/pages/contact-us",
  },
  {
    name: "Return & Exchange policy",
    href: "/pages/return-exchange-policy",
  },
  {
    name: "Our story",
    href: "/pages/our-story",
  },
  {
    name: "FAQs",
    href: "/pages/faqs",
  },
];

class BurgerMenu extends Component {
  state = {
    clickSignOut: false,
  };

  signOutHandler() {
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    this.props.history.push("/");
  }

  render() {
    const { clickSignOut } = this.state;
    return (
      <div className="menu">
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
        <ul>
          <li>
            <Dropdown className="NavBarliA" overlay={blanketsMenu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Winter Wearable Blankets <DownOutlined />
              </a>
            </Dropdown>
          </li>
          <li>
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
            <li key={navbarLi.name}>
              <a className="NavBarliA" href={navbarLi.href}>
                {navbarLi.name}
              </a>
            </li>
          ))}
          {localStorage.getItem("userId") !== null ? (
            <li>
              <a
                className="NavBarliA"
                onClick={() => this.setState({ clickSignOut: true })}
              >
                Sign Out
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default withRouter(BurgerMenu);
