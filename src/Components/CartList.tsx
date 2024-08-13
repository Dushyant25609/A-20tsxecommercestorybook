import  { Component } from "react";
import { getProduct } from "../Api";
import Loading from "./Loading";
import { MdDelete } from "react-icons/md";
import { withCart } from "./withProvider";
import EmptyCart from "./EmptyCart";

interface CartPropType {
  cartItems: { [key: number]: number };
  updateCart: (newCart: { [key: number]: number }) => void;
}

interface Product {
  price: number;
  id: number;
  thumbnail: string;
  title: string;
}

interface CartListState {
  products: Product[];
  loading: boolean;
  mycart: { [key: number]: number };
  buttonClass: string;
}

class CartList extends Component<CartPropType, CartListState> {
  constructor(props: CartPropType) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      mycart: props.cartItems,
      buttonClass: "opacity-25 cursor-not-allowed",
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps: CartPropType) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.setState({ mycart: this.props.cartItems }, this.fetchProducts);
    }
  }

  fetchProducts = () => {
    this.setState({ loading: true });
    const promises = Object.keys(this.state.mycart).map((item) => getProduct(Number(item)));

    Promise.all(promises)
      .then((responses) => {
        this.setState({ products: responses as Product[], loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  deleteItems = (productId: number) => {
    const newCart = { ...this.state.mycart };
    delete newCart[productId];
    this.setState({ mycart: newCart });
    this.props.updateCart(newCart);
  };

  handleInputChange (val: number, inputId: number)  {
    const newCart = { ...this.state.mycart, [inputId]: val };
    this.setState({ mycart: newCart, buttonClass: "opacity-100 cursor-pointer hover:bg-gray-500" });
  };

  updateAfterChange = () => {
    this.props.updateCart(this.state.mycart);
  };

  render() {
    const { products, loading, mycart, buttonClass } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (products.length === 0) {
      return <EmptyCart />;
    }

    const total = products.reduce((total, { price, id }) => {
      return total + (price || 0) * (mycart[id] || 0);
    }, 0);

    return (
      <div className="bg-white min-h-screen mt-20 m-4">
        <div className="p-2 border bg-gray-300 border-black flex">
          <div className="w-1/2 flex justify-center">
            <p>Product</p>
          </div>
          <div className="w-1/2 flex justify-between">
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
        </div>

        {products.map((item) => (
          <div key={item.id} className="border-b border-gray-500 bg-white px-4 flex">
            <div className="w-1/2 flex items-center">
              <button onClick={() => this.deleteItems(item.id)}>
                <MdDelete className="text-2xl" />
              </button>
              <img className="max-w-20" src={item.thumbnail} alt="" />
              <p className="ml-20">{item.title}</p>
            </div>
            <div className="flex w-1/2 flex-row justify-between items-center">
              <p>{item.price}</p>
              <input
                type="number"
                min="1"
                value={mycart[item.id]}
                onChange={(e) => this.handleInputChange(+e.target.value, item.id)}
                className="border px-1 w-11 py-2 border-gray-300"
              />
              <p>{(item.price * mycart[item.id]).toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className="flex bg-white pt-4 justify-between">
          <div>
            <input
              type="text"
              className="px-2 py-2 mx-2 border border-black"
              placeholder="Apply Coupon"
            />
            <button className="bg-gray-400 hover:bg-gray-500 px-16 py-2">Apply coupon</button>
          </div>
          <div>
            <button onClick={this.updateAfterChange} className={`bg-gray-400 px-16 py-2 ${buttonClass}`}>
              UPDATE CART
            </button>
          </div>
        </div>

        <div className="flex flex-row bg-white justify-end">
          <div className="flex mt-4 p-2 flex-col gap-2 min-h-24 w-64 justify-between">
            <div className="flex flex-col border-black border gap-3">
              <div className="flex flex-row w-full justify-center border-b border-black">
                <h2>Cart Totals</h2>
              </div>
              <div className="flex flex-row justify-between border-b p-2 border-black">
                <p>SubTotal</p>
                <p>{total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between p-2 flex-row">
                <p>Total</p>
                <p>{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white">
              <button className="bg-gray-400 hover:bg-gray-500 mt-2 px-16 py-2">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCart(CartList);
