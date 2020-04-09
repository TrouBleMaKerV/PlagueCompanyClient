import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Mapbox } from '@antv/l7-maps';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table,
  Typography
} from 'antd';
//import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './main.less';
import moment from 'moment';
import { Line } from '@antv/g2plot';
const { Title } = Typography;
import echarts from 'echarts/lib/echarts'
import 'echarts/map/js/province/anhui'
import 'echarts/map/js/province/aomen'
import 'echarts/map/js/province/beijing'
import 'echarts/map/js/province/chongqing'
import 'echarts/map/js/province/fujian'
import 'echarts/map/js/province/gansu'
import 'echarts/map/js/province/guangdong'
import 'echarts/map/js/province/guangxi'
import 'echarts/map/js/province/guizhou'
import 'echarts/map/js/province/anhui'
import 'echarts/map/js/province/hainan'
import 'echarts/map/js/province/hebei'
import 'echarts/map/js/province/heilongjiang'
import 'echarts/map/js/province/henan'
import 'echarts/map/js/province/hubei'
import 'echarts/map/js/province/hunan'
import 'echarts/map/js/province/jiangsu'
import 'echarts/map/js/province/jiangxi'
import 'echarts/map/js/province/jilin'
import 'echarts/map/js/province/liaoning'
import 'echarts/map/js/province/neimenggu'
import 'echarts/map/js/province/ningxia'
import 'echarts/map/js/province/qinghai'
import 'echarts/map/js/province/shandong'
import 'echarts/map/js/province/shanghai'
import 'echarts/map/js/province/shanxi'
import 'echarts/map/js/province/sichuan'
import 'echarts/map/js/province/taiwan'
import 'echarts/map/js/province/tianjin'
import 'echarts/map/js/province/xianggang'
import 'echarts/map/js/province/xinjiang'
import 'echarts/map/js/province/xizang'
import 'echarts/map/js/province/yunnan'
import 'echarts/map/js/province/zhejiang'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/toolbox'

/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

class Province extends PureComponent {
  state = {
  };
  columns = [
    {
      title: '城市',
      dataIndex: 'cityName',
    },
    {
      title: '现存确诊',
      dataIndex: 'currentConfirmedCount',
    },
    {
      title: '总共确诊',
      dataIndex: 'confirmedCount',
    },
    {
      title: '疑似确诊',
      dataIndex: 'suspectedCount',
    },
    {
      title: '治愈人数',
      dataIndex: 'curedCount',
    },
    {
      title: '死亡人数',
      dataIndex: 'deadCount',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>详情</a>
        </Fragment>
      ),
    },
  ];
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const name = sessionStorage.getItem('provinceName')
    const mapName = name.substring(0,2);
    let myChart = echarts.init(document.getElementById("map"));
    var option = {
        title: {
            text: '现存确诊',
        },
        tooltip: {
        },
        visualMap: {
            min: 0,
            max: 574,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
                name: '疫情地图',
                type: 'map',
                mapType: mapName, // 自定义扩展图表类型
                label: {
                    show: true
                },
                data: [],
                // 自定义名称映射
            },
        ]
    }
    let myChart1 = echarts.init(document.getElementById("map1"));
    var option1 = {
        title: {
            text: '累计确诊',
        },
        tooltip: {
        },
        visualMap: {
            min: 11,
            max: 50008,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
                name: '疫情地图',
                type: 'map',
                mapType: mapName, // 自定义扩展图表类型
                label: {
                    show: true
                },
                data: [],
                // 自定义名称映射
            },
        ]
    }
    dispatch({
      type: 'main/overall',
      payload: {
        province:name
      },
      callback: response => {
        for (var city in response.cities) {
          var object = {
            name:response.cities[city].cityName,
            value:response.cities[city].currentConfirmedCount,
          };
          var object2 = {
            name:response.cities[city].cityName,
            value:response.cities[city].confirmedCount,
          };
          option.series[0].data.push(object);
          option1.series[0].data.push(object2);
        }
        myChart.setOption(option);
        myChart1.setOption(option1);
      }
    });
    const data = [
          {
        "provinceName": "湖北省",
        "date": "04-02",
        "currentCount": 1132,
        "confirmedCount": 67802,
        "suspectedCount": 0,
        "curedCount": 63471,
        "deadCount": 3199
    },
            {
        "provinceName": "湖北省",
        "date": "03-31",
        "currentCount": 1461,
        "confirmedCount": 67801,
        "suspectedCount": 0,
        "curedCount": 63153,
        "deadCount": 3187
    },
    ];
    const linePlot1 = new Line(document.getElementById('canvas1'), {
      data,
      xField: 'date',
      yField: 'currentCount',
    });
    const linePlot2 = new Line(document.getElementById('canvas2'), {
      data,
      xField: 'date',
      yField: 'confirmedCount',
    });
    const linePlot3 = new Line(document.getElementById('canvas3'), {
      data,
      xField: 'date',
      yField: 'curedCount',
    });
    const linePlot4 = new Line(document.getElementById('canvas4'), {
      data,
      xField: 'date',
      yField: 'deadCount',
    });
    dispatch({
      type: 'main/charts',
      payload: {
        name:name
      },
      callback: response => {
        linePlot1.changeData(response);
        linePlot2.changeData(response);
        linePlot3.changeData(response);
        linePlot4.changeData(response);

      }
    });
    linePlot1.render();
    linePlot2.render();
    linePlot3.render();
    linePlot4.render();
  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    // router.push({
    //   pathname:'/Entrustment/EntrustmentRecord',
    // });
  };




  render() {
    const {
      main: {data},
      loading,
    } = this.props;
        const name = sessionStorage.getItem('provinceName')
    return (     
      <Card bordered={false} title={name}>
        <Row gutter={16}>
          <Col span= {6}>
            <Card title = "现存确诊"> 
              <h3 style = {{color:"#ff4d4f",'fontSize': '24px'}}>{data.currentConfirmedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "累计确诊"> 
              <h3 style = {{color:"#faad14",'fontSize': '24px'}}>{data.confirmedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "治愈人数"> 
                <h3 style = {{color:"#2bfa14",'fontSize': '24px'}}>{data.curedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "死亡人数"> 
                <h3 style = {{color:"rgba(0, 0, 0, 0.45)",'fontSize': '24px'}}>{data.deadCount}</h3>           
            </Card>
          </Col>
        </Row>
        <div style = {{height:'500px'}} id="map"/>
        <div style = {{height:'500px'}} id="map1"/>
        <Row gutter={16}>
          <Col span= {6}>
            <Card title = "现存确诊">
              <div style = {{height:'250px'}} id="canvas1"></div>
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "累计确诊"> 
              <div style = {{height:'250px'}} id="canvas2"></div>
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "治愈人数">
              <div style = {{height:'250px'}} id="canvas3"></div> 
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "死亡人数">
              <div style = {{height:'250px'}} id="canvas4"></div> 
            </Card>
          </Col>
        </Row>
        <div>
          <Table
            size="middle"
            className={styles.antTable}
            rowClassName={styles.antTable2}
            loading={loading}
            rowKey='cityName'
            dataSource={data.cities}
            columns={this.columns}
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </div>
      </Card>
    );
  }
}

export default Province;
