import * as variants from '@/lib/motionVariants';
import { motion } from 'motion/react';

import { footerData } from '@/constants';
import Logo from './Logo';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      variants={variants.fadeInUp}
      initial='start'
      whileInView='end'
      viewport={{ once: true }}
      className='section'
    >
      <div className='container'>
        {/* Top Grid */}
        <div className='grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-4'>
          <Logo />

          <div className='grid grid-cols-2 gap-x-2 gap-y-8 text-sm sm:grid-cols-4 lg:col-span-3'>
            {footerData.links.map(({ title, items }, index) => (
              <div key={index}>
                <h4 className='mb-4 font-medium text-foreground'>{title}</h4>
                <ul>
                  {items.map(({ href, label }, idx) => (
                    <li
                      key={idx}
                      className='text-muted-foreground'
                    >
                      <a
                        href={href}
                        className='inline-block py-1 transition-colors hover:text-primary'
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-600/10 py-6 sm:flex-row mt-12'>
          <span className='text-sm text-muted-foreground'>
            © {year} All Rights Reserved
          </span>

          <ul className='flex gap-5'>
            {footerData.socialLinks.map(({ href, icon }, i) => (
              <li key={i}>
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground transition-colors hover:text-primary'
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
