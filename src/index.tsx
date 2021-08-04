import React from "react";
import ReactDOM from "react-dom";
import {IApiManager} from "./interface";
import {injectable, inject, Container} from "inversify";
import "reflect-metadata";
import { TodoClient } from "./client";

@injectable()
class ApiManager implements IApiManager
{
    private readonly _client: TodoClient;
    _fetchedJSONString: string;

    public constructor(@inject(TodoClient) client: TodoClient)
    {
        this._fetchedJSONString = '';
        this._client = client;
    }

    fetchData() : string
    {
        this._client.getData()
            .then(data => {
                this._fetchedJSONString = JSON.stringify(data);
                console.log(this._fetchedJSONString);
            });
        return this._fetchedJSONString;
    }

}

var container = new Container();
container.bind<TodoClient>(TodoClient).to(TodoClient);
container.bind<ApiManager>(ApiManager).to(ApiManager);

//React
interface IProps
{
}

interface IState
{
}

class App extends React.Component<IProps, IState>
{
    _apiManager: ApiManager;
    _todoClient: TodoClient;
    _fetchedData: string;
    constructor(props: IProps)
    {
        super(props);
        this._todoClient = new TodoClient();
        this._apiManager = new ApiManager(this._todoClient);
        this._fetchedData = '';
    }

    componentDidMount()
    {
        this._fetchedData = this._apiManager.fetchData();
    }

    render()
    {
        return(
            <div>
                {this._fetchedData}
                test
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));