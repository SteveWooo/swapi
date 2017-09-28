import React from 'react';
import './style.css';

import { Layout} from 'antd';
import { Link } from 'react-router-dom';



export default class MyLayout extends React.Component {
    render() {
        return (
            <Layout>
                <div className="header">
                    <div className="logo">
                        SWAPI
                    </div>
                </div>

                <div className="body">
                    <div className="slider">
                        <div className="item">
                            <Link to={{pathname:"/views/class", query : {views:'class'} }}>
                                Class
                            </Link>
                        </div>
                        <div className="item">
                            <Link to={{pathname:"/views/obj", query : {views:'obj'} }}>
                                Object
                            </Link>
                        </div>
                    </div>

                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
                
            </Layout>
        )
    }
}