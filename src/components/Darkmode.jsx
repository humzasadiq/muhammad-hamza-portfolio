import React, { useState, useEffect } from 'react';
import './Darkmode.css';
import { MdOutlineLightMode } from 'react-icons/md';
import { LuMoon } from 'react-icons/lu';

function Darkmode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);

    // Set initial value based on the current preference
    setIsDarkMode(mediaQuery.matches);

    // Add listener to detect changes in preference
    mediaQuery.addListener(handleChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='toggle-btn-div'>
      <button className='toggle-btn' onClick={handleModeToggle}>
        {isDarkMode ? <MdOutlineLightMode /> : <LuMoon />}
      </button>
    </div>
  );
}

export default Darkmode;
