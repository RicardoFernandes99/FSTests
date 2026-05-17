const productsMock = [
    { id: 1, name: "Keyboard", price: 50, favorite: true },
    { id: 2, name: "Mouse", price: 20, favorite: false },
    { id: 3, name: "Monitor", price: 200, favorite: false },
];

function ProductsPage() {
    const [products, setProducts] = useState(productsMock);
    const [search, setSearch] = useState("");
    const filterprods = useMemo(() => {
        return products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [products, search]); // Memo the function and do not recalculate unless dependencies changes. Products or Search value

    const updateFavorite = (id) =>
        setProducts((prev) => {
            prev.map((p) =>
                p.id === id ? { ...p, favorite: !p.favorite } : p,
            );
        });
    const removeProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };
    return (
        <>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            ></input>
            <ul>
                {filterprods.map((p) => (
                    <li key={p.id}>
                        {p.name}-{String(p.favorite)}
                    </li>
                ))}
            </ul>
        </>
    );
}
