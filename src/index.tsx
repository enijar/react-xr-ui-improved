import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import App from "@/app";

const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <Canvas flat linear gl={{ alpha: false }}>
    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    <OrbitControls />
    <App />
  </Canvas>,
);
