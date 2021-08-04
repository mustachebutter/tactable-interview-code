import TodoClient from './client';

//Automatic mocks, which allows the use of spyOn
jest.mock('./client');

// This is because jest.mock changes type of TodoClient so we have to type cast it
// I figure this isn't very necessary for this project
// s: https://stackoverflow.com/questions/48759035/mock-dependency-in-jest-with-typescript/52366601#52366601
// const mockedClient = <jest.Mock<TodoClient>>TodoClient;
// beforeEach(() => {
//     mockedClient.mockClear();
// })

describe('The Todo Client tests', () => 
{
    const client = new TodoClient();

    it("should mock HTTP call for client", async() => {
        const data = client.getData();
        expect(client.getData).toHaveBeenCalled();
    });

});


