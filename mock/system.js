export default [
  {
    url: '/sys/permission/list',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功',
        code: 200,
        result: [
          {
            hidden: false,
            icon: null,
            description: null,
            title: '系统管理',
            delFlag: 0,
            isLeaf: false,
            updateBy: null,
            children: [
              {
                hidden: false,
                icon: null,
                description: null,
                title: '菜单管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: 'admin',
                children: null,
                perms: null,
                disabled: false,
                id: 'c0cc144b4ccdfe1a42424621a22c8155',
                key: 'c0cc144b4ccdfe1a42424621a22c8155',
                redirect: null,
                updateTime: 1603349704034,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'resourceManage',
                sortNo: 3,
                component: 'layouts/RouteView',
                createBy: 'admin',
                route: false,
                createTime: 1603087601310,
                name: '菜单管理',
                menuType: '1',
                alwaysShow: false
              },
              {
                hidden: false,
                icon: null,
                description: null,
                title: '用户管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: 'admin',
                children: null,
                perms: null,
                disabled: false,
                id: 'dbc79911e7a3e5d092806c49fc553aee',
                key: 'dbc79911e7a3e5d092806c49fc553aee',
                redirect: null,
                updateTime: 1603349446231,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'userManage',
                sortNo: 3,
                component: null,
                createBy: 'admin',
                route: false,
                createTime: 1603087724020,
                name: '用户管理',
                menuType: '1',
                alwaysShow: false
              },
              {
                hidden: false,
                icon: null,
                description: null,
                title: '部门管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: 'admin',
                children: null,
                perms: null,
                disabled: false,
                id: 'cf76293ca2b0975c66012e51ac195a6b',
                key: 'cf76293ca2b0975c66012e51ac195a6b',
                redirect: null,
                updateTime: 1603087761086,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'departManage',
                sortNo: 4,
                component: null,
                createBy: 'admin',
                route: false,
                createTime: 1603087742461,
                name: '部门管理',
                menuType: '1',
                alwaysShow: false
              },
              {
                hidden: false,
                icon: null,
                description: null,
                title: '通告管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: 'admin',
                children: null,
                perms: null,
                disabled: false,
                id: '1ed5d211c265a38c5e58997b4b4aee4d',
                key: '1ed5d211c265a38c5e58997b4b4aee4d',
                redirect: null,
                updateTime: 1603087781668,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'noticeManage',
                sortNo: 5,
                component: 'layouts/RouteView',
                createBy: 'admin',
                route: false,
                createTime: 1603087777272,
                name: '通告管理',
                menuType: '1',
                alwaysShow: false
              },
              {
                hidden: false,
                icon: null,
                description: null,
                title: '角色管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: 'admin',
                children: null,
                perms: null,
                disabled: false,
                id: 'cb41cc0f7f575d3089f8a02fc5b22e28',
                key: 'cb41cc0f7f575d3089f8a02fc5b22e28',
                redirect: null,
                updateTime: 1603349322542,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'roleManage',
                sortNo: 5,
                component: 'layouts/RouteView',
                createBy: 'admin',
                route: false,
                createTime: 1603087615574,
                name: '角色管理',
                menuType: '1',
                alwaysShow: false
              },
              {
                hidden: false,
                icon: null,
                description: null,
                title: '字典管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: null,
                children: null,
                perms: null,
                disabled: false,
                id: 'd4e24d95c0b6ac7b988ccd5e22c3e1b1',
                key: 'd4e24d95c0b6ac7b988ccd5e22c3e1b1',
                redirect: null,
                updateTime: null,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'dictionaryManage',
                sortNo: 6,
                component: null,
                createBy: 'admin',
                route: false,
                createTime: 1603087810652,
                name: '字典管理',
                menuType: '1',
                alwaysShow: false
              },
              {
                hidden: false,
                icon: null,
                description: null,
                title: '模板管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: null,
                children: null,
                perms: null,
                disabled: false,
                id: '05b1656967bb134e48fbee334e85429d',
                key: '05b1656967bb134e48fbee334e85429d',
                redirect: null,
                updateTime: null,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'templateManage',
                sortNo: 7,
                component: null,
                createBy: 'admin',
                route: false,
                createTime: 1603087863946,
                name: '模板管理',
                menuType: '1',
                alwaysShow: false
              },
              {
                hidden: false,
                icon: null,
                description: null,
                title: '日志管理',
                delFlag: 0,
                isLeaf: true,
                updateBy: 'admin',
                children: null,
                perms: null,
                disabled: false,
                id: '76e74c6cff1ed3725c147a343a286cc7',
                key: '76e74c6cff1ed3725c147a343a286cc7',
                redirect: null,
                updateTime: 1603087876692,
                leaf: true,
                parentId: '7c6a355e52d4391d3c7073d1a251e40a',
                url: 'logManage',
                sortNo: 8,
                component: 'layouts/RouteView',
                createBy: 'admin',
                route: false,
                createTime: 1603087845413,
                name: '日志管理',
                menuType: '1',
                alwaysShow: false
              }
            ],
            perms: null,
            disabled: false,
            id: '7c6a355e52d4391d3c7073d1a251e40a',
            key: '7c6a355e52d4391d3c7073d1a251e40a',
            redirect: null,
            updateTime: null,
            leaf: false,
            parentId: '',
            url: 'systemModule',
            sortNo: 0,
            component: 'layouts/RouteView',
            createBy: 'admin',
            route: false,
            createTime: '2020-10-19 14:06:24',
            name: '系统管理',
            menuType: '0',
            alwaysShow: false
          }
        ],
        status: false,
        timestamp: 1603437324177
      }
    }
  },
  {
    url: 'sys/permission/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603437951666 }
    }
  },
  {
    url: '/sys/permission/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功！', code: 200, result: null, status: false, timestamp: 1603437982620 }
    }
  },
  {
    url: '/sys/permission/delete',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603438005100 }
    }
  },
  {
    url: '/sys/role/list',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: {
          records: [
            {
              createBy: 'admin',
              createTime: '2020-10-19 14:44:29',
              updateBy: 'admin',
              roleCode: 'admin',
              roleName: '开发测试',
              description: '开发和测试',
              updateTime: '2020-10-19 14:45:05',
              id: 'de3cdbec8e7f48f9f4e9229c7c4897c4'
            }
          ],
          total: 4,
          size: 10,
          current: 1,
          searchCount: true,
          pages: 1
        },
        status: false,
        timestamp: 1603437515580
      }
    }
  },
  {
    url: '/sys/role/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603437700353 }
    }
  },
  {
    url: '/sys/role/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603437743064 }
    }
  },
  {
    url: '/sys/role/delete',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603437787232 }
    }
  },
  {
    url: '/sys/role/checkRoleCode',
    type: 'get',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: true, status: false, timestamp: 1603437696017 }
    }
  },
  {
    url: '/sys/permission/queryRolePermission',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功',
        code: 200,
        result: [
          '7c6a355e52d4391d3c7073d1a251e40a',
          'c0cc144b4ccdfe1a42424621a22c8155',
          'dbc79911e7a3e5d092806c49fc553aee',
          'cf76293ca2b0975c66012e51ac195a6b',
          '1ed5d211c265a38c5e58997b4b4aee4d',
          'cb41cc0f7f575d3089f8a02fc5b22e28',
          'd4e24d95c0b6ac7b988ccd5e22c3e1b1',
          '05b1656967bb134e48fbee334e85429d',
          '76e74c6cff1ed3725c147a343a286cc7'
        ],
        status: false,
        timestamp: 1603437613359
      }
    }
  },
  {
    url: '/sys/permission/saveRolePermission',
    type: 'post',
    response: () => {
      return { success: true, message: '保存成功！', code: 200, result: null, status: false, timestamp: 1603437652713 }
    }
  },
  {
    url: '/sys/user/list',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: {
          records: [
            {
              birthday: null,
              officeName: '',
              bureauId: '',
              sex_dictText: '男',
              idCard: null,
              departNames: '研发部',
              ministryName: '研发部',
              status_dictText: '启用',
              delFlag: '0',
              password: '0035bf46ce4fc318',
              usbKey: '',
              officeId: '',
              updateBy: 'admin',
              rankName: '其他',
              id: 'a75d45a015c44384a04449ee80dc3503',
              email: null,
              jobName: '其他',
              ministryId: '0EB5A88240D94D5AA294373CBA654365',
              salt: 'WstqQktT',
              sex: '1',
              telephone: '',
              updateTime: '2020-10-23 14:33:06',
              departIds: '0EB5A88240D94D5AA294373CBA654365',
              avatar: 'user/20190220/e1fe9925bc315c60addea1b98eb1cb1349547719_1550656892940.jpg',
              rankId_dictText: '其他',
              realname: '开发测试',
              jobId: '1',
              createBy: 'admin',
              roleIds: 'de3cdbec8e7f48f9f4e9229c7c4897c4',
              workNumber: '',
              phone: null,
              rankId: '1',
              createTime: '2018-12-13 00:00:00',
              roleNames: '开发测试',
              bureauName: '',
              username: 'admin',
              status: '1'
            },
            {
              birthday: null,
              officeName: '',
              bureauId: '',
              sex_dictText: '男',
              idCard: null,
              departNames: '研发部',
              ministryName: '研发部',
              status_dictText: '启用',
              delFlag: '0',
              password: '0035bf46ce4fc318',
              usbKey: '',
              officeId: '',
              updateBy: 'admin',
              rankName: '其他',
              id: 'a75d45a015c44384a04449ee80dc3504',
              email: null,
              jobName: '其他',
              ministryId: '0EB5A88240D94D5AA294373CBA654365',
              salt: 'WstqQktT',
              sex: '1',
              telephone: '',
              updateTime: '2020-10-23 14:33:06',
              departIds: '0EB5A88240D94D5AA294373CBA654365',
              avatar: 'user/20190220/e1fe9925bc315c60addea1b98eb1cb1349547719_1550656892940.jpg',
              rankId_dictText: '其他',
              realname: '测试',
              jobId: '1',
              createBy: 'admin',
              roleIds: 'de3cdbec8e7f48f9f4e9229c7c4897c4',
              workNumber: '',
              phone: null,
              rankId: '1',
              createTime: '2018-12-13 00:00:00',
              roleNames: '开发测试',
              bureauName: '',
              username: 'admin2',
              status: '1'
            }
          ],
          total: 2,
          size: 10,
          current: 1,
          searchCount: true,
          pages: 1
        },
        status: false,
        timestamp: 1603438041777
      }
    }
  },
  {
    url: 'sys/user/queryAll',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          {
            birthday: null,
            officeName: '',
            bureauId: '',
            sex_dictText: '男',
            idCard: null,
            departNames: '研发部',
            ministryName: '研发部',
            status_dictText: '启用',
            delFlag: '0',
            password: '0035bf46ce4fc318',
            usbKey: '',
            officeId: '',
            updateBy: 'admin',
            rankName: '其他',
            id: 'a75d45a015c44384a04449ee80dc3503',
            email: null,
            jobName: '其他',
            ministryId: '0EB5A88240D94D5AA294373CBA654365',
            salt: 'WstqQktT',
            sex: '1',
            telephone: '',
            updateTime: '2020-10-23 14:33:06',
            departIds: '0EB5A88240D94D5AA294373CBA654365',
            avatar: 'user/20190220/e1fe9925bc315c60addea1b98eb1cb1349547719_1550656892940.jpg',
            rankId_dictText: '其他',
            realname: '开发测试',
            jobId: '1',
            createBy: 'admin',
            roleIds: 'de3cdbec8e7f48f9f4e9229c7c4897c4',
            workNumber: '',
            phone: null,
            rankId: '1',
            createTime: '2018-12-13 00:00:00',
            roleNames: '开发测试',
            bureauName: '',
            username: 'admin',
            status: '1'
          },
          {
            birthday: null,
            officeName: '',
            bureauId: '',
            sex_dictText: '男',
            idCard: null,
            departNames: '研发部',
            ministryName: '研发部',
            status_dictText: '启用',
            delFlag: '0',
            password: '0035bf46ce4fc318',
            usbKey: '',
            officeId: '',
            updateBy: 'admin',
            rankName: '其他',
            id: 'a75d45a015c44384a04449ee80dc3504',
            email: null,
            jobName: '其他',
            ministryId: '0EB5A88240D94D5AA294373CBA654365',
            salt: 'WstqQktT',
            sex: '1',
            telephone: '',
            updateTime: '2020-10-23 14:33:06',
            departIds: '0EB5A88240D94D5AA294373CBA654365',
            avatar: 'user/20190220/e1fe9925bc315c60addea1b98eb1cb1349547719_1550656892940.jpg',
            rankId_dictText: '其他',
            realname: '测试',
            jobId: '1',
            createBy: 'admin',
            roleIds: 'de3cdbec8e7f48f9f4e9229c7c4897c4',
            workNumber: '',
            phone: null,
            rankId: '1',
            createTime: '2018-12-13 00:00:00',
            roleNames: '开发测试',
            bureauName: '',
            username: 'admin2',
            status: '1'
          }
        ],
        status: false,
        timestamp: 1603440036105
      }
    }
  },
  {
    url: '/sys/user/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603438926156 }
    }
  },
  {
    url: '/sys/user/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603438978365 }
    }
  },
  {
    url: '/sys/user/delete',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603439014775 }
    }
  },
  {
    url: '/sys/user/checkOnlyUser',
    type: 'get',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: true, status: false, timestamp: 1603439354969 }
    }
  },
  {
    url: '/sys/user/changePassword',
    type: 'put',
    response: () => {
      return { success: true, message: '密码修改完成！', code: 200, result: null, status: false, timestamp: 1603439428788 }
    }
  },
  {
    url: '/sys/user/addRole',
    type: 'post',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: null, status: false, timestamp: 1603439491287 }
    }
  },
  {
    url: '/sys/role/queryall',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          {
            createBy: 'admin',
            createTime: '2020-10-19 14:44:29',
            updateBy: 'admin',
            roleCode: 'admin',
            roleName: '开发测试',
            description: '开发和测试',
            updateTime: '2020-10-19 14:45:05',
            id: 'de3cdbec8e7f48f9f4e9229c7c4897c4',
            status: true
          }
        ],
        status: false,
        timestamp: 1603438042126
      }
    }
  },
  {
    url: '/sys/sysDepart/queryTreeList',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          {
            departNameAbbr: null,
            departNameEn: null,
            departOrder: 1,
            address: null,
            mobile: '',
            description: null,
            memo: null,
            updateTime: '2020-05-15 16:58:00',
            title: '研发部',
            delFlag: '0',
            isLeaf: false,
            parentId: '',
            orgType: '1',
            createBy: 'admin',
            createTime: '2019-05-08 00:00:00',
            updateBy: 'admin',
            children: [],
            orgCode: 'A01',
            id: '0EB5A88240D94D5AA294373CBA654365',
            fax: null,
            value: '0EB5A88240D94D5AA294373CBA654365',
            key: '0EB5A88240D94D5AA294373CBA654365',
            departName: '研发部',
            status: '1'
          }
        ],
        status: false,
        timestamp: 1603438106584
      }
    }
  },
  {
    url: '/sys/sysDepart/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603438926156 }
    }
  },
  {
    url: '/sys/sysDepart/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603438978365 }
    }
  },
  {
    url: '/sys/sysDepart/deleteBatch',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603439014775 }
    }
  },
  {
    url: 'notice/notice/doList',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: {
          records: [
            {
              priority_dictText: '低',
              updateDate: '2020-10-23 16:01:12',
              isRead: null,
              noticeType: '0',
              priority: '0',
              params: null,
              updateName: null,
              noticeTitle: '111',
              noticeType_dictText: '公告',
              noticeContent: '<p>11111</p>',
              route: null,
              noticeLevel: '1',
              userIds: '',
              noticeLevel_dictText: '已发布',
              id: 'bf8e7798ae4040e1a70155a1f2d644fd',
              deptIds: '',
              noticeTerm: '2020-10-26 00:00:00',
              createName: 'admin',
              createDate: '2020-10-23 14:37:49'
            }
          ],
          total: 1,
          size: 10,
          current: 1,
          searchCount: true,
          pages: 1
        },
        status: false,
        timestamp: 1603440073391
      }
    }
  },
  {
    url: '/notice/notice/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603438926156 }
    }
  },
  {
    url: '/notice/notice/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603438978365 }
    }
  },
  {
    url: '/notice/notice/delete',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603439014775 }
    }
  },
  {
    url: 'notice/notice/editNoticeLevel',
    type: 'get',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603440505441 }
    }
  },
  {
    url: '/sys/dict/list',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: {
          records: [
            {
              isEmbassy: null,
              createBy: 'admin',
              dictCode: 'dict_item_status',
              createTime: '2020-10-19 09:54:07',
              updateBy: 'admin',
              description: '状态（1启用 0禁用）',
              dictName: '状态（1启用 0禁用）',
              updateTime: '2020-10-19 10:05:19',
              id: 'eb5ddfbf7c4a4f78b923d70b9979979a',
              type: null,
              delFlag: 1
            }
          ],
          total: 1,
          size: 10,
          current: 1,
          searchCount: true,
          pages: 1
        },
        status: false,
        timestamp: 1603440722620
      }
    }
  },
  {
    url: '/sys/dict/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603438926156 }
    }
  },
  {
    url: '/sys/dict/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603438978365 }
    }
  },
  {
    url: '/sys/dict/delete',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603439014775 }
    }
  },
  {
    url: '/sys/duplicate/check',
    type: 'get',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: true, status: false, timestamp: 1603437696017 }
    }
  },
  {
    url: '/sys/dictItem/list',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: {
          records: [
            {
              createBy: 'admin',
              createTime: '2020-10-19 09:54:28',
              updateBy: null,
              itemValue: '1',
              sortOrder: 0,
              description: '',
              updateTime: null,
              id: 'fcc09a7d96e9235eac26bb09e89eca0a',
              dictId: 'eb5ddfbf7c4a4f78b923d70b9979979a',
              status_dictText: '启用',
              itemText: '启用',
              status: '1'
            },
            {
              createBy: 'admin',
              createTime: '2020-10-19 09:54:39',
              updateBy: 'admin',
              itemValue: '0',
              sortOrder: 1,
              description: '',
              updateTime: '2020-10-23 11:16:15',
              id: 'c7ef3420633dc685c41d6d7b2d39c141',
              dictId: 'eb5ddfbf7c4a4f78b923d70b9979979a',
              status_dictText: '启用',
              itemText: '禁用',
              status: '1'
            }
          ],
          total: 2,
          size: 10,
          current: 1,
          searchCount: true,
          pages: 1
        },
        status: false,
        timestamp: 1603440737688
      }
    }
  },
  {
    url: '/sys/dictItem/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603438926156 }
    }
  },
  {
    url: '/sys/dictItem/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603438978365 }
    }
  },
  {
    url: '/sys/dictItem/delete',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603439014775 }
    }
  },
  {
    url: '/xs/xsTemplateNode/queryTreeList',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          {
            templateName: '模板名称',
            templateType: '0',
            templateList: [],
            description: '',
            updateTime: '2020-10-19 00:00:00',
            sort: 1,
            title: '模板名称',
            parentId: '',
            createBy: 'admin',
            createTime: '2020-10-19 00:00:00',
            updateBy: 'admin',
            children: null,
            id: '1318112025452462081',
            value: '1318112025452462081',
            key: '1318112025452462081'
          }
        ],
        status: false,
        timestamp: 1603440768536
      }
    }
  },
  {
    url: '/xs/xsTemplateNode/add',
    type: 'post',
    response: () => {
      return { success: true, message: '添加成功！', code: 200, result: null, status: false, timestamp: 1603438926156 }
    }
  },
  {
    url: '/xs/xsTemplateNode/edit',
    type: 'put',
    response: () => {
      return { success: true, message: '修改成功!', code: 200, result: null, status: false, timestamp: 1603438978365 }
    }
  },
  {
    url: '/xs/xsTemplateNode/delete',
    type: 'delete',
    response: () => {
      return { success: true, message: '删除成功!', code: 200, result: null, status: false, timestamp: 1603439014775 }
    }
  },
  {
    url: '/sys/dict/getDictItems/menu_type',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '菜单', ID: 'd638a854bc8bd483a3d75d5040e17327', VALUE: '0' },
          { STATUS: '1', TEXT: '子菜单', ID: 'c81a99ed0d90fb51401de9ad5954c60c', VALUE: '1' },
          { STATUS: '1', TEXT: '按钮', ID: '9097615948b32d472a88e2a2b141dfe9', VALUE: '2' }
        ],
        status: false,
        timestamp: 1603437324179
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/user_status',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '冻结', ID: '5714b0ff6bd9186b09dfa015d509b606', VALUE: '0' },
          { STATUS: '1', TEXT: '启用', ID: '929217ce3d587ef193736d77ec37d888', VALUE: '1' }
        ],
        status: false,
        timestamp: 1603438041802
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/sex',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '男', ID: '352a081679bd26045aa401580bd66c20', VALUE: '1' },
          { STATUS: '1', TEXT: '女', ID: '7975dda1f5e629033581673726b58253', VALUE: '2' },
          { STATUS: '1', TEXT: '保密', ID: '27f15c71ee5f354b6016004514f17049', VALUE: '3' }
        ],
        status: false,
        timestamp: 1603438041806
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/wa_zj',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [{ STATUS: '1', TEXT: '其他', ID: '91a1d42f4a2c2cdd0564681afe9a455a', VALUE: '1' }],
        status: false,
        timestamp: 1603438041809
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/wa_zw',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [{ STATUS: '1', TEXT: '其他', ID: '638d380be44f23f02d14ef364bb76bc9', VALUE: '1' }],
        status: false,
        timestamp: 1603438041811
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/notice_type',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '公告', ID: '66e1d854562813c363c74e28413849ae', VALUE: '0' },
          { STATUS: '1', TEXT: '通知', ID: 'd4afeb1529698fef7705dcecfa91ed94', VALUE: '1' }
        ],
        status: false,
        timestamp: 1603440347834
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/priority',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '低', ID: 'dc152d53f77f2614e22941216a6754af', VALUE: '0' },
          { STATUS: '1', TEXT: '高', ID: 'e0b4244c1e431ba1874076c59df4ef19', VALUE: '2' },
          { STATUS: '1', TEXT: '中', ID: '4d507f2ae83ff15f33a4a93db9ff6680', VALUE: '1' }
        ],
        status: false,
        timestamp: 1603440347833
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/dict_item_status',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '启用', ID: 'fcc09a7d96e9235eac26bb09e89eca0a', VALUE: '1' },
          { STATUS: '1', TEXT: '禁用', ID: 'c7ef3420633dc685c41d6d7b2d39c141', VALUE: '0' }
        ],
        status: false,
        timestamp: 1603440584929
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/patrol_node',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [{ STATUS: '1', TEXT: '模板名称', ID: '1360596ceaf37bcc216356419ea3778c', VALUE: '0' }],
        status: false,
        timestamp: 1603440767786
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/yes_or_no',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '否', ID: '25e5a34f5cc10723e47f01a1e739fb1d', VALUE: '0' },
          { STATUS: '1', TEXT: '是', ID: '55d6b75d3ab58ce1661bd8acea03cdf9', VALUE: '1' }
        ],
        status: false,
        timestamp: 1603440944415
      }
    }
  },
  {
    url: '/sys/dict/getDictItems/file_security',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          { STATUS: '1', TEXT: '内部', ID: '002320997ade5dd147c90130f7554000', VALUE: '0' },
          { STATUS: '1', TEXT: '秘密', ID: '002320997ade5dd147c90130f7554001', VALUE: '1' },
          { STATUS: '1', TEXT: '机密', ID: '002320997ade5dd147c90130f7554002', VALUE: '2' }
        ],
        status: false,
        timestamp: 1603440944513
      }
    }
  },
  {
    url: '/sys/common/getFileList',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: [
          {
            id: '0daaeb36a0ff488fb686a7b299c3106d',
            templateName: null,
            templateInfo: null,
            fileUrl: '模板_1603441096903.docx',
            templateFk: null,
            templateFkIds: null,
            templateFkId: null,
            fileSuffix: 'docx',
            fileName: '模板.docx',
            fileSize: 0,
            fileSourceTable: null,
            fileSourceId: '1319552818528579586',
            fileType: 0,
            share: '1',
            security: '0',
            createTime: '2020-10-23 16:18:16',
            createBy: 'admin',
            updateTime: null,
            updateBy: null,
            fileOrder: null,
            key: '0daaeb36a0ff488fb686a7b299c3106d',
            value: '0daaeb36a0ff488fb686a7b299c3106d',
            title: null
          }
        ],
        status: false,
        timestamp: 1603441098084
      }
    }
  },
  {
    url: '/sys/common/upload',
    type: 'post',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: null, status: false, timestamp: 1603441096902 }
    }
  },
  {
    url: '/sys/common/download',
    type: 'get',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: null, status: false, timestamp: 1603441096902 }
    }
  },
  {
    url: '/sys/common/delete',
    type: 'get',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: null, status: false, timestamp: 1603441096902 }
    }
  },
  {
    url: '/sys/log/list',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: '操作成功！',
        code: 200,
        result: {
          records: [],
          total: 0,
          size: 10,
          current: 1,
          searchCount: true,
          pages: 1
        },
        status: false,
        timestamp: 1603440737688
      }
    }
  },
  {
    url: '/sys/log/exportXls',
    type: 'get',
    response: () => {
      return { success: true, message: '操作成功！', code: 200, result: null, status: false, timestamp: 1603441096902 }
    }
  }
]
