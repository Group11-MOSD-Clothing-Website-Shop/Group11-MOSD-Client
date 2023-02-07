import { Button, CircularProgress, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../redux/apiCalls";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, isFetching, error } = useSelector((state) => state.order);
  useEffect(() => {
    getUserOrder(dispatch);
  }, [dispatch]);
  if (isFetching) return <CircularProgress />;
  return !error && !isFetching && orders && orders.length > 0 ? (
    <Container
      className="container-history"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">History</Typography>
      <Typography variant="h5">
        You have {orders?.length} {orders?.length === 1 ? "order" : "orders"}
      </Typography>
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
              <th>Order ID</th>
              <th>Date of Purchase</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item) => (
              <tr key={item?._id}>
                <td>{item?._id}</td>
                <td>{new Date(item?.createdAt).toLocaleDateString("vn-VN")}</td>
                <td>
                  <Link to={`/order/${item?._id}`}>View</Link>
                </td>
              </tr>
            ))}
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
      <Typography>No order recently</Typography>
      <Button component={Link} to="/" variant="contained">
        Go shopping
      </Button>
    </Container>
  );
};

export default OrderHistory;
