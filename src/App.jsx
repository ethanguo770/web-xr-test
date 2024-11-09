import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { XR, createXRStore } from "@react-three/xr"
import { useState, useRef, useEffect } from "react"
import { CameraControls, Line, Html, Plane } from "@react-three/drei"
import * as THREE from "three"
import Planes from "./Planes"

const store = createXRStore()

const Rectangle = () => {
  const rectRef = useRef()

  // 每帧更新矩形的位置和旋转，使其面朝相机
  useFrame(({ camera }) => {
    if (rectRef.current) {
      // 计算相机前方的方向
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)

      // 将矩形位置设置为相机位置并向前移动一定距离
      rectRef.current.position.copy(camera.position)
      rectRef.current.position.add(direction.multiplyScalar(2)) // 向前方向

      rectRef.current.quaternion.copy(camera.quaternion)
    }
  })

  const points = [
    [-1, -1, 0], // 左下角
    [1, -1, 0], // 右下角
    [1, 1, 0], // 右上角
    [-1, 1, 0], // 左上角
    [-1, -1, 0], // 回到左下角
  ]

  return <Line ref={rectRef} points={points} color="red" lineWidth={2} />
}

const CanvasTexture = ({ canvasRef }) => {
  const textureRef = useRef(new THREE.CanvasTexture(canvasRef.current))
  const rectRef = useRef()

  // 每帧更新矩形的位置和旋转，使其面朝相机
  useFrame(({ camera }) => {
    if (rectRef.current) {
      // 计算相机前方的方向
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)

      // 将矩形位置设置为相机位置并向前移动一定距离
      rectRef.current.position.copy(camera.position)
      rectRef.current.position.add(direction.multiplyScalar(2)) // 向前方向

      rectRef.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <>
      <Plane ref={rectRef}>
        <meshBasicMaterial attach="material" map={textureRef.current} />
      </Plane>
    </>
  )
}

const Test = ({ canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current // 访问 DOMElement 属性
    if (canvas) {
      console.log(canvas) // 这里可以访问真正的 canvas DOM 元素
    }
  }, [])

  return (
    <Canvas
      key="tt"
      ref={canvasRef}
      style={{
        width: "200px",
        height: "200px",
        zIndex: -1,
        position: "absolute",
        pointerEvents: "none",
      }}
    >
      {/* <CameraControls /> */}
      <axesHelper />
    </Canvas>
  )
}

const App = () => {
  const [red, setRed] = useState(false)
  const canvasRef = useRef()
  const testRef = useRef()

  return (
    <>
      <button
        style={{ position: "fixed", right: 10, top: 10, zIndex: 99999 }}
        onClick={() => store.enterVR()}
      >
        Enter VR
      </button>
      <Test canvasRef={canvasRef} />
      <Canvas
        ref={testRef}
        style={{
          position: 9999,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: 9999,
        }}
      >
        <XR store={store}>
          <Rectangle />
          <axesHelper />
          {/* <CanvasTexture canvasRef={canvasRef} /> */}
          <Planes />
        </XR>
      </Canvas>
    </>
  )
}

export default App
