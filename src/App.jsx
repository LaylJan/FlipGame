import React, { useState, useEffect } from "react";
import back from "./assets/back.png";
import a from "./assets/1.png";
import b from "./assets/2.png";
import c from "./assets/3.png";
import "./App.css";

function App() {
  const [flipped, setFlipped] = useState(Array(6).fill(false));
  const [images, setImages] = useState([]);
  const [removed, setRemoved] = useState(Array(6).fill(false));
  const [flippedIndices, setFlippedIndices] = useState([]);

  useEffect(() => {
    // Initialize the images array with 2 instances of 'a' and 2 instances of 'b'
    const initialImages = [a, b, c, a, b, c];
    // Shuffle the array
    const shuffledImages = initialImages.sort(() => Math.random() - 0.5);
    // Set the shuffled images
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
      <div className="text-center mb-8">
        <p>HELLO FLIP</p>
      </div>
      {allImagesRemoved ? (
        <p>WIN</p>
      ) : (
        <div className="justify-center grid grid-cols-3 grid-rows-2 w-2/4">
          {flipped.map((isFlipped, index) => (
            <div
              key={index}
              className="flex justify-center items-center"
              onClick={() => handleFlip(index)}
            >
              <img
                src={isFlipped ? images[index] : back}
                id={isFlipped ? getIdFromImage(images[index]) : "back"}
                alt=""
                className="w-36 m-10"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
