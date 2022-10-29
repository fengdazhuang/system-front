import request from '../utils/request';


export const checkLogin = (data) => {
    return request({
        url: 'http://localhost:8081/manager/login',
        method: 'post',
        params:data
    });
};