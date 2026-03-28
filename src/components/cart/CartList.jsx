import CartItem from "./CartItem";

const CartList = ({ cartItem }) => {
  return (
    <div className="space-y-4">
      {cartItem.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
