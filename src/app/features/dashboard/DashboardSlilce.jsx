import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getDashboardDetails = createAsyncThunk(
  "dashboardSlice/getDashboardDetails",
  async () => {
    const response = api.dashboardAdministration.getDashboardDetails();
    return response;
  }
);

export const enhanceFieldWithAi = createAsyncThunk(
  "dashboardSlice/enhanceFieldWithAi",
  async (data) => {
    const response = api.resumeAiAdministration.enhanceFieldWithAi(data);
    return response;
  }
);

const initialState = {
  //dashboard details
  dashboardDetailsLoading: false,
  dashboardDetailsError: "",
  dashboardDetails: "",

  //enhance field with ai
  enhanceFieldLoading: false,
  enhanceFieldError: "",
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //register user
      .addCase(getDashboardDetails.pending, (state) => {
        state.dashboardDetailsLoading = true;
      })
      .addCase(getDashboardDetails.fulfilled, (state, action) => {
        state.dashboardDetailsLoading = false;
        state.dashboardDetails = action?.payload?.data;
      })
      .addCase(getDashboardDetails.rejected, (state, action) => {
        state.dashboardDetailsLoading = false;
        state.dashboardDetailsError = action?.error?.message;
      })

      //enhance field with AI
      .addCase(enhanceFieldWithAi.pending, (state) => {
        state.enhanceFieldLoading = true;
      })
      .addCase(enhanceFieldWithAi.fulfilled, (state, action) => {
        state.enhanceFieldLoading = false;
        //state.dashboardDetails = action?.payload?.data;
      })
      .addCase(enhanceFieldWithAi.rejected, (state, action) => {
        state.enhanceFieldLoading = false;
        state.enhanceFieldError = action?.error?.message;
      });
  },
});

const { actions, reducer: dashboardReducer } = dashboardSlice;

// eslint-disable-next-line no-empty-pattern
export const {} = actions;

export default dashboardReducer;
