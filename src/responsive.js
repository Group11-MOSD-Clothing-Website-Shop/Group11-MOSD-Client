import { css } from "styled-components"

export const mobile = (props) => {
    return css`
        @media (max-width: 576px) {
            ${props}
        }
    `
}

export const tablet = (props) => {
    return css`
        @media (max-width: 678px) {
            ${props}
        }
    `
}
export const desktop = (props) => {
    return css`
        @media (min-width: 678px) {
            ${props}
        }
    `
}

export const bigTablet = (props) => {
    return css`
        @media (max-width: 765px) {
            ${props}
        }
    `
}