export function getDiscountedPrice(price, discount) {
    return discount > 0
        ? (price * (100 - discount) / 100).toFixed(2)
        : price.toFixed(2);
}