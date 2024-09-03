export interface Photos {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

export type modal = {
  large: string;
  alt_description: string;
};

export interface Props {
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  openModal: ({}: modal) => void;
}
