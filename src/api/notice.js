import request from '../utils/request';


export const fetchNoticeData = query => {
    return request({
        url: 'http://localhost:8081/notice/list',
        method: 'get',
        params: query
    });
};

export const deleteAll = ids => {
    return request({
        url: 'http://localhost:8081/notice/deleteAll',
        method: 'delete',
        params: {ids}
    });
};

export const saveNotice = params => {
    return request({
        url: 'http://localhost:8081/notice/saveNotice',
        method: 'post',
        data: {...params}
    });
};

export const fetchAllMember = () => {
    return request({
        url: 'http://localhost:8081/member/getAllMembers',
        method: 'get',
    });
};

export const postNotice = params => {
    return request({
        url: 'http://localhost:8081/notice/postNotice',
        method: 'post',
        data: params
    });
};

