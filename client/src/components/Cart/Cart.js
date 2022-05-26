import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton, styled, TextField, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector, } from 'react-redux'
import useStyles from './styles';
import product1pic from '../Form/product1.jpg'
import product2pic from '../Form/product2.jpg'
import product3pic from '../Form/product3.png'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Cart = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const selectedScene = JSON.parse(localStorage.getItem('selected cart scene'));
  const selectedProduct = JSON.parse(localStorage.getItem('selected cart product'));

  return (
    <>
    <div className={classes.til}><Typography variant="h4">{user?.result?.name} Cart</Typography></div>
    <Grid Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center" className={classes.primarygrid}>  
          <Grid item xs={12}>
            <Item className={classes.itemss}>
            <Typography variant="h6">{selectedScene?.title} Scene</Typography><br />
              <Typography variant="h7">Product {selectedProduct?.objnum}</Typography><br />
                {(() =>{
                   if (selectedProduct?.objnum === 1) {
                    return <><img src={product1pic} className={classes.picproduct1}/><br/></>
                  }
                  else if (selectedProduct?.objnum === 2) {
                    return <><img src={product2pic} className={classes.picproduct2}/><br/></>
                  }
                  else if (selectedProduct?.objnum === 3) {
                    return <><img src={product3pic} className={classes.picproduct3}/><br/></>
                  }
                })()
                }
            </Item>
        </Grid>
      </Grid>
    </>
  )
}

export default Cart