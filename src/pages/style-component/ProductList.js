import styled from "styled-components";
import { tablet } from '../../responsive'
export const Containter = styled.div`
    
`
export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
`
export const Filter = styled.div`
    margin: 10px;
    ${tablet({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
})}
`
export const Title = styled.h1`
    margin: 20px;
`
export const FilterText = styled.span`
    font-size: 17px;
    font-weight: 600;
    margin-right: 10px;
`
export const Select = styled.select`
    padding: 10px;
    margin-right: 15px;
    border: 1px solid #ccc;
`
export const Option = styled.option`

`