import React, { useEffect, useRef } from "react"
import { Vector3, Frustum, Matrix4, Layers } from "three"
import { useFrame, useThree } from "@react-three/fiber"

const frustum = new Frustum()
const matrix = new Matrix4()

function Plane() {
  const leftRef = useRef()
  const rightRef = useRef()

  const { camera } = useThree()

  useEffect(() => {
    // if (camera.isArrayCamera) {
    //   camera.cameras[0].layers.enable(leftLayer)
    //   camera.cameras[0].layers.disable(rightLayer)
    //   camera.cameras[1].layers.enable(rightLayer)
    //   camera.cameras[1].layers.disable(leftLayer)
    // }

    if (leftRef.current) {
      leftRef.current.layers.set(1)
      rightRef.current.layers.set(2)
    }
  }, [camera])

  // 每帧更新矩形的位置和旋转，使其面朝相机
  useFrame(() => {
    if (leftRef.current) {
      // 计算相机前方的方向
      const direction = new Vector3()

      camera.getWorldDirection(direction)
      // 将矩形位置设置为相机位置并向前移动一定距离
      leftRef.current.position.copy(camera.position)
      leftRef.current.position.add(direction.multiplyScalar(2)) // 向前方向
      leftRef.current.quaternion.copy(camera.quaternion)

      camera.getWorldDirection(direction)
      rightRef.current.position.copy(camera.position)
      rightRef.current.position.add(direction.multiplyScalar(2)) // 向前方向
      rightRef.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <>
      <mesh ref={leftRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      <mesh ref={rightRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  )
}

export default Plane
