
import { fullUrl } from "../utils/getUrl.js";
//Falta arregalr el fullURL para que sea bien el public folder
export const prettyfyUser = (req,user) => {
    return `
    <h1>New user</h1>
    <p>Time: ${user.createdAt.toISOString()}</p>
    <p>First Name: ${user.firstName}</p>
    <p>Last Name: ${user.lastName}</p>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Address: ${user.address}</p>
    <p>Age: ${user.age}</p>
    <p>Country: ${user.country}</p>
    <p>Image:</p>
    <img src="${fullUrl(req)}${user.photo}" alt="${user.firstName} ${user.lastName}">
    `
}

export const prettyfyOrder = (order) => {
    const totalPrice = order.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const products = order.products.map(p => {
        return `
        <tr>
            <td>${p.product.name}</td>
            <td>Price: $${p.product.price}</td>
            <td>Quantity: ${p.quantity}</td>
            <td>Total: $${p.product.price * p.quantity}</td>
        </tr>
        `
    });
    
    return `
    <h1>New Order</h1>
    <p>Time: ${new Date(order.createdAt).toISOString()}</p>
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