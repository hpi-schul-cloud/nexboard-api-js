

const DEFAULT_BASE_URL = 'https://nexboard.nexenio.com/portal/api/public/';
const request = require('sync-request');


class Nexboard {
    constructor(apiKey , userID , url, templateProjectID ){
        this.apiKey = apiKey;
        this.user = userID;
        this.templateProjectID = templateProjectID;
        this.url =  ( url == null) ? DEFAULT_BASE_URL : url ;
    }

    getProjectsIDs(){
        var settings = {
            qs:{
                "userId" : this.user,
                "token"  : this.apiKey
            }
        };
        var res = JSON.parse(request('GET',this.url + "projects",settings).getBody("utf8"));
        return res.map(function (element) {
            return element.project_id;
        }) ;
    }
    createProject(title, description){
        var settings = {
                qs:{"token" : this.apiKey},
                json:{
                    "title":title,
                    "description" : description,
                    "user_id" : this.user
                },
                headers:{"Content-Type":"application/json"}
            };
        var res = JSON.parse(request("POST", this.url + "projects",settings).getBody("utf8"));
        return res;

    }
    getBoardsByProject(project){
        var settings = {
            qs:{
                "userId" : this.user,
                "token"  : this.apiKey
            }
        };

        var res = JSON.parse(request('GET',this.url + "projects/"+project+"/boards",settings).getBody('utf8'));
        return res;
    }

    getBoardsByTemplate(){
        if (this.templateProjectID == null) return [];
        var res = this.getBoardsByProject(this.templateProjectID);
        return res.map(function (element) {
            return element.boardId;
        }) ;
    }
    getBoard(boardID){
        var settings = {
            qs:{ "token" : this.apiKey}
        };
        var res = JSON.parse(request('GET', this.url + "boards/"+boardID,settings ).getBody('utf8'));
        return res;
    }
    createBoard(title,description,project, templateID){
        var setting = {
            qs:{"token" : this.apiKey},
            json:{
                "title":title,
                "description" : description,
                "user_id" : this.user,
                "project_id": project
            },
            headers:{"Content-Type":"application/json"}
        };
        if (templateID != null) setting.json.template_id = templateID;

        var res = JSON.parse(request("POST", this.url + "boards",setting).getBody('utf8'));
        return res;
    }
}
module.exports = Nexboard;