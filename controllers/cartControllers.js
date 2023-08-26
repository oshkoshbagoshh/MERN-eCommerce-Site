const Cart = require('../models/Cart');
const Item = require('../models/Item');


// fetch all items from cart and display on the frontend
// only display items that have been added to cart by the user (ie the number of items is != 0)


module.exports.get_cart_items = async (req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart && cart.items.length > 0) {
            res.send(cart);
        }
        else {
            res.send(null);
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
}



// add item to cart
/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-25 22:25:24 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-25 22:37:18
 * @Description: 
 * get the userId by params and the productId, as well as the quantity by the request body. 
 * Then, we check if the user already has a cart. If not, we create a new cart and add the item to it.
 *  need to check if item already exists in cart. If it does, we update the quantity of the item in the cart.
 * If it doesn’t, we add the item to the cart using the push method.
 * Scenario 2: user does not have a cart, so we create a new cart and add the item to it, and the quantity is 1, since it is the first item in the cart. Then we calculate the bill by multiplying the price of the item by the quantity.
 * 
 */

module.exports.add_cart_item = async (req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        let item = await Item.findOne({ _id: productId });
        if (!item) {
            return res.status(404).send('Item not found');
        }
        const price = item.price;
        const name = item.title;
        const description = item.description;
        // const image = item.image;TODO: add image to cart
        if (cart) {
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            }
            else {
                cart.items.push({ productId, name, description, quantity, price });
            }
            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else {
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, description, quantity, price }],
                bill: quantity * price
            });

            return res.status(201).send(newCart);

        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
}

/* delete item from cart. If the quantity of the item is greater than 1, we just update the quantity and the bill. If the quantity is 1, we remove the item from the cart by using the slice method. If the cart is empty, we delete the cart from the database. 
Finally, we return the updated cart to the frontend. 
*/

module.exports.delete_item = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    try {
        let cart = await Cart.findOne({ userId });
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity * productItem.price;
            cart.items.splice(itemIndex, 1);
        }
        if (cart.items.length == 0) {
            await Cart.findOneAndDelete({ userId });
        }
        else {
            cart = await cart.save();
        }
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
}