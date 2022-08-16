module.exports = function Cart(oldCart) {
    this.items = oldCart.items
    this.totalQty = oldCart.totalQty
    this.totalPrice = oldCart.totalPrice

    this.add = function(item, id) {
        var storedItems = this.items[id]
        if (!storedItems) {
            storedItems = this.items[id] = {id: items, qty: 0, price: 0}
        }

        storedItems.Qty ++;
        storedItems.price = storedItems.item.price * storedItems.Qty
        this.totalQty ++;
        this.totalPrice += storedItems.price
    }

    this.generateArray = function() {
        var arr = []
        for (var id in this.items) {
            arr.push(this.items[id])
        }
        return arr
    }
}

