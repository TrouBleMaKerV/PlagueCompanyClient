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
import logo from './logo.jpeg'

/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

class News extends PureComponent {
  state = {
  };


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'main/news',
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
      main: {news},
      loading,
    } = this.props;
    const ListContent = ({ data: { infoSource, pubDate,} }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>来源</span>
          <p>{infoSource}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>发布时间</span>
          <p>{moment(Date(pubDate)).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
      </div>
    );
    return (
      <div className={styles.standardList}>     
        <Card size='small' bordered={false}  className={styles.listCard}>
          <List
            size="large"
            rowKey="title"
            loading={loading}
            pagination={{showQuickJumper:true,showSizeChanger:true}}
            dataSource={news}
            renderItem={item => (
              <List.Item
                actions={[
                  <a href={item.sourceUrl}>
                    详情
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={logo} shape="square" size="large" />}
                  title={<a href={item.sourceUrl}>{item.title}</a>}
                  description={item.summary}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

export default News;
