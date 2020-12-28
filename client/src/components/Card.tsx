import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { PokeData } from '../Types'
import Vector from './LikeVector'
import Loader from './Loader'

const colorSwitch = (typeString: string): string => {
    switch (typeString) {
        case "Normal":
            return "CACACA"
        case "Electric":
            return "FFE175"
        case "Fire":
            return "FF8A8A"
        case "Water":
            return "88D1FB"
        case "Ice":
            return "C6EAFF"
        case "Fighting":
            return "FFB169"
        case "Ground":
            return "CA9F5E"
        case "Rock":
            return "898373"
        case "Grass":
            return "B4FE7B"
        case "Poison":
            return "BF8CD1"
        case "Steel":
            return "E4E4E4"
        case "Psychic":
            return "FFB7FC"
        case "Bug":
            return "D1E16F"
        case "Ghost":
            return "805594"
        case "Flying":
            return "5F9FFF"
        case "Dragon":
            return "C699FF"
        default:
            return "000000";
    }
}

export const Card: React.FC<PokeData> = ({ id, name, type, img, saved }) => {

    console.log("TCL: saved", saved)
    const [isSaved, setIsSaved] = useState<boolean | undefined>(saved)
    const history = useHistory()

    const updateLike = async () => {
        const previousState = isSaved
        setIsSaved(undefined)
        try {
            const res = await axios.post('/api/updateone', { index: id, payload: !isSaved })
            setIsSaved(res.data.newState)
        } catch (error) {
            console.log("TCL: updateLike -> error", error)
            setIsSaved(previousState)
        }
    }

    const goToPoke = (e: any) => {
        console.log("TCL: goToPoke -> e", e)
        if (e.target.nodeName !== 'BUTTON') {
            history.push(`/${id}`)
            // e.stopPropagation()
        }
    }

    return (
        <OuterWrapper>
            <Wrapper className="osef" onClick={e => goToPoke(e)}>
                <ImageWrapper>
                    <Image src={img} />
                </ImageWrapper>

                <InfoWrapper>
                    <IdName>
                        <div>{id}</div>
                        <div>{name.toLocaleUpperCase()}</div>
                    </IdName>

                    {
                        type.map((typeString, index) => {
                            return (
                                <Type key={index} type={typeString} >
                                    {type[index].toLocaleUpperCase()}
                                </Type>
                            )
                        })
                    }

                </InfoWrapper>

            </Wrapper>
            <LikeButton saved={isSaved} onClick={updateLike}>
                {isSaved === undefined ?
                    <Loader />
                    :
                    <Vector />
                }
            </LikeButton>
        </OuterWrapper>

    )
}

// export const Card = React.memo(CardComp)

const LikeButton = styled.button<{ saved: boolean | undefined }>`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px -3px rgba(0, 0, 0, 0.1);
    border: 2px solid #c4c4c4;
    border-radius: 50%;
    cursor: pointer;

    ${props => props.saved ?
        `
        background: linear-gradient(202.48deg, #F2F2F2 7.57%, #CFCFCF 90.41%);
        border: none;
    ` : null
    }

`;

const Type = styled.div<{ type: string }>`
    margin-bottom: 0.5em;
    width: 8.5em;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9.5px;
    color: #ffffff;
    background-color: #${props => colorSwitch(props.type)};
`;

const ImageWrapper = styled.div`
    /* width: 100%; */
    /* height: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
`;

const Image = styled.img`
    margin: auto;
    height: auto;
    width: 100%;
`;

const Wrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 20px -3px rgba(0, 0, 0, 0.1);
    border-radius: 18px;
    display: grid;
    grid-template-columns: 50% 50%;
    font-weight: 900;
    cursor: pointer;
    width: 100%;
    height: 100%;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    width: auto;
    height: 100%;

`;

const IdName = styled.div`

    div:first-child {
        color: #9E9E9E;
        margin-right: 0.5em;
    }

    margin-bottom: 0.5em;
    display: flex;
    /* font-size: 12px; */
    color: default;
`;

const OuterWrapper = styled.div`
    position: relative;

`;