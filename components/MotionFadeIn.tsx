/** @format */

'use client';

import {motion, type Variants} from 'framer-motion';
import type {ReactNode} from 'react';

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

type MotionFadeInProps = {
  children: ReactNode;
  className?: string;
  /** Delay dalam detik untuk stagger sederhana */
  delay?: number;
};

export default function MotionFadeIn({
  children,
  className,
  delay = 0,
}: MotionFadeInProps) {
  return (
    <motion.div
      className={className}
      initial='hidden'
      whileInView='show'
      viewport={{once: true, amount: 0.15}}
      variants={fadeInUp}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

