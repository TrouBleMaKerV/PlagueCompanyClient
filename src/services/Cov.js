import request from '@/utils/request';

export async function overall(params) {
    return request(`/nCoV/api/area?province=${params.province}&latest=true`);
}

export async function news(params) {
    return request('/nCoV/api/news?page=1&num=50');
}

export async function rumors(params) {
    return request('/nCoV/api/rumors?page=1&num=50');
}

export async function charts(params) {
    return request(`/province/buildProvinceInfo?name=${params.name}`);
}

export async function world(params) {
    return request(`/province/buildForeignInfo`);
}

export async function foroeignCharts(params) {
    return request(`/province/buildProvinceInfo?name=${params.name}`);
}

export async function fourDataInfo(params) {
    return request(`/province/buildFourDataInfo?name=${params.name}`);
}