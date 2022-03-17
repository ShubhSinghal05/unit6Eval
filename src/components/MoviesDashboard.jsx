import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import "../css/Movies.css"
import { SingleMovieDetails } from "./SingleMovieDetails";

const genres = ["Comedy", "Thriller", "Drama", "Documentary", "Children"];

export const MoviesDashboard = () => {

  // to get all movies list on component mounts
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAllMovies = () => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://movie-fake-server.herokuapp.com/data",
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    //   dispatch an action to the store 
    getAllMovies();

  }, []);


  //    filter by genre 
  const handleFilter = (e) => {
    // dispach filterby genre action to the store
  }
  return (
    <>
      <Navbar />
      <h2 className="head">Movies</h2>
      <select onChange={handleFilter}>
        {/* map through the filter  */}
        <option>Sort By</option>
        <option>Release Date</option>
        <option>Genre</option>
        <option>Movie Name</option>
        <option>Movie Ratings</option>
      </select>
      <div className="movies-list">
        {/* map throught th movie list and display the results */}
        {loading && <h2>Loading......</h2>}
        {!loading && 
        data && 
        data.map((item)=>{
          return (
            <div className="movies">
            <Link key ={item.movie_name} to={`/${item.movie_name}`}>
              {"Movie Name: "+item.movie_name}
            </Link>
            <img src={item.image_url} />
            <Link key ={item.id} to={`/${item.image_url}`}>
              {"Movie Ratings: "+item.rating}
            </Link>
            {<br/>}
            <Link key ={item.release_date} to={`/${item.id}`}>
              {"Movie Release Date: "+item.release_date}
            </Link>
            </div>
          )
        })}
      </div>
      <Outlet />
    </>
  );
};
