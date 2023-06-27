import { Fragment, useEffect } from 'react';
import { Store } from 'types/store';
import MapSection from 'components/home/MapSection';
import Header from 'components/home/Header';
import { NextPage } from 'next';
import useStores from 'hooks/useStores';
import DetailSection from '@/components/home/DetailSection';
import { NextSeo } from 'next-seo';

interface Props {
  stores: Store[];
}
const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <NextSeo
        title="매장 지도"
        description="Next.js 시작하기 강의를 위한 매장 지도 서비스입니다."
      />
      <Header />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};

export default Home;

export const getStaticProps = async () => {
  const stores = (await import('../public/stores.json')).default;
  return {
    props: { stores },
    revalidate: 60 * 60,
  };
};
