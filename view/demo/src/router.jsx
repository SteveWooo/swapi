import React from 'react';
import {
    HashRouter ,
    Route
} from 'react-router-dom';

import MainPage from './pages/Main';
import SecondPage from './pages/Second';
import ClassPage from './pages/Class';
import ObjPage from './pages/Obj';

export default class Entry extends React.Component {
    render (){
        return (
            <div>                
                <HashRouter>
                    <Route path="/views/class" component={ClassPage} />
                </HashRouter>
                
                <HashRouter>
                    <Route path="/views/obj" component={ObjPage} />
                </HashRouter>
            </div>
        )
    }
}