import useSwr from 'swr';

import fetcher from '@/libs/fetcher';
//? useSWR is a React hook that allows you to fetch data from an API and keep your React components in sync with the latest data.
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
