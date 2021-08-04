import TodoClient from './client';
import {ApiManager, container} from './index';
//Automatic mocks, which allows the use of spyOn
jest.mock('./client');

// This is because jest.mock changes type of TodoClient so we have to type cast it
// s: https://stackoverflow.com/questions/48759035/mock-dependency-in-jest-with-typescript/52366601#52366601
// const mockedClient = <jest.Mock<TodoClient>>TodoClient;
// beforeEach(() => {
//     mockedClient.mockClear();
// })

describe('The Todo Client mock HTTP requests', () => 
{
    const client = new TodoClient();
    const apiManager = container.get<ApiManager>(ApiManager);
    test("TEST: client receives a resolve from promise", async() => {
        expect(client.getData()).resolves.toBeCalled;
    });

    test("TEST: client receives a reject", async() => {
        expect(client.getData()).rejects.toMatch('error');
    });

    test("TEST: client is injected properly", () => {
        expect(apiManager.fetchData()).resolves.toBeCalled;
    });
});


