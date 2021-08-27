/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import React from 'react'
import { Spin, Row, Col, Button, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import microApp from '@micro-zoe/micro-app'
import config from '../../config'
import './react16.less'

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

export default class App extends React.Component {
  state = {
    data: {
      name: '初始化数据'
    },
    name: 'react16',
    url: `${config.react16}micro-app/react16?a=1`,
    // url: 'http://127.0.0.1:8080/micro-app/react16',
    showLoading: true,
    showMicroApp: true,
    testNum: 0,
    modal1: false,
  }

  handleCreated = () => {
    console.log('生命周期：created')
  }

  beforemount = (e) => {
    console.log('生命周期：beforemount', e)
  }

  mounted = () => {
    console.log('生命周期：mounted', document.querySelector('micro-app'))
    this.setState({
      showLoading: false
    })
  }

  unmount = () => {
    console.log('生命周期：unmount', document.querySelector('#template-style'))
  }

  error = (e) => {
    console.log('生命周期：error', e)
  }

  changeData = () => {
    this.setState({
      data: {
        name: +new Date(),
      },
    })
  }

  dispatchData = () => {
    microApp.setData('react16', {dispatch: 'data from dispatch' + (+new Date())})
  }

  dispatchGlobalData = () => {
    microApp.setGlobalData({name: '全局数据' + (+new Date())})
  }

  handleDataChange = (e) => {
    console.log('通过生命周周期监听到来自子应用的数据', e)
    Modal.info({
      title: '来自子应用的数据',
      content: (
        <div>
          <p>{JSON.stringify(e.detail.data)}</p>
        </div>
      ),
      onOk() {},
    });
  }

  toggleShow = () => {
    this.setState({
      showMicroApp: !this.state.showMicroApp,
    })
  }

  changeNameUrl = () => {
    this.setState({
      name: 'vue2',
      url: `${config.vue2}micro-app/vue2`,
    })
  }

  handleModal = () => {
    this.setState({
      modal1: !this.state.modal1,
    })
  }

  changeTestNum = () => {
    this.setState({
      testNum: this.state.testNum + 1,
    })
  }

  componentDidMount () {
    console.time('a1')
    console.time('react16')

    microApp.addDataListener('react16', (data) => {
      console.log('来自子应用react16的数据', data)
    })

    microApp.addGlobalDataListener((data) => {
      console.log('这是全局数据--基座应用', data)
    })

  }

  componentWillUnmount ()  {
    microApp.clearDataListener('react16')
  }

  render () {
    return (
      <Row className='react16'>
        <Col span={6} className='btn-con'>
          <Button type="primary" onClick={this.toggleShow}>微应用是否展示</Button>
          <Button type="primary" onClick={this.changeData}>data属性发送数据</Button>
          <Button type="primary" onClick={this.dispatchData}>dispatch方法发送数据</Button>
          <Button type="primary" onClick={this.dispatchGlobalData}>发送全局数据</Button>
          <Button type="primary" onClick={this.changeNameUrl}>切换应用</Button>
          <Button type="primary" onClick={this.handleModal}>modal内嵌应用</Button>
        </Col>
        <Col span={18} className='app-con-react16'>
          { this.state.showLoading && <Spin indicator={antIcon} /> }
          { !this.state.showLoading && <h3>微应用{this.state.name}</h3> }
          {
            this.state.showMicroApp && (
              <micro-app
                data={this.state.data}
                name={this.state.name}
                url={this.state.url}
                onCreated={this.handleCreated}
                onBeforemount={this.beforemount}
                onMounted={this.mounted}
                onUnmount={this.unmount}
                onError={this.error}
                onDataChange={this.handleDataChange}
                // destory
                baseurl='/micro-app/demo/react16'
                // inline
                // disableSandbox
                // disableScopecss
                // macro
              >
              </micro-app>
            )
          }
          <Modal
            visible={this.state.modal1}
            maskClosable={true}
            title="Title"
            width={500}
            height={500}
            destroyOnClose
            onOk={() => this.setState({modal1: false})}
            onCancel={() => this.setState({modal1: false})}
          >
            <micro-app
              name='modal-app1'
              url={this.state.url}
              baseurl='/micro-app/demo/react16'
              inline
              // disableSandbox
              // macro
            />
          </Modal>
        </Col>
      </Row>
    )
  }
}
