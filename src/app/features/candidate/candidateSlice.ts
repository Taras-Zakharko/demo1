import {createSlice, PayloadAction} from '@reduxjs/toolkit'
// import axios from 'axios'
// import { actions } from 'react-table'
import data from '../../testUsers.json'

export interface CandidateState {
  users: Array<any>
}

const initialState: CandidateState = {
  users: data.Users,
}

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      // axios
      //   .delete('')
      //   .then((response) => console.log('Delete successful'))
      state.users.map((user, i) => (user.id === action.payload) ? state.users.splice(i, 1) : user)
      state.users = state.users;
    },
    edit: (state, action: PayloadAction<any>) => {

      // axios.put('', {data: action.payload})

      state.users = state.users.map((user) => (user.id === action.payload.id) ? user = action.payload : user)
    },
    create: (state, action: PayloadAction<any>)=>{
      // axios.post('', {data: action.payload})
      state.users.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const {remove, edit, create} = candidateSlice.actions

export default candidateSlice.reducer
