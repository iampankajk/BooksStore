import React, { useState } from 'react';


import Card from '../UI/Card/Card'
import classes from './Search.module.css'

const Search = (props) => {
    let timerId;
    const apikey = "AIzaSyDIhUMj9N8wb-1fBqKTxnTZ2X6s-cxhtqU"
    const [bookData, setBookData] = useState([]);
    const [itemSelected, setItemSelected] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const searchBooks = async (query) => {
        try {
            let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}+inauthor:keyes&key=${apikey}`);
            let data = await res.json();
            return data;
        }
        catch (e) {
            console.log(e);
        }

    }
    const main = async (value) => {
        let { items } = await searchBooks(value);
        console.log(items)
        setBookData(items)
    }
    const debounce = async (event) => {
        setInputValue(event.target.value);
        setItemSelected(true);
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            main(event.target.value);
        }, 300)
    }
    const itemSelectHandler = (item) => {
        // console.log(item)
        setInputValue('')
        setItemSelected(false)
        props.onSelect(item)
    }
    return (
        <Card className={classes.card} >
            <form className={classes.search}>
                <input type='text' placeholder='Search Books' onInput={debounce} value={inputValue} ></input>

                <ul className={classes.list}>
                    {
                     itemSelected && bookData.map(item => {
                            return (
                                <li key={`${item.id}${Math.random()}`} onClick={() => { itemSelectHandler(item) }}><p>{item.volumeInfo.title}</p></li>
                            )
                        })}
                </ul>
           

            </form>
        </Card>

    );
}

export default Search;
