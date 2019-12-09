import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Provider as ReduxQueryProvider } from 'redux-query-react'
import './App.css';
import './styles/spectre.styl';
import store, { persistor } from '@/redux/store'
import { Router } from './routes/router'
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConfigProvider locale={zh_CN}>
          <ReduxQueryProvider queriesSelector={(state) => state.queries}>
            <PersistGate loading={null} persistor={persistor}>
              <Router />
            </PersistGate>
          </ReduxQueryProvider>
        </ConfigProvider>
      </Provider>
    );
  }

}

export default App;
