import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface User {
//   name: string;
//   mail: string;
//   phone: string;
// }

interface authState {
  isAuth: boolean;
  mail: string;
  //user: User | null;
}

const initialState: authState = {
  isAuth: false,
  mail: "",
  //user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuth = true;
      state.mail = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.mail = "";
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
