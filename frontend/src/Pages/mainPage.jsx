import { useState } from "react";

export default function mainPage() {
    const [showDiv, setShowDiv] = useState(false);

    return (
        <>
            <div>
                <h1 background="white">This is The main Page</h1>
            </div>
            <button
                style={{
                    marginLeft: "10px",
                    color: "black",
                    background: "#edeff3",
                    border: "1px solid white",
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                }}
                onClick={() => setShowDiv((prev) => !prev)}
            >
                Toggle
            </button>
            {showDiv ? (
                <div> This is the false random div</div>
            ) : (
                <div> This is the true random div</div>
            )}
            <h1> The button is currently {String(showDiv)} </h1>
        </>
    );
}
