import axios from "axios"; //导入axios


export function getArticleList() {
    return axios.get(`/api/v1/article-list`);
  }

export function getGrowList() {
return axios.get(`/api/v1/grow-list`);
}

export function getMessageList() {
    return axios.get(`/api/v1/message-list`);
}

