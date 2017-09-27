# nexboard-api-js

## Useage

```javascript
Nexboard = require("./nexboard-api/Nexboard");

nex = new Nexboard(ApiKey, UserID, Url , TemplateProjectID );
```
### params 
- `ApiKey` = The identification key from account.
- `UserID` = The ID from user.
- `Url`= the URL of the API interface. If zero the value is set to [default](https://nexboard.nexenio.com/portal/api/public/)
- `TemplateProjectID` = A ID from an project, wich will use as template.

### functions
```javascript
nex.getProjectsIDs();
```
retun a list of IDs from all projects.

```javascript
nex.getBoardsByTemplate()
```
retun a list of IDs from all boards from the template project.


```javascript
nex.createProject(
    "Title of project" , 
    "description of project");
```
create an new project and return it. 

```javascript 
nex.createBoard(
    "Title of Board" , 
    "description of Board", 
    IdOfProjectFromThisBoard,
    TemplateBoardId);       // May be Null
```
create an new board and return it. 
    
```javascript
nex.getBoardsByProject(ProjectId));
```
return all boards from Project.

```javascript
nex.getBoard(BoardId));
```
return the board object from ID.