import { Container } from "inversify";
import { ApiManager } from ".";
import TodoClient from "./client";
import { IApiManager } from "./interface";
import { TYPES } from "./types";

var container = new Container();
container.bind<TodoClient>(TYPES.TodoClient).to(TodoClient);
container.bind<IApiManager>(TYPES.IApiManager).to(ApiManager);

export {container};