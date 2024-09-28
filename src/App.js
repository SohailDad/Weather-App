import './App.css';
import { useState } from 'react';

function App() {
  let [cityname, setCityName] = useState('');
  let [Wdetail, setWdetail] = useState();
  let [isloading, setisloading] = useState(false);
  let getData = (event) => {
    // de ma da de para laga waly de ko charta user siraf pa button clilk ko no agha ba alert show shi.
    if (cityname == '') {
      alert('Please Enter City Name...')
    } else {
      setisloading(true)
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=de8d0ac8ebadb5df608b2c7ac32dc57e&units=metric`)
        .then((res) => res.json())
        .then((finalRes) => {
          console.log(finalRes)
          if (finalRes.cod == '404') {
            setWdetail(undefined)
          }
          else {

            setWdetail(finalRes)
          }

          setisloading(false)
        })
    }
    event.preventDefault();
    setCityName('')
  }




  return (
    <div className=' h-[100vh] bg-[#4aacb1]'>
      <div className=' mx-auto '>


        <h1 className="text-[30px]  font-bold py-[30px] text-white ">
          Simple weather App
        </h1>


        <div className='main-div w-[330px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
        <form onSubmit={getData}>
          <input type='text' value={cityname} onChange={(e) => setCityName(e.target.value)} className=' w-[200px] h-[40px] pl-3 ' placeholder='City Name' /> <button className='bg-[red] p-[9px] text-[white]'>Search</button>
        </form>

          {/* image.gif */}
          <img src='https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_256.gif' width={100} className={`absolute left-[40%] ${isloading ? '' : 'hidden'}`} />

          {
            (Wdetail !== undefined) ?
              <>
                <h3 className='font-bold text-[30px]'>{Wdetail.name} <span className='bg-[yellow]'>{Wdetail.sys.country}</span></h3>
                <h2 className='font-bold text-[30px]'>{Wdetail.main.temp}</h2>
                <img src={`http://openweathermap.org/img/w/${Wdetail.weather[0].icon}.png`} />
                <p>{Wdetail.weather[0].description}</p>
              </>
              :
              <h2 className='font-bold text-[15px]'>No Data Found...</h2>

          }
        </div>
      </div>
    </div>
  );
}

export default App;
