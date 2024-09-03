import axios from 'axios';
import { Photos } from '../App.types';

interface Props {
  query: string;
  page: number;
}
interface fetchPhotos {
  results: Photos[];
  total: number;
  total_pages: number;
}

export const fetchPhotos = async ({
  query,
  page = 1,
}: Props): Promise<fetchPhotos> => {
  const params = {
    headers: {
      'Accept-Version': 'v1',
    },
    params: {
      query,
      client_id: '2U6Nddaru5ZCUm0iXytoA8JGZaMmRo8ziRc-pTlRU8w',
      page,
      perPage: 10,
    },
  };
  const { data } = await axios.get<fetchPhotos>(
    'https://api.unsplash.com/search/photos',
    params
  );

  return data;
};
