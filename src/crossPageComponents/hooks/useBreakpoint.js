import { useState, useEffect } from 'react';

/**
 * Maps window width to Bootstrap breakpoint thresholds
 * @param {number} width - The current window inner width
 * @returns {string} - The active Bootstrap breakpoint
 */
const getBreakpoint = (width) => {
  if (width < 576) return 'xs';
  if (width < 768) return 'sm';
  if (width < 992) return 'md';
  if (width < 1200) return 'lg';
  if (width < 1400) return 'xl';
  return 'xxl';
};

const useBreakpoint = () => {
  // Initialize state based on the current window width
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const currentBreakpoint = getBreakpoint(window.innerWidth);
      
      // Only update state if the breakpoint has actually changed (performance optimization)
      setBreakpoint((prev) => (prev !== currentBreakpoint ? currentBreakpoint : prev));
    };

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;