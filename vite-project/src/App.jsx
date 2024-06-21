import { useState } from "react";
const generateEmptyGrid = () => {
  return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => -1));
};
const initialdata = generateEmptyGrid();

function isSafe(rowindex, colindex, num, data) {
  for (let x = 0; x <= 8; x++) if (data[rowindex][x] === num) return false;

  for (let x = 0; x <= 8; x++) if (data[x][colindex] === num) return false;

  let startRow = rowindex - (rowindex % 3);
  let startCol = colindex - (colindex % 3);

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (data[i + startRow][j + startCol] === num) return false;

  return true;
}

function handleSolve(data, setData) {
  const solve = (rowindex, colindex, dataCopy) => {
    if (rowindex === 9) return true;
    if (colindex === 9) return solve(rowindex + 1, 0, dataCopy);
    if (dataCopy[rowindex][colindex] !== -1) {
      return solve(rowindex, colindex + 1, dataCopy);
    }
    for (let num = 1; num <= 9; num++) {
      if (isSafe(rowindex, colindex, num, dataCopy)) {
        dataCopy[rowindex][colindex] = num;
        if (solve(rowindex, colindex + 1, dataCopy)) return true;
        dataCopy[rowindex][colindex] = -1;
      }
    }
    return false;
  };

  let dataCopy = data.map((row) => [...row]);
  if (solve(0, 0, dataCopy)) {
    setData(dataCopy);
  } else {
    alert("No solution exists");
  }
}

function App() {
  const [data, setData] = useState(initialdata);

  function Solve() {
    handleSolve(data, setData);
  }

  function handleChange(e, rowindex, colindex) {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 9 && isSafe(rowindex, colindex, value, data)) {
      const newData = data.map((row, rindex) =>
        row.map((cell, cindex) =>
          rindex === rowindex && cindex === colindex ? value : cell
        )
      );
      setData(newData);
    } else {
      alert("Invalid input");
    }
  }
  function clearAll() {
    setData(initialdata);
  }
  return (
    <div className="bg-blue-950 h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="font-mono font-extrabold text-5xl text-white ">
        🎮 Sudoku Puzzle
      </h1>
      <div className="mt-10">
        <table className="border-2  border-black ">
          <tbody>
            {Array.from({ length: 9 }, (_, rowindex) => (
              <tr key={rowindex}>
                {Array.from({ length: 9 }, (_, colindex) => (
                  <td key={rowindex + colindex}>
                    <input
                      type="text"
                      className={`w-10 h-10 text-center text-xl focus:outline-none ${
                        data[rowindex][colindex] !== -1 ? " bg-orange-400" : ""
                      } ${
                        (rowindex + 1) % 3 === 0
                          ? "  border-b-2  border-black"
                          : ""
                      } ${
                        (colindex + 1) % 3 === 0
                          ? "  border-r-2  border-black"
                          : ""
                      }`}
                      value={
                        data[rowindex][colindex] === -1
                          ? ""
                          : data[rowindex][colindex]
                      }
                      onChange={(e) =>
                        handleChange(e, rowindex, colindex, data)
                      }
                      disabled={data[rowindex][colindex] != -1}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" flex gap-6">
        <button
          className="  bg-red-700  rounded-lg h-10 w-20 mt-5 text-white font-bold    hover:bg-red-500 shadow-slate-500"
          onClick={clearAll}
        >
          Clear
        </button>
        <button
          className=" bg-orange-600  rounded-lg h-10 w-20 mt-5 text-black font-bold hover:text-white  hover:shadow-lg shadow-slate-500"
          onClick={Solve}
        >
          Solve
        </button>
      </div>
    </div>
  );
}

export default App;
