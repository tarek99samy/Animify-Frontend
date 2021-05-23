import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/side_bar/side_bar';
import NavBar from '../../components/nav_bar/nav_bar';
import SeeMore from '../../components/see_more/see_more';
import './seasonal_anime.scss';

function Seasonal() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function trimName(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      const newName = arr[i].name.slice(0, 22);
      newArr.push({
        name: newName,
        ...arr[i]
      });
    }
    return newArr;
  }
  useEffect(() => {
    axios
      .get(
        'http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-seasonal?listingServer=0&page=1&perPage=8&seasonYear=2021&season=0'
      )
      .then((response) => {
        setSeasonalAnime(trimName(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <SideBar />
      <NavBar />
      <div className='main'>
        <SeeMore list={seasonalAnime}/>
      </div>
    </div>
  );
}

export default Seasonal;
