import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { createTrans, updateTrans } from '../../actions/transforms';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const [transData, setTransData] = useState({ Objnum: '1', TransX: '0', TransY: '0', TransZ: '0', RotateX: '0', RotateY: '0', RotateZ: '0', ScaleX: '1', ScaleY: '1', ScaleZ: '1' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const pos = useSelector((state) => (currentId ? state.pos.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory(); 

  useEffect(() => {
    if (post) setPostData(post);
    if (pos) setTransData(pos);
  }, [post, pos]);

  const clear = () => {
    setCurrentId(0);
    setPostData({title: '', message: '', tags: '', selectedFile: '' });
    setTransData({ Objnum: '1', TransX: '0', TransY: '0', TransZ: '0', RotateX: '0', RotateY: '0', RotateZ: '0', ScaleX: '1', ScaleY: '1', ScaleZ: '1' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      dispatch(createTrans({ ...transData, name: user?.result?.name }))
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      dispatch(updateTrans(currentId, { ...transData, name: user?.result?.name }));
      clear();
    }
    history.push('/viewer');
  };

  const sroravit = (e) => {
    e.preventDefault();
    setTransData({...transData, Objnum: '1' });
  }

  const sroravit2 = (e) => {
    e.preventDefault();
    setTransData({...transData, Objnum: '2' });

  }

  if(!user?.result?.name ){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your workspace.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Workspace'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <div>
        <Typography variant="h6">Select Scene</Typography>
        <Button variant="contained" color="primary" size="large" type="button" onClick={sroravit} >Scene 1</Button>
        <Button variant="contained" color="primary" size="large" type="button" onClick={sroravit2} >Scene 2</Button>
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
