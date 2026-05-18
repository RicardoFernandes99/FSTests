function ParentComponent() {
    const [search, setSearch] = useState("");

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            <ProductFilter search={search} />
        </>
    );
}

function SearchBar({ search, setSearch }) {
    return (
        <>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            ></input>
        </>
    );
}
const productsMock = [
    { id: 1, name: "Keyboard", price: 50, favorite: true },
    { id: 2, name: "Mouse", price: 20, favorite: false },
    { id: 3, name: "Monitor", price: 200, favorite: false },
];

function ProductFilter({ search }) {
    const [products, setProducts] = useState(productsMock);

    const filteredProducts = useMemo(
        () =>
            products.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase()),
            ),
        [products, search],
    );

    const filteredProducts = useMemo(
        () =>
            products.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase()),
            ),
        [products, search],
    );
    return (
        <>
            {filteredProducts.map((p) => (
                <li key={p.id}> {p.name}</li>
            ))}
        </>
    );
}
