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

const Tables = ({ algCoeff, algData = [[]], tableCoeff, tableData = [[]] }: TableData) => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
