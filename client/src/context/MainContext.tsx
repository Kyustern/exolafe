import React, { useState } from 'react'

export type storeType = {
    name: string;
    id: string;
    type: string;
    saved: boolean;

    setName: React.Dispatch<React.SetStateAction<string>>
    setType: React.Dispatch<React.SetStateAction<string>>
    setId: React.Dispatch<React.SetStateAction<string>>
    setSaved: React.Dispatch<React.SetStateAction<boolean>>
}

export const MainContext = React.createContext<Partial<storeType>>({})

export const MainProvider: React.FC = ({children}) => {

    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [type, setType] = useState('')
    const [saved, setSaved] = useState(false)

    return (
        <MainContext.Provider value={{
            name,
            setName,
            id,
            setId,
            type,
            setType,
            saved,
            setSaved
        }}>
            {children}
        </MainContext.Provider>
    )    
}