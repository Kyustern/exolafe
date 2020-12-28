import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store';
import { setSaved } from '../store/features/filter'

export const Menu: React.FC = (params) => {
    
    const dispatch = useDispatch()

    const { saved } = useSelector((state: RootState) => state.filter)
    

    return (
        <Wrapper>
            <Button
                saved={!saved} 
                onClick={() => dispatch(setSaved(false))}
            >
                POKEMONS
            </Button>
            <Button
                saved={saved} 
                onClick={() =>  dispatch(setSaved(true))}
            >
                SAVED
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: auto;
`;

const Button = styled.button<{saved?: boolean}>`
    background: #FFFFFF;
    border-radius: 18px;
    border: none;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.345em;
    padding: 0.7em 4em 0.7em 4em;
    cursor: pointer;
    ${
        props => props.saved ? 'box-shadow: 0px 4px 40px -3px rgba(0, 0, 0, 0.3);' 
    : 
        null
    }
`;