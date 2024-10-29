import { useState } from 'react'

function App() {
  const winingPattern =[
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
  ]
  const [terms, setTerms] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null);
  const handleClick = (index) => {
    if (terms) {
      setPlayer('x');
      setTerms(false);
    }else{
      setPlayer('o');
      setTerms(true);
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 w-80 mx-auto">
      {
        board.map((_, i)=>{
          return (
            <button className='w-20 h-20 text-2xl font-bold bg-gray-400 rounded-lg' key={i} onClick={()=>handleClick(i)}>
              {player}
            </button>
          )
        })
      }
    </div>
  )
}

export default App
