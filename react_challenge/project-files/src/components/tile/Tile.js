import React from "react";

export const Tile = ({ tile }) => {
  return (
    <div className="tile-container">
      {Object.values(tile).map((tile, tileIndex) => {
        return (
          <p
            className={tileIndex === 0 ? "tile-title" : "tile"}
            key={tileIndex}
          >
            {tile}
          </p>
        );
      })}
    </div>
  );
};
