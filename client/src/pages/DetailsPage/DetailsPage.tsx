import { useParams } from 'react-router-dom';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import useProductDetails from '../../hooks/useProductDetails';
import Loader from '../../components/Loader';

const DetailsPage = () => {
  const { product_id } = useParams();
  if (product_id) {
    const { product } = useProductDetails(product_id);
    if (product) {
      return <ProductDetailsCard product={product} />;
    }
  }

  return <Loader isLoading={true} />;
};

export default DetailsPage;
