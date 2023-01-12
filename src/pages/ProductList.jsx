import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Newsletter from "../component/Newsletter";
import Products from "../component/Products";
import {
  Containter,
  FilterContainer,
  Filter,
  Title,
  FilterText,
  Select,
  Option,
} from "./style-component/ProductList";
const ProductList = () => {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");
  const location = useLocation();
  const query = new URLSearchParams(location?.search);
  const category = query?.get("category");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  return (
    <Containter>
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" defaultValue="Color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" defaultValue="Size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="sort" defaultValue="Newest" onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="price">Price (asc)</Option>
            <Option value="-price">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filter={filter} sort={sort} />
      <Newsletter />
    </Containter>
  );
};

export default ProductList;
