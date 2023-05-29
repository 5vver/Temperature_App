import {useEffect, useRef, useState} from 'react';

const TemperaturesHandler = () => {
  //
  const [tempMsg, setTempMsg] = useState('')
  // Температура
  const [temp, setTemp] = useState(null)

  // Влажность
  const [hum, setHum] = useState(null)

  const tempRef = useRef(temp);
  tempRef.current = temp;

  useEffect(() => {
    const fetchTemperature = async () => {
      const response = await fetch('/api/temperature/1');  // replace 1 with the correct ID
      const data = await response.json();
      setTemp(data.temp);
    }

    const fetchHumidity = async () => {
      const response = await fetch('/api/humidity/1');  // replace 1 with the correct ID
      const data = await response.json();
      setHum(data.hum);
    }

    fetchTemperature();
    fetchHumidity();
  }, []);

  const updateTemperature = async (newTemp) => {
    await fetch('/api/temperature/1', {  // replace 1 with the correct ID
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ temp: newTemp }),
    });

    setTemp(newTemp);
  }

  const increaseTemp = () => {
    updateTemperature(temp + 5);
  }

  const decreaseTemp = () => {
    updateTemperature(temp - 5);
  }

  // State depending on temp change
  useEffect(() => {
    if (temp >= 20 && temp <= 25)
      setTempMsg('Температура в норме')
    else if (temp < 20)
      setTempMsg('Температура ниже номинального значения, необходимо включить обогреватель')
    else if (temp > 25)
      setTempMsg('Температура выше номинального значения, необходимо включить вентиляцию')
  }, [temp])

  const startVentilation = () => {
    if (temp > 25) {
      const interval = setInterval(() => {
        tempRef.current > 25 ? (
          setTemp(prevTemp => prevTemp - 1)
        ) : (
          clearInterval(interval)
        )
      }, 1000);

      return () => {
        clearInterval(interval);  // clear interval on component unmount
      };
    }
    else
      alert('Температура должна быть выше номинального значения, чтобы включить вентиляцию')
  }

  const startHeater = () => {
    if (temp < 20) {
      const interval = setInterval(() => {
        tempRef.current < 20 ? (
          setTemp(prevTemp => prevTemp + 1)
        ) : (
          clearInterval(interval)
        )
      }, 1000);

      return () => {
        clearInterval(interval);  // clear interval on component unmount
      };
    }
    else
      alert('Температура должна быть ниже номинального значения, чтобы включить обогреватель')
  }

  return (
    <div
      style={{ right: '50%',
        bottom: "50%",
        width: "100%",
        transform: "translate(50%,20%)",
        position: "absolute"}}>
      <h1>Управление</h1>
      <div>
        <h2>Температура:</h2>
        <p style={{textAlign: "center"}}>Значение: {temp} </p>
      </div>
      <h2>Влажность:</h2>
      <div>
        <p style={{textAlign: "center"}}>Значение: {hum} </p>
      </div>
      <h2>Состояние:</h2>
      <p>{tempMsg}</p>
      <hr style={{}}/>
      <h2>Управление температурой:</h2>
      <div style={{justifyContent: "space-between"}}>
        <button onClick={decreaseTemp}>Обновить запись температуры - 5</button>
        <button onClick={increaseTemp}>Обновить запись температуры + 5</button>
      </div>
      <hr/>
      <h2>Управление вентиляцией и обогревом:</h2>
      <div>
        <button onClick={startVentilation}>Включить вентиляцию</button>
        <button onClick={startHeater}>Включить обогреватель</button>
      </div>
    </div>
  )
}

export default TemperaturesHandler;