import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { Card } from './Card'
import { PokeData } from '../Types'
import Loader from './Loader'

export const List = () => {

    const [error, setError] = useState(false)

    const [allPokes, setAllPokes] = useState<PokeData[] | null>(null)

    const { name, id, type, saved } = useSelector((state: RootState) => state.filter)

    useEffect(() => {
        refetch()
        const temp = saved ? 'saved/' : ''
        async function fetchPokes () {
            try {
                const res = await axios.get(`/api/${temp}`)
                setAllPokes(res.data.sortedPokemons)
            } catch (error) {
                console.log(error);
                setError(true)
                setAllPokes(null)
            }
        }
        fetchPokes()
    }, [saved])

    const renderPokes = (arr: PokeData[]) => {

        const filteredArray = arr.filter((el: PokeData) => {

            const upperTypes = el.type.map(el => el.toUpperCase())

            const nameValidation = !name ? true : el.name.toLocaleUpperCase().includes(name.toLocaleUpperCase())
            const typeValidation = !type ? true : upperTypes.includes(type.toUpperCase())
            const idValidation = !id ? true : el.id.includes(id)
            const savedValidation = !saved ? true : el.saved

            return nameValidation && idValidation && typeValidation && savedValidation
        })

        return filteredArray.map((el, index) => <Card {...el} key={index} />)
    }

    const refetch = () => {
        setError(false)
        setAllPokes([])
    }

    if (error) return (
        <Center>
            We had trouble getting your pokemons
            <button onClick={refetch}>
                Try Again    
            </button>            
        </Center>
    )

    if (allPokes === null) return <Center>FETCHING DATA...</Center>

    return <Wrapper> {renderPokes(allPokes)} </Wrapper>
}

const Wrapper = styled.div`
    width: 80%;
    height: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 3em;
`;

const LoaderWrapper = styled.div`
    width: 200px;
    height: 200px;
`;

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;