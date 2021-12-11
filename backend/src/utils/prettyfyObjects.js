
import { fullUrl } from "../utils/getUrl.js";
//Falta arregalr el fullURL para que sea bien el public folder
export const prettyfyUser = (user) => {
    return `
    <h1>New user</h1>
    <p>Time: ${user.timestamp.toISOString()}</p>
    <p>First Name: ${user.firstName}</p>
    <p>Last Name: ${user.lastName}</p>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Address: ${user.address}</p>
    <p>City: ${user.city}</p>
    <p>Age: ${user.age}</p>
    <p>Country: ${user.country}</p>
    <p>Image:</p>
    <img src="${fullUrl(req)}${user.photo}" alt="${user.firstName} ${user.lastName}">
    `
}

export const prettyfyCart = (cart) => {
    const totalPrice = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const products = cart.products.map(p => {
        return `
        <div>
            <h2>${p.product.name}</h2>
            <p>Price: $${p.product.price}</p>
            <p>Quantity: ${p.quantity}</p>
            <p>Total: $${p.product.price * p.quantity}</p>
        </div>
        `
    });
    
    return `
    <h1>New Order</h1>
    <p>Time: ${cart.timestamp.toISOString()}</p>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${products.join('')}
        </tbody>
    </table>
    <p>Total: $${totalPrice}</p>
    `
}