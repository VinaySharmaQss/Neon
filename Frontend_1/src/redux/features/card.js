import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../utils/utils';

// ✅ Thunk to post an event to viewed
export const postEvent = createAsyncThunk(
  'events/postEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      console.log(eventData);
      const response = await axios.post(
        `${backendUrl}places/addToviewed`,
        eventData, // ✅ Pass event data here directly
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log(response.data);
        return response.data; // ✅ Return the whole response data or the needed part
      } else {
        return rejectWithValue(response.data.message || 'Failed to post event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Slice definition
const cardSlice = createSlice({
  name: 'card',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    addCard: (state, action) => {
      state.events.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload); // ✅ Add the posted event
      })
      .addCase(postEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;