import { FormEvent, useState } from 'react';
import { getRandomIntInclusive, postData } from '../utils';

interface TableData {
  algCoeff?: number[];
  algData?: number[][];
  tableCoeff?: number[];
  tableData?: number[][];
}

const initialValues = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(getRandomIntInclusive(0, 100));
  }
  return result;
};

const Check = () => {
  const [coeffs, setCoeffs] = useState<string[]>(initialValues);
  const [coeff, setCoeff] = useState<string | undefined>();
  const [chi2coeff, setChi2coeff] = useState<string | undefined>();
  const [scipyCoeff, setScipyCoeff] = useState<string | undefined>();
  const calculateCoeff = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shouldExit: number[] = [];
    coeffs.forEach((item, index) => {
      if (isNaN(parseInt(item))) {
        shouldExit.push(index);
      }
    });
    if (shouldExit.length > 0) {
      alert(`invalid value on index: ${shouldExit.join(', ')}`);
      return;
    }
    const result = await postData('http://localhost:5000/lab3/check', { table: coeffs });
    setCoeff(result.coeff);
    const chiResult = await postData('http://localhost:5000/lab3/chi2check', { table: coeffs });
    setChi2coeff(chiResult.coeff);
    const scipyResult = await postData('http://localhost:5000/lab3/scipy', { table: coeffs });
    setScipyCoeff(scipyResult.coeff);
  };

  return (
    <div>
      <p>Manual testing:</p>
      <form onSubmit={calculateCoeff}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {coeffs.map((coeff, index) => (
            <div key={index}>
              <span>{index} </span>
              <input
                style={{ minWidth: 30, maxWidth: 40 }}
                value={coeff}
                onChange={(event) => {
                  const newCoeffs = [...coeffs];
                  newCoeffs[index] = event.target.value;
                  setCoeffs(newCoeffs);
                }}
              />
            </div>
          ))}
        </div>
        <div>{coeff !== undefined && <p>Coeff: {coeff}</p>}</div>
        <div>{chi2coeff !== undefined && <p>Chi 2 Coeff: {chi2coeff}</p>}</div>
        <div>{scipyCoeff !== undefined && <p>Scipycoeff Coeff: {scipyCoeff}</p>}</div>
        <button>Check</button>
      </form>
    </div>
  );
};

const showTables = ({ algData = [], tableCoeff, tableData = [], algCoeff }: TableData) => (
  <div style={{ display: 'flex' }}>
    <div style={{ display: 'flex', flexDirection: 'column', margin: 8 }}>
      <h6>Algorithmic results:</h6>
      <div style={{ maxHeight: '600px', height: '100%', overflowY: 'auto' }}>
        {algData.map((item, index) => (
          <div key={index} style={{ display: 'flex', border: '1px solid white' }}>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{index}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{item[0]}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{item[1]}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{item[2]}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Table coeff:</p>
        <div style={{ border: '1px solid white', display: 'flex' }}>
          {tableCoeff?.map((item) => (
            <p style={{ margin: 0, padding: 8, borderLeft: '1px solid white' }} key={item}>
              {`${item}`.slice(0, 5)}
            </p>
          ))}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', margin: 8 }}>
      <h6>Table results:</h6>
      <div style={{ maxHeight: '600px', height: '100%', overflowY: 'auto' }}>
        {tableData.map((item, index) => (
          <div key={index} style={{ display: 'flex', border: '1px solid white' }}>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{index}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{item[0]}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{item[1]}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{item[2]}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Alg coeff:</p>
        <div style={{ border: '1px solid white', display: 'flex' }}>
          {algCoeff?.map((item) => (
            <p style={{ margin: 0, padding: 8, borderLeft: '1px solid white' }} key={item}>
              {`${item}`.slice(0, 5)}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Tables = () => {
  const [tableData, setTableData] = useState<TableData | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTableData = async () => {
    setIsLoading(true);
    const result = await postData('http://localhost:5000/lab3/calculate');
    setTableData(result);
    setIsLoading(false);
  };

  const showTableData = (tableData?: TableData) =>
    tableData !== undefined ? showTables(tableData) : <></>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <button style={{ width: 100, margin: 8 }} onClick={() => getTableData()}>
        Load data
      </button>
      {!isLoading ? showTableData(tableData) : <p>Data is loading</p>}
    </div>
  );
};

export const Lab3 = () => {
  const [option, setOption] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setOption(false)} disabled={option === false}>
        Tables
      </button>
      <button onClick={() => setOption(true)} disabled={option === true}>
        Check
      </button>
      {option ? <Check /> : <Tables />}
    </div>
  );
};
