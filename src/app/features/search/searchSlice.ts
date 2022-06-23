import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface ISearchState {
  country: string
  city: string
  position: string
  company: string
  skils: string[]
  yearStart: number
  yearEnd: number
}

const initialState: ISearchState = {
  country: '',
  city: '',
  position: '',
  company: '',
  skils: [],
  yearStart: 0,
  yearEnd: 0,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload
    },
    setCompany: (state, action: PayloadAction<string>) => {
      state.company = action.payload
    },
    setSkils: (state, action: PayloadAction<string[]>) => {
      state.skils = action.payload
    },
    setYearStart: (state, action: PayloadAction<number>) => {
      state.yearStart = action.payload
    },
    setYearEnd: (state, action: PayloadAction<number>) => {
      state.yearEnd = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setCountry, setCity, setCompany, setPosition, setSkils, setYearEnd, setYearStart} = searchSlice.actions

export default searchSlice.reducer
