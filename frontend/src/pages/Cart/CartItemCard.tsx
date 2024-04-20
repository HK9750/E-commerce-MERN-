import { Link } from "react-router-dom";
const CartItemCard = ({ item, deleteItem }: { item: any; deleteItem: any }) => {
  return (
    <div className="flex items-center gap-10">
      <img
        src={item.image.url}
        alt="Image"
        className="object-contain w-12 h-12"
      />{" "}
      <div>
        <Link
          to={`/product/${item.product}`}
          className="text-black hover:opacity-80"
        >
          {item.name}
        </Link>
        <p className="text-black">{`Price: $${item.price}`}</p>
        <button
          onClick={() => deleteItem(item.product)}
          className="text-red-700 hover:opacity-80"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
