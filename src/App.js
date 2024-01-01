import { Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import { SingleHotel } from './pages/SingleHotel/SingleHotel';
import './App.css';
import { SearchResults } from './pages/SearchResults/SearchResults';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/hotels/:name/:address/:id/reserve' element={<SingleHotel />} />
      <Route path='/hotels/:address' element={<SearchResults />} />
    </Routes>
  );
}

export default App;
