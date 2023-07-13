import { animated, useSpring } from '@react-spring/three'
import { CameraControls, SoftShadows } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type * as THREE from 'three'

function timingFunction(x: number) {
  return x < 0.5
    ? 4 * x ** 3
    : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1
}

function Leaf({ position = [0, 0, 0] }: {
  position: THREE.Vector3Tuple
}) {
  const ref = useRef<THREE.Mesh>(null)
  const semicircleAngle = useMemo(() => 0.5 + Math.random(), [])

  useFrame((e) => {
    const i = timingFunction((1 + Math.sin(e.clock.getElapsedTime() * semicircleAngle)) / 2)
    ref.current!.position.y = position[1] + 1 * i
  })
  return <mesh
    ref={ref}
    position={position}
    castShadow
    receiveShadow
  >
    <sphereGeometry args={[0.2, 6, 6]} />
    <meshStandardMaterial
      color="white"
      metalness={0.1}
      roughness={0}
    />
  </mesh>
}

function Sphere(props: {
  position: THREE.Vector3Tuple
  rotation: THREE.Vector3Tuple
}) {
  const { position = [0, 0, 0], rotation } = props
  const ref = useRef<THREE.Mesh>(null)
  const semicircleAngle = useMemo(() => 0.5 + Math.random(), [])
  useFrame((e) => {
    const i = timingFunction((1 + Math.sin(e.clock.getElapsedTime() * semicircleAngle)) / 2)
    ref.current!.position.y = position[1] + 2 * i
  })
  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      castShadow={true}
      receiveShadow={true}
    >
      <sphereGeometry args={[7, 6, 6, 0.1, 0.1, 0.1, 1]} />
      <meshStandardMaterial color="white"
        roughness={0}
        metalness={0.1} />
    </mesh>
  )
}
function Pillar(props: {
  position: THREE.Vector3 | THREE.Vector3Tuple
  axis: 'x' | 'y'
  size: number
}) {
  const { position = [0, 0, 0], axis = 'x', ...n } = props
  const ref = useRef<THREE.Mesh>(null)
  return <mesh ref={ref}
    position={position}
    {...n}
    castShadow={true}
    receiveShadow={true}
    rotation={axis === 'x' ? [0, 0, 0] : [0, 0, -Math.PI / 2]}>
    <boxGeometry args={[0.2, n.size, 0.2]} />
    <meshStandardMaterial color="white"
      roughness={0}
      metalness={0.1} />
  </mesh>
}

function Leaves(props: {
  number: number
  position: THREE.Vector3Tuple
}) {
  const { number = 20, position = [0, 0, 0] } = props
  const ref = useRef<THREE.Group>(null)
  const s = useMemo<THREE.Vector3Tuple[]>(() => Array.from({ length: number }, () => [3 - 6 * Math.random(), 4 * Math.random(), 3 - 6 * Math.random()]), [number])

  useFrame(e => ref.current!.rotation.y = Math.sin(e.clock.getElapsedTime() / 10) * Math.PI)

  return <group ref={ref}
    position={position}>
    {s.map((e, t) => (<Leaf key={t}
      position={e} />))}
  </group>
}
function Spheres(props: {
  number: number
  position: THREE.Vector3Tuple
}) {
  const { number = 20, position = [0, 0, 0] } = props
  const n = useRef<THREE.Group>(null)
  const s = useMemo<THREE.Vector3Tuple[]>(() => Array.from({ length: number }, (_, t) => [0, 0.01 * t, 0]), [number])
  const a = useMemo<THREE.Vector3Tuple[]>(() => Array.from({ length: number }, (_, i) => [0.3, 2 * Math.PI / number * 2 * i, Math.PI / 2]), [number])
  return <group ref={n}
    position={position}>
    {a.map((e, t) => (<Sphere key={t}
      rotation={e}
      position={s[t]} />))}
  </group>
}

function Fence(props: {
  xPillar?: number
  yPillar?: number
  position: THREE.Vector3Tuple
}) {
  const { xPillar = 4, yPillar = 4, position = [0, 0, 0] } = props
  const ref = useRef<THREE.Group>(null)
  const xPillars = useMemo<THREE.Vector3Tuple[]>(() => Array.from({ length: xPillar }, (_, i) => [(15 / xPillar + 1) * i - 7.5 - 0.2 * i, 7.4, 0]), [xPillar])
  const yPillars = useMemo<THREE.Vector3Tuple[]>(() => Array.from({ length: yPillar }, (_, t) => [0, (15 / yPillar + 1) * t - 0.2 * t, 0]), [yPillar])
  return <group ref={ref}
    position={position}>
    {xPillars.map((position, i) => <Pillar key={i}
      position={position}
      axis='x'
      size={15} />)}
    {yPillars.map((position, i) => <Pillar key={i}
      position={position}
      axis='y'
      size={15} />)}
  </group>
}

export function AmbienceScene(props: { dark: boolean }) {
  const { dark } = props
  const cameraControlRef = useRef<CameraControls>(null)

  useEffect(() => {
    void cameraControlRef.current?.rotatePolarTo(0)
    void cameraControlRef.current?.rotateAzimuthTo(0)
    void cameraControlRef.current?.setLookAt(-20, 20, -30, -8, -10, -28)
  }, [cameraControlRef, dark])

  useThree(({ camera }) => {
    camera.lookAt(-8, -10, -28)
  })

  const { spring } = useSpring({
    spring: dark ? 1 : 0,
    config: {
      mass: 5,
      tension: 400,
      friction: 200,
      precision: 1e-4,
    },
  })

  const rotationZ = spring.to([0, 1], [0, Math.PI])
  const rotationY = spring.to([0, 1], [0.1 * Math.PI, 0.14 * Math.PI])

  return <>
    <SoftShadows size={25}
      focus={0.6}
      samples={10} />
    <CameraControls ref={cameraControlRef}
      makeDefault />
    <fog attach='fog'
      args={['black', 0, 40]} />
    <ambientLight intensity={1}
      color="blue" />
    <animated.group rotation-z={rotationZ}
      rotation-y={rotationY}>
      <directionalLight
        castShadow
        position={[2.5, 10, 20]}
        intensity={3}
        shadow-mapSize={1024}
        color="yellow"
      >
        <orthographicCamera attach="shadow-camera"
          args={[-30, 30, -30, 100, 0.5, 80]} />
      </directionalLight>
      <directionalLight
        castShadow
        position={[-2.5, -10, 20]}
        intensity={3}
        shadow-mapSize={1024}
        color="yellow"
      >
        <orthographicCamera attach="shadow-camera"
          args={[-10, 10, -10, 100, 0.5, 80]} />
      </directionalLight>
    </animated.group>
    <pointLight position={[-10, 0, -20]}
      intensity={1}
      color="white" />
    <pointLight position={[0, -10, 0]}
      intensity={1} />
    <group position={[0, -3.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow>
        <planeGeometry args={[1e3, 1e3]} />
        <shadowMaterial transparent
          opacity={dark ? 0.4 : 1} />
      </mesh>
      <Leaves position={[5, 10, 8]}
        number={200} />
      <Spheres position={[5, 11, 8]}
        number={300} />
      <Leaves position={[-6, 8, 3]}
        number={200} />
      <Spheres position={[-6, 10, 3]}
        number={300} />
      <Fence position={[0, 4, 3]} />
    </group>
  </>
}
