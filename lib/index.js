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
                return Promise.reject(new Error("Could not retrieve ProjectIds"));
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
                return Promise.reject(new Error("Could not create new Project"));
            });
    }

    getBoardsByProject(project) {
        let settings = {
            method: "GET",
            uri: this.url + "projects/" + project + "/boards",
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
                return Promise.reject(new Error("Could not retrieve Boards from Projcet"));
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
                return Promise.reject(new Error("Could not retrieve Board"));
            });
    }

    createBoard(title, description, project) {
        let settings = {
            method: "POST",
            uri: this.url + "boards",
            qs: {"token": this.apiKey},
            json: {
                "title": title,
                "description": description,
                "project_id": project
            },
            headers: {"Content-Type": "application/json"},
            json: true
        };

        return rp(settings)
            .then(res => {
                return res
            })
            .catch(err => {
               return Promise.reject(new Error("Could not create a new Board"));
            });
    }
}

module.exports = Nexboard;