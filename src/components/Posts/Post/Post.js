import React from "react";
import { Card, CardActions, CardMedia, CardContent, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

import useStyles from './styles'

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles()
    const dispatch = useDispatch()
    const googleId = user?.result?.googleId
    const userId = user?.result?._id
    const creator = post?.creator

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?._id || user?.result?.googleId))
                ? (
                    <> <ThumbUpAltIcon fontSize="small" /> &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <> <ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} </>
                )
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(googleId === creator || userId === creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: "white" }} disabled={!user?.result} size="small" onClick={() => {
                        setCurrentId(post._id)
                    }}>
                        <MoreVertIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => (`#${tag} `))}</Typography>
            </div >
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><Likes /></Button>
                {(googleId === creator || userId === creator) &&
                    (<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" />&nbsp;Delete</Button>)
                }
            </CardActions>
        </Card >
    )
}

export default Post