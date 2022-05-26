import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import "./style.css"
import { OrbitControls, TransformControls, useCursor, useGLTF, useAnimations, Stats } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton, styled, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getTransforms } from '../../actions/transforms'
import { getPosts } from '../../actions/posts'
import { getTransformsProd } from '../../actions/transformsproduct'
import useStyles from './styles';
import product1pic from '../Form/product1.jpg'
import product2pic from '../Form/product2.jpg'
import product3pic from '../Form/product3.png'
import Products from './Products/Products'





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
  })
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return <primitive object={scene} dispose={null} scale={[sx, sy, sz]} position={[px, py, pz]} rotation={[rx, ry, rz]} {...props} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}/>
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Tool() {
  const classes = useStyles();
  const transformsproduct = useSelector((state) => state.transformsproduct);
  const selectedScene = JSON.parse(localStorage.getItem('selected edit scene'));
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
        dispatch(getTransformsProd());
      }, [currentId, dispatch])
  
  return(
    <>
    <div className = 'space'>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center" className={classes.primarygrid}>
            <Typography variant="h5">Edit {selectedScene?.title} Scene</Typography><br/>
            <Products setCurrentId={setCurrentId}/>
        </Grid>
        <br/>
    </div>
    </>
  )
}

const Exhibition = ({ post }) => {
  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  const transforms = useSelector((state) => state.transforms);
  const transformsproduct = useSelector((state) => state.transformsproduct);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const selectedScene = JSON.parse(localStorage.getItem('selected edit scene'));

  useEffect(() => {
    dispatch(getTransforms());
    dispatch(getPosts());
    dispatch(getTransformsProd());
  }, [dispatch])




  return (
    <Fragment>
    <Tool/>
    <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)} camera={{ position: [3, 8, 0] }}>
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />

      {
        transforms.map((trans) => (
          console.log(user?.result?._id),
          console.log( trans?.creator),
          console.log(trans.Objnum),
          (() => {
            if ((user?.result?.googleId === trans?.creator || user?.result?._id === trans?.creator) && trans.objnum === 1 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneInfomationId) {
              return <Model url="/kajard.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
            else if ((user?.result?.googleId === trans?.creator || user?.result?._id === trans?.creator) && trans.objnum === 2 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneInfomationId) {
              return <Model url="/morn.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
          })()
          ))
      }

      {
        transformsproduct.map((trans) => (
          // console.log(user?.result?._id),
          // console.log( trans?.creator),
          // console.log(trans.Objnum),
          console.log(trans.creator),
          console.log(selectedScene?._id),
          (() => {
            if ((user?.result?.googleId === trans?.creator || user?.result?._id === trans?.creator) && trans.objnum === 1 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneId) {
              return <Model url="/tree.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
            else if ((user?.result?.googleId === trans?.creator || user?.result?._id === trans?.creator) && trans.objnum === 2 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneId) {
              return <Model url="/coffeecup.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
            else if ((user?.result?.googleId === trans?.creator || user?.result?._id === trans?.creator) && trans.objnum === 3 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneId) {
              return <Model url="/vodoo.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
          })()
          ))
      }

      {/* <Model url="/coffeecup.glb" sx={0.235} sy={0.235} sz={0.235}  px={0} py={1} pz={0} rx={0} ry={0} rz={0} /> */}
      {/* <Model url="/tree.glb" sx={2.50} sy={2.50} sz={2.50}  px={0} py={1} pz={0} rx={0} ry={0} rz={0} /> */}
      {/* <Model url="/vodoo.glb" sx={0.35} sy={0.35} sz={0.35}  px={0} py={1} pz={0} rx={0} ry={180} rz={0} /> */}

      {target && <TransformControls object={target} mode={mode} />}
      <OrbitControls makeDefault />
      <gridHelper args={[10, 10]} />
      <Stats />
    </Canvas>
    </Fragment>
  )
}

export default Exhibition;