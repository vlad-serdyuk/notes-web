import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';

import { Pages } from './pages';
import GlobalStyles from './styled/globalStyles';

const App = () => {
  return (
    <Grommet plain>
      <GlobalStyles />
      <Pages />
    </Grommet>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
