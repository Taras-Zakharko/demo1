import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface CandidateState {
  users: Array<any> | any
}
const initialState: CandidateState = {
  users: [],
}

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.users = state.users.map((user: any, i: number) =>
        user.id === action.payload ? state.users.splice(i, 1) : user
      )
    },
    edit: (state, action: PayloadAction<any>) => {
      state.users.map((user: any) =>
        user.id === action.payload.id ? (user = action.payload) : user
      )
      state.users = state.users
    },
    create: (state, action: PayloadAction<any>) => {
      state.users.push(action.payload)
      state.users = state.users
    },
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {remove, edit, create, setUsers} = candidateSlice.actions

export default candidateSlice.reducer
