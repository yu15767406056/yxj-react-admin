import React, { FC } from 'react'
import * as Icon from '@ant-design/icons'

type PropsType = {
  iconName?: string
}

const IconToElement: FC<PropsType> = (props) => {
  const { iconName = 'UnorderedListOutlined' } = props
  return React.createElement((Icon as any)[iconName])
}

export default IconToElement
