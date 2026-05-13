import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../auth/useAuth";
export default function MainPage() {
    const [showDiv, setShowDiv] = useState(false);
    const { user, loading } = useAuth();
    return (
        <>
            <div>
                <h1 background="white">This is The main Page</h1>
            </div>
            <p>
                {user?.email} - {user?.role}
            </p>
            <Button
                className="ml-2.5"
                variant="secondary"
                onClick={() => setShowDiv((prev) => !prev)}
            >
                Toggle
            </Button>
            {showDiv ? (
                <div> This is the false random div</div>
            ) : (
                <div> This is the true random div</div>
            )}
            <h1> The button is currently {String(showDiv)} </h1>
        </>
    );
}
