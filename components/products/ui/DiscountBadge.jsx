export function DiscountBadge({ discount }) {
    if (discount <= 0) return null;
    return (
        <span className="bg-red-600 text-white text-xs uppercase font-bold
              px-1 py-0.5 rounded ">
            {discount}% OFF
        </span>
    );
}