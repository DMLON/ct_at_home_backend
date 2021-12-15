export default class BackendController {
    static baseEndpoint = ""; //"http://localhost:8080"
    static ProductController = class {
        static endpoint = BackendController.baseEndpoint+"/api/products";
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
                throw error;
            }
        };

        static getProduct = async (productId) => {
            try {
                const response = await fetch(this.endpoint + "/" + productId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static createProduct = async ({ name, description, code, photo, price, stock }) => {
            try {
                const response = await fetch(this.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ name, description, code, photo, price, stock }),
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static updateProduct = async ({ id, name, description, code, photo, price, stock }) => {
            try {
                const response = await fetch(this.endpoint + "/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ id, name, description, code, photo, price, stock }),
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static deleteProduct = async (productId) => {
            try {
                const response = await fetch(this.endpoint + "/" + productId, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };
    };

    static CartController = class {
        
        static endpoint =  BackendController.baseEndpoint+"/api/cart";
        static getAllProducts = async (cartId) => {
            try {
                const response = await fetch(`${this.endpoint}/${cartId}/products`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static createCart = async () => {
            try {
                const response = await fetch(this.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static addProductToCart = async (cartId, productId, quantity) => {
            const body = {productId, quantity}
            try {
                const response = await fetch(`${this.endpoint}/${cartId}/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body:JSON.stringify(body)
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static removeProductFromCart = async (cartId, productId) => {
            try {
                const response = await fetch(`${this.endpoint}/${cartId}/products/${productId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static deleteCart = async (cartId) => {
            try {
                const response = await fetch(`${this.endpoint}/${cartId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        };

        static buyCart = async (cartId) => {
            try {
                const response = await fetch(`${this.endpoint}/buy/${cartId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                return response.status === 200 ? await response.json() : null;
            } catch (error) {
                throw error;
            }
        }
    };

    static UserController = class {
        static endpoint = BackendController.baseEndpoint+"/api/auth";
        static signupUser= async(data)=>{
            try{
                const response = await fetch(`${this.endpoint}/signup`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials: "include",
                    body:JSON.stringify(data)
                })
                return response.status === 200 ? await response.json() : null;
            }catch(error){
                throw error;
            }
        }

        static loginUser= async(data)=>{
            try{
                const response = await fetch(`${this.endpoint}/login`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    
                    credentials: "include",
                    body:JSON.stringify(data)
                })
                debugger;
                // throw Error("Invalid Credentials");
                if (await response.status === 200)
                    return await response.json()
                else throw Error("Invalid Credentials");
            }catch(error){
                throw error;
            }
        }

        static logoutUser = async()=>{
            try{
                const response = await fetch(`${this.endpoint}/logout`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials: "include"
                })
                return response.status === 200 ? await response.json() : null;
            }catch(error){
                throw error;
            }
        }
    };

    static RequestsController = class {
        static endpoint = BackendController.baseEndpoint+"/api/auth";
        static signupUser= async(data)=>{
            try{
                const response = await fetch(`${this.endpoint}/signup`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials: "include",
                    body:JSON.stringify(data)
                })
                return response.status === 200 ? await response.json() : null;
            }catch(error){
                throw error;
            }
        }

        static loginUser= async(data)=>{
            try{
                const response = await fetch(`${this.endpoint}/login`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials: "include",
                    body:JSON.stringify(data)
                })
                return response.status === 200 ? await response.json() : null;
            }catch(error){
                throw error;
            }
        }
    };
}
