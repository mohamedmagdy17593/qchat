import type { NextPage } from 'next';
import SEO from '../components/common/SEO/SEO';
import HomePage from '../components/HomePage/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <HomePage />
    </>
  );
};

export default Home;
