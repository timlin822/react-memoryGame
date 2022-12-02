import {useState,useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CardsList from 'components/card/CardsList';

import IMAGES_DATA from 'data/ImagesData';

import './App.css';

function App() {
  const [success,setSuccess]=useState("");
  const [cards,setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disabled,setDisabled]=useState(false);

  const shuffleCards=()=>{
    setCards([...IMAGES_DATA, ...IMAGES_DATA].sort(()=>Math.random()-0.5).map(card=>({...card})));
  };

  const resetHandler=()=>{
    setSuccess("");
    shuffleCards();
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };
  
  useEffect(()=>{
    setSuccess("");

    shuffleCards();
  },[]);
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.url===choiceTwo.url){
        setCards(prevCards=>(prevCards.map(card=>(card.url===choiceOne.url?{...card, match: true}:card))));
        turnBackHandler();
      }
      else{
        setTimeout(()=>{
          turnBackHandler();
        },750);
      }
    }

    if(cards.length>0 && cards.every(card=>card.match===true)){
      toast.success(`總共翻牌${turns}次`,{position: toast.POSITION.TOP_CENTER,autoClose: 2000});
      setSuccess("成功完成");
    }
  },[choiceOne,choiceTwo]);
  useEffect(()=>{
    if(success==="成功完成"){
      const timeoutId=setTimeout(()=>{
        resetHandler();
      },3000);

      return ()=>{
        clearTimeout(timeoutId);
      }
    }
  },[success]);

  const turnBackHandler=()=>{
    setSuccess("");
    setTurns(prev=>prev+1);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const clickHandler=(card)=>{
    if(!disabled){
      if(choiceOne){
        setChoiceTwo(card);
      }
      else{
        setChoiceOne(card);
      }
    }
  };

  return (
    <section className="section-padding bg-height bg-color">
      <div className="container container-padding">
          <div className="group-flex">
            <button className="btn-start" onClick={resetHandler}>遊戲開始</button>
            <p className="turn-times">翻牌次數: {turns}</p>
          </div>
          <CardsList cards={cards} choiceOne={choiceOne} choiceTwo={choiceTwo} clickHandler={clickHandler} />
      </div>
      <ToastContainer />
    </section>
  );
}

export default App;