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
import world from 'echarts/map/json/world.json';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/toolbox'
import { history } from 'umi';

/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

class World extends PureComponent {
  state = {
  };
  columns = [
    {
      title: '城市',
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
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    echarts.registerMap('world', world);
    dispatch({
      type: 'main/world',
    });
    // const data = [
    //       {
    //     "provinceName": "湖北省",
    //     "date": "04-02",
    //     "currentCount": 1132,
    //     "confirmedCount": 67802,
    //     "suspectedCount": 0,
    //     "curedCount": 63471,
    //     "deadCount": 3199
    // },
    //         {
    //     "provinceName": "湖北省",
    //     "date": "03-31",
    //     "currentCount": 1461,
    //     "confirmedCount": 67801,
    //     "suspectedCount": 0,
    //     "curedCount": 63153,
    //     "deadCount": 3187
    // },
    // ];
    // const linePlot1 = new Line(document.getElementById('canvas1'), {
    //   data,
    //   xField: 'date',
    //   yField: 'currentCount',
    // });
    // const linePlot2 = new Line(document.getElementById('canvas2'), {
    //   data,
    //   xField: 'date',
    //   yField: 'confirmedCount',
    // });
    // const linePlot3 = new Line(document.getElementById('canvas3'), {
    //   data,
    //   xField: 'date',
    //   yField: 'curedCount',
    // });
    // const linePlot4 = new Line(document.getElementById('canvas4'), {
    //   data,
    //   xField: 'date',
    //   yField: 'deadCount',
    // });
    // dispatch({
    //   type: 'main/charts',
    //   payload: {
    //     name:"湖北省"
    //   },
    //   callback: response => {
    //     linePlot1.changeData(response);
    //     linePlot2.changeData(response);
    //     linePlot3.changeData(response);
    //     linePlot4.changeData(response);

    //   }
    // });
    // linePlot1.render();
    // linePlot2.render();
    // linePlot3.render();
    // linePlot4.render();
  }

  previewItem = text => {
    sessionStorage.setItem('name',text.provinceName);
    history.push('/Main/Country');
    // router.push({
    //   pathname:'/Entrustment/EntrustmentRecord',
    // });
  };




  render() {
    const {
      main: {world},
      loading,
    } = this.props;
    return (     
      <Card size='small' bordered={false}>
        <Row gutter={16}>
          <Col span= {6}>
            <Card title = "现存确诊"> 
              <h3 style = {{color:"#ff4d4f",'fontSize': '24px'}}>1013915</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "累计确诊"> 
              <h3 style = {{color:"#faad14",'fontSize': '24px'}}>1408641</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "治愈人数"> 
                <h3 style = {{color:"#2bfa14",'fontSize': '24px'}}>311988</h3>           
            </Card>
          </Col>
          <Col span= {6}>
            <Card title = "死亡人数"> 
                <h3 style = {{color:"rgba(0, 0, 0, 0.45)",'fontSize': '24px'}}>82738</h3>           
            </Card>
          </Col>
        </Row>
        <div>
          <Table
            size="middle"
            className={styles.antTable}
            rowClassName={styles.antTable2}
            // loading={loading}
            rowKey='provinceName'
            dataSource={world}
            columns={this.columns}
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </div>
      </Card>
    );
  }
}

export default World;
