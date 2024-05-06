import { useState } from 'react';

import './App.css';

import { Lab4 } from './Lab4';
import { Lab1 } from './Lab1';
import { Lab2 } from './Lab2';
import { Lab3 } from './Lab3';
import { Lab5 } from './Lab5';

const show = (lab: number | undefined) => {
  switch (lab) {
    case 1:
      return <Lab1 />;
    case 2:
      return <Lab2 />;
    case 3:
      return <Lab3 />;
    case 4:
      return <Lab4 />;
    case 5:
      return <Lab5 />;
    default:
      return <p>Please select lab</p>;
  }
}

const App = () => {
  const labs = [1, 2, 3, 4, 5];
  const [ selectedLab, setSelectedLab] = useState<number | undefined>();
  return (
    <>
      {labs.map((lab) => <button key={lab} onClick={() => setSelectedLab(lab)}>Lab: {lab}</button>)}
      {show(selectedLab)}
    </>
  )
}

export default App
