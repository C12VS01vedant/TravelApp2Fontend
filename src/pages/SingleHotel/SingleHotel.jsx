import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HotelDetails,HotelImages, Navbar ,FinalPrice} from '../../components';
import './SingleHotel.css';
// ...

export const SingleHotel = () => {
    const { id } = useParams();
    const [SingleHotel, setSingleHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3500/api/hotels/${id}`);
          setSingleHotel(data);
        } catch (err) {
          console.error(err);
          setError('Error fetching hotel data');
        } 
      };
  
      fetchData();
    }, [id]);
  

    const {name,state,country}=SingleHotel;

    return (
      <Fragment>
        <Navbar />
        <main className='single-hotel-page'>
          <p className='hotel-name-add'>
            {name},{state},{country}
          </p>
          <HotelImages SingleHotel={SingleHotel}></HotelImages>
          <div className='d-flex align-center'>
            <HotelDetails SingleHotel={SingleHotel}/>
            <FinalPrice SingleHotel={SingleHotel}/>
          </div>
        </main>
      </Fragment>
    );
  };
  