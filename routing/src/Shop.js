import React, { useState, useEffect } from "react";
import "./App.css";

function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch(
      "https://fortnite-api.theapinetwork.com/upcoming/get"
    );
    console.log(data);
  };

  return (
    <div className="App">
      <h1>Shop</h1>
    </div>
  );
}

export default Shop;
