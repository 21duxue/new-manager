import axios from "axios"; //导入axios
const url = {

}


export function getSidebarList() {
  return axios.get(`/api/v1/grow-list`);
}


export function createLog(data) {
    return axios.post(`/api/v1/grow-create`,data);
  }

export function deleteLog(id) {
return axios.delete(`/api/v1/grow-delete/${id}`);
}

export function UpdateLog(id,data) {
    return axios.post(`/api/v1/grow-update/${id}`,data);
}

export function getLog(id) {
    return axios.get(`/api/v1/grow/${id}`);
}

export function getLogDetail(id) {
    return axios.get(`/api/v1/grow?id=${id}`);
}