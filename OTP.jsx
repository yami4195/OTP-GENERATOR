const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [otp,setOtp] = useState(null);
  const [timeLeft,setTimeLeft]= useState(null);
  const [isRunning,setIsRunning]= useState(false);
    const intervalRef = useRef(null);

const generateOtp = () =>{
  const newOtp = Math.floor(Math.random()*9000+100000).toString();
  setOtp(newOtp);
  setTimeLeft(5);
  setIsRunning(true);
};

useEffect (()=>{
if(!isRunning) return;
intervalRef.current = setInterval(()=>{
  setTimeLeft((prev)=>{
    if(prev<=1){
      clearInterval(intervalRef.current);
      setIsRunning(false);
      return(0);
    }
    return prev-1;
  });
},1000);

return ()=>{
  clearInterval(intervalRef.current);
}
},[isRunning]);

let timerMessage = "";
if(timeLeft!=null){
  timerMessage =
  timeLeft>0 ?`Expires in: ${timeLeft} seconds`
  : "OTP expired. Click the button to generate a new OTP.";
}
  return(
  <div className="container">
  <h1 id="otp-title">OTP Generator</h1>
  <h2 id="otp-display">
 {otp ? otp : "Click 'Generate OTP' to get a code"}</h2>
  <p id="otp-timer" aria-live="polite">{timerMessage}</p>
  <button id="generate-otp-button" onClick={generateOtp}
        disabled={isRunning}
      >Generate OTP</button>
  </div>
);
 
};