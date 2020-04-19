import axios from "axios"; //导入axios
const url = {

}


export function getSidebarList() {
  return axios.get(`/api/v1/flow-list`);
}


export function createLog(data) {
    return axios.post(`/api/v1/flow-create`,data);
  }

export function deleteLog(id) {
return axios.delete(`/api/v1/flow-delete/${id}`);
}

export function UpdateLog(id,data) {
    return axios.post(`/api/v1/flow-update/${id}`,data);
}

export function getLog(id) {
    return axios.get(`/api/v1/flow/${id}`);
}

export function getLogDetail(id) {
    return axios.get(`/api/v1/flow?id=${id}`);
}