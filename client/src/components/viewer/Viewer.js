import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import "./style.css"
import { OrbitControls, TransformControls, useCursor, useGLTF, useAnimations, Stats } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getTransforms } from '../../actions/transforms'
import Controls from "./Controls"
import { Physics, usePlane, useBox } from "@react-three/cannon";



const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

function Box(props) {
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh {...props} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

function Model({ url, sx, sy, sz, px, py, pz, rx, ry, rz }, props) {
  const { scene } = useLoader(GLTFLoader, url, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('../../../node_modules/three/examples/js/libs/draco/gltf/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);
  });
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return <primitive object={scene} dispose={null} scale={[sx, sy, sz]} position={[px, py, pz]} rotation={[rx, ry, rz]} {...props} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}/>
}

const Viewer = () => {
  const { target, setTarget } = useStore()
  const transforms = useSelector((state) => state.transforms);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getTransforms());
  }, [dispatch])

  return (
    <Fragment>
    <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)} camera={{ position: [-1, 1, 5], fov: 50 }}>
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <Physics>
      <Controls />

      {transforms.map((trans) => (
        transforms[1].Objnum === 2 ?
        <Model url="/kajard.glb" sx={trans.ScaleX} sy={trans.ScaleY} sz={trans.ScaleZ}  px={trans.TransX} py={trans.TransY} pz={trans.TransZ} rx={trans.RotateX} ry={trans.RotateY} rz={trans.RotateZ} key={trans._id} />
        : 
        null
        ))}

      <gridHelper args={[10, 10]} />
      <Stats />
      </Physics>
    </Canvas>
    </Fragment>
  )
}

export default Viewer;