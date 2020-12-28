import React from 'react'
import styled from 'styled-components';

import { Filters } from './Filters'
import { Menu } from './Menu'

export const Header: React.FC = () => {
    return(
        <Wrapper>
            <Menu />
            <Filters />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: 3em;
    margin: 3em 0 3em 0;
`;