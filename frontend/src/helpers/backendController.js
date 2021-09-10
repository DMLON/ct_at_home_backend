export default class BackendController {
    static ProductController = class {
        static endpoint = "http://localhost:8080/api/products";
        static getAllProducts = async () => {
            try {
                const response = await fetch(this.endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static getProduct = async (productId) => {
            try {
                const response = await fetch(this.endpoint + "/" + productId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static createProduct = async ({ name, description, code, photo, price, stock }) => {
            try {
                const response = await fetch(this.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: { name, description, code, photo, price, stock },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static updateProduct = async ({ id, name, description, code, photo, price, stock }) => {
            try {
                const response = await fetch(this.endpoint + "/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: { id, name, description, code, photo, price, stock },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static deleteProduct = async (productId) => {
            try {
                const response = await fetch(this.endpoint + "/" + productId, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };
    };

    static CartController = class {
        static endpoint = "http://localhost:8080/api/cart";
        static getAllProducts = async (cartId) => {
            try {
                const response = await fetch(`${this.endpoint}/${cartId}/products`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static createCart = async () => {
            try {
                const response = await fetch(this.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static addProductToCart = async (cartId, productId, quantity) => {
            try {
                const response = await fetch(`${this.endpoint}/${cartId}/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:{productId, quantity}
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static removeProductFromCart = async (cartId, productId) => {
            try {
                const response = await fetch(`${this.endpoint}/${cartId}/products/${productId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };

        static deleteCart = async (cartId) => {
            try {
                const response = await fetch(`${this.endpoint}/${cartId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                return error;
            }
        };
    };
}
