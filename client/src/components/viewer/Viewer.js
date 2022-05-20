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
import Controls from "./Controls"
import { Physics, usePlane, useBox } from "@react-three/cannon"
import useStyles from './styles';
import product1pic from '../Form/product1.jpg'
import product2pic from '../Form/product2.jpg'
import product3pic from '../Form/product3.png'
import { getPosts } from '../../actions/posts'



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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Cart() {
  const classes = useStyles();
  return(
  <>
  <div className = 'space'>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center" className={classes.primarygrid}>
            <Grid item xs={12} >
              <Item>
                <Typography variant="h7">Product 1</Typography><br />
                <Button variant="text" color="primary" size="large" type="button" ><img src={product1pic} className={classes.picproduct1}/></Button><br/>
                <TextField id="standard-basic" label="Count" type="number"  />
              </Item>
            </Grid>

            {/* <Grid item xs={12}>
              <Item>
                <Typography variant="h7">Product 2</Typography><br />
                <Button variant="text" color="primary" size="large" type="button"><img src={product2pic} className={classes.picproduct2}/></Button><br/>
                <TextField id="standard-basic" label="Count" type="number"  />
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item>
                <Typography variant="h7">Product 3</Typography><br />
                <Button variant="text" color="primary" size="large" type="button"><img src={product3pic} className={classes.picproduct3}/></Button><br/>
                <TextField id="standard-basic" label="Count" type="number"  />
              </Item>
            </Grid> */}
      </Grid>
      <br/>
      <Button color='primary' variant='contained' className={classes.buttoncart}>Add Cart</Button>
  </div>
  </>
  )
}

const Viewer = () => {
  const { target, setTarget } = useStore()
  const transforms = useSelector((state) => state.transforms);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  const selectedScene = JSON.parse(localStorage.getItem('That scene'));
  
  useEffect(() => {
    dispatch(getTransforms());
    dispatch(getPosts());
  }, [dispatch])

  return (
    <Fragment>
    <Cart/>
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
            if (trans.objnum === 1 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.transformScene === trans?.postMessage) {
              return <Model url="/kajard.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
            else if (trans.objnum === 2 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.transformScene === trans?.postMessage) {
              return <Model url="/morn.glb" sx={trans.scaleX} sy={trans.scaleY} sz={trans.scaleZ}  px={trans.transX} py={trans.transY} pz={trans.transZ} rx={trans.rotateX} ry={trans.rotateY} rz={trans.rotateZ} key={trans._id} />
            }
          })()
          ))
      }

      {/* <Model url="/coffeecup.glb" sx={1} sy={1} sz={1}  px={0} py={0} pz={0} rx={0} ry={0} rz={0} />
      <Model url="/tree.glb" sx={2.50} sy={2.50} sz={2.50}  px={0.75} py={0.9175} pz={0.6} rx={0} ry={0} rz={0} /> */}
      {/* <Model url="/vodoo.glb" sx={1} sy={1} sz={1}  px={0} py={0} pz={0} rx={0} ry={0} rz={0} /> */}

      <gridHelper args={[10, 10]} />
      <Stats />
      </Physics>
    </Canvas>
    </Fragment>
  )
}

export default Viewer;