import styled from "styled-components";
import { tablet } from '../../responsive'
export const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
export const Image = styled.img`
    width: 100%;
    object-fit: cover;
    height: 100%;
    ${tablet({
    height: '100vh'
})}
`
export const Infor = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    font-size: 1.5rem;
    text-align: center;
`
export const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 700;
    transition: 0.5s ease;
    &:hover {
        opacity: 0.8;
    }
`