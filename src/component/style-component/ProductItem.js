import styled from "styled-components";

export const Infor = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.5s ease;
    cursor: pointer;
`
export const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    max-width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e0f2f8;
    position: relative;
    &:hover ${Infor}{
        opacity: 1;
    };
`
export const Image = styled.img`
    height: 75%;
    z-index: 2;
    object-fit: cover;
    max-width: 75%;
`
export const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: 0.5s ease;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.2);
        color: crimson;
    }
`