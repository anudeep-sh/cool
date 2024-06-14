import { useEffect } from 'react';
import { useState } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('Token')) {
      setIsLoggedIn(true);
      setIsVisible(true);
    } else {
      setIsLoggedIn(false);
      setIsVisible(true);
    }
  }, []);
  return { isLoggedIn, isVisible };
};
