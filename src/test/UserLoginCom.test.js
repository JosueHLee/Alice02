import { afterEach, beforeEach, describe,vi,test,expect } from "vitest"
import { mount, flushPromises, config } from '@vue/test-utils';
import UserLoginCom from "@/components/User/UserLoginCom.vue"
import ElementPlus from 'element-plus'
import axios from "axios"

vi.mock('axios',{spy: true})

let wrapper
let accountInpput
let passwordInput
let loginBtn
config.global.plugins = [ElementPlus]

const user = {
  username: 'Alice',
  pwd: '111'
}

beforeEach(() => {
  wrapper = mount(UserLoginCom)
  accountInpput = wrapper.get('[data-testid="account"]')
  passwordInput = wrapper.get('[data-testid="password"]')
  loginBtn = wrapper.get('[data-testid="login"]')
})
afterEach(() => {
  wrapper.unmount()
  vi.clearAllMocks()
})

describe('login button', () => {
  test('validate before send request', async () => {
    await loginBtn.trigger('click')
    await new Promise((r) => setTimeout(r, 300))

    expect(wrapper.findAll('.el-form-item__error')).toHaveLength(2)
  })

  test('send request', async () => {
    await accountInpput.setValue(user.username)
    await passwordInput.setValue(user.pwd)
    await loginBtn.trigger('click')
    await new Promise((r) => setTimeout(r, 300))

    expect(axios.post).toHaveBeenCalled(true)
  })
})
