import React,{useState} from 'react';


import Card from '../UI/Card/Card'
import classes from './Search.module.css'

const Search = () => {
    let timerId;
    const apikey = "AIzaSyDIhUMj9N8wb-1fBqKTxnTZ2X6s-cxhtqU"
    const [bookdata, setBookData] = useState([]);

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
        let {items} = await searchBooks(value);
        console.log(items)
        setBookData(items)
    }
    const debounce = async (event) => {

        clearTimeout(timerId)
        timerId = setTimeout(() => {
            main(event.target.value);
        }, 300)
    }

    return (
        <Card className={classes.card} >
            <form className={classes.search}>
                <input type='text' placeholder='Search Books' onInput={debounce} ></input>
                <div>
                  <ul>
                {bookdata.map(item=>{
                    return(
                        <li key={`${item.id}${Math.random()}`}><p>{item.volumeInfo.title}</p></li>
                    )
                })}
               </ul>
                </div>
                <button className={classes.button}>Search</button>
            </form>
        </Card>

    );
}

export default Search;
