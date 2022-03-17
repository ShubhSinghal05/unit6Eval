import { Navbar } from "./Navbar";
import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export const SingleMovieDetails = (props) => {


    // make a request to get the details


    const {productId} = useParams();
    const [data, setData]=useState(null);

    useEffect(()=>{
      axios({
        method:"get",
        url:`https://movie-fake-server.herokuapp.com/data/${productId}`,
      })
      .then((res)=>setData(res.data))
      .catch((err)=>console.log(err));
    },[productId])
  return ( 
  <>
<Navbar />
<h2>Single Movie Details</h2>
{data && (
  <>
  <h2>{data.movie_name}</h2>
  <img src={data.image_url}/>
  <p>{data.release_date}</p>
  </>
)}

  </>
  
  );
};
