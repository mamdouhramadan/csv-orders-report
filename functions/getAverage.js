// get avarage of quntity
const getAverage = (orders) => {
    const products = [...new Set(orders.map((order) => order.product))];
    let result = []
    for (let i = 0; i < products.length; i++) {
        let sum = 0;
        const product = products[i];
        orders.map((order) => {
            if (order.product == product) {
                sum += parseInt(order.quntity);
            }
        });
        const average = sum / orders.length;

        result.push(product + "," + average);
    }

    return result.join("\n");

}


module.exports = getAverage