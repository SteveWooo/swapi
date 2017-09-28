import React from 'react';
import MyLayout from '../../components/Layout';
import './style.css';

import config from '../../config.json'

export default class ClassPage extends React.Component {

    componentWillMount () {
        this.setState({
            classData : []
        })
    }

    componentDidMount() {
        fetch(config.baseUrl + "/class/read").then((res)=>{
            return res.json();
        }).then((data)=>{
            this.setState({
                classData : data
            })
        }).catch(()=>{
            console.error(arguments[1]);
        })
    }

    render() {
        return (
            <MyLayout>
                <div className="class-header">
                    <button type="primary">
                        新建类
                    </button>
                </div>

                <div className="list">
                    <div className="title">
                        <div>
                            类名
                        </div>
                        <div>
                            属性集合
                        </div>
                    </div>
                    {
                        this.state.classData.map((data)=>{
                            return (
                                <div key={data.classname} className="item">
                                    <div>
                                        {data.classname}
                                    </div>
                                    <div>
                                        {data.prop}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </MyLayout>
        )
    }
}