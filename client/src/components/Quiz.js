import React, { useState,useEffect } from 'react'
import { data } from '../assets/data';
import axios from 'axios';

const Quiz = () => {
  const [index,setIndex] = useState(0);
  const [question,setQuestion] = useState(data[index]);
  const [selectedOption,setSelectedOption] = useState(null);
  const [istrue,setIstrue] = useState(null);
  const [lock,setLock] = useState(false);
  const [showanswer,setShowanswer] = useState(false);
  const [score,setScore] = useState(0);
  const [result,setResult] = useState(false);
  const [start,setStart] = useState(false);

  useEffect(() => {
    if (result) {
    axios.post('http://localhost:3001/submit-score', {
      score : score,
      total : data.length
    })
    .then(res => console.log(res.data))
    .catch(err => console.error("Score submission error:", err));
    }
    }, [result, score]);

// for chk  ans and score and lock mechanism
  const checkAns =(optionNumber) =>{
    if (lock === false) {
      setSelectedOption(optionNumber);
      setShowanswer(true);
      setIstrue(optionNumber === question.ans);
      setLock(true);
      if (optionNumber===question.ans) {
      setScore(prev=>prev+1); 
      }}}
  
  //for correct and incorrect option    
  function getColor(optionNumber) {
  if (selectedOption === optionNumber && istrue) 
    return 'bg-green-200  border-green-400';
  else if (selectedOption === optionNumber && !istrue) 
    return 'bg-red-200  border-red-400';
  else if (showanswer && question.ans === optionNumber && selectedOption !== optionNumber) 
    return 'bg-green-200  border-green-400';
  else 
    return '';
}

  //for the next function
  const next = () => {
    if (lock===true) {
      if (index === data.length -1) {
        setResult(true);
        return 0;
      }
      if (index < data.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuestion(data[nextIndex]);
      setSelectedOption(null);
      setIstrue(null);
      setLock(false);
      setShowanswer(false);
    }}}
    
    //for reset
    const handleReset = ()=>{
      setIndex(0);
      setQuestion(data[0]);
      setScore(0);
      setLock(false);
      setResult(false);
      setShowanswer(false);
      setSelectedOption(null);
      setIstrue(null);
      setStart(false);
    }

return (
    <div className='bg-white p-8 space-y-5 rounded shadow-md shadow-gray-700'>
      <h1 className='text-3xl font-semibold'>Quizs <span className='text-violet-700'>App</span></h1>
      <hr className='bg-gray-400 h-[2px]' />
      {!start ? (
        <div className='flex justify-center'>
          <button onClick={() => setStart(true)} className='bg-violet-900 hover:bg-violet-700 text-white text-lg px-6 py-2 rounded'>Start your Quiz</button>
        </div>)
        : result ? (
        <>
          <h2>You scored: <span className='text-violet-700 font-semibold'>{score}</span> out of <span className='text-violet-700 font-semibold'>{data.length}</span></h2>
          <button onClick={handleReset} className='bg-violet-900 hover:bg-violet-700 rounded-sm px-12 text-white text-lg p-1'>Reset</button>
        </>) 
        : (
        <>
          <h1 className='text-lg'>{index + 1}. {question.question}</h1>
          <ul className={`space-y-4 ${lock ? 'pointer-events-none' : ''}`}>
            <li onClick={() => checkAns(1)} className={`transition-all duration-200 border-2 p-2 border-gray-400 rounded hover:border-violet-600 cursor-pointer ${getColor(1)}`}>{question.option1}</li>
            <li onClick={() => checkAns(2)} className={`transition-all duration-200 border-2 p-2 border-gray-400 rounded hover:border-violet-600 cursor-pointer ${getColor(2)}`}>{question.option2}</li>
            <li onClick={() => checkAns(3)} className={`transition-all duration-200 border-2 p-2 border-gray-400 rounded hover:border-violet-600 cursor-pointer ${getColor(3)}`}>{question.option3}</li>
            <li onClick={() => checkAns(4)} className={`transition-all duration-200 border-2 p-2 border-gray-400 rounded hover:border-violet-600 cursor-pointer ${getColor(4)}`}>{question.option4}</li>
          </ul>
          <div className='flex flex-col items-center'>
            <button onClick={next}className='bg-violet-900 hover:bg-violet-700 rounded-sm px-12 text-white text-lg p-1'>Next</button>
            <h1 className='text-xs mt-1'>{index + 1} of {data.length} questions</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;