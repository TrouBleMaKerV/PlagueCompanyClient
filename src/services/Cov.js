import request from '@/utils/request';

export async function overall(params) {
    return request('/nCoV/api/area?province=%E6%B9%96%E5%8C%97%E7%9C%81&latest=true');
}