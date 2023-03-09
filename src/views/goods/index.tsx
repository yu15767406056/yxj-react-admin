import { FC, useEffect, useState } from 'react'
import { store } from '@/redux'
import { useNavigate } from 'react-router-dom'
import { useAliveController } from 'react-activation'

const Goods: FC = () => {
  const { drop } = useAliveController()
  const navigate = useNavigate()
  const [num, setNum] = useState(0)
  //模拟挂载生命周期
  useEffect(() => {
    console.log('挂载了')
    store.subscribe(() => {
      // setUserValue(store.getState().routers.router)
    })
    return () => console.log('卸载了')
  }, [])
  const goodsAdd = () => {
    setNum(num + 1)
    // store.dispatch(user.actions.incremented('我靠'))
  }
  const pushSupply = () => {
    navigate({ pathname: '/home/supply' })
  }
  const onDrop = () => {
    console.log('清除了')
    drop('/goods')
  }
  const testR = () => {
    console.time('run time')
    const a = [
      '6.0',
      '6.0.0',
      '6.0.1',
      '6.1',
      '6.2',
      '6.1.0',
      '6.2.0',
      '3.1',
      '3.0',
      '3.0.0',
      '7.0.0',
      '7.0',
      '7.0.0.0',
      '7.0.0.1',
      '2.0',
      'a.b.c',
      'a.b.c.e',
      'a.b.c.f',
    ].sort((f, b) => {
      return f.length - b.length
    })
    const saveArr: string[] = []
    for (let i = 0; i < a.length; i++) {
      const item = a[i]
      if (!saveArr.length) {
        saveArr.push(item)
      } else {
        let exist = false
        for (let j = 0; j < saveArr.length; j++) {
          const jtem = saveArr[j]
          if (RegExp(`^(${jtem}).*`, 'g').test(item)) {
            exist = true
            break
          }
        }
        !exist && saveArr.push(item)
      }
    }
    console.log('最终结果', saveArr)
    console.timeEnd('run time')
  }

  const testR2 = () => {
    console.time('run time')
    const a = [
      '6.0',
      '6.0.0',
      '6.0.1',
      '6.1',
      '6.2',
      '6.1.0',
      '6.2.0',
      '3.1',
      '3.0',
      '3.0.0',
      '7.0.0',
      '7.0',
      '7.0.0.0',
      '7.0.0.1',
      '2.0',
      'a.b.c',
      'a.b.c.e',
      'a.b.c.f',
    ].sort((f, b) => {
      return f.length - b.length
    })
    const saveArr: string[] = []
    for (let i = 0; i < a.length; i++) {
      const item = a[i]
      if (!saveArr.length) {
        saveArr.push(item)
      } else {
        let exist = false
        for (let j = 0; j < saveArr.length; j++) {
          const jtem = saveArr[j]
          if (RegExp(`^(${jtem}).*`, 'g').test(item)) {
            exist = true
            break
          }
        }
        !exist && saveArr.push(item)
      }
    }
    console.log('最终结果', saveArr)
    console.timeEnd('run time')
  }

  return (
    <div>
      <h1 onClick={goodsAdd}>货品goods:{num}</h1>
      <h1 onClick={pushSupply}>跳转看卸载</h1>
      <h1 onClick={onDrop}>清除缓存</h1>
      <h1 onClick={testR}> 测试</h1>
      <h1 onClick={testR2}> 测试2</h1>
    </div>
  )
}

export default Goods
