import { IApiManager } from "./interface";
import { container } from "./inversify.config";
import { TYPES } from "./types";
import {injectable, inject} from "inversify";
import "reflect-metadata";

const apiManager = container.get<IApiManager>(TYPES.IApiManager);

//Test currently failed because there was a problem with Babel and Inversify injection decorator in constructor (@inject) in which I wasn't able to fix here for Jest
//The problem might come from the fact that I chose to create a React app for this project, it would have been less of a problem if I chose to use TypeScript purely
//Therefore, I can't fix this problem for unit testing purposes. 
//However, injection should work perfectly fine in index.tsx, I was able to retrieve the fetched data and print it out with console.log
//The test here also follows the examples from Inversify official documentation.
it("should inject dependency properly", () => {
    expect(apiManager.fetchData()).toEqual("success");
});