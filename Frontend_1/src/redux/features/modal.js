import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../utils/utils';
import toast from 'react-hot-toast';

// ✅ Thunk to post a review
export const postReview = createAsyncThunk(
  'reviews/postReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}reviews/create`,
        reviewData,
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log(response.data);
        toast.success('Review posted successfully');
        return response.data;
      } else {
        toast.error('Failed to post review');
        return rejectWithValue(response.data.message || 'Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    ratings: {},
    loading: false,
    error: null,
    review: null,
  },
  reducers: {
    modalToggle: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
      state.ratings = action.payload || {}; // ✅ Reset or set ratings
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload; // ✅ Store the posted review
      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { modalToggle } = modalSlice.actions;
export default modalSlice.reducer;
