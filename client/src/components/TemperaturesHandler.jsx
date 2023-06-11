import {useEffect, useRef, useState} from 'react';

import {Button, Grid, StyledGridItem, Text} from '@nextui-org/react';
import Cooler from "./Cooler.jsx";
import Heater from "./Heater.jsx";

const TemperaturesHandler = () => {
  const [tempMsg, setTempMsg] = useState('')
  const [temp, setTemp] = useState(null)

  const [hum, setHum] = useState(null)

  const [isCoolerRotating, setIsCoolerRotating] = useState(false)
  const [isHeaterPulsing, setIsHeaterPulsing] = useState(false)

  const tempRef = useRef(temp);
  tempRef.current = temp;

  useEffect(() => {
    const fetchTemperature = async () => {
      const response = await fetch('/api/temperature/1');
      const data = await response.json();
      setTemp(data.temp);
    }

    const fetchHumidity = async () => {
      const response = await fetch('/api/humidity/1');
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
    temp < 60 && updateTemperature(temp + 5)
  }

  const decreaseTemp = () => {
    temp > 0 && updateTemperature(temp - 5)
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
        if (tempRef.current > 25) {
          setIsCoolerRotating(true)
          setTemp(prevTemp => prevTemp - 1)
        }
        else {
          clearInterval(interval)
          setIsCoolerRotating(false)
        }
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
        if (tempRef.current < 20) {
          setIsHeaterPulsing(true)
          setTemp(prevTemp => prevTemp + 1)
        }
        else {
          clearInterval(interval)
          setIsHeaterPulsing(false)
        }
      }, 1000);

      return () => {
        clearInterval(interval);  // clear interval on component unmount
      };
    }
    else
      alert('Температура должна быть ниже номинального значения, чтобы включить обогреватель')
  }

  return (
    <div>
      <Text
        h1
        css={{
          textGradient: "45deg, #000000 -20%, #434343 90%",
        }}
        weight="bold"
      >
        Управление
      </Text>
      <div>
        <Text
          h2
          css={{
            textGradient: "45deg, #000000 -20%, #434343 100%",
          }}
          weight="bold"
        >
          Температура:
        </Text>
        <Text
          h2
          css={temp >= 20 && temp <= 25 ?
            ({
              textGradient: "45deg, #000000 -20%, #434343 80%",
            }) : temp > 25 ?
              ({
                textGradient: "45deg, #fd1d1d -20%, red 80%",
              }) :
              ({
                textGradient: "45deg, white -20%, $blue600 80%",
              })
          }
          weight="bold"
        >
          {temp}
        </Text>
      </div>
      <h2></h2>
      <Text
        h2
        css={{
          textGradient: "45deg, #000000 -20%, #434343 90%",
        }}
        weight="bold"
      >
        Влажность:
      </Text>
      <Text
        h2
        css={{
          textGradient: "45deg, #000000 -20%, #434343 80%",
        }}
        weight="bold"
      >
        {hum}
      </Text>
      <Text
        h2
        css={{
          textGradient: "45deg, #000000 -20%, #434343 80%",
        }}
        weight="bold"
      >
        Состояние:
      </Text>
      <Text
        h3
        css={temp >= 20 && temp <= 25 ?
          ({
            textGradient: "45deg, #000000 -20%, #434343 80%",
          }) : temp > 25 ?
          ({
            textGradient: "45deg, #fd1d1d -20%, red 80%",
          }) :
          ({
            textGradient: "45deg, white -20%, $blue600 80%",
          })
        }
        weight="bold"
      >
        {tempMsg}
      </Text>
      <Grid.Container gap={4} justify="center">
        <Grid>
          <Cooler isRotating={isCoolerRotating}/>
        </Grid>
        <Grid>
          <Heater isHeating={isHeaterPulsing} />
        </Grid>
      </Grid.Container>

      <hr style={{}}/>
      <Grid.Container gap={2} justify={'center'}>
        <Grid xs={6}>
          <Text
            h3
            css={{
              textGradient: "45deg, #000000 -20%, #434343 80%",
            }}
            weight="bold"
          >
            Управление температурой:
          </Text>
        </Grid>
        <Grid xs={4}>
          <Text
            h3
            css={{
              textGradient: "45deg, #000000 -20%, #434343 80%",
            }}
            weight="bold"
          >
            Управление вентиляцией и обогревом:
          </Text>
        </Grid>
        <Grid>
          <Button bordered auto ghost color={'gradient'} size={'md'} onClick={decreaseTemp}>Понизить температуру</Button>
        </Grid>
        <Grid xs={4.5}>
          <Button bordered auto ghost color={'gradient'} size={'md'} onClick={increaseTemp}>Повысить температуру</Button>
        </Grid>
        <Grid>
          <Button color={'gradient'} auto ghost size={'md'} onClick={startVentilation}>Включить вентиляцию</Button>
        </Grid>
        <Grid>
          <Button color={'gradient'} auto ghost size={'md'} onClick={startHeater}>Включить обогреватель</Button>
        </Grid>
      </Grid.Container>
    </div>
  )
}

export default TemperaturesHandler;