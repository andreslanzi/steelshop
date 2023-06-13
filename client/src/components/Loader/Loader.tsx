import BeatLoader from 'react-spinners/BeatLoader';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-center items-center">
      <BeatLoader
        color="#ffffff"
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
