const tokens = {
  admin: {
    token: 'X-Access-Token'
  }
}

export default [
  // user login
  {
    url: '/sys/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          success: false,
          message: '用户名或密码错误',
          code: 500,
          result: null,
          status: false,
          timestamp: 1603437092375
        }
      }

      return {
        success: true,
        message: '登录成功',
        code: 200,
        result: {
          userInfo: {
            id: 'a75d45a015c44384a04449ee80dc3503',
            username: 'admin',
            realname: '管理员'
          },
          token: 'X-Access-Token'
        },
        timestamp: 1603436092375
      }
    }
  },

  // get user info
  {
    url: '/sys/permission/queryByUser',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '查询成功',
        code: 200,
        result: {
          userPermission: {
            menuList: [],
            rolesList: ['admin'],
            permissionList: ['roleManage:option', 'userManage:option', 'userManage:add', 'userManage:edit', 'userManage:delete', 'userManage:password', 'userManage:power'],
            username: 'admin'
          }
        },
        timestamp: 1598004038484
      }
    }
  },

  // user logout
  {
    url: '/sys/logout',
    type: 'post',
    response: () => {
      return {
        success: true,
        message: '退出登录成功！',
        code: 200,
        result: null,
        status: false,
        timestamp: 1603437195840
      }
    }
  }
]
