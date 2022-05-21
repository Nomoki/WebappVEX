import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid, styled,Checkbox } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { createTrans, updateTrans } from '../../actions/transforms';
import { createTransProd, updateTransProd } from '../../actions/transformsproduct';
import scene1pic from './scene1.png';
import scene2pic from './scene2.png';
import product1pic from './product1.jpg';
import product2pic from './product2.jpg';
import product3pic from './product3.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const [transData, setTransData] = useState({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
  const [transProductData, setTransProductData] = useState({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const pos = useSelector((state) => (currentId ? state.pos.find((message) => message._id === currentId) : null));
  const posProd = useSelector((state) => (currentId ? state.posprod.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  console.log(transData);
  console.log(transProductData);

  useEffect(() => {
    if (post) setPostData(post);
    if (pos) setTransData(pos);
    if (posProd) setTransData(posProd);
  }, [post, pos]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    setTransData({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
    setTransProductData({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      dispatch(createTrans({ ...transData, name: user?.result?.name }));
      dispatch(createTransProd({ ...transProductData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      dispatch(updateTrans(currentId, { ...transData, name: user?.result?.name }));
      dispatch(updateTransProd(currentId, { ...transData, name: user?.result?.name }));
      clear();
    }
    history.push('/exhibition');
  };


  if (!user?.result?.name) {
    return (
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
        <Typography variant="h4">{currentId ? `Editing "${post.title}"` : 'Creating a Workspace'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        



          <Typography variant="h6"><b>Select Scene</b></Typography>
          <br />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Item>
                <Checkbox {...label} defaultChecked={false} onChange={(e) =>{
                  if (e.target.checked) {
                    setTransData({ ...transData, objnum: 1, transX: 0, transY: 0, transZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 });
                  } else {
                    setTransData({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
                  }
                  }
                }
                value={transData}
                />
                <Typography variant="h7">Scene 1</Typography><br />
                <Button variant="text" color="primary" size="large" type="button" ><img src={scene1pic} className={classes.picscence}/></Button>

              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
              <Checkbox {...label} defaultChecked={false} onChange={(e) =>{
                  if (e.target.checked) {
                    setTransData({ ...transData, objnum: 2, transX: 0, transY: 0, transZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 });
                  } else {
                    setTransData({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
                  }
                  }
                }
                value={transData}
                />
                <Typography variant="h7">Scene 2</Typography><br />
                <Button variant="text" color="primary" size="large" type="button"><img src={scene2pic} className={classes.picscence2}/></Button>
              </Item>
            </Grid>
          </Grid>
          <br/>

          <Typography variant="h6"><b>Select Product</b></Typography>
          <br />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
              <Item>
                <Checkbox {...label} defaultChecked={false} onChange={(e) =>{
                  if (e.target.checked) {
                    setTransProductData({ ...transProductData, objnum: 1, transX: 0, transY: 1, transZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scaleX: 2.50, scaleY: 2.50, scaleZ: 2.50 });
                  } else {
                    setTransProductData({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
                  }
                  }
                }
                value={transProductData}
                />
                <Typography variant="h7">Product 1</Typography><br />
                <Button variant="text" color="primary" size="large" type="button" ><img src={product1pic} className={classes.picproduct1}/></Button>

              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item>
              <Checkbox {...label} defaultChecked={false} onChange={(e) =>{
                  if (e.target.checked) {
                    setTransProductData({ ...transProductData, objnum: 2, transX: 0, transY: 1, transZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scaleX: 0.235, scaleY: 0.235, scaleZ: 0.235 });
                  } else {
                    setTransProductData({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
                  }
                  }
                }
                value={transProductData}
                />
                <Typography variant="h7">Product 2</Typography><br />
                <Button variant="text" color="primary" size="large" type="button"><img src={product2pic} className={classes.picproduct2}/></Button>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item>
              <Checkbox {...label} defaultChecked={false} onChange={(e) =>{
                  if (e.target.checked) {
                    setTransProductData({ ...transProductData, objnum: 3, transX: 0, transY: 1, transZ: 0, rotateX: 0, rotateY: 180, rotateZ: 0, scaleX: 0.35, scaleY: 0.35, scaleZ: 0.35 });
                  } else {
                    setTransProductData({ objnum: '', transX: '', transY: '', transZ: '', rotateX: '', rotateY: '', rotateZ: '', scaleX: '', scaleY: '', scaleZ: '' });
                  }
                  }
                }
                value={transProductData}
                />
                <Typography variant="h7">Product 3</Typography><br />
                <Button variant="text" color="primary" size="large" type="button"><img src={product3pic} className={classes.picproduct3}/></Button>
              </Item>
            </Grid>
          </Grid>
        <br/>
          <Typography variant="h6">Display Image </Typography>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <div className={classes.selsec}>
          <br/>
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Submit</Button><br/>
        <Button variant="outlined" color="secondary" size="small" onClick={clear}>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
