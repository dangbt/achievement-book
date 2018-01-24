import axios from 'axios'

const baseURL = 'http://localhost:8080/api';
const defaultHeaders = [{ 'Content-Type': 'javascript/json' }]

let _helper = {
    fetchGET: function (reqURL, headers){
        return axios({
            method: 'GET',
            url: baseURL + reqURL,
            headers: headers || defaultHeaders
        })
        .then((response) => {
            return
            {
                data: response.data
                status: response.status
            }
        })
        .catch((error) => {
            if (error.response) {
                {
                    data: error.response.data
                    status: error.response.status
                }
            }
            else {
                console.log(error);
                return null;
            }
        })
    },
    fetchAPI: function (reqURL, dataToBeSent, headers, type){
        return axios({
            method: type || "POST",
            url: baseURL + reqURL,
            headers: headers || defaultHeaders,
            data: dataToBeSent,
        })
        .then((response) => {
            return 
                {
                    data: response.data
                    status: response.status
                }
        })
        .catch((error) => {
            if (error.response) {
                {
                    data: error.response.data
                    status: error.response.status
                }
            }
            else {
                console.log(error);
                return null;
            }
        })
    }
}

export {_helper}
