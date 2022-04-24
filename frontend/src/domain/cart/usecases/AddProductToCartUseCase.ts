import CartRepository from "../CartRepository";
import Cart from "../Cart";
import Product from "../../products/Product";

export default class AddProductToCartUseCase {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async execute(product: Product): Promise<Cart> {
        const cart = await this.cartRepository.get();

        const cartItem = {
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
            quantity: 1
        };

        const editedCart = cart.addItem(cartItem);

        await this.cartRepository.save(editedCart);

        return editedCart;
    }
}
