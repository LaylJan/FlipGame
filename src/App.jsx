import React, { useState, useEffect } from "react";
import back from "./assets/back.png";
import a from "./assets/1.png";
import b from "./assets/2.png";
import c from "./assets/3.png";
import d from "./assets/4.png";
import e from "./assets/5.png";
import f from "./assets/6.png";
import "./App.css";

function App() {
  const [flipped, setFlipped] = useState(Array(12).fill(false));
  const [images, setImages] = useState([]);
  const [removed, setRemoved] = useState(Array(12).fill(false));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const initialImages = [a, b, c, d, e, f, a, b, c, d, e, f];

    const shuffledImages = initialImages.sort(() => Math.random() - 0.5);

    setImages(shuffledImages);
  }, []);

  const handleFlip = (index) => {
    console.log(getIdFromImage(images[index]) !== "back");
    console.log(getIdFromImage(images[index]));
    if (removed[index] || flipped[index] || flippedIndices.length === 2) return;
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
    setFlippedIndices((prevIndices) => {
      const newIndices = [...prevIndices, index];
      if (newIndices.length === 2) {
        setCounter(counter + 1);
        checkMatch(newIndices);
      }
      return newIndices.length === 2 ? [] : newIndices;
    });
  };

  const checkMatch = (indices) => {
    const [index1, index2] = indices;
    const id1 = getIdFromImage(images[index1]);
    const id2 = getIdFromImage(images[index2]);
    if (id1 === id2) {
      setRemoved((prevRemoved) => {
        const newRemoved = [...prevRemoved];
        newRemoved[index1] = true;
        newRemoved[index2] = true;
        return newRemoved;
      });
    } else {
      setTimeout(() => {
        setFlipped((prevFlipped) => {
          const newFlipped = [...prevFlipped];
          newFlipped[index1] = false;
          newFlipped[index2] = false;
          return newFlipped;
        });
      }, 1000);
    }
  };

  const allImagesRemoved = removed.every((r) => r);

  const getIdFromImage = (image) => {
    // Extract the name or a unique part of the image path to use as an ID
    const parts = image.split("/");
    const fileName = parts[parts.length - 1];
    return fileName.split(".")[0]; // Get the name without extension
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10">
      {allImagesRemoved ? (
        <div className="flex flex-col items-center">
          <p>YOU WIN!!</p>
          <h2>Times Flipped: {counter}</h2>
        </div>
      ) : (
        <div>
          <div>
            <h2>Counter: {counter}</h2>
          </div>
          <div className="justify-center grid grid-cols-6 grid-rows-2 w-full">
            {flipped.map((isFlipped, index) => (
              <div
                key={index}
                className="flex justify-center items-center m-2"
                onClick={() => handleFlip(index)}
              >
                <img
                  src={isFlipped ? images[index] : back}
                  id={isFlipped ? getIdFromImage(images[index]) : "back"}
                  alt=""
                  className=" w-4/5 m-10"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
