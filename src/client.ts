import { injectable } from "inversify";

@injectable()
export class TodoClient
{
    async getData()
    {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json();
        console.log(data);
        return data;
    }
}