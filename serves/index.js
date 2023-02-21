const express = require('express')
// const path = require('path');
const app = express()

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use((a, b, next) => {
  console.log('请求了', a.ips, a.ip)
  next()
})
app.get('/reactJson', (req, res) => {
  const { ip, ips } = req
  res.send({ a: 'a', ip, ips })
})

app.get('/user/getRouter', (_, res) => {
  res.send([
    {
      type: 0, //0 目录, 1 菜单 , 2 按钮
      component: 'BaseLayout',
      title: 'home',
      path: '/',
      childern: [
        {
          title: 'goods',
          path: 'goods',
          type: 1,
          component: '/goods',
        },
        {
          title: 'supply',
          path: 'supply',
          type: 1,
          component: '/supply',
        },
        {
          title: 'test',
          path: 'test',
          type: 0,
          childern: [{ title: 'test2', path: 'test2', type: 1, component: '/supply' }],
        },
      ],
    },
  ])
})

app.listen(9000)
console.log('启动成功: http://localhost:9000')
