import React,{ useState, useEffect } from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import { HistoricalChart } from '../Config/api'
import { CryptoState } from '../ContextAPI';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import { CircularProgress } from '@material-ui/core';
import SelectionButton from './Banner/SelectionButton';


ChartJS.register(...registerables);

const CoinInfo = ( {coin} ) => {

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const {currency} = CryptoState();
  const durationOption = [
    {
      label: '24 hours',
      value: 1
    },
    {
      label: '30 days',
      value: 30
    },
    {
      label: '3 Months',
      value: 90
    },
    {
      label: '1 year',
      value: 365
    }
  ]

  const fetchHistorycalData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id, days,currency))

    setHistoricalData(data.prices)
  }

  useEffect(() => {
    fetchHistorycalData()
  }, [currency,days])

    //css
    const classes = useStyles();

  return (
      <div className= {classes.container}>
          {
            !historicalData ? (
              <CircularProgress 
                style = { {color : 'gold'}}
                size = { 250 }
                thickness = { 1 }
              />
            ) : ( 
              <>
                <Line
                  data={{
                    labels: historicalData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;

                      // If 1 day graph is chosen, show the time else show the date    
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: historicalData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#EEBC1D",
                      },
                    ],
                  }}

                  options = {{
                    elements: {
                      point : {radius: 1},
                    }
                  }}
                />

                <div 
                  style={{
                    display: 'flex',
                    marginTop: 20,
                    justifyContent: 'space-around',
                    width: '100%'
                  }}
                > 
                    {
                      durationOption.map((duration) => (
                        <SelectionButton 
                          key = {duration.value}
                          onClick={ () => {setDays(duration.value)}} 
                          selected = {duration.value === days}
                        > 
                          { duration.label }
                        </SelectionButton>
                      ))
                    }
                </div>
              </>
            )
          }
      </div>
  )
}


export default CoinInfo

const useStyles = makeStyles((theme) => ({
  container : {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')] : {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0
    } 
  }

})) 