import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import './index.css';

function ThemeInitializer({ children }) {
  useEffect(() => {
    const state = store.getState();
    const theme = state.ui?.theme ?? 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const unsubscribe = store.subscribe(() => {
      const currentTheme = store.getState().ui?.theme ?? 'light';
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    return () => unsubscribe();
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeInitializer>
          <App />
        </ThemeInitializer>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

