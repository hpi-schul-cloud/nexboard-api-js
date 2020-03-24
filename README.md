# nexboard-api-js

## Usage

```javascript
Nexboard = require("nexboard-api-js");

nex = new Nexboard(ApiKey, UserID, Url);
```
### params 
- `ApiKey` = The identification key from account.
- `UserId` = The Id from user.
- `Url`= the URL of the API interface. If zero the value is set to [default](https://nexboard.nexenio.com/portal/api/v1/public/)

### functions
```javascript
nex.getProjectsIds();
```
return a list of IDs from all projects.


```javascript
nex.createProject(
    "Title of project" , 
    "description of project");
```
create a new project and return it. 

```javascript 
nex.createBoard(
    "Title of Board" , 
    "description of Board", 
    IdOfProjectFromThisBoard);
```
create a new board and return it. 
    
```javascript
nex.getBoardsByProject(ProjectId));
```
return all boards from project.

```javascript
nex.getBoard(BoardId));
```
return the board object from ID.

## Test
We are using contract tests with [pact-js](https://github.com/pact-foundation/pact-js) to ensure this module is compatible with the latest version of the neXboard API.
Run `npm run create-pacts` to verify compatibility and create pacts.
This will override `pacts/schul-cloud-nexboard.json` with the newest contracts.
These generated contracts will also be used in neXboard to verify new deployments don't break this dependency.
