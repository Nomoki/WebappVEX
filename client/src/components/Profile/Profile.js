import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import { Avatar, Typography, Container, Grow, Grid, Button, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { getPosts } from '../../actions/posts';
import Posts from './Posts/Posts';

const Profile = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);


    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }


        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to see profile.
            </Typography>
          </Paper>
        )
      }

    return (
        <Fragment>
            <div style={{ display: "flex", justifyContent: 'start', margin: '0', backgroundColor: "#aaaaaa"}}>
                <div style={{margin: '1vw'}}>
                    <Avatar alt={user.result.name} src={user.result.imageUrl} style={{width: '15vw', height: '30vh' }}>{user.result.name.charAt(0)}</Avatar>
                </div>
                <div style={{margin: '1vw'}}>
                    <Typography variant="h3">{user.result.name}</Typography>
                </div>
            </div>
            <div>
                <br/>
                <Grow in>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>
                        </Grid>
                    </Container>
            
                </Grow>
            </div>
            <br/>
            <Button variant="contained" color="Primary" className={classes.btncreate} onClick={() => {
                        history.push('/create')
                    }}>Create +</Button >
        </Fragment>
    )
}

export default Profile
