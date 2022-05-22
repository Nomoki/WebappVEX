import React, { Fragment } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { createView, deletePost, exploreView, stockScene } from '../../../../actions/posts';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();


  return (
    <Fragment>
    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )} */}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="default" onClick={() => dispatch(stockScene(post._id, history))}>
            Stock
          </Button>
        )}
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) ? (
          <>
          <Button size="small" color="primary" onClick={() => dispatch(createView(post._id, history))}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={() => dispatch(exploreView(post._id, history))}>
            View
          </Button>
          </>
        ):
        (
          <Button size="small" color="primary" onClick={() => dispatch(exploreView(post._id, history))}>
            View
          </Button>
        )
      }
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
      )}
      </CardActions>
    </Card>
    )}
    </Fragment>
  );
};

export default Post;