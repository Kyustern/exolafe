import React from 'react'
import styled, { keyframes } from 'styled-components'

const loop = keyframes`
  0% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    div {
        position: absolute;
        border: 4px solid #000;
        opacity: 1;
        border-radius: 50%;
        animation: ${loop} 0.7s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    div:nth-child(3){
        animation-delay: -0.5s;
    }

`
export default () => <Wrapper><div/><div/></Wrapper>