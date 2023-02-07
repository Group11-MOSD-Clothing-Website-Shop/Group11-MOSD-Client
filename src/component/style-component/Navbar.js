import styled from 'styled-components'
import { tablet } from '../../responsive';

export const NavbarItems = styled.nav`
    top: 0;
    background-color: #ecedef;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    position: fixed;
    z-index: 100;
    width: 100%;
    ${tablet({
    justifyContent: 'space-between',
    padding: '0px 10px'
})}
`
export const Logo = styled.h1`
    display: flex;
    align-items: center;
    cursor: pointer;
    ${tablet({
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'translate(25%, 60%)'
})}
`
export const MenuIconContainer = styled.div`
    align-items: center;
    cursor: pointer;
    display: none;
    ${tablet({
    display: 'flex',
    position: 'absolute',
    top: '0',
    right: '0',
    transform: 'translate(-100%, 100%)',
})}
`
export const Menu = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 70vw;
    justify-content: end;
    ${tablet({
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    position: 'absolute',
    top: '80px',
    opacity: 2,
    transition: '0.5s ease',
    backgroundColor: '#ecedef',
    zIndex: '100',
    width: '100%',
})};
    left: ${(props) => props.active ? '0' : '-100%'};
`
export const MenuItem = styled.li`
    margin: 0;
    padding: 0;
    cursor: pointer;
`