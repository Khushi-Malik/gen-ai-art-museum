import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import background from '../src/images/background.jpg';
import doorframe from '../src/images/doorframe.png';
import leftdoor from '../src/images/leftdoor.png';
import rightdoor from '../src/images/rightdoor.png';

function Index() {

  const [message, setmessage] = useState("loading...");

  useEffect(() => {
    fetch('http://localhost:8080/api/home')
    .then((response) => response.json())
    .then((data) => {
      setmessage(data.message);
      })
}, []);

  return (
    <div>
      <div className="relative z-20 text-black p-4">
        {message}
      </div>
      <div className="absolute left-1/2 z-20"
    style={{ top: '50%', transform: 'translateX(-50%) translateY(-25%)'}}>
        <Image 
          src={doorframe}
          alt=""
          width={350}
          layout="intrinsic"
          />
      </div>
      <div className="absolute left-1/2 z-20"
    style={{ top: '50%', transform: 'translateX(0%) translateY(-12%)'}}>
        <Image 
          src={leftdoor}
          alt=""
          height={350}
          layout="intrinsic"
          />
      </div>
      <div className="absolute left-1/2 z-20"
    style={{ top: '50%', transform: 'translateX(-102%) translateY(-12%)'}}>
        <Image 
          src={rightdoor}
          alt=""
          height={350}
          layout="intrinsic"
          />
      </div>
      <Image
        src={background}
        alt=""
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default Index
