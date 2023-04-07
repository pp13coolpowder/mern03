import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const Anime_id = createSlice({
  name: 'id_anime',
  initialState,
  reducers: {
   id_anime: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { id_anime } = Anime_id.actions

export default Anime_id.reducer