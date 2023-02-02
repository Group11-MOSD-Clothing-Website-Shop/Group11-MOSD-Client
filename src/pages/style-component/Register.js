import styled from 'styled-components'

export const Container = styled.div`
    padding: 20px;
    width: 100%;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
export const Agreement = styled.span`
    font-size: 12px;
    margin-top: 20px;
`
export const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin:auto;
    margin-top: 20px;
    font-size: 0.75rem;
`
export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;   
`
export const Error = styled.span`
    color: red;
`