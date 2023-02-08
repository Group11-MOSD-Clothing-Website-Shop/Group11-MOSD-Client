import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import userRequest from "../config";
import { emptyCart } from "../redux/cartRedux";
import { Container, Typography } from "@mui/material";

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navi = useNavigate();
  const data = location?.state?.stripeData;
  const cart = location?.state?.cart;
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await userRequest.post("/orders/new", {
          userId: currentUser?._id,
          products: cart?.products?.map((item) => ({
            productId: item?._id,
            quantity: item?.quantity,
          })),
          amount: cart?.total,
          address: {
            name:
              data?.address?.recipient_name ||
              data?.billing_details?.name ||
              currentUser?.name,
            line1:
              data?.address?.line1 ||
              data?.billing_details?.address?.line1 ||
              "19 Los Angeles",
            city:
              data?.address?.city ||
              data?.billing_details?.address?.city ||
              "Los Angeles",
            postal_code:
              data?.address?.postal_code ||
              data?.billing_details?.address?.postal_code ||
              "123",
            country_code:
              data?.address?.country_code ||
              data?.payment_method_details?.card?.country ||
              "456",
          },
          paymentMethod:
            data?.payment_method_details?.card?.brand || data
              ? "paypal"
              : "coin",
        });
        setOrder(response?.data);
        dispatch(emptyCart());
      } catch (error) {
        console.log(error);
      }
    };
    createOrder();
    window.history.replaceState({}, document.title);
  }, [cart, data, currentUser, dispatch]);
  useEffect(() => {
    if (!cart) navi("/");
  }, [cart, navi]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!order ? (
        `Order are being processed.`
      ) : (
        <Container
          className="container-history"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Typography variant="h4">Order Details</Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Postal Code</th>
                  <th>Country Code</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{currentUser?.name || ""}</td>
                  <td>
                    {order?.address?.line1 || ""} - {order?.address?.city || ""}
                  </td>
                  <td>{order?.address?.postal_code || ""}</td>
                  <td>
                    {order?.address?.country_code ||
                      order?.payment_method_details?.card?.country ||
                      ""}
                  </td>
                  <td>
                    {order?.payment_method_details?.card?.brand || data
                      ? "Paypal"
                      : "XTZ"}
                  </td>
                </tr>
              </tbody>
            </table>

            <table style={{ marginTop: "30px" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart?.products?.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                        src={item?.images[0]?.url}
                        alt={item?.title}
                      />
                    </td>
                    <td>{item?.title}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4">Total = ${cart?.total}</td>
                  <td colSpan="4">Total(XTZ) = ${cart?.total_tez}</td>
                </tr>
              </tbody>
            </table>
          </Container>
        </Container>
      )}
      <button style={{ padding: 10, marginTop: 20 }} onClick={() => navi("/")}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
