import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface ISearchState {
  input: string
  country: string
  city: string
  position: string
  company: string
  skils: string[]
  yearStart: string
  yearEnd: string
}

const initialState: ISearchState = {
  input: '',
  country: '',
  city: '',
  position: '',
  company: '',
  skils: [],
  yearStart: '',
  yearEnd: '',
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
    setYearStart: (state, action: PayloadAction<string>) => {
      state.yearStart = action.payload
    },
    setYearEnd: (state, action: PayloadAction<string>) => {
      state.yearEnd = action.payload
    },
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setCountry, setCity, setCompany, setPosition, setSkils, setYearEnd, setYearStart,setInput} = searchSlice.actions

export default searchSlice.reducer
