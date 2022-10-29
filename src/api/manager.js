import request from '../utils/request';


export const fetchManagerData = query => {
    return request({
        url: 'http://localhost:8081/manager/list',
        method: 'get',
        params: query
    });
};

export const updateManagerData = query => {
    return request({
        url: 'http://localhost:8081/manager/update',
        method: 'put',
        data: {...query}
    });
};

export const addManagerData = query => {
    return request({
        url: 'http://localhost:8081/manager/add',
        method: 'post',
        data: {...query}
    });
};

export const deleteManagerData = id => {
    return request({
        url: 'http://localhost:8081/manager/delete',
        method: 'delete',
        params: {id}
    });
};