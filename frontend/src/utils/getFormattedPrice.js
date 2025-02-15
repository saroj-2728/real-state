export const getFormattedPrice = (price) => {
    switch (true) {
        case price < 100000:
            return `${price}`;
        case price >= 100000 && price < 10000000:
            return `${(price / 100000).toFixed(2)} Lakh`;
        case price >= 10000000:
            return `${(price / 10000000).toFixed(2)} Crore`;
    }
}