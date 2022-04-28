import React, { useState, useEffect } from "react";
import { Container, Grid, Grow } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { getPosts } from '../../actions/posts'

import useStyles from './styles'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'


export const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
