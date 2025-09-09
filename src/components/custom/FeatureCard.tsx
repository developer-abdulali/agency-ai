import * as variants from '@/lib/motionVariants';
import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useRef, useState, type JSX } from 'react';

type FeatureCardProps = {
  classes?: string;
  children: JSX.Element;
};

const FeatureCard = ({ classes, children }: FeatureCardProps) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showGlow, setShowGlow] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    },
    [x, y]
  );

  return (
    <motion.div
      variants={variants.staggerContainer}
      initial='start'
      whileInView='end'
      viewport={{ once: true }}
      className={`relative overflow-hidden p-[1px] ring ring-inset ring-zinc-800/50 rounded-[14px] ${classes}`}
    >
      <div
        ref={cardRef}
        onMouseOver={() => setShowGlow(true)}
        onMouseOut={() => setShowGlow(false)}
        onMouseMove={handleMouseMove}
        className='relative isolate bg-card backdrop-blur-md rounded-xl overflow-hidden'
      >
        {children}
      </div>
      {/* border effect */}
      <motion.div
        ref={glowRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: Number(showGlow) }}
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className='absolute -z-10 w-[300px] h-[300px] rounded-full bg-foreground blur-[50px]'
      />
    </motion.div>
  );
};

export default FeatureCard;
