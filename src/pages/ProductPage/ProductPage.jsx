import { getProductById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './productPage.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { imager } from '../../services/functions';
import ReactSelect from 'react-select';
import { useCart } from '../../services/functions';

const ProductPage = () => {
  const { addToCart } = useCart();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  const getOptions = (labels) => labels.map((label) => ({ value: label.id, label: label.title }));

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [message, setMessage] = useState('');

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (product.attributes.length !== Object.keys(selectedVariants).length) {
      setMessage('Please select all product variants!');
      return;
    }
    const variant_id = Object.values(selectedVariants)[0];

    try {
      const response = await fetch(
        `https://fedtest.bylith.com/api/cart/add?variant_id=${variant_id}&quantity=${quantity}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        setMessage('Product successfully added to the cart!');
        addToCart({
          variant_id: variant_id,
          quantity: quantity,
          title: product.title,
          price: product.min_price,
          image: imager(product.images[0].url),
        });
      } else {
        setMessage('Sorry, but this product is currently not available for sale.');
      }
    } catch (error) {
      setMessage('Request error');
    }
  };

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="selected__item">
      <div className="selected__item-slider">
        {product.images && product.images.length > 0 && (
          <Slider {...sliderSettings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={imager(image.url)} alt={image.title} />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="selected__item-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        {product.attributes &&
          product.attributes.map((attribute) => (
            <div className="drop-down" key={attribute.id}>
              <ReactSelect
                options={getOptions(attribute.labels)}
                className="select-dropdown"
                placeholder={attribute.title}
                onChange={(option) => {
                  setSelectedVariants((prevState) => ({
                    ...prevState,
                    [attribute.id]: option.value,
                  }));
                }}
              />
            </div>
          ))}
        <div className="product-counter">
          <button onClick={decreaseQuantity} className="product-counter-button">
            -
          </button>
          <span className="product-quantity">{quantity}</span>
          <button onClick={increaseQuantity} className="product-counter-button">
            +
          </button>
        </div>
        <button className="selected__item-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        {message && <p className="notification-message">{message}</p>}
      </div>
    </div>
  );
};

export default ProductPage;
