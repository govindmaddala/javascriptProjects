class ApiUtils {
    constructor(apicontext, cred, orderPayload) {
        this.apicontext = apicontext;
        this.cred = cred;
        this.orderPayload = orderPayload;
    }


    async getToken() {
        const resp = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.cred
            })
        const js = await resp.json();
        const token = js.token;
        console.log(token);
        return token;
    }

    async getOrderID() {
        let output = {};
        output.token = await this.getToken();
        const orderResp = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: this.orderPayload,
            headers: {
                'Authorization': output.token,
                'Content-Type': 'application/json'
            },
        })

        const orderJSON = await orderResp.json();
        console.log(orderJSON);
        const orderId = await orderJSON.orders[0];
        console.log(orderId);
        output.orderId = await orderId;
        return output;
    }
}

module.exports = { ApiUtils };