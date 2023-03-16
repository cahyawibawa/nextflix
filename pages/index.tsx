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
  thrillerMovies: Movie[];
  animationMovies: Movie[];
  war: Movie[];
  sciencefiction: Movie[];
  topRatedTV: Movie[];
  dramaMovies: Movie[];
}

export async function getServerSideProps(context: NextPageContext) {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    thrillerMovies,
    animationMovies,
    war,
    sciencefiction,
    topRatedTV,
    dramaMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchThrillerMovies).then((res) => res.json()),
    fetch(requests.fetchAnimationMovies).then((res) => res.json()),
    fetch(requests.fetchWar).then((res) => res.json()),
    fetch(requests.fetchScienceFiction).then((res) => res.json()),
    fetch(requests.fetchTopRatedTV).then((res) => res.json()),
    fetch(requests.fetchDramaMovies).then((res) => res.json()),
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
      thrillerMovies: thrillerMovies.results,
      animationMovies: animationMovies.results,
      war: war.results,
      sciencefiction: sciencefiction.results,
      topRatedTV: topRatedTV.results,
      dramaMovies: dramaMovies.results,
    },
  };
}
const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  war,
  thrillerMovies,
  animationMovies,
  topRated,
  trendingNow,
  sciencefiction,
  topRatedTV,
  dramaMovies,
}: Props) => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  const showModal = useRecoilValue(modalState);
  return (
    <>
      <Head>
        <title>Home - Nextflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]'>
        <InfoModal visible={isOpen} onClose={closeModal} />

        <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <Banner netflixOriginals={netflixOriginals} />

          <section className='md:space-y-24'>
            <Row title='Trending Now' movies={trendingNow} />
            <Row title='Top Rated Movies' movies={topRated} />
            <Row title='Top Rated TV Shows' movies={topRatedTV} />
            <Row title='Action' movies={actionMovies} />

            {/* //! TODO ADD TO MY LIST */}

            <Row title='Comedy' movies={comedyMovies} />
            <Row title='Thriller' movies={thrillerMovies} />
            <Row title='Animation' movies={animationMovies} />
            <Row title='Drama' movies={dramaMovies} />
            <Row title='War' movies={war} />
            <Row title='Science Fiction' movies={sciencefiction} />
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
