const chai = require('chai');
const chaiAsApromised = require('chai-as-promised');
const Pact = require('pact');
const Nexboard = require('../lib/index');

chai.use(chaiAsApromised);
const expect = chai.expect;

const PORT = 12345;
const URL = 'http://localhost';

const PROJECT1_ID = '__project1_id__';
const PROJECT2_ID = '__project2_id__';
const BOARD1_ID = '__board1_id__';
const BOARD2_ID = '__board1_id__';

describe('neXboard API', () => {

    const nexboard = new Nexboard('atZjs8AYFeTYDRhdmVuC', 658, `${URL}:${PORT}/`);

    const provider = Pact({
        port: PORT,
        provider: 'neXboard',
        consumer: 'dBildungscloud Team',
    });


    // Setup the provider
    before(() => provider.setup());

    // Write Pact when all tests done
    after(() => provider.finalize());

    // verify with Pact, and reset expectations
    afterEach(() => provider.verify());


    describe('GET /projects', () => {

        const RESPONSE_BODY = [{
            id: PROJECT1_ID,
            title: 'Project 1',
            description: 'This is project 1',
        }, {
            id: PROJECT2_ID,
            title: 'Project 2',
            description: 'This is project 2',
        }];

        before(done => {
            const interaction = {
                state: 'I have some projects',
                uponReceiving: 'a request for all my projects',
                withRequest: {
                    method: 'GET',
                    path: '/projects',
                    headers: {
                        Accept: 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: RESPONSE_BODY
                }
            };
            provider.addInteraction(interaction).then(() => done());
        });

        it('should return a list of projects', () => {
            const myProjects = nexboard.getProjectsIds()
            const expectedIds = RESPONSE_BODY.map(i => i.id)

            return expect(myProjects).to.eventually.eql(expectedIds);
        })
    });

    describe('POST /projects', () => {

        const PROJECT_TITLE = 'Project';
        const PROJECT_DESC = 'This is a project'
        const RESPONSE_BODY = {
            title: PROJECT_TITLE,
            description: PROJECT_DESC,
        };

        before(done => {
            const interaction = {
                state: 'I have some projects',
                uponReceiving: 'a request to create a project',
                withRequest: {
                    method: 'POST',
                    path: '/projects',
                    headers: {
                        Accept: 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: RESPONSE_BODY
                }
            };
            provider.addInteraction(interaction).then(() => done());
        });

        it('should create a project', () => {
            const myProjects = nexboard.createProject(PROJECT_TITLE, PROJECT_DESC);

            return expect(myProjects).to.eventually.eql(RESPONSE_BODY);
        })
    });

    describe('GET /projects/:id/boards', () => {

        const RESPONSE_BODY = [{
            id: BOARD1_ID,
            title: 'Board 1',
            description: 'This is Board 1',
            projectId: PROJECT1_ID,
        }, {
            id: BOARD2_ID,
            title: 'Board 2',
            description: 'This is Board 2',
            projectId: PROJECT1_ID,
        }];

        before(done => {
            const interaction = {
                state: 'I have some boards in my project',
                uponReceiving: 'a request for all Boards of my projects',
                withRequest: {
                  method: 'GET',
                  path: `/projects/${PROJECT1_ID}/boards`,
                  headers: {
                      Accept: 'application/json'
                  }
              },
              willRespondWith: {
                  status: 200,
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: RESPONSE_BODY
              }
            };
            provider.addInteraction(interaction).then(() => done());
        });

        it('should return a list of projects', () => {
            const myProjects = nexboard.getBoardsByProject(PROJECT1_ID);

            return expect(myProjects).to.eventually.eql(RESPONSE_BODY);
        })
    });

    describe('GET /boards/:id', () => {

        const RESPONSE_BODY = {
            id: BOARD1_ID,
            title: 'Board 1',
            description: 'This is Board 1',
            projectId: PROJECT1_ID,
        };

        before(done => {
            const interaction = {
                state: 'I have a board',
                uponReceiving: 'a request for board by id',
                withRequest: {
                    method: 'GET',
                    path: `/boards/${BOARD1_ID}`,
                    headers: {
                        Accept: 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: RESPONSE_BODY
                }
            };
            provider.addInteraction(interaction).then(() => done());
        });

        it('should return a board', () => {
            const myBoard = nexboard.getBoard(BOARD1_ID);

            return expect(myBoard).to.eventually.eql(RESPONSE_BODY);
        })
    });
});