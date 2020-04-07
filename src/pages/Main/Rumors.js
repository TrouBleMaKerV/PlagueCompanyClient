import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import {
   List,
   Card,
   Progress,
   Avatar
} from 'antd';
//import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './News.less';
import moment from 'moment';
import logo from './rumor.jpeg'
/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

class Rumors extends PureComponent {
  state = {
  };


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'main/rumors',
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
      main: {rumors},
      loading,
    } = this.props;
    return (     
      <Card size='small' bordered={false}>
        <div>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={{showQuickJumper:true,showSizeChanger:true}}
            dataSource={rumors}
            renderItem={item => (
              <List.Item
                // actions={[
                //   <a href={item.sourceUrl}>
                //     详情
                //   </a>,
                // ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={logo} shape="square" size="large" />}
                  title={<a href={item.sourceUrl}>{item.title}</a>}
                  description={item.mainSummary +"\n\r"+item.body}
                />
              </List.Item>
            )}
          />
        </div>
      </Card>
    );
  }
}

export default Rumors;
