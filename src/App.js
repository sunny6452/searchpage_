import React, { useEffect, useState } from 'react';
import './App.css';

import Main from './view/Main';
import Test from './view/Test';
function App() {
  const [test, setTest] = useState(true);
  return <>{test ? <Main /> : <Test />}</>;
}

export default App;
