import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton, styled, TextField, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles';
import product1pic from '../Form/product1.jpg'
import product2pic from '../Form/product2.jpg'
import product3pic from '../Form/product3.png'
import { getTransformsProd } from '../../actions/transformsproduct'
import Products from './Products/Products';

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
    const [currentId, setCurrentId] = useState(0);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getTransformsProd());
      }, [currentId, dispatch])

      if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to see stock.
            </Typography>
          </Paper>
        )
      }

  return (
    <>
    <div className={classes.til}><Typography variant="h4">{selectedScene?.title} Stock</Typography></div>
    <Products setCurrentId={setCurrentId}/>
    </>
  )
}

export default Stock