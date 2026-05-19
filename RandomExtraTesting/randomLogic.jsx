import { useState } from "react";

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

    const filter = (search) => {
        return products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
    };
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

function MyProdPage() {
    const [products, setProducts] = useState(productsMock);
    const [search, setSearch] = useState("");
    const [newName, setNewName] = useState("");
    const filterProds = (search) => {
        return products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
    };
    const filterProducts = filterProds(search);

    const handleDelete = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };
    const update = (id, newname) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, name: newname } : p)),
        );
    };
    return (
        <>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            ></input>

            {filterProducts.map((p) => (
                <div>
                    <li key={p.id}> {p.name}</li>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    ></input>
                    <button onClick={() => handleUpdate(p.id, newName)}>
                        Delete
                    </button>
                </div>
            ))}
        </>
    );
}
