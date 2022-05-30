import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';


import Pagination from "../Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [ingredients] = useState([]);

    const searchPost = () => {
        if (search.trim() || ingredients) {
            dispatch(getPostsBySearch({ search, ingredients: ingredients.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&ingredients=${ingredients.join(',')}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost();
        }
    };

    return (
        <Grow in> 
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}> 
                        <Posts setCurrentId={setCurrentId} /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}> 
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search" 
                            variant="outlined" 
                            label="Search Recipes" 
                            onKeyPress={handleKeyPress}
                            fullWidth 
                            style={{ margin: '0 0 10px 0'}}
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                        
                        <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                    </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} /> 
                        {(!searchQuery && !ingredients.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;