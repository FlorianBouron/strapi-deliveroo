import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { compose } from "recompose";
import Router from "next/router";
import { StripeProvider, Elements } from "react-stripe-elements";
import defaultPage from "../hocs/defaultPage";
import Cart from "../components/Cart";
import InjectedCheckoutForm from "../components/Checkout/CheckoutForm";
import { withContext } from "../components/Context";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      stripe: null
    };
  }

  componentDidMount() {
    const { context } = this.props;
    const { isAuthenticated } = this.props;
    if (context.items.length === 0 || !isAuthenticated) {
      Router.push("/");
    }
    this.setState({
      stripe: window.Stripe("pk_test_Key")
    });
  }

  render() {
    const { isAuthenticated } = this.props;
    const { context } = this.props;
    if (context.items.length === 0) {
      return <h1>Loading</h1>;
    } else {
      return (
        <Row>
          <Col
            style={{ paddingRight: 0 }}
            sm={{ size: 3, order: 1, offset: 2 }}
          >
            <h1 style={{ margin: 20 }}>Checkout</h1>
            <Cart isAuthenticated={isAuthenticated} />
          </Col>
          <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <InjectedCheckoutForm context={this.props.context} />
              </Elements>
            </StripeProvider>
          </Col>
        </Row>
      );
    }
  }
}
export default compose(
  defaultPage,
  withContext
)(Checkout);