import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';

import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../Config/api';
import { CryptoState } from '../ContextAPI';
import { numberWithCommas } from './Banner/Carousel';

const CoinsTable = () => {

    //css
    const classes = useStyles()

    const navigate = useNavigate();

    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState([]);
    const [search,setSearch] = useState('');
    
    // Use State for pagination
    const [page,setPage] = useState(1);
    
    const { currency, cur_symbol } = CryptoState();

    const fetchCoins = async() => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency])


    const handleSearch = () => {
        return coins.filter( (coin) => {
            return coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        })
    }
  return (
    <Container style={{textAlign:'center'}}>
        <Typography
            variant='h4'
            style= {{margin: 18, fontFamily: 'Montserrat'}}
        >
            Cryptocurrency Prices by market Cap
        </Typography>

        <TextField 
            label='Search for a crypto currency...' 
            variant='outlined'
            style={{marginBottom:20, width:'100%'}}
            onChange = {(e) => setSearch(e.target.value)}
        />

        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{backgroundColor:'gold'}}/>
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor: '#EEBC1D'}} >
                            <TableRow>
                                { ['Coin','Price', '24h Change', 'Market Cap'].map((head) => (
                                    <TableCell
                                        style={{
                                            color: 'black',
                                            fontWeight: '700',
                                            fontFamily: 'Montserrat'
                                        }} 
                                        key = {head}
                                        align = {head === 'Coin' ? 'inherit' : 'right'}
                                    >
                                        {head}
                                    </TableCell>
                                )) }
                            </TableRow>
                        </TableHead>

                        <TableBody> 
                            {handleSearch()
                                .slice( ((page - 1) * 10) , (page - 1) * 10 + 10 ) // Getting first 10 coins
                                .map( (row) => {
                                const profit = row.price_change_percentage24h > 0;

                                return (
                                    <TableRow 
                                        onClick = {() => navigate(`/coins/${row.id}`)}
                                        className = {classes.row}
                                        key = {row.name}
                                        >
                                        <TableCell
                                            component = 'th'
                                            scope = 'row'
                                            style = { {
                                                display:'flex',
                                                gap:35,
                                            }}
                                        >
                                            <img
                                                src = {row?.image}
                                                alt = {row.name}
                                                height = '50'
                                                style = {{marginBottom: 10}}
                                            />

                                            <div style = {{display:'flex', flexDirection: 'column'}}>
                                                <span
                                                    style = {{
                                                        textTransform : 'uppercase',
                                                        fontSize: 22
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>

                                                <span style = {{color: 'drakgray'}}> {row.name} </span>
                                            </div>
                                        </TableCell>

                                        <TableCell 
                                            align= 'right'
                                        >
                                            {cur_symbol}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>

                                        <TableCell
                                            align = 'right'
                                            style = {{
                                                    color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                                    fontWeight: 500
                                                }}
                                        >
                                            {profit && '+'}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>

                                        <TableCell 
                                            align= 'right'
                                        >
                                            {cur_symbol}
                                            {numberWithCommas(row.market_cap.toString().slice(0,-6))} M
                                        </TableCell>
                                    </TableRow>
                                )
                            })} 
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>

        <Pagination
            count = { handleSearch()?.length / 10 }
            style = {{
                padding: '20px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
            classes = {{ul : classes.pagination }}
            onChange = {((e,value) => setPage(value))}
        ></Pagination>
    </Container>
  )
}

export default CoinsTable

const useStyles = makeStyles(() => ({
    row : {
        backgroundColor : '#16171a',
        cursor : 'pointer',
        "&:hover": { backgroundColor : '#131111'},
        fontFamily: 'Monterrat'
    },
    pagination : {
        '& .MuiPaginationItem-root' : {
            color: 'gold'
        }
    }
}))