import { ctaBanner } from '@/assets';
import { ctaData } from '@/constants';
import * as variants from '@/lib/motionVariants';
import { motion } from 'motion/react';
import { Button } from '../ui/button';

const CTA = () => {
  return (
    <section className='section'>
      <div className='container'>
        <motion.div
          variants={variants.fadeInUp}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          className='bg-primary rounded-xl border-t border-primary-foreground/30 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr,0.7fr] lg:items-center '
        >
          <div className='p-8 md:p-16 xl:p-20'>
            <motion.h2
              variants={variants.fadeIn}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              className='text-[26px] sm:text-[34px] md:text-[40px] lg:text-[46px] lg:mb-0 leading-tight font-semibold mb-6 capitalize'
            >
              {ctaData.text}
            </motion.h2>
            <motion.div
              variants={variants.fadeIn}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              className='flex items-center gap-3 lg:gap-4 mt-2'
            >
              <Button className='bg-foreground text-background hover:bg-foreground-muted'>
                Free Trial
              </Button>
              <Button
                variant={'outline'}
                className='!bg-transparent border-current'
              >
                Pricing & Plan
              </Button>
            </motion.div>
          </div>

          <motion.figure className='-order-1 pt-14 ps-8 sm:ps-12 md:ps-14 lg:order-none lg:p-0'>
            <img
              src={ctaBanner}
              alt='cta banner'
              className='w-full h-full object-contain object-right'
            />
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
