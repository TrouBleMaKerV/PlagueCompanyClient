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
import 'echarts/map/js/province/hubei'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/toolbox'

/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

class Country extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const name = sessionStorage.getItem('name')
    dispatch({
      type: 'main/fourDataInfo',
      payload: {
        name,
      },
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
    console.log(name);
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
      type: 'main/foroeignCharts',
      payload: {
        name,
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




  render() {
    const {
      main: {four},
      loading,
    } = this.props;
    const name = sessionStorage.getItem('name');
    return (     
      <Card bordered={false} title={name}>
        <Row gutter={16}>
          <Col span= {6}>
            <Card title = "现存确诊"> 
              <h3 style = {{color:"#ff4d4f",'fontSize': '24px'}}>{four.currentCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "累计确诊"> 
              <h3 style = {{color:"#faad14",'fontSize': '24px'}}>{four.confirmedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "治愈人数"> 
                <h3 style = {{color:"#2bfa14",'fontSize': '24px'}}>{four.curedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "死亡人数"> 
                <h3 style = {{color:"rgba(0, 0, 0, 0.45)",'fontSize': '24px'}}>{four.deadCount}</h3>           
            </Card>
          </Col>
        </Row>
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
      </Card>
    );
  }
}

export default Country;
