import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import { routerRedux} from 'dva/router'
// import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Table,
} from 'antd';
import styles from './main.less';
import {LineLayer, PolygonLayer, Scene} from "@antv/l7";
import {Mapbox} from "@antv/l7-maps";
import {Line} from "@antv/g2plot";


/* eslint react/no-multi-comp:0 */
@connect(({ main, loading ,chinaData }) => ({
  main,
  loading: loading.models.main,
  chinaData,

}))

class ChinaStatistic extends PureComponent {

  state = {
  };

  // 表格表头
  columns = [
    {
      title: '省份',
      dataIndex: 'provinceName',
    },
    {
      title: '现存确诊',
      dataIndex: 'currentCount',
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
    // 获取用户信息
    const user = JSON.parse(localStorage.getItem("userinfo"));

    const { dispatch } = this.props;
    dispatch({
      type: 'chinaData/fetchChina',
    });
     dispatch({
       type: 'chinaData/fetchProvinces',
     });
     dispatch({
       type: 'chinaData/fetchLine',
     });

     console.log(this.props)
     const {provinces, line}=this.props.chinaData;
    // 渲染地图
    //  const scene = new Scene({
    //    id: "map",
    //    map: new Mapbox({
    //      pitch: 0,
    //      style: "light",
    //      center: [ 107.042225, 37.66565 ],
    //      zoom: 3
    //    })
    //  });
    //  scene.on('loaded', () => {
    //    fetch('https://gw.alipayobjects.com/os/rmsportal/JToMOWvicvJOISZFCkEI.json')
    //      .then(res => res.json())
    //      .then(data => {
    //        const colors = [
    //          '#D7F9F0',
    //          '#A6E1E0',
    //          '#72BED6',
    //          '#5B8FF9',
    //          '#3474DB',
    //          '#005CBE',
    //          '#00419F',
    //          '#00287E'
    //        ];
    //        const layer = new PolygonLayer({})
    //          .source(data)
    //          .color('name', colors)
    //          .shape('fill')
    //          .active(true)
    //          .style({
    //            opacity: 0.9
    //          });
    //
    //        const layer2 = new LineLayer({
    //          zIndex: 2
    //        })
    //          .source(data)
    //          .color('#fff')
    //          .size(0.3)
    //          .style({
    //            opacity: 1
    //          });
    //
    //        scene.addLayer(layer);
    //        scene.addLayer(layer2);
    //      });
    //  });

     // 渲染折线图
     const currentPlot = new Line('currentLine', {
       line,
       xField: 'date',
       yField: 'currentCount',
     });
     currentPlot.render();


  }

  previewItem = text => {
    console.log(text.provinceName)
    sessionStorage.setItem('provinceName',text.provinceName);
    // 跳转到省份页面
    // this.props.dispatch(routerRedux.push(''));

  };




  render() {
    const {
      china,
      provinces,
    } = this.props.chinaData;
    console.log(this.props)
    return (
      <Card  bordered={false} title='全国疫情'>
        <Card><Row gutter={16}>
          <Col span= {6}>
            <Card title = "现存确诊">
              <h3 style = {{color:"#ff4d4f",'font-size': '24px'}}>{china}</h3>
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "累计确诊">
              <h3 style = {{color:"#faad14",'font-size': '24px'}}>{china}</h3>
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "治愈人数">
              <h3 style = {{color:"#2bfa14",'font-size': '24px'}}>{china}</h3>
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "死亡人数">
              <h3 style = {{color:"rgba(0, 0, 0, 0.45)",'font-size': '24px'}}>{china}</h3>
            </Card>
          </Col>
        </Row></Card>
        <Card><div
          id="map"
          style={{
            height:'500px',
          }}
        /></Card>
        <Card>
          <Row gutter={16}>
            <Col span= {6}>
              <Card title = "现存确诊">
                <div style = {{height:'250px'}} id="currentLine"></div>
              </Card>
            </Col>
            <Col span= {6}>
              <Card title = "累计确诊">
                <div style = {{height:'250px'}} id="addupLine"></div>
              </Card>
            </Col>
            <Col span= {6}>
              <Card title = "治愈人数">
                <div style = {{height:'250px'}} id="curedLine"></div>
              </Card>
            </Col>
            <Col span= {6}>
              <Card title = "死亡人数">
                <div style = {{height:'250px'}} id="deathLine"></div>
              </Card>
            </Col>
          </Row>
        </Card>
        <Card><div>
          <Table
            size="middle"
            className={styles.antTable}
            rowClassName={styles.antTable2}
            rowKey='provinceName'
            dataSource={provinces}
            columns={this.columns}
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </div></Card>
      </Card>
    );
  }
}

export default ChinaStatistic;
