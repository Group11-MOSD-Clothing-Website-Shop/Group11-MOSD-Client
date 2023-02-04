import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateCartProduct } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import userRequest from "../config";
import { useNavigate } from "react-router-dom";
import PayPal from "../component/PayPal";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Container,
  Wrapper,
  Title,
  Top,
  TopButton,
  TopText,
  Bottom,
  Info,
  Hr,
  Product,
  ProductDetail,
  ImageContainer,
  Image,
  Details,
  ProductName,
  ProductId,
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  Button,
  Summary,
  SummaryTitle,
  SummaryItem,
  SummaryItemText,
  SummaryItemPrice,
} from "./style-component/Cart";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
} from "@airgap/beacon-sdk";
// import { InMemorySigner } from "@taquito/signer";
const KEY = process.env.REACT_APP_STRIPE;
const Cart = () => {
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://rpc.ghostnet.teztnets.xyz")
  );
  const [publicToken, setPublicToken] = useState("");
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [beaconConnection, setBeaconConnection] = useState(false);
  console.log("publicToken", publicToken);
  console.log("userAddress", userAddress);
  console.log("userBalance", userBalance);
  console.log("userBalance", userBalance);
  console.log("beaconConnection", beaconConnection);
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const addQuantity = async (productId, price, quantity, currentQuantity) => {
    if (currentQuantity === 10) return;
    const xtzPrice = await fetchPrice();
    dispatch(
      updateCartProduct({
        productId,
        amount: price,
        quantity,
        xtzPrice,
      })
    );
  };
  const mystyle = {
    width: "16px",
    height: "16px",
    verticalAlign: "middle",
  };
  const minusQuantity = async (productId, price, quantity, currentQuantity) => {
    if (currentQuantity === 1) return;
    const xtzPrice = await fetchPrice();
    dispatch(
      updateCartProduct({
        productId,
        amount: price,
        quantity,
        xtzPrice,
      })
    );
  };
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken?.id,
          amount: cart.total * 100,
        });
        navi("/success", {
          state: {
            stripeData: response.data,
            cart: cart,
          },
        });
      } catch (error) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, navi, cart]);

  const setup = async (userAddress) => {
    setUserAddress(userAddress);
    // updates balance
    const balance = await Tezos.tz.getBalance(userAddress);
    setUserBalance(balance.toNumber());
  };

  useEffect(() => {
    (async () => {
      // creates a wallet instance
      const wallet = new BeaconWallet({
        name: "Taquito Boilerplate",
        preferredNetwork: NetworkType.CUSTOM,
        disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: (data) => setPublicToken(data.publicKey),
          },
        },
      });
      Tezos.setWalletProvider(wallet);
      setWallet(wallet);
      // checks if wallet was connected before
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH();
        await setup(userAddress);
        setBeaconConnection(true);
      }
    })();
  }, [Tezos]);

  const fetchPrice = async () => {
    const priceJSON = await (
      await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=XTZ&tsyms=BTC,USD,EUR"
      )
    ).json();
    const xtzToUsd = priceJSON.USD;
    return xtzToUsd;
  };

  const handleDelete = async (productId, quantity, price) => {
    const xtzPrice = await fetchPrice();
    dispatch(
      deleteProduct({
        productId,
        amount: quantity * price,
        xtzPrice,
      })
    );
  };
  const tranSuccess = async (payment) => {
    navi("/success", {
      state: {
        stripeData: payment,
        cart: cart,
      },
    });
  };
  const connectWallet = async () => {
    try {
      await wallet.requestPermissions({
        network: {
          type: NetworkType.CUSTOM,
          rpcUrl: "https://rpc.ghostnet.teztnets.xyz",
        },
      });
      // gets user's address
      const userAddress = await wallet.getPKH();
      await setup(userAddress);
      setBeaconConnection(true);
    } catch (error) {
      console.log(error);
    }
  };
  const payXTZ = async (total) => {
    await connectWallet();
    const priceJSON = await (
      await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=XTZ&tsyms=BTC,USD,EUR"
      )
    ).json();
    const xtzToUsd = priceJSON.USD;
    const amount = Math.round(total / xtzToUsd);
    const address = "tz1bnmFGgKfrRfHLNABQpWh14CjsTKmrFNog";

    Tezos.wallet
      .transfer({ to: address, amount: amount })
      .send()
      .then((op) => {
        console.log(`Waiting for ${op.opHash} to be confirmed...`);
        return op.confirmation(1).then(() => op.opHash);
      })
      .then((hash) => {
        console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`);
        navi("/success", {
          state: {
            cart: cart,
          },
        });
      })
      .catch((error) =>
        console.log(`Error: ${JSON.stringify(error, null, 2)}`)
      );
  };
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navi("/")}>CONTINUE SHOPPING</TopButton>
          <TopText>Your Wish List(0)</TopText>
        </Top>
        <Bottom>
          <Info>
            {cart?.products?.length === 0
              ? ""
              : cart?.products?.map((item) => (
                  <React.Fragment key={item._id}>
                    <Hr />
                    <Product>
                      <ProductDetail>
                        <ImageContainer>
                          <Image src={item?.images[0]?.url} />
                        </ImageContainer>
                        <Details>
                          <ProductName>
                            <b>Product:</b> {item?.title.toUpperCase()}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {item?._id}
                          </ProductId>
                          <ProductColor color={item?.color[0]} />
                          <ProductSize>
                            <b>Size:</b> {item?.size[0]}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <RemoveIcon
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              minusQuantity(
                                item?._id,
                                item?.price * -1,
                                -1,
                                item?.quantity
                              )
                            }
                          />
                          <ProductAmount>{item?.quantity}</ProductAmount>
                          <AddIcon
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              addQuantity(
                                item?._id,
                                item?.price,
                                1,
                                item?.quantity
                              )
                            }
                          />
                        </ProductAmountContainer>
                        <ProductPrice>
                          $ {item?.price * item?.quantity}
                        </ProductPrice>
                        <Button
                          style={{ width: "60%" }}
                          onClick={() =>
                            handleDelete(item?._id, item?.quantity, item?.price)
                          }
                        >
                          Delete
                        </Button>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </React.Fragment>
                ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart?.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart?.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total_tez">
              <SummaryItemText>Total(XTZ)</SummaryItemText>
              <SummaryItemPrice>
                <img
                  style={mystyle}
                  src="https://objkt.com/assets/XTZ.svg"
                  alt=""
                />{" "}
                {cart?.total_tez}
              </SummaryItemPrice>
            </SummaryItem>
            {cart?.total && cart?.total > 0 && currentUser && (
              <div className="checkout-container">
                <StripeCheckout
                  name="Shopping"
                  image="https://coin68.com/wp-content/uploads/2022/04/stripe-payment.jpg"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart?.total}`}
                  amount={cart?.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button
                    disabled={cart.total <= 0 || !currentUser}
                    style={{
                      backgroundColor: "#45b1e8",
                      border: "none",
                      color: "black",
                      fontSize: "11px",
                      fontWeight: "200",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px",
                    }}
                  >
                    <PaymentIcon /> Checkout
                  </Button>
                </StripeCheckout>
                <PayPal disabled total={cart.total} tranSuccess={tranSuccess} />
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                  onClick={() => payXTZ(cart?.total)}
                >
                  <img
                    style={{ width: "16px", height: "16px" }}
                    src="data:image/png;base64,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"
                    alt="Built with Taquito"
                  />
                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    Pay with XTZ
                  </span>
                </Button>
              </div>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
