import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/Navbar';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import requests from '@/utils/requests';
import { Movie } from '@/typings';
import Banner from '@/components/Banner';
import Row from '@/components/Row';
import { useRecoilValue } from 'recoil';
import { modalState } from '@/atoms/modalAtom';
import Modal from '@/components/Modal';

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

export async function getServerSideProps(context: NextPageContext) {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
}
const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  const showModal = useRecoilValue(modalState);
  return (
    <>
      <Head>
        <title>Home - Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]'>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <Banner netflixOriginals={netflixOriginals} />

          <section className='md:space-y-24'>
            <Row title='Trending Now' movies={trendingNow} />
            <Row title='Top Rated' movies={topRated} />
            <Row title='Action Thrillers' movies={actionMovies} />

            {/* //! TODO ADD TO MY LIST */}

            <Row title='Comedies' movies={comedyMovies} />
            <Row title='Scary Movies' movies={horrorMovies} />
            <Row title='Romance Movies' movies={romanceMovies} />
            <Row title='Documentaries' movies={documentaries} />
          </section>
        </main>
        {showModal && <Modal />}
      </div>
      {/* <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favorites} />
      </div> */}
    </>
  );
};
export default Home;
