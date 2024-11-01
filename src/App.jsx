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
    newBox[index] = terms ? "X" : "O";
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
    if (newBox.every((item) => item !== null) && !winner) {
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
    <div className='h-screen flex flex-col justify-center items-center gap-10'>
      <h1 className='text-4xl font-bold text-white'>Tic Tac Toe</h1>
      <div className='flex flex-wrap justify-center items-center gap-4 w-80 mx-auto'>
        {box.map((value, i) => {
          return (
            <button
              className='w-20 h-20 text-3xl font-bold bg-[#c4fcef] rounded-lg'
              key={i}
              onClick={() => handleClick(i)}
            >
              <p className='text-[#4b4453]'>{value}</p>
            </button>
          );
        })}
        {winner || draw ? (
          <div className='text-center mt-4 flex flex-col justify-center items-center'>
            <p
              className={`${winner && "text-white"} ${
                draw && "text-gray-300"
              } text-3xl font-semibold mb-5`}
            >
              {draw ? "Draw No Winner" : `Winner: ${winner}`}
            </p>
            <button
              onClick={resetGame}
              className='relative inline-block h-14 w-32 text-xl text-white duration-300 before:absolute before:inset-0 before:-z-10 before:block before:bg-sky-400 before:duration-500 after:absolute after:inset-0 after:-z-10 after:block after:bg-sky-700 after:duration-500 hover:before:skew-y-12 hover:after:-skew-y-12'
            >
              Play Again
            </button>
          </div>
        ) : (
          <p className='text-white font-bold text-center mt-4 text-2xl'>{`Next Player: ${
            terms ? "X" : "O"
          }`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
