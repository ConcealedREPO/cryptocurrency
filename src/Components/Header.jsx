import React from 'react';
import { AppBar, Container, makeStyles, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../ContextAPI';

const Header = () => {

    
    const classes = useStyles();

    // Javascript Functions
    const navigate = useNavigate();
    const {currency, setCurrency} = CryptoState()

    return (
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography 
                    className={classes.title} 
                    variant='h6' 
                    onClick = {() => navigate ('/')}>
                        Crypto Currency
                </Typography>

                <Select 
                variant='outlined' 
                style={{
                    width: 100,
                    height: 40,
                    marginRight: 15
                }}
                value = {currency}
                onChange = {(e) => setCurrency(e.target.value)}
                > 
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'MYR'}>MYR </MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header


// Styling Components
const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'gold',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
}));