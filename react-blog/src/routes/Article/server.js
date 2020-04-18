import axios from "axios"; //导入axios
const url = {

}


export function getSidebarList() {
  return axios.get(`/api/v1/article-list`);
}


export function createLog(data) {
    return axios.post(`/api/v1/article-create`,data);
  }

export function deleteLog(id) {
return axios.delete(`/api/v1/article-delete/${id}`);
}

export function UpdateLog(id,data) {
    return axios.post(`/api/v1/article-update/${id}`,data);
}

export function getLog(id) {
    return axios.get(`/api/v1/article/${id}`);
}

export function getLogDetail(id) {
    return axios.get(`/api/v1/article?id=${id}`);
}