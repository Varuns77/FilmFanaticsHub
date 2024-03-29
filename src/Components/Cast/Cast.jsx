import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './Cast.css'

function Cast() {

    const apiKey = import.meta.env.VITE_API_KEY;

    const { id } = useParams()

    const [castDetails, setCastDetails] = useState([])

    useEffect(() => {
        getCast();
    }, [id])

    const getCast = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language`)
        const data = await api.json();
        setCastDetails(data?.cast?.slice(0,15))
        // console.log(data?.crew);
    }

    

  return (
    
    <div className="cast-slider">
      {   
                        castDetails.map(cast => (
                                  <div className="castImage">
                                    <img src={ cast && cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : 'https://via.placeholder.com/200x300'} width="200" height="250" />
                                    <p>{cast && cast.name}</p>
                                    <p>as</p>
                                    <h4 style={{textWrap: "wrap"}}>{cast && cast.character}</h4>
                                  </div>
                            ))
                        }                

    {/* <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        castDetails.map(cast => (
                                  <div className="castImage">
                                    <img src={`https://image.tmdb.org/t/p/original${cast && cast.profile_path}`} width="500" height="300"/>
                                  </div>
                            
                            ))
                        }
    </Carousel> */}
    </div>


    // castDetails.map(cast => {
    //   <div key={cast.id} style={{color: "red"}}>{cast && cast.name}</div>
    //   // console.log(cast && cast.name);
    // })
  )
}

export default Cast