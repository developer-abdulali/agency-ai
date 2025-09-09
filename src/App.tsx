import { ReactLenis } from 'lenis/react';
import Blogs from './components/custom/Blogs';
import Brands from './components/custom/Brands';
import CTA from './components/custom/CTA';
import Features from './components/custom/Features';
import Footer from './components/custom/Footer';
import Header from './components/custom/Header';
import Hero from './components/custom/Hero';
import Overview from './components/custom/Overview';
import Process from './components/custom/Process';
import Review from './components/custom/Review';
import GoToTop from './components/custom/GoToTop';

const App = () => {
  return (
    <ReactLenis root>
      <div className='relative isolate overflow-hidden'>
        <Header />
        <main>
          <Hero />
          <Brands />
          <Features />
          <Process />
          <Overview />
          <Review />
          <Blogs />
          <CTA />
        </main>
        <Footer />
        <GoToTop />
      </div>
    </ReactLenis>
  );
};

export default App;
