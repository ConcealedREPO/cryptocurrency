import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../ContextAPI';
import parse from 'html-react-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';

const Coin = () => {

  //css
  const classes = useStyles();

  const { id } = useParams();  
  const [coin,setCoin] = useState();
  const {currency, cur_symbol} = CryptoState();

  const fetchCoin = async() => {

      const {data} = await axios.get(SingleCoin(id));
  
      setCoin(data);
  }

  useEffect(() => {
      fetchCoin();
  }, [])


  if (coin === undefined) return <LinearProgress style={{background: 'gold'}}/>  

  return (
    <div className = { classes.container }>
      <div className= { classes.sidebar }>
        <img
          src= { coin?.image.large }
          alt = { coin?.name }
          height = '200'
          style= {{marginBottom: 20}}
        />

       <Typography
        className={classes.heading} 
        variant='h3'
       >
         { coin?.name }
       </Typography>

       <Typography variant = {'subtitle1'} className = {classes.description}>
          { parse(coin?.description.en.split('. ')[0]) }.
       </Typography>

       <div className= {classes.marketData}>
          <span style={{display:'flex'}} >
            <Typography 
              variant='h5' 
              className = {classes.heading}
              style = {{
                fontFamily: 'Montserrat'
              }}
            >
              Rank :  {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display:'flex'}} >
            <Typography 
              variant='h5' 
              className = {classes.heading}
              style = {{
                fontFamily: 'Montserrat'
              }}
            >
              Current Price : {cur_symbol}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display:'flex'}} >
            <Typography 
              variant='h5' 
              className = {classes.heading}
              style = {{
                fontFamily: 'Montserrat'
              }}
            >
              Market Cap :  {cur_symbol}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
              .toString()
              .slice(0,-6))} M
            </Typography>
          </span>
       </div>
      </div>
      
      <CoinInfo coin = {coin} />
    </div>
  )
}

export default Coin

const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
    [theme.breakpoints.down('md')] : {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  sidebar : {
    width: '30%',
    display: 'flex',
    [theme.breakpoints.down('md')] : {
      width: '100%',
    },
    flexDirection: 'column',
    alignItems : 'center',
    marginTop: 25,
    borderRight: '2px solid grey'
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  description : {
    width: '100%',
    fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify'
  },
  marketData : {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',

    [theme.breakpoints.down('md')] :{
      display: 'flex',
      justifyContent: 'space-around',
    },

    [theme.breakpoints.down('sm')] : {
      flexDirection: 'column',
      alignItems: 'center'
    },

    [theme.breakpoints.down('xs')] : {
      alignItems: 'start'
    }
  }

}))