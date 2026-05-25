"use client";

import { useEffect } from "react";

export default function CheckoutResume() {
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (!savedCart) {
      window.location.href = "/";
      return;
    }

    fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: JSON.parse(savedCart),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.url;
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "32px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          minWidth: "260px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            margin: "0 auto 16px",
            border: "3px solid #ddd",
            borderTop: "3px solid #111",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />

        <p
          style={{
            margin: 0,
            fontSize: "15px",
            color: "#111",
          }}
        >
          Taking you to secure checkout…
        </p>

        <style>
          {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>
      </div>
    </div>
  );
}
