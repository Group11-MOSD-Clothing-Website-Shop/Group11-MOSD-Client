import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
const OrderDetail = () => {
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const location = useLocation();
  const data = location?.state?.stripeData;
  const order = orders.find((o) => o._id === id);
  return order ? (
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
            {order?.products?.map((product, i) => {
              const item = products.find((p) => p._id === product.productId);
              return (
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
              );
            })}
            <tr>
              <td colSpan="4">Total = ${order?.amount}</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </Container>
  ) : (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <Typography>Invalid Order</Typography>
      <Button component={Link} to="/" variant="contained">
        Go shopping
      </Button>
    </Container>
  );
};

export default OrderDetail;
