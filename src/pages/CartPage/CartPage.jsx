import { useCart } from '../../services/functions';
import './cartPage.scss';
import Delete from '../../utils/images/delete.png';

const CartPage = () => {
  const { cart, increaseItemQuantity, decreaseItemQuantity } = useCart();

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalAmount = cart.reduce((acc, item) => acc + item.quantity * Number(item.price), 0);

  return (
    <div className="cart">
      <h1 className="cart__title">My Cart</h1>
      <div className="cart__divider"></div>
      <div className="cart__wrapper">
        <div className="cart__items">
          <div className="cart__table-title">
            <span className="product-title">PRODUCT</span>
            <span className="quantity-title">QUANTITY</span>
            <span className="price-title">PRICE</span>
          </div>
          <div className="cart__products">
            {cart.map((item) => (
              <ul key={item.variant_id}>
                <li className="grid-container">
                  <img src={item.image} alt={item.title} />
                  <h4 className="item-title">{item.title}</h4>
                  <div className="item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseItemQuantity(item.variant_id)}>
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="quantity-btn"
                      onClick={() => increaseItemQuantity(item.variant_id)}>
                      +
                    </button>
                  </div>
                  <p className="item-price">${Number(item.price) * item.quantity}</p>
                  <img className="delete-icon" src={Delete} alt="delete-icon" />
                </li>
                <div className="cart__products-divider"></div>
              </ul>
            ))}
          </div>
        </div>
        <div className="cart__summary">
          <div className="cart__summary-item">
            <h3 className="title">Summary</h3>
            <p className="text">Clear all</p>
          </div>
          <div className="cart__summary-item">
            <span className="items-span">Items</span>
            <p className="items-p">{totalItemsInCart}</p>
          </div>
          <div className="summary_divider"></div>
          <div className="cart__summary-item">
            <h4>Total</h4>
            <h4>${totalAmount.toFixed(2)}</h4>
          </div>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
