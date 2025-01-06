import React, { useEffect, useState } from 'react';

interface ButtonListT {
  name: string
  color: string
}

function App() {
  const [buttonList, setButtonList] = useState<ButtonListT[]>([])
  const buttonAudio = new Audio('/audios/sound.mp3')

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    
    for (let j = 0; j < 10; j++) {
      let color = '#'
      let randomIndex = 0
      for (let i = 0; i < 6; i++) {
        randomIndex = Math.floor(Math.random() * 16)
        color += letters[randomIndex]
      }      
      setButtonList(prev => [ ...prev ,prev[j] = {name: letters[randomIndex], color: color}])
    }
  }

  const buttonPressed = (item: ButtonListT) => {
    const newList = buttonList.filter(data => data !== item)
    setButtonList(newList)
    buttonAudio.play()
    if (newList.length === 0) {
      setTimeout(()=>{
        getRandomColor()
      }, 3000)
    }
  }

  useEffect(()=>{
    if (buttonList.length === 0) {
      getRandomColor()
    }
  }, [])

  return (
    <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      {buttonList.map((item, index) => (
        <button 
          key={index} 
          style={{background: item.color, padding: '20px', marginTop: '20px', margin: '5px'}}
          onClick={()=>{
            buttonPressed(item)
          }}
        >
          {item.name}
        </button>
      ))}
      {buttonList.length === 0 && (
        <div style={{color: 'red', fontSize: '30px'}}>
          Congratulations, you wasted 2 minutes of your life!
        </div>
      )}
    </div>
  );
}

export default App;
