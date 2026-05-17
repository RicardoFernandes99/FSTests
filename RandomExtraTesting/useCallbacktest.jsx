import React, { useCallback, useState } from "react";

function ProductItemBase({ product, onToggleFavorite }) {
    console.log("Rendering product:", product.name);

    return (
        <div>
            <span>
                {product.name} {product.isFavorite ? "Yes" : "NO"}
            </span>

            <button onClick={() => onToggleFavorite(product.id)}>
                Toggle favorite
            </button>
        </div>
    );
}
const ProductItem = React.memo(ProductItemBase);

export default function ProductsPage() {
    const [products, setProducts] = useState([
        { id: 1, name: "Keyboard", isFavorite: false },
        { id: 2, name: "Mouse", isFavorite: false },
        { id: 3, name: "Monitor", isFavorite: false },
    ]);

    const [counter, setCounter] = useState(0);

    const handleToggleFavorite = useCallback((id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id
                    ? { ...product, isFavorite: !product.isFavorite }
                    : product,
            ),
        );
    }, []);

    return (
        <div>
            <h1>Products</h1>

            <button onClick={() => setCounter((prev) => prev + 1)}>
                Counter: {counter}
            </button>
            {products.map((p) => (
                <li key={p.id}>
                    {p.name}
                    {p.isFavorite ? "yes" : "no"}
                    <button onClick={() => console.log(p.id)}>Log ID</button>
                </li>
            ))}
            {products.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onToggleFavorite={handleToggleFavorite}
                />
            ))}
        </div>
    );
}
