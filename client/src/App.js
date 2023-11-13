import './App.css';
import React from 'react';
import { RouterComponent } from './components/RouterComponent';
import {Provider} from "react-redux";
import {store} from "./features/store.js"

function App() {


    return (
        <>
            <Provider store={store}>
                <RouterComponent />
            </Provider>
        </>
    );
}

export default App;
