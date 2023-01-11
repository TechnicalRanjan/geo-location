import {Button, Space, message,DatePicker} from 'antd'
import { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [location, setLocation]=useState({
    loaded:false,
    coordinates:{lat:"",lang:""}
  })
  const onSuccess =(location) => {
    console.log(location);
    setLocation({
      loaded:true,
      coordinates:{
        lat:location.coords.latitude,
        lang:location.coords.longitude,
      }
      
    })
    setData(`Your latitude: ${location.coords.latitude} \n\n\n Your longitude:${location.coords.longitude}`)
  }
  const onError =(error)=>{
    setLocation({
      loaded:true,
      error,
    })
  }
  
    useEffect(() => {
      if(!("geolocation" in navigator)){
        onError({
          code:0,
          message:"Geolocation not supported"
        })
      }
     setData()
    },[])
  
  const [data, setData] = useState('')

  const handleChange = (value) => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)

    if(location.loaded){
      return message.success(`Your latitude: ${location.coordinates.lat} \n\n\n Your longitude:${location.coordinates.lang}`);
    }
    message.error(`location not loaded yet`)
  };
  return (
    <div className='location-container'>
      <Button  type='primary' onClick={handleChange}>Get Geo Location</Button>
      <Space>

      <div className='message-box'>
      {
      
      location.loaded &&
      <p>
        {data}
      </p>
      }
      </div>
      </Space>

    </div>
  );
};

export default App;

