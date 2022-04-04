const chai = require('chai');
const chaiAsApromised = require('chai-as-promised');
const Nexboard = require('../lib/index');

chai.use(chaiAsApromised);
const expect = chai.expect;


describe('Nexboard JS Wrapper', () => {

    const NexboardTest = new Nexboard("atZjs8AYFeTYDRhdmVuC", 658);

    it('Should get projectIds', () => {
        return expect(NexboardTest.getProjectsIds()).to.eventually.be.an('array').that.is.not.empty;
    });

    it('Should create a project', () => {
        return expect(NexboardTest.createProject("Test", "Test")).to.eventually.be.not.null;
    });

    it('Should get a Board with projectId', () => {
        return expect(NexboardTest.getBoardsByProject(1013)).to.eventually.be.an('array').that.is.not.null;
    });

    it('Should get a Board by id', () => {
        const boardById = NexboardTest.getBoard(4862)

        return Promise.all([
            expect(boardById).to.eventually.be.not.null,
            expect(boardById).to.eventually.have.property('id').that.is.eq(4862),
        ]);
    });

});