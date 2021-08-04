import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class TodoClient
{
    async getData()
    {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json();
        return data;
    }
}