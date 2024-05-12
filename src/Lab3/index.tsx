import { FormEvent, useEffect, useState } from 'react';
import { postData } from '../utils';

interface TableData {
  algCoeff?: number[];
  algData?: number[][];
  tableCoeff?: number[];
  tableData?: number[][];
}

const initialValues = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

const Check = () => {
  const [coeffs, setCoeffs] = useState<string[]>(initialValues);
  const [coeff, setCoeff] = useState<string | undefined>();
  const calculateCoeff = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab3/check', { table: coeffs });
    setCoeff(result.coeff);
  };

  return (
    <div>
      Manual testing:
      <form onSubmit={calculateCoeff}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {coeffs.map((coeff, index) => (
            <div key={index}>
              <span>{index + 1} </span>
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
        <button>Check</button>
      </form>
    </div>
  );
};

const Tables = ({
  algCoeff,
  algData = [[], [], []],
  tableCoeff,
  tableData = [[], [], []]
}: TableData) => (
  <div style={{ display: 'flex' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxHeight: '600px', height: '100%', overflowY: 'auto' }}>
        {algData[0].map((_, index) => (
          <div key={index} style={{ display: 'flex', border: '1px solid white' }}>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{index}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>
              {algData[0][index]}
            </p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>
              {algData[1][index]}
            </p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>
              {algData[2][index]}
            </p>
          </div>
        ))}
      </div>
      <div>
        Table coeff:{' '}
        {tableCoeff?.map((item) => (
          <span style={{ margin: 4 }} key={item}>
            {`${item}`.slice(0, 5)}
          </span>
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxHeight: '600px', height: '100%', overflowY: 'auto' }}>
        {tableData[0].map((_, index) => (
          <div key={index} style={{ display: 'flex', border: '1px solid white' }}>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>{index}</p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>
              {tableData[0][index]}
            </p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>
              {tableData[1][index]}
            </p>
            <p style={{ borderLeft: '1px solid white', padding: 8, margin: 0 }}>
              {tableData[2][index]}
            </p>
          </div>
        ))}
      </div>
      <div>
        Alg coeff:{' '}
        {algCoeff?.map((item) => (
          <span style={{ margin: 4 }} key={item}>
            {`${item}`.slice(0, 5)}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const Lab3 = () => {
  const [option, setOption] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableData>();

  const getTableData = async () => {
    const result = await postData('http://localhost:5000/lab3/calculate');
    setTableData(result);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div>
      <button onClick={() => setOption(false)} disabled={option === false}>
        Tables
      </button>
      <button onClick={() => setOption(true)} disabled={option === true}>
        Check
      </button>
      {option ? <Check /> : <Tables {...tableData} />}
    </div>
  );
};
