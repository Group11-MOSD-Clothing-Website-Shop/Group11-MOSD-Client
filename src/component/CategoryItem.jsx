import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Image,
  Infor,
  Title,
  Button,
} from "./style-component/CategoryItem";

const Category = ({ item }) => {
  const navi = useNavigate();
  return (
    <Container>
      <Image src={item.img} />
      <Infor>
        <Title>{item.title}</Title>
        <Button onClick={() => navi(`/products?category=${item.category}`)}>
          SHOP NOW
        </Button>
      </Infor>
    </Container>
  );
};

export default Category;
