import styled from "styled-components"

export const Container = styled.div`
padding: 20px;
width: 100%;
height: 100vh;
background: linear-gradient(
  rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)
),
url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
  center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
export const Wrapper = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
background-color: white;
`
export const Title = styled.h1`
font-size: 24px;
`
export const Form = styled.form`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
`
export const Input = styled.input`
min-width: 300px;
width: 100%;
margin: 20px 10px 0 0;
padding: 15px;
`
export const Link = styled.a`
cursor: pointer;
margin: 5px 0px;
font-size: 12px;
text-decoration: underline;
width: max-content;
`
export const Error = styled.span`
color: red;
`