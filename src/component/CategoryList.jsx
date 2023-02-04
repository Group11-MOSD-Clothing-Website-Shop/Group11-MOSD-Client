import React from "react";
import { categories } from "../data";
import Category from "./CategoryItem";
import { Container } from "./style-component/CategoryList";
const CategoryList = () => {
  return (
    <Container>
      {categories?.map((item) => (
        <Category key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default CategoryList;
