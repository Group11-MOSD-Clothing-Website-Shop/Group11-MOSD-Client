import styled from 'styled-components'
import { tablet } from '../../responsive';
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${tablet({
  display: 'none'
})}
`;

export const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: ${props => props.changeSlide ? 'all 1s ease' : '0s'};
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

export const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

export const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
`;

export const InfoContainer = styled.div`
  flex: 2;
  padding: 40px;
`;

export const Title = styled.h1`
  font-size: 40px;
`;

export const Desc = styled.p`
  margin: 30px 0px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 3px;
  text-align: start;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    color: white;
    background-color: black;
    font-weight: 600;
  }
`;