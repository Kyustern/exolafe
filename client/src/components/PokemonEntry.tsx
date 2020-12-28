import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { Card } from './Card'

const idRegExp = /^\d{3}$/

export const PokemonEntry: React.FC = () => {

    const fetchPoke = async () => {
        try {
            const response = await axios.post('/api/getone', {id})
            setData(response.data)
        } catch (error) {
            console.log("TCL: fetchPoke -> error", error)
            setError(true)
        }
    }

    const history = useHistory()
    
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const { id } = useParams<{ id: string }>()
    
    useEffect(() => {
        fetchPoke()
    }, [])
    
    
    const fetchAgain = () => {
        setError(false)
        setData(null)
        fetchPoke()
    }

    const renderProperties = (obj: {[key: string]: any}): (JSX.Element | undefined)[] | null => {
        
        const keysArr = Object.keys(obj)

        const jsxArr = keysArr.map((key, index) => {
            if (typeof obj[key] === 'string') return(
                <Property key={index}>
                    <div>
                        {key.toLocaleUpperCase()} :
                    </div>
                    <div>
                        {obj[key]}
                    </div>
                </Property>
            )
        })

        if (jsxArr === []) {
            return null
        } else return jsxArr
        
    }

    const renderHelper = (data: any) => {
        return(
        <OuterWrapper>
            <Button onClick={() => history.push('/')}>
                ↢ GO BACK
            </Button>
            <Wrapper>
                <Card {...data} />
                <PropertyTable gridarea="damages">
                    <Header>
                        DAMAGES
                    </Header>
                    {renderProperties(data.damages)}
                </PropertyTable>
                <PropertyTable gridarea="misc">
                    <Header>
                        MISC
                    </Header>
                    {renderProperties(data.misc)}
                </PropertyTable>
                <PropertyTable gridarea="stats">
                    <Header>
                        STATS
                    </Header>
                    {renderProperties(data.stats)}
                </PropertyTable>
            </Wrapper>
        </OuterWrapper>

        )
    }

    if (!idRegExp.test(id)) return(
        <Center>
            Invalid id :(
        </Center>
    )

    if (error) return(
        <Center>

            Unable to fetch requested stuff.
            
            <NiceButton onClick={fetchAgain}>
                Try again
            </NiceButton>

        </Center>
    )

    if (!data) return(
            <Center>
                'FETCHING DATA...'        
            </Center>
        )

    return renderHelper(data)
}

const OuterWrapper = styled.div`
    margin: 1em 0 1em 0;
`;

const NiceButton = styled.button`
    background: #FFFFFF;
    box-shadow: 0px 4px 16px -3px rgba(0, 0, 0, 0.15);
    border-radius: 18px;
    border: none;

`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    margin: 0 2em 0 2em;
    /* width: 100%; */
    /* height: 100%; */
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr;
    grid-template-rows: 1fr ;
    gap: 1em;
    grid-template-areas:
        "card damages misc stats"
        /* "moves moves moves moves" */
    ;
`;

const Property = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.3em 0.5em 0.3em 0.5em;
    margin-top: 0.5em;
    border-bottom: 1.5px solid #807e7e;
    background-color: #fff;
`;

const Header = styled.h2`
    font-weight: 700;
    color: #ff5f43;
    margin: 1em 0 0 0;
`

const PropertyTable = styled.div<{gridarea?: string}>`
    display: flex;
    flex-direction: column;
    /* margin: 0 2em 0 2em; */
    ${props => props.gridarea ? `grid-area: ${props.gridarea}` : null}
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
    margin: 0 0 1.5em 2em;
`