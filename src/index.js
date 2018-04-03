import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './containers/RootContainer/RootContainer';

function render(Container = RootContainer) {
  ReactDOM.render(
    <AppContainer>
      <Container />
    </AppContainer>,
    document.getElementById('app'),
  );
}

render();

if (module.hot) {
  module.hot.accept('./containers/RootContainer/RootContainer', () => render());
}
