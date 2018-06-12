const expect = require('chai').expect;
const Nexboard = require('../lib/index');

describe('Nexboard JS Wrapper', () => {

    const NexboardTest = new Nexboard("atZjs8AYFeTYDRhdmVuC", 658);

    it('Should get projectIds', () => {
        NexboardTest.getProjectsIds()
            .then(res => {
                expect(res).to.be.an('array').that.is.not.empty;
            });
    });

    it('Should create a project', () => {
        NexboardTest.createProject("Test", "Test")
            .then(res => {
                expect(res).to.be.not.null;
            });
    });

    it('Should get a Board with projectId', () => {
        NexboardTest.getBoardsByProject(1013)
            .then(res => {
                expect(res).to.be.an('array');
                expect(res).to.be.not.null;
            })
    });

    it('Should get a Board by id', () => {
        NexboardTest.getBoard(4862)
            .then(res => {
               expect(res).to.be.not.null;
               expect(res.id).to.equal(4862);
            });
    });

    it('Should not be able to create a new Board', () => {
        NexboardTest.createBoard("Test", "Test", 1014)
            .catch(err => {
                expect(err.message).to.have.string("Could not create a new Board");
            })
    });
});