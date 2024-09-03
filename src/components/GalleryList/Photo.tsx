import { modal } from '../../App.types';

interface PhotoProps {
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  openModal: ({}: modal) => void;
}

const Photo: React.FC<PhotoProps> = ({ urls, alt_description, openModal }) => {
  return (
    <li
      className="overflow-hidden flex items-center justify-center h-64 rounded-xl hover:scale-105 transition-all "
      onClick={() =>
        openModal({
          large: urls.regular,
          alt_description,
        })
      }
    >
      <img src={urls.small} alt={alt_description} />
    </li>
  );
};
export default Photo;
