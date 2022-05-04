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

  const user = JSON.parse(localStorage.getItem('profile'));
  const selectedScene = JSON.parse(localStorage.getItem('That scene'));
  
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

      {
        transforms.map((trans) => (
          // console.log(user?.result?._id),
          // console.log( trans?.creator),
          // console.log(trans.Objnum),
          console.log(trans.creator),
          console.log(selectedScene?._id),
          (() => {
            if ((user?.result?.googleId === trans?.creator || user?.result?._id === trans?.creator) && trans.objnum === 1 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator)) {
              return <Model url="/kajard.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
            else if ((user?.result?.googleId === trans?.creator || user?.result?._id === trans?.creator) && trans.objnum === 2 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator)) {
              return <Model url="/morn.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
          })()
          ))
      }

      {/* <Model url="/coffeecup.glb" sx={1} sy={1} sz={1}  px={0} py={0} pz={0} rx={0} ry={0} rz={0} />
      <Model url="/tree.glb" sx={2.50} sy={2.50} sz={2.50}  px={0.75} py={0.9175} pz={0.6} rx={0} ry={0} rz={0} /> */}

      <gridHelper args={[10, 10]} />
      <Stats />
      </Physics>
    </Canvas>
    </Fragment>
  )
}

export default Viewer;