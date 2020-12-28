import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store/store'
import { setId, setName, setType } from '../store/features/filter'

interface FilterType {
    name: string
    type: string
    id: string
    saved: boolean
}

export const Filters: React.FC = () => {

    const { id, type, name } = useSelector((state: RootState) => state.filter)
    
    const dispatch = useDispatch()

    return (
        <Wrapper>
            <TextInput
                placeholder="Search ..."
                value={name}
                onChange={e => dispatch(setName(e.target.value))}
                type="text"
            />

            <TextInput
                placeholder="Number ..."
                value={id}
                onChange={e => dispatch(setId(e.target.value))}
                type="text"
            />

            <TextInput
                placeholder="Type ..."
                value={type}
                onChange={e => dispatch(setType(e.target.value))}
                type="text"
            />
        </Wrapper>
    )
}

// export const Filters = connect(mapStateToProps)(Comp)

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    margin: 0 auto 0 auto;
    grid-column-gap: 1em;

`;

const TextInput = styled.input`

    background: #FFFFFF;
    box-shadow: 0px 4px 16px -3px rgba(0, 0, 0, 0.15);
    border-radius: 18px;
    border: none;
    padding-left: 1em;
    height: 36px;

`;