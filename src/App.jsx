import { useState } from "react";

function App() {
  const winingPattern = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const [terms, setTerms] = useState(true);
  const [box, setBox] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const handleClick = (index) => {
    if (box[index] || winner) return;
    const newBox = box.slice();
    newBox[index] = terms ? "X" : "Y";
    setBox(newBox);
    setTerms(!terms);
    checkWinner(newBox);
  };
  const checkWinner = (newBox) => {
    for (let pattern of winingPattern) {
      const [a, b, c] = pattern;
      if (newBox[a] && newBox[a] === newBox[b] && newBox[a] === newBox[c]) {
        setWinner(newBox[a]);
        return;
      }
    }
    if (box.every((item) => item !== null) && !winner) {
      setDraw(true);
    }
  };
  const resetGame = () => {
    setTerms(true);
    setBox(Array(9).fill(null));
    setWinner(null);
    setDraw(false);
  };
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-wrap gap-4 w-80 mx-auto'>
        {box.map((value, i) => {
          return (
            <button
              className='w-20 h-20 text-2xl font-bold bg-[#c4fcef] rounded-lg'
              key={i}
              onClick={() => handleClick(i)}
            >
              <p className='text-[#845ec2]'>{value}</p>
            </button>
          );
        })}
        {winner || draw ? (
          <div className='text-center mt-4'>
            <p className='text-2xl font-semibold'>
              {draw ? "Draw No Winner" : `Winner: ${winner}`}
            </p>
            <button
              onClick={resetGame}
              className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg'
            >
              Play Again
            </button>
          </div>
        ) : (
          <p className='text-center mt-4 text-xl'>{`Next Player: ${
            terms ? "X" : "O"
          }`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
