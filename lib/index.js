const DEFAULT_BASE_URL = 'https://nexboard.nexenio.com/portal/api/v1/public/';
const rp = require('request-promise');

class Nexboard {
    constructor(apiKey, userID, url) {
        this.apiKey = apiKey;
        this.user = userID;
        this.url = url ? url : DEFAULT_BASE_URL;
    }

    getProjectsIds() {
        let settings = {
            method: "GET",
            uri: this.url + "projects",
            qs: {
                "userId": this.user,
                "token": this.apiKey
            },
            json: true
        };

        return rp(settings)
            .then(res => {
                return res.map(e => {
                    return e.id;
                })
            })
            .catch(err => {
                return Promise.reject("Could not retrieve ProjectIds - " + err.error.msg);
            });
    }

    createProject(title, description) {
        let settings = {
            method: "POST",
            uri: this.url + "projects",
            qs: {
                "token": this.apiKey,
                "userId": this.user
            },
            body: {
                "title": title,
                "description": description
            },
            headers: {"Content-Type": "application/json"},
            json: true
        };

        return rp(settings)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject("Could not create new Project - " + err.error.msg);
            });
    }

    getBoardsByProject(projectId) {
        let settings = {
            method: "GET",
            uri: this.url + "projects/" + projectId + "/boards",
            qs: {
                "userId": this.user,
                "token": this.apiKey
            },
            json: true
        };

        return rp(settings)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject("Could not retrieve Boards from Projcet - " + err.error.msg);
            });
    }

    getBoard(boardId) {
        let settings = {
            method: "GET",
            uri: this.url + "boards/" + boardId,
            qs: {"token": this.apiKey},
            json: true
        };

        return rp(settings)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject("Could not retrieve Board - " + err.error.msg);
            });
    }

    createBoard(title, description, project, email) {
        let settings = {
            method: "POST",
            uri: this.url + "boards",
            qs: {"token": this.apiKey},
            body: {
                "title": title,
                "description": description,
                "email": email,
                "projectId": project
            },
            headers: {"Content-Type": "application/json"},
            json: true
        };

        return rp(settings)
            .then(res => {
                return res
            })
            .catch(err => {
               return Promise.reject("Could not create a new Board - " + err.error.msg);
            });
    }
}

module.exports = Nexboard;