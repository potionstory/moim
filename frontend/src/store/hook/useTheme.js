import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { themeToggleAction } from '../module/global';

const useTheme = () => {
  const dispatch = useDispatch();
  const initialState = () =>
    window.localStorage.getItem('theme') === 'true' ? true : false;

  const [theme, setTheme] = useState(initialState);

  const toggleTheme = () => {
    dispatch(themeToggleAction(!theme));
    setTheme((theme) => !theme);
  };

  useEffect(() => {
    dispatch(themeToggleAction(theme));
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
