import { FC, useEffect } from 'react'
import { user } from '@src/api'

const Supply: FC = () => {
  useEffect(() => {
    getTest()
  }, [])

  const getTest = async () => {
    const data = await user.test(null)
    console.log(data)
  }
  return <div>供应商</div>
}

export default Supply
