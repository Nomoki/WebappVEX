import React, { Fragment,useState,useEffect } from 'react'
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';


const Create = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Fragment>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Fragment>
    )
}

export default Create
