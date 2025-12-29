
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Theme } from '../types';

interface CustomCursorProps {
  theme: Theme;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ theme }) => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { damping: 35, stiffness: 400 };
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

  const pointerColor = theme === Theme.DARK ? 'rgba(147, 197, 253, 1)' : 'rgba(37, 99, 235, 1)';

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* 1. CORE RING */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          borderColor: pointerColor,
          borderWidth: isPointer ? '2px' : '1px',
          opacity: isVisible ? 1 : 0
        }}
        className="absolute w-12 h-12 rounded-full border transition-colors duration-500 z-20"
      />

      {/* 2. CENTRAL DOT */}
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
        className="absolute w-2 h-2 rounded-full z-30 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
      />
    </div>
  );
};

export default CustomCursor;
