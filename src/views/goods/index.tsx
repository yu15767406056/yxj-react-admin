import { FC, useEffect } from 'react'
import { store } from '@src/redux/store'
import { useNavigate } from 'react-router-dom'

const Goods: FC = () => {
  const navigate = useNavigate()
  //模拟挂载生命周期
  useEffect(() => {
    console.log('挂载了')
    store.subscribe(() => {
      // setUserValue(store.getState().user.router)
    })
    return () => console.log('卸载了')
  }, [])
  const goodsAdd = () => {
    // store.dispatch(user.actions.incremented('我靠'))
  }
  const pushSupply = () => {
    navigate({ pathname: '/home/supply' })
  }

  return (
    <div>
      <h1 onClick={goodsAdd}>货品goods:</h1>
      <h1 onClick={pushSupply}>跳转看卸载</h1>
    </div>
  )
}

export default Goods
