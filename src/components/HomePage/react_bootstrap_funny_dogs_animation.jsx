import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TOTAL_DOGS = 60; // visually manageable instead of 1528

export default function DogHouseAnimation({ image }) {
    const [dogs, setDogs] = useState([]);

  useEffect(() => {
    let generatedDogs = [];

    for (let i = 0; i < TOTAL_DOGS; i++) {
      generatedDogs.push({
        id: i,
        left: -50 - Math.random() * 300,
        top: 220 + Math.random() * 40,
        speed: 1 + Math.random() * 2,
        delay: i * 0.1,
      });
    }

    setDogs(generatedDogs);
  }, []);

  return (
    <div className="container mt-4 text-center">
      <div
        style={{
          position: "relative",
          width: "600px",
          height: "400px",
          margin: "0 auto",
          border: "10px solid #8b5a2b",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundImage:
            "url(https://placehold.co/600x400/343a40/ffffff?text=Your+Image+comes+here)",
          backgroundSize: "cover",
        }}
      >
        {/* House */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "250px",
            width: "100px",
            height: "100px",
            backgroundColor: "#ffcc00",
            border: "3px solid black",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              left: "-10px",
              width: "0",
              height: "0",
              borderLeft: "60px solid transparent",
              borderRight: "60px solid transparent",
              borderBottom: "50px solid red",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "35px",
              width: "30px",
              height: "40px",
              backgroundColor: "black",
            }}
          />
        </div>

        {/* Dogs */}
        {dogs.map((dog) => (
          <div
            key={dog.id}
            style={{
              position: "absolute",
              left: dog.left,
              top: dog.top,
              fontSize: "20px",
              animation: `runDog ${4 / dog.speed}s linear ${dog.delay}s forwards`,
            }}
          >
            🐶
          </div>
        ))}

        {/* Falling dogs */}
        {dogs.slice(30).map((dog) => (
          <div
            key={"fall-" + dog.id}
            style={{
              position: "absolute",
              left: 270 + Math.random() * 40,
              top: 140,
              fontSize: "20px",
              animation: `fallDog 2s ease-in ${2 + dog.delay}s forwards`,
            }}
          >
            🐶
          </div>
        ))}
      </div>

      <style>{`
        @keyframes runDog {
          0% { transform: translateX(0); }
          80% { transform: translateX(300px); }
          100% { transform: translateX(320px); }
        }

        @keyframes fallDog {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(200px) rotate(180deg); }
        }
      `}</style>

      <p className="mt-3">🐶 1528 dogs attempted entry... capacity exceeded 🐶</p>
    </div>
  );
}
