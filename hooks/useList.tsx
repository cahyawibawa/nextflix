import { Movie } from '@/typings';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function useList() {
  const [list, setList] = useState<Movie[] | DocumentData[]>([]);
  useEffect(() => {}, []);
  return list;
}

export default useList;
