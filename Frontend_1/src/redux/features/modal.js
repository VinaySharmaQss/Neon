import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../utils/utils';
import toast from 'react-hot-toast';

// ✅ Thunk to post a review
export const postReview = createAsyncThunk(
  'reviews/postReview',
  async (reviewData, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(
        `${backendUrl}reviews/create`,
        reviewData,
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log(response.data);
        toast.success('Review posted successfully');
        const state = getState();
        const existingReviews = state.modal.reviews;

        // Check if this review already exists to avoid duplication
        const isReviewExists = existingReviews.some(
          (review) => review.id === response.data.id
        );

        if (isReviewExists) {
          return rejectWithValue('This review already exists');
        }

        return response.data; // Return the review data
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

// ✅ Thunk to fetch reviews by user
export const fetchReviewsByUser = createAsyncThunk(
  'reviews/fetchReviewsByUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
      if (!userId) {
        return rejectWithValue('User not found');
      }

      const response = await axios.get(`${backendUrl}reviews/user/${userId}`, { withCredentials: true });

      if (response.data.success) {
        console.log('Fetched reviews:', response.data.data);
        toast.success('Reviews fetched successfully');

        const state = getState();
        const existingReviews = state.modal.reviews;

        // Filter out the reviews that already exist in the state
        const uniqueReviews = response.data.data.filter(
          (review) => !existingReviews.some((existing) => existing.id === review.id)
        );

        return uniqueReviews; // Return only unique reviews
      } else {
        toast.error('Failed to fetch reviews');
        return rejectWithValue(response.data.message || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Error fetching reviews');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Create the slice
const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    ratings: {},
    reviews: [], // Store all reviews
    review: null, // Store the posted review
    loading: false,
    error: null,
  },
  reducers: {
    modalToggle: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
      state.ratings = action.payload || {}; // Reset or set ratings
    },
    addReview: (state, action) => {
      // Add review to the state only if it doesn't already exist
      const isReviewExists = state.reviews.some((r) => r.id === action.payload.id);
      if (!isReviewExists) {
        state.reviews.unshift(action.payload); // Add the posted review to the start of the reviews array
      }
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
        state.review = action.payload; // Store the posted review
        // Add the posted review to the start of the reviews array only if it's unique
        const isReviewExists = state.reviews.some((r) => r.id === action.payload.id);
        if (!isReviewExists) {
          state.reviews.unshift(action.payload); // Add review to the start of the array
        }
      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle reviews fetch
      .addCase(fetchReviewsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByUser.fulfilled, (state, action) => {
        state.loading = false;
        // Append unique reviews to the existing reviews array
        state.reviews = [...state.reviews, ...action.payload]; 
      })
      .addCase(fetchReviewsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { modalToggle, addReview } = modalSlice.actions;

export default modalSlice.reducer;
