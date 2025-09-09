import { featureData } from '@/constants';

import * as variants from '@/lib/motionVariants';
import { motion } from 'motion/react';

import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import FeatureCard from './FeatureCard';

const Features = () => {
  return (
    <section className='section'>
      <div className='container'>
        <div className='section-head'>
          <motion.p
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-subtitle'
          >
            {featureData.sectionSubtitle}
          </motion.p>

          <motion.h2
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-title'
          >
            {featureData.sectionTitle}
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-text'
          >
            {featureData.sectionText}
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6'>
          {featureData.features.map(
            ({ icon, iconBoxColor, title, desc, imgSrc }, i) => (
              <FeatureCard
                key={i}
                classes={
                  i < 2
                    ? 'md:col-span-2 lg:col-span-1 xl:col-span-3'
                    : 'xl:col-span-2'
                }
              >
                <>
                  <div className='p-8'>
                    <motion.div
                      variants={variants.fadeInUp}
                      className={`w-16 h-16 grid place-items-center rounded-full flex-shrink-0 ${iconBoxColor}`}
                    >
                      {icon}
                    </motion.div>
                    <motion.h3 className='text-foreground text-xl font-medium mt-4 mb-3'>
                      {title}
                    </motion.h3>

                    <motion.p
                      variants={variants.fadeInUp}
                      className='text-muted-foreground line-clamp-2'
                    >
                      {desc}
                    </motion.p>
                    <motion.div variants={variants.fadeInUp}>
                      <Button
                        variant={'link'}
                        className='p-0 h-auto mt-3'
                      >
                        Learn More <ArrowRight />
                      </Button>
                    </motion.div>
                  </div>

                  {imgSrc && (
                    <motion.figure
                      variants={variants.fadeInUp}
                      className='p-6 pt-0'
                    >
                      <img
                        src={imgSrc}
                        alt={title}
                      />
                    </motion.figure>
                  )}
                </>
              </FeatureCard>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
