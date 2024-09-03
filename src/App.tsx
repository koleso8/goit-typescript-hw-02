import { useState } from 'react';
import { fetchPhotos } from './services/searchAPI';
import { useEffect } from 'react';

import SearchPhotos from './components/SearchPhotos/SearchPhotos';
import GalleryList from './components/GalleryList/GalleryList';
import LoadMore from './components/LoadMore/LoadMore';
import PhotosModal from './components/PhotosModal/PhotosModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { modal, Photos } from './App.types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<modal>({
    large: '',
    alt_description: '',
  });

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchPhotos({ query, page });
        setPhotos(prev => [...prev, ...data.results]);
        setShowLoadMore(page < data.total_pages);
        if (data.total_pages === 0) setIsError(true);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const openModal = (photo: modal) => {
    setCurrentModal(photo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChengeQuery = (newQuery: string) => {
    setPhotos([]);
    setQuery(newQuery);
    setPage(1);
  };

  const loadMore = () => setPage(prev => prev + 1);

  isError && ErrorMessage();

  return (
    <>
      <header className="flex justify-center bg-cyan-600 p-4 mb-4">
        <SearchPhotos handleChengeQuery={handleChengeQuery} />
      </header>

      <main className="flex items-center flex-col">
        <PhotosModal
          currentModal={currentModal}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />

        <GalleryList photos={photos} openModal={openModal} />

        {isLoading && <Loader />}

        {showLoadMore && photos.length > 0 && <LoadMore loadMore={loadMore} />}
      </main>
    </>
  );
};

export default App;
