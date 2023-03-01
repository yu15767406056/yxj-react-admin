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
      id: 1,
      childern: [
        {
          title: 'test',
          path: 'test',
          id: 2,
          type: 0,
          childern: [
            {
              title: 'test2',
              path: 'test2',
              type: 0,
              id: 3,
              childern: [
                {
                  title: 'test3',
                  path: 'test3',
                  type: 0,
                  id: 4,
                  component: 'goods',
                },
              ],
            },
          ],
        },

        {
          title: 'goods',
          path: 'goods',
          type: 1,
          id: 5,
          component: 'goods',
          keepAlive: true
        },
        {
          title: 'supply',
          path: 'supply',
          type: 1,
          id: 6,
          component: 'supply',
          icon: 'AppstoreOutlined',
        },
      ],
    },
  ])
})

app.listen(9000)
console.log('启动成功: http://localhost:9000')
