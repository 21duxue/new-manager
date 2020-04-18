import axios from "axios"; //导入axios
const url = {

}


export function getSidebarList() {
  return axios.get(`/api/v1/message-list`);
}


export function createLog(data) {
    return axios.post(`/api/v1/message-create`,data);
  }

export function deleteLog(id) {
return axios.delete(`/api/v1/message-delete/${id}`);
}

export function UpdateLog(id,data) {
    return axios.post(`/api/v1/message-update/${id}`,data);
}

export function getLog(id) {
    return axios.get(`/api/v1/message/${id}`);
}

export function getLogDetail(id) {
    return axios.get(`/api/v1/message?id=${id}`);
}