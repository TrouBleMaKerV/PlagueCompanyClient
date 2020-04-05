import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { GaodeMap, AMap } from '@antv/l7-maps';
import { Scene, PolygonLayer } from '@antv/l7';
// import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Table,
} from 'antd';
import styles from './main.less';


/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

class ChinaStatistic extends PureComponent {

  // scene: Scene;
  state = {
  };

  columns = [
    {
      title: '省份',
      dataIndex: 'provinceName',
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


  componentWillUnmount() {
  }

   componentDidMount() {
    // 获取用户信息
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'main/overall',
    });



  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);

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

        <div
          id="map"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

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

export default ChinaStatistic;
