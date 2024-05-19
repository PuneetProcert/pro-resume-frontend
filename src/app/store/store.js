import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/DashboardSlilce";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
