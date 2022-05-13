import { Container, makeStyles, Typography } from '@material-ui/core'
import bannerImg  from '../../Images/bannerImg.jpeg'
import React from 'react'
import Carousel from './Carousel';

const Banner = () => {

  const classes = useStyles();

  return (
    <>
        <div className={classes.banner}>
            <Container className={classes.bannerContent}> 
                <div className={classes.tagLine}>
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight:'bold',
                            marginBottom: 15,
                            fontFamily: 'Montserrat'
                        }}
                    >
                        Crypto Currency
                    </Typography>

                    <Typography
                        variant='subtitle2'
                        style={{
                            color:'darkgray',
                            textTransform: 'capitalize',
                            fontFamily: 'Montserrat'
                        }}
                    >
                        Get info regarding your Favourite crypto currency
                    </Typography>
                </div>
               <Carousel/>
            </Container>
        </div>
    </>  
  )
}

export default Banner

// Styling Components
const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: `url(${bannerImg})`
    },
    bannerContent: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: 'space-around'
    },
    tagLine: {
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    }
}))