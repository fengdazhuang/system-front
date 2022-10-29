import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://localhost:8081/member/list',
        method: 'get',
        params: query
    });
};
export const deleteData = id => {
    return request({
        url: 'http://localhost:8081/member/delete',
        method: 'delete',
        params: {id}
    });
};

export const updateMemberData = query => {
    return request({
        url: 'http://localhost:8081/member/update',
        method: 'put',
        data: {...query}
    });
};

export const addMemberData = query => {
    return request({
        url: 'http://localhost:8081/member/add',
        method: 'post',
        data: {...query}
    });
};
