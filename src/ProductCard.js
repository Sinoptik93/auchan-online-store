class ProductCard  {
  constructor (title, weight, price, old_price, count) {
    this.title = title,
    this.weight = weight,
    this.price = price,
    this.old_price = old_price,
    this.count = count
  }

  stringifyData() {
    return JSON.stringify({
      title: this.title,
      weight: this.weight,
      price: this.price,
      old_price: this.old_price,
      count: this.count
    });
  }
}

export default ProductCard;