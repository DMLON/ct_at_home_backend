

export class UserDTO{
    constructor({id, username, email, firstName, lastName,photo,phone,country,address, cart, orders}){
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.phone = phone;
        this.country = country;
        this.address = address;
        this.cart = cart;
        this.orders = orders;
    }
}