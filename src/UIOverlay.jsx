// // UIOverlay.js
// import React, { useRef } from "react"
// import { Html } from "@react-three/drei"
// import { useFrame, useThree } from "@react-three/fiber"
// import * as THREE from "three"

// function UIOverlay() {
//   const groupRef = useRef()
//   const { camera } = useThree()

//   useFrame(() => {
//     if (groupRef.current) {
//       // 设置 UI 位置在摄像机前方 2 个单位
//       const distance = 2
//       const direction = new THREE.Vector3()
//       camera.getWorldDirection(direction)
//       groupRef.current.position
//         .copy(camera.position)
//         .add(direction.multiplyScalar(distance))

//       // 始终面向摄像机
//       groupRef.current.quaternion.copy(camera.quaternion)
//     }
//   })

//   return (
//     <group ref={groupRef}>
//       <Html
//         position={[0, 0, 0]} // 相对于 group 的位置
//         transform
//         distanceFactor={1}
//         occlude
//         style={{ pointerEvents: "auto" }} // 允许交互
//       >
//         <div
//           style={{
//             background: "rgba(255, 255, 255, 0.8)",
//             padding: "20px",
//             borderRadius: "10px",
//           }}
//         >
//           <button
//             onClick={() => alert("按钮被点击!")}
//             style={{
//               padding: "10px 20px",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//           >
//             点击我
//           </button>
//         </div>
//       </Html>
//     </group>
//   )
// }

// export default UIOverlay

import * as React from "react"
import { useFrame, useThree, ReactThreeFiber } from "react-three-fiber"
import { useSpring, a } from "react-spring/three"

import { Box } from "./Shapes"

const Hud = ({ position } = { position: [0, 0, 0] }) => {
  const { camera } = useThree()
  const [props, set] = useSpring(() => ({
    position: position,
    rotation: [0, 0, 0],
    config: { mass: 1, friction: 20, tension: 500 },
  }))

  useFrame(() => {
    const { x, y, z } = camera.position
    const { x: rotX, y: rotY, z: rotZ } = camera.rotation
    set({ position: [x, y, z], rotation: [rotX, rotY, rotZ] })
  })

  return (
    <a.group position={props.position}>
      <a.group rotation={props.rotation}>
        <group position={position}>
          <Box args={[1, 1, 0.05]} color="red" position={[2, -1, 0]} />
          <Box args={[0.5, 1, 0.05]} color="blue" position={[-2, -1, 0]} />
        </group>
      </a.group>
    </a.group>
  )
}

export default Hud
