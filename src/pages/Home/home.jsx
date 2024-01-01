import InfiniteScroll from 'react-infinite-scroll-component';
import { Navbar } from '../../components/navbar/navbar';
import { HotelCard } from '../../components/HotelCard/HotelCard';
import { Fragment, useEffect, useState } from 'react';
import '../Home/home.css';
import axios from 'axios';
import { Categories } from '../../components';
import { useCategory,useDate } from '../../context';
//import {SearchStayWithDate} from '../../components';
import {SearchStayWithDate} from '../../components';


export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const {hotelCategory}=useCategory();
  const {isSearchModalOpen}=useDate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3500/api/hotels?category=${hotelCategory}`);
        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length) {
        setHotels((prevHotels) => [...prevHotels, ...testData.slice(currentIndex, currentIndex + 16)]);
        setCurrentIndex((prev) => prev + 16);
      } else {
        setHotels([]);
      }
    }, 1000);
  };

  return (
    <Fragment>
      <Navbar />
      <Categories/>
      {hotels && hotels.length > 0 ? (
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={hotels.length > 0 && <h3 className='alert-text'>Loading...</h3>}
          endMessage={<p className='alert-text'>You have seen it all</p>}
        >
          <main className='main d-flex align-center wrap gap-larger'>
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}
      {
        isSearchModalOpen && <SearchStayWithDate/>
      }
    </Fragment>
  );
};
