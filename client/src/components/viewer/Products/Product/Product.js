import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton, styled, TextField, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector, } from 'react-redux'
import useStyles from './styles';
import product1pic from '../../../Form/product1.jpg'
import product2pic from '../../../Form/product2.jpg'
import product3pic from '../../../Form/product3.png'
import { getTransformsProd } from '../../../../actions/transformsproduct'
import { useHistory } from 'react-router-dom'
import { cartProduct, cartScene } from '../../../../actions/posts'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Product = ({product, setCurrentId}) => {
    const classes = useStyles();
    const selectedScene = JSON.parse(localStorage.getItem('selected view scene'));
    const dispatch = useDispatch();
    const history = useHistory();
    
  return (
    <>
    {
      ((selectedScene?.googleId === product?.creator || selectedScene?.creator === product?.creator) && selectedScene?.sceneId === product?.sceneId) &&
      (
      <Item className={classes.itemss}>
        <Typography variant="h7">Product {product.objnum}</Typography><br />
        {(() =>{
           if (product.objnum === 1) {
            return <><img src={product1pic} className={classes.picproduct1}/><br/></>
          }
          else if (product.objnum === 2) {
            return <><img src={product2pic} className={classes.picproduct2}/><br/></>
          }
          else if (product.objnum === 3) {
            return <><img src={product3pic} className={classes.picproduct3}/><br/></>
          }
        })()
        }
        <TextField id="standard-basic" label="Count" type="number"  />
        <Button color='primary' variant='contained' className={classes.buttoncart} onClick={() => [dispatch(cartProduct(product._id, history)), dispatch(cartScene(selectedScene?._id, history))]}>Add Cart</Button>
      </Item>
      )
      }
    </>
  )
}

export default Product