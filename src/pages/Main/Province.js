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

const { Title } = Typography;

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
    dispatch({
      type: 'main/overall',
    });
    const scene = new Scene({
      id: "map",
      map: new Mapbox({
        pitch: 0,
        style: "light",
        center: [ 107.042225, 37.66565 ],
        zoom: 3
      })
    });
    scene.on('loaded', () => {
      fetch('https://gw.alipayobjects.com/os/rmsportal/JToMOWvicvJOISZFCkEI.json')
        .then(res => res.json())
        .then(data => {
          const colors = [
            '#D7F9F0',
            '#A6E1E0',
            '#72BED6',
            '#5B8FF9',
            '#3474DB',
            '#005CBE',
            '#00419F',
            '#00287E'
          ];
          const layer = new PolygonLayer({})
            .source(data)
            .color('name', colors)
            .shape('fill')
            .active(true)
            .style({
              opacity: 0.9
            });

          const layer2 = new LineLayer({
            zIndex: 2
          })
            .source(data)
            .color('#fff')
            .size(0.3)
            .style({
              opacity: 1
            });

          scene.addLayer(layer);
          scene.addLayer(layer2);
        });
    });
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
    console.log(data);
    return (     
      <Card size='small' bordered={false}>
        <Row gutter={16}>
          <Col span= {6}>
            <Card title = "现存确诊"> 
              <h3 style = {{color:"#ff4d4f",'font-size': '24px'}}>{data.currentConfirmedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "累计确诊"> 
              <h3 style = {{color:"#faad14",'font-size': '24px'}}>{data.confirmedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "治愈人数"> 
                <h3 style = {{color:"#2bfa14",'font-size': '24px'}}>{data.curedCount}</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "死亡人数"> 
                <h3 style = {{color:"rgba(0, 0, 0, 0.45)",'font-size': '24px'}}>{data.curedCount}</h3>           
            </Card>
          </Col>
        </Row>
        <div style = {{height:'500px'}} id="map"/>
        <div>
          <Table
            size="middle"
            className={styles.antTable}
            rowClassName={styles.antTable2}
            loading={loading}
            rowKey='reportno'
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
