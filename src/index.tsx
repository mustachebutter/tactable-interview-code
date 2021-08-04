import React from "react";
import ReactDOM from "react-dom";
import {IApiManager} from "./interface";
import {injectable, inject} from "inversify";
import "reflect-metadata";
import TodoClient from "./client";
import { TYPES } from "./types";

@injectable()
export class ApiManager implements IApiManager
{
    private readonly _client: TodoClient;
    //Variable to store the retrieved JSON as a string
    _fetchedJSONString: string;

    public constructor(@inject(TYPES.TodoClient) client: TodoClient)
    {
        this._fetchedJSONString = '';
        this._client = client;
    }

    public fetchData() : string
    {
        //Use client method to make REST call
        this._client.getData()
            .then(data => {
                this._fetchedJSONString = JSON.stringify(data);
                //DEBUG only
                //console.log(this._fetchedJSONString);
            });

        //Return a message for testing purposes.
        return "success";
    }

}

//React stuffs, only use to render out fetched data, but since it's asynchronous, nothing is rendered for now
//Everything under this is not necessary.
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