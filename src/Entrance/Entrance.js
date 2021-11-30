import React, { useState } from "react";
import Login from '../Login/Login';
import Register from "../Register/Register";

export const Entrance = () => {
    const [onLogin, setOnLogin] = useState(true);
    return <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }}>
        <div style={{ padding: 10 }}>
            <h1 style={{ color: "black", fontSize: "10vw" }}>Questioneer</h1>
        </div>
        <div style={{ width: '80%', border: "1px solid white" }}>
            <button
                style={{ width: "50%", padding: 5, height: "100%" }}
                onClick={() => setOnLogin(true)}
                disabled={onLogin}>Login</button>

            <button
                style={{ width: "50%", padding: 5, height: "100%" }}
                onClick={() => setOnLogin(false)}
                disabled={!onLogin}>Register</button>
        </div>
        <div style={{ marginBottom: 50, width: '80%', height: 400, display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid white" }}>
            {onLogin ? <Login /> : <Register />}
        </div>
    </div>
}