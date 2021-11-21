import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Homepage from "./containers/Homepage/Homepage";
import Category from "./containers/Category/Category";
import ContactUs from "./containers/ContactUs/ContactUs";
import ReturnPolicy from "./containers/ReturnPolicy/ReturnPolicy";
import OurStory from "./containers/OurStory/OurStory";
import FAQs from "./containers/FAQs/FAQs";
import Login from "./containers/Login/Login";
import CreateAccount from "./containers/CreateAccount/CreateAccount";
import Product from "./containers/Product/Product";
import PreviousPurchases from "./containers/PreviousPurchases/PreviousPurchases";
import Cart from "./containers/Cart/Cart";

const collectionNames = [
  {
    name: "kids-blanket-animal-onesie",
    id: 1,
  },
  {
    name: "men-pajama-sets-winter-collection",
    id: 2,
  },
  {
    name: "normal-blanket",
    id: 3,
  },
  {
    name: "snuggs-blanket-hoodie",
    id: 4,
  },
  {
    name: "snuggs-blanket-onesie-adults",
    id: 5,
  },
  {
    name: "snuggs-monk-blanket",
    id: 6,
  },
  {
    name: "the-snugg-boots",
    id: 7,
  },
  {
    name: "winter-women-slippers",
    id: 8,
  },
  {
    name: "women-winter-pajama-sets",
    id: 9,
  },
];

class App extends Component {
  componentDidMount() {
    AOS.init({
      duration: 1000,
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/collections/:id" component={Category} />
          <Route path="/pages/contact-us" component={ContactUs} />
          <Route
            path="/pages/return-exchange-policy"
            component={ReturnPolicy}
          />
          <Route path="/pages/our-story" component={OurStory} />
          <Route path="/pages/faqs" component={FAQs} />
          <Route
            path="/account/login"
            render={() =>
              localStorage.getItem("userId") ? <Redirect to="/" /> : <Login />
            }
          />

          <Route
            path="/account/register"
            render={() =>
              localStorage.getItem("userId") ? (
                <Redirect to="/" />
              ) : (
                <CreateAccount />
              )
            }
          />
          <Route
            path="/history"
            render={() =>
              localStorage.getItem("userId") ? (
                <PreviousPurchases />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="collections/:id/product/:id" component={Product} />
          <Route path="/cart" component={Cart} />
          {collectionNames.map((collectionName) => (
            <Route
              key={collectionName.id}
              path={`/${collectionName.name}/:id`}
              component={Product}
            />
          ))}
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
