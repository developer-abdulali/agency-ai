import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 50 }
      }
      transition={{ duration: 0.3 }}
      className='fixed bottom-6 right-6 z-50'
    >
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className='rounded-full !px-2.5'
        >
          <ArrowUp className='h-5 w-5' />
        </Button>
      )}
    </motion.div>
  );
};

export default GoToTop;
