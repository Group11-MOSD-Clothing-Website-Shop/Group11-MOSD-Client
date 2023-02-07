import React, { useState } from "react";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../data";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Arrow,
  Wrapper,
  Slide,
  ImgContainer,
  Image,
  InfoContainer,
  Title,
  Desc,
  Button,
} from "./style-component/Slider";
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [changeSlide, setChangeSlide] = useState(false);
  const navi = useNavigate();
  const handleClick = (direction) => {
    setChangeSlide(true);
    const slides = sliderItems.length - 1;
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slides);
    } else {
      setSlideIndex(slideIndex < slides ? slideIndex + 1 : 0);
    }
    setTimeout(() => {
      setChangeSlide(false);
    }, 0);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex} changeSlide={changeSlide}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={() => navi(`/products?category=${item.url}`)}>
                SHOW NOW
              </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
