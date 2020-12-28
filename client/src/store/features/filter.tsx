import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface SliceType {
    name: string
    type: string
    id: string
    saved: boolean
}

export const filterSlice = createSlice({
    name: 'filter',

    initialState: {
        name: '',
        type: '',
        id: '',
        saved: false
    } as SliceType,

    reducers: {

        //state =/= RootState, state === slice state  
        
        setName: (state, { payload }: PayloadAction<string>): void => {
            state.name = payload
        },
        setType: (state, { payload }: PayloadAction<string>): void => {
            state.type = payload
        },
        setId: (state, { payload }: PayloadAction<string>): void => {
            state.id = payload
        },
        setSaved: (state, { payload }: PayloadAction<boolean>): void => {
            state.saved = payload
        }
    }
})

export const { setId, setName, setSaved, setType } = filterSlice.actions

export const filterReducer = filterSlice.reducer