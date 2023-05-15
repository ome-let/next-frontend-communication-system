import Button from '@mui/material/Button';
import StaticBar from '../components/staticbar';
import NavBar from '../components/navbar';

export default function Home() {
  return (
    <h1 className="text-3xl font-bold text-orange-600">
      <StaticBar/>
      <NavBar />
      {/* Hello world!
      <Button variant="contained" className='bg-black'>Contained</Button> */}
    </h1>
  )
}
