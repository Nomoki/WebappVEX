import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ setCurrentId }) => {
    const classes = useStyles();
    const transformsproduct = useSelector((state) => state.transformsproduct);

  return (
    !transformsproduct.length ? <CircularProgress/> : (
        <Grid Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center" className={classes.primarygrid}>
        {transformsproduct.map((product) => (
          <Grid key={product._id} item xs={12}>
            <Product product={product} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Products