import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { Container } from "./style-component/Products";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/apiCalls";
const Products = ({ category, filter, sort }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, numberOfPage, isFetching } = useSelector(
    (state) => state.product
  );
  const query = new URLSearchParams(location.search);
  const page = query?.get("page");
  useEffect(() => {
    const { color, size } = filter;
    getAllProducts(dispatch, category, color, size, sort, page);
  }, [category, filter, sort, page, location, dispatch]);
  if (isFetching) return <CircularProgress />;
  return (
    <React.Fragment>
      <Container>
        {products?.map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}
      </Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Pagination
          count={numberOfPage}
          showFirstButton
          showLastButton
          page={Number(page) || 1}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={`?page=${item.page}`}
            />
          )}
        />
      </div>
    </React.Fragment>
  );
};

export default Products;
