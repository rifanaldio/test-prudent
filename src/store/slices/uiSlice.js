import { createSlice } from '@reduxjs/toolkit';

const THEME_KEY = 'theme';

function getInitialTheme() {
  // Default: light (sesuai request)
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore
  }
  return 'light';
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: getInitialTheme(), // 'light' | 'dark'
    notification: null // { type: 'success' | 'error', message: string }
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, state.theme);
      } catch {
        // ignore
      }
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, state.theme);
      } catch {
        // ignore
      }
    },
    showNotification(state, action) {
      state.notification = {
        type: action.payload.type === 'error' ? 'error' : 'success',
        message: action.payload.message
      };
    },
    clearNotification(state) {
      state.notification = null;
    }
  }
});

export const { setTheme, toggleTheme, showNotification, clearNotification } = uiSlice.actions;
export const selectTheme = (state) => state.ui.theme;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;

