import { Canvas, useFrame } from "@react-three/fiber"
import { XR, createXRStore } from "@react-three/xr"
import { useRef } from "react"
import { Line } from "@react-three/drei"
import * as THREE from "three"
import Planes from "./Planes"

const store = createXRStore()

const App = () => {
  return (
    <>
      <button
        style={{ position: "fixed", right: 10, top: 10, zIndex: 99999 }}
        onClick={() => store.enterVR()}
      >
        Enter VR
      </button>
      <Canvas
        style={{
          position: 9999,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: 9999,
        }}
      >
        <XR store={store}>
          <Planes />
        </XR>
      </Canvas>
    </>
  )
}

export default App
