// Get Max repeated brand
const getMaxBrand = (orders) => {
    // Group the orders by product
    const groupedOrders = orders.reduce((acc, order) => {
        const key = order.product;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(order);
        return acc;
    }, {});

    // get the brand with the most orders
    const maxBrand = Object.keys(groupedOrders).map((item, key) => {

        const obj = groupedOrders[item].reduce((acc, order) => {
            acc[order.brand] = (acc[order.brand] || 0) + 1;
            return acc;
        }, {});
        return item + "," + Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
    }, {});
    return maxBrand.join("\n");
}

module.exports = getMaxBrand