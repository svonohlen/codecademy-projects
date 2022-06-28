import React from "react";
import { Tile } from "../tile/Tile";

export const TileList = ({ tiles }) => {
  return (
    <div>
      {tiles.map((tile, tileIndex) => {
        return <Tile tile={tile} key={tileIndex} />;
      })}
    </div>
  );
};
