import React, { useState } from 'react'
import { Button, Input, Grid } from '@material-ui/core'
import { db } from './firebase'
import firebase from 'firebase'
import './PostingJob.css'

function PostingJob({ username }) {
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [skills, setSkills] = useState('')
    const [applyBy, setApplyBy] = useState('')


    const uploadPost = (e) => {
        e.preventDefault()
        db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            Category: category,
            Location: location,
            Skills: skills,
            ApplyBy: applyBy,
            username: username
        })
        setCategory('')
        setLocation('')
        setSkills('')
        setApplyBy('')
    }

    return (
        <div className='post_fields'>
            <Grid container >
                <Grid item lg={3} xs={12} md={6}>
                    <Input type='text' placeholder='Category' onChange={(e) => setCategory(e.target.value)} value={category} />
                </Grid>
                <Grid item lg={3} xs={12} md={6}>
                    <Input type='text' placeholder='Skills' onChange={(e) => setSkills(e.target.value)} value={skills} />
                </Grid>
                <Grid item lg={3} xs={12} md={6}>
                    <Input type='text' placeholder='Location' onChange={(e) => setLocation(e.target.value)} value={location} />
                </Grid>
                <Grid item lg={2} xs={12} md={6}>
                    <Input type='text' placeholder='Apply By' onChange={(e) => setApplyBy(e.target.value)} value={applyBy} />
                </Grid>
                <Grid item lg={1} xs={12} md={6}>

                    <Button variant='contained' color='primary' onClick={uploadPost}>Post</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default PostingJob
