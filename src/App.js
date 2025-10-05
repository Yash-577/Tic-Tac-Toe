
import {React,useState,useEffect} from "react";
import "./App.css"
export default function TicTacToe(){
const empty = Array(9).fill(null);
const [board, setBoard] = useState(empty);
const [xNext, setXNext] = useState(true);
const [history, setHistory] = useState([empty]);
const [step, setStep] = useState(0);
const [score, setScore] = useState({X:0, O:0});
const [dark, setDark] = useState(true);

const lines= [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const getWinner = (b) =>{
  for (let [a,c,d] of lines)
  if (b[a] && b[a]===b[c] && b[a]===b[d])
    return {w: b[a], line: [a,c,d]};
  return null;
};

const info = getWinner(board);
const winner = info?.w;
const winLine = info?.line || [];
const draw= !winner && board.every(Boolean);

const handleClick =(i)=>{
  if (board[i] || winner) return;
  const newBoard = [...board];
  newBoard[i] = xNext? "X" : "O";
  const newHistory = [...history.slice(0,step+1), newBoard];
  setBoard(newBoard);
  setHistory(newHistory);
  setStep(newHistory.length-1);
  setXNext(!xNext);

};
const jumpTo = (m) =>{
  setBoard(history[m]);
  setStep(m);
  setXNext(m%2===0);
};
const resetAll=()=>{setBoard(empty);
    setHistory([empty]);
    setStep(0);
    setXNext(true);
    setScore({ X: 0, O: 0 });};

const nextMatch=()=>{if (winner) setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
    setBoard(empty);
    setHistory([empty]);
    setStep(0);
    setXNext(true);};

useEffect (() =>{
  if(winner) setScore((s)=>({...s, [winner]: s[winner] +1}));

},[winner]);

useEffect(() => {
  if (dark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, [dark]);


return(

<div className={`app ${dark? "dark":""}`}>
  <button onClick={()=> setDark(!dark)}>
    {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
  <p>Player X:{score.X} | Player O:{score.O}</p>
  <p>{winner ? `Winner: ${winner}` :draw ? "Draw": `Next: ${xNext ? "X" : "O"}`}</p>

<div className="board">{board.map((cell,i)=>
(<button
  key={i}
  className={`square ${winLine.includes(i) ? "win" : ""}`}
  onClick={() => handleClick(i)}
>
  {cell}
</button>
))}
</div>

<div>
  <button onClick={nextMatch}>Next Match</button>
  <button onClick={resetAll}>Reset All</button>
</div>

<div className="history">
  <h3>History</h3>
  {history.map((_,m) =>(
    <button 
    key={m} onClick={()=> jumpTo(m)} className={m===step? "active": ""}>
      {m===0? "Start": `Move${m}`}
    </button>

  ))}
</div>
</div>
);

}
