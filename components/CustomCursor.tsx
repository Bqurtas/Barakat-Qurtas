
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Theme } from '../types';

interface CustomCursorProps {
  theme: Theme;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ theme }) => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { damping: 35, stiffness: 350 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                         target.tagName === 'A' || 
                         target.tagName === 'BUTTON' ||
                         target.closest('a') ||
                         target.closest('button');
      setIsPointer(!!isClickable);
    };

    const handleMouseOut = () => setIsVisible(false);
    const handleMouseIn = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseIn);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseIn);
    };
  }, [cursorX, cursorY, isVisible]);

  const pointerColor = theme === Theme.DARK ? 'rgba(147, 197, 253, 0.8)' : 'rgba(37, 99, 235, 0.8)';
  const ringColor = theme === Theme.DARK ? 'rgba(255, 255, 255, 0.1)' : 'rgba(37, 99, 235, 0.1)';

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Outer Ring - Increased from w-12 h-12 to w-16 h-16 */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.4 : 1,
          borderColor: isPointer ? pointerColor : ringColor,
          borderWidth: '1.5px',
          opacity: isVisible ? 1 : 0
        }}
        className="absolute w-16 h-16 rounded-full border transition-colors duration-500"
      />
      {/* Inner Dot - Increased from w-1.5 h-1.5 to w-2 h-2 */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          backgroundColor: pointerColor,
          opacity: isVisible ? 1 : 0
        }}
        className="absolute w-2 h-2 rounded-full"
      />
    </div>
  );
};

export default CustomCursor;
