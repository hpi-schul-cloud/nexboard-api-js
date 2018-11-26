const chai = require('chai');
const chaiAsApromised = require('chai-as-promised');
const Pact = require('pact');
const Nexboard = require('../lib/index');

chai.use(chaiAsApromised);
const expect = chai.expect;

const PORT = 12345;
const URL = 'http://localhost';

describe('neXboard API', () => {

    const nexboard = new Nexboard('atZjs8AYFeTYDRhdmVuC', 658, `${URL}:${PORT}/`);

    const provider = Pact({
        port: PORT,
        provider: 'neXboard',
        consumer: 'Schul-Cloud',
    });


    // Setup the provider
    before(() => provider.setup());

    // Write Pact when all tests done
    after(() => provider.finalize());

    // verify with Pact, and reset expectations
    afterEach(() => provider.verify());


    describe('GET /projects', () => {

        const RESPONSE_BODY = [{
            id: "1",
            title: "Project 1",
            description: "This is project 1",
        }, {
            id: "2",
            title: "Project 2",
            description: "This is project 2",
        }];

        before(done => {
            const interaction = {
                state: "I have some projects",
                uponReceiving: "a request for all my projects",
                withRequest: {
                    method: "GET",
                    path: "/projects",
                    headers: {
                        Accept: "application/json"
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json"
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
    })
})