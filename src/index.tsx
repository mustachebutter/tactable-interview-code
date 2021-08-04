import React from "react";
import ReactDOM from "react-dom";
import {IApiManager} from "./interface";
import {injectable, inject} from "inversify";
import "reflect-metadata";


class ApiManager implements IApiManager
{
    constructor()
    {

    }

    fetchData() {
        
    }

}

//React
interface IProps
{

}

interface IState
{
    fetchedJSONString : string,
}

class App extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
        this.state = 
        {
            fetchedJSONString: ''
        }
    }

    async fetchData()
    {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json();
        return data;
    }

    componentDidMount()
    {
        this.fetchData()
        .then(data => {
            this.setState({fetchedJSONString: JSON.stringify(data)});
            console.log(data);
        });
    }

    render()
    {
        return(
            <div>
                {this.state.fetchedJSONString}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));