import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton, styled, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles';
import product1pic from '../Form/product1.jpg'
import product2pic from '../Form/product2.jpg'
import product3pic from '../Form/product3.png'
import { getTransformsProd } from '../../actions/transformsproduct'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Stock = () => {
    const classes = useStyles();
    const transformsproduct = useSelector((state) => state.transformsproduct);
    const selectedScene = JSON.parse(localStorage.getItem('selected stock scene'));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransformsProd());
      }, [dispatch])

  return (
    <>
    <div className={classes.til}><Typography variant="h4">{selectedScene?.title} Stock</Typography></div>
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center" className={classes.primarygrid}>
            {
              transformsproduct.map((trans) => (
                (() => {
                  if (trans.objnum === 1 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneId) {
                    return (
                          <Grid item xs={12} >
                            <Item className={classes.itemss}>
                              <Typography variant="h7">Product 1</Typography><br />
                              <img src={product1pic} className={classes.picproduct1}/><br/>
                            </Item>
                          </Grid>
                          )
                  }
                  else if (trans.objnum === 2 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneId) {
                    return (
                            <Grid item xs={12}>
                              <Item className={classes.itemss}>
                                <Typography variant="h7">Product 2</Typography><br />
                                <img src={product2pic} className={classes.picproduct2}/><br/>
                              </Item>
                            </Grid>
                            )
                  }
                  else if (trans.objnum === 3 && (selectedScene?.googleId === trans?.creator || selectedScene?.creator === trans?.creator) && selectedScene?.sceneId === trans?.sceneId) {
                    return (
                            <Grid item xs={12}>
                              <Item className={classes.itemss}>
                                <Typography variant="h7">Product 3</Typography><br />
                                <img src={product3pic} className={classes.picproduct3}/><br/>
                              </Item>
                            </Grid>
                            )
                  }
                })()
              ))
            }
      </Grid>
      </>
  )
}

export default Stock