import { heroData } from '@/constants';
import { Button } from '../ui/button';
import { heroBanner } from '@/assets';

const Hero = () => {
  return (
    <section className='py-10 md:py-16'>
      <div className='container text-center'>
        <div className='max-w-screen-md mx-auto'>
          <p className='text-sm uppercase tracking-wider bg-secondary/50 text-secondary-foreground max-w-max mx-auto px-3 py-1 rounded-full border-t border-blue-500/10 backdrop-blur-3xl mb-6 md:mb-10'>
            {heroData.sectionSubtitle}
          </p>

          <h2>
            {heroData.sectionTitle}

            <span>{heroData.decoTitle}</span>
          </h2>

          <p>{heroData.sectionText}</p>

          <div className=''>
            <Button>Start Free Trial</Button>
            <Button variant={'ghost'}>Watch Demo</Button>
          </div>
        </div>

        <div className=''>
          <figure>
            <img
              src={heroBanner}
              alt='AnalytiX Dashboard'
              width={1468}
              height={815}
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
