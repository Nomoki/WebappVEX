import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import * as actionType from '../../constants/actionTypes';
import cart from "./Cart-03.png"

const Navbar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }


        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return (
        <Fragment>
            <AppBar className={classes.appBar} color="inherit" position='static'>
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">VE</Typography>
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <>
                        <img src={cart} className={classes.cart} onClick={() => history.push('/cart')}/>
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} onClick={() => history.push('/profile')}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6" onClick={() => history.push('/profile')}>{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                        </>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
            
        </Fragment>
    )
}

export default Navbar
