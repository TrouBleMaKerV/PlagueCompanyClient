import request from '@/utils/request';


// 获取中国整体信息 当前确诊，累计确诊。。。
export async function chinaSummary() {
  const req=request('/province/buildFourDataInfo?name=中国')
  console.log(req)
  return req;
}
// 获取省份具体信息
export async function provinces() {
  const req=request('/province/buildChinaInfo')
  console.log('provinces success')
  console.log(req)

  return req;
}
// 获取折线图数据
export async function lineData() {
  return request('/province/buildProvinceInfo?name=中国');
}
