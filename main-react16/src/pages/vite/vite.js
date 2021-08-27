/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'
import { Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import config from '../../config'
import './vite.less'

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

function vite () {
  const [data, changeData] = useState({from: '来自基座的初始化数据'})
  const [showLoading, hideLoading] = useState(true)
  return (
    <div>
      {/* <div className='btn-con'>
        <Button
          type='primary'
          onClick={() => changeData({from: '来自基座的数据' + (+new Date())})}
          style={{width: '120px'}}
        >
          发送数据
        </Button>
      </div> */}
      {
        showLoading && <Spin indicator={antIcon} />
      }
      <micro-app
        name='vite'
        url={`${config.vite}micro-app/vite/`}
        // url={`http://127.0.0.1:8080/micro-app/vite/`}
        data={data}
        // onBeforemount={() => hideLoading(false)}
        onMounted={() => hideLoading(false)}
        // destory
        inline
        disableSandbox

      >
      </micro-app>
    </div>
  )
}

export default vite
