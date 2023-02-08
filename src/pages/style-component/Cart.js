import styled from "styled-components";
import { mobile, bigTablet } from '../../responsive';
export const Container = styled.div``
export const Wrapper = styled.div`
    padding: 10px;
`
export const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
export const Top = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
    transition: 0.5s ease;
    &:hover {
        background-color: black;
        opacity: 0.7;
        color: white;
    }
`

export const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
    text-align: center;
`
export const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${bigTablet({
    flexDirection: 'column'
})}
`
export const Info = styled.div`
    flex: 3;
`
export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 200px;
  ${mobile({
    flexDirection: 'column'
})}
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  width: 100%;
`;
export const ImageContainer = styled.div`
    width: 40%;
    padding: 10px;
`
export const Image = styled.img`
  width: 100%;
  max-width: 100px;
`;

export const Details = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`;

export const ProductName = styled.span``;

export const ProductId = styled.span`
`;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

export const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 200;
`;

export const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: max-content;
`;

export const SummaryTitle = styled.h1`
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummaryItemText = styled.span`
    font-size: 13px;
`;

export const SummaryItemPrice = styled.span`
    font-size: 13px;
`;

export const Button = styled.button`
  width: 250px;
  padding: 10px;
  background-color: #2C2E2F;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.5s ease;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
  }
  margin: 20px 0px;
  &:disabled {
    background-color: gray;
    opacity: 1;
  }
`;