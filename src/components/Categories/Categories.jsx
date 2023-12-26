import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import {useCategory} from '../../context';

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategories, setNumberOfCategories] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();


  const handleShowMoreRightClick = () => {
    setNumberOfCategories((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setNumberOfCategories((prev) => prev - 10);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://travelappved12.cyclic.app/api/category"
        );
        const categoryToShow = data.slice(
          numberOfCategories+10>data.length
          ?data.length-10
          :numberOfCategories,
          numberOfCategories >data.length
          ?data.length
          :numberOfCategories+10
        );

        setCategories(categoryToShow);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [numberOfCategories]);


const handleCategoryClick = (category) =>{
  console.log({category});
  setHotelCategory(category);
};

console.log({'hotelCategory':hotelCategory});




  return (
    <section className="categories d-flex align-center gap-large cursor-pointer">
      {numberOfCategories >= 10 && (
        <button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handleShowMoreLeftClick}
        >
          <span className="material-icons-outlined">navigate_before</span>
        </button>
      )}

      {categories.map(({ _id, category }) => (
        <span className= {`${category===hotelCategory ? " border-bottom" : ""}` }
        key={_id} 
        onClick={()=>handleCategoryClick(category)}>{category}</span>
      ))}

      {numberOfCategories-10 < categories.length && (
        <button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handleShowMoreRightClick}
        >
          <span className="material-icons-outlined">navigate_next</span>
        </button>
      )}
    </section>
  );
};
