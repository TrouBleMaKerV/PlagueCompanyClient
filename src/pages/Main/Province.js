import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Scene, PolygonLayer, LineLayer } from '@antv/l7';
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
import 'echarts/map/js/province/hubei'
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
      title: '新增确诊',
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
                mapType: '湖北', // 自定义扩展图表类型
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
            text: '现存确诊',
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
                mapType: '湖北', // 自定义扩展图表类型
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
        province:"湖北省"
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
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ];
    const linePlot = new Line('canvas', {
      data,
      xField: 'year',
      yField: 'value',
    });

    linePlot.render();
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
    return (     
      <Card size='small' bordered={false}>
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
              <div style = {{height:'250px'}} id="canvas"></div>
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "累计确诊"> 
              <div style = {{height:'250px'}} id="canvas"></div>
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "治愈人数">
              <div style = {{height:'250px'}} id="canvas"></div> 
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "死亡人数">
              <div style = {{height:'250px'}} id="canvas"></div> 
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
