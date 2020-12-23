import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = store.getters && store.getters.permissions
    const hasPermission = permissions.some((btn) => {
      return value.includes(btn)
    })
    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need permissions! Like "['userManage:add','userManage:edit']"`)
    return false
  }
}

export function checkMenus(value) {
  if (value && value instanceof Array && value.length > 0) {
    const menus = store.getters && store.getters.menus
    const hasMenus = menus.some((menu) => {
      return value.includes(menu)
    })
    if (!hasMenus) {
      return false
    }
    return true
  } else {
    console.error(`need menus! Like "['userManage','logManage']"`)
    return false
  }
}
export function checkRoles(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const hasRoles = roles.some((role) => {
      return value.includes(role)
    })
    if (!hasRoles) {
      return false
    }
    return true
  } else {
    return false
  }
}
