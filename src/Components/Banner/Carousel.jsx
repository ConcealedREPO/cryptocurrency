import React, {useState, useEffect} from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { TrendingCoins } from '../../Config/api';
import { CryptoState } from '../../ContextAPI';
import { Link } from 'react-router-dom';

// Utility Function

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {

  // CSS related 
  const classes = useStyles();
  const responsive = {
      0: {
          items: 2,
      },
      512: {
          items: 4,
      }
  }


  const {currency,cur_symbol} = CryptoState();

  //Set the trending coins
  const [trending, setTrending] = useState([])

  const fetchTrendingCoins = async () => {
      const {data} = await axios.get(TrendingCoins(currency))

      setTrending(data)
  };

  const items = trending.map((coin) => {
    // If more than 0, it's going to be true  
    let profit = coin.price_change_percentage_24h >= 0;
    return (
        <Link
            className={classes.carouselItem}
            to = {`/coins/${coin.id}`}
        >
            <img
                src = {coin?.image}
                alt = {coin.name}
                height = '80'
                style= {{marginBottom: 10}}
            />

            <span style={{color: profit > 0 ? 'rgb(14,203,129' : 'red', fontWeight: 500}}>
                {coin?.symbol}
                &nbsp;
                <span> {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}</span>
            </span>

            <span style={{fontSize: 22, fontWeight: 500}}>
                {cur_symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </Link>
    )
  })

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])


  return (
    <div className={classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items = {items}
        />
    </div>
  )
}

export default Carousel

// Styling Components
const useStyles = makeStyles(({theme}) => ({ 
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center'
    },
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: 'white'
    }
}))