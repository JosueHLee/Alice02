import { afterEach, beforeEach, describe, expect,test, vi } from 'vitest';
import { mount, flushPromises, config } from '@vue/test-utils';
import ElementPlus from 'element-plus';
import UserRegisCom from '@/components/User/UserRegisCom.vue';
import axios from 'axios';

vi.mock('axios',{spy: true})
vi.mock('router', () => {
  return {
    push() {
      console.log('push!')
    }
  }
})
config.global.plugins = [ElementPlus]
const user = {
  username: 'Alice',
  pwd: '111',
  tel: "13410762596"
}

let wrapper
let usernameInput
let telInput
let passInput
let pass2Input
let submitBtn

beforeEach(() => {
  wrapper = mount(UserRegisCom)
  usernameInput = wrapper.get('[data-testid="username"]')
  telInput = wrapper.get('[data-testid="telephone"]')
  passInput = wrapper.get('[data-testid="password"]')
  pass2Input = wrapper.get('[data-testid="password2"]')
  submitBtn = wrapper.get('[data-testid="submit"]')
})

afterEach(() => {
  wrapper.unmount()
  vi.clearAllMocks()
})



describe('username', () => {


  test('is requried', async () => {
    await usernameInput.trigger('blur');
    await new Promise((r) => setTimeout(r, 300));
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '用户名不能为空'
    )
  })

  test('is composed by Chinese, letter or number only', async () => {
    await usernameInput.setValue('@A')
    await usernameInput.trigger('blur');
    await new Promise((r) => setTimeout(r, 300));
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '用户名由汉字、字母、数字组成,且非纯数字'
    )
  })

  test('can not be number only', async () => {
    await usernameInput.setValue('1111')
    await usernameInput.trigger('blur');
    await new Promise((r) => setTimeout(r, 300));
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '用户名由汉字、字母、数字组成,且非纯数字'
    )
  })

  test('is longer than 4 characters', async () => {
    await usernameInput.setValue('Bob')
    await usernameInput.trigger('blur');
    await new Promise((r) => setTimeout(r, 300));
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '用户名长度为4-30'
    )
  })

  test('is not longer than 30 characters', async () => {
    await usernameInput.setValue('s123456789009876543211234567890')
    await usernameInput.trigger('blur');
    await new Promise((r) => setTimeout(r, 300));
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '用户名长度为4-30'
    )
  })

  test('is right', async () => {
    await usernameInput.setValue('Alice')
    await usernameInput.trigger('blur');
    await new Promise((r) => setTimeout(r, 300));
    expect(wrapper.find('.el-form-item__error').exists()).toBe(false)
  })
})

describe('telephone', () => {
  
  test('is requried', async () => {
    await telInput.trigger('blur')
    await new Promise((r) => setTimeout(r,300))
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '电话号码不能为空'
    )
  })

  test('begin with "1"', async () => {
    await telInput.setValue('23410762596')
    await telInput.trigger('blur')
    await new Promise((r) => setTimeout(r,300))
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '请输入正确的电话号码'
    )
  })

  test('has the second number within "3,4,5,7,8"', async () => {
    await telInput.setValue('11410762596')
    await telInput.trigger('blur')
    await new Promise((r) => setTimeout(r,300))
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '请输入正确的电话号码'
    )
  })

  test('has the length of 11', async () => {
    await telInput.setValue('134107625961')
    await telInput.trigger('blur')
    await new Promise((r) => setTimeout(r,300))
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '请输入正确的电话号码'
    )
  })

  test('is right', async () => {
    await telInput.setValue('13410762596')
    await telInput.trigger('blur')
    await new Promise((r) => setTimeout(r,300))
    expect(wrapper.find('.el-form-item__error').exists()).toBe(false)
  })
})

describe('password', () => {

  test('is required', async () => {
    await passInput.trigger('blur')
    await new Promise((r) => setTimeout(r, 300))
    expect(wrapper.find('.el-form-item__error').text()).toBe(
      '密码不能为空'
    )
  })

  test('is not longer than 20 characters', async () => {
    await passInput.setValue('q38rrc8nai3C8@3RWEIWN')
    await passInput.trigger('blur')
    await new Promise((r) => setTimeout(r, 300))
    expect(wrapper.find('.el-form-item__error').text()).toBe(
      '不超过20字符'
    )
  })

  test('is right', async () => {
    await passInput.setValue('kur1ha')
    await passInput.trigger('blur')
    await new Promise((r) => setTimeout(r, 300))
    expect(wrapper.find('.el-form-item__error').exists()).toBe(false)
  })
})

describe('password2', () => {
  
  test('is not required when password is empty', async () => {
    await pass2Input.trigger('blur')
    await new Promise((r) => setTimeout(r, 300))
    expect(wrapper.find('.el-form-item__error').exists()).toBe(false)
  })


  test('is not equal to password', async () => {
    await pass2Input.setValue('kur1ha1')
    await pass2Input.trigger('blur')
    await new Promise((r) => setTimeout(r, 300))
    expect(wrapper.get('.el-form-item__error').text()).toBe(
      '两次输入的密码不一致'
    )
  })

  test('is equal to password', async () => {
    await passInput.setValue('ueayff23n9rqw')
    await pass2Input.setValue(wrapper.vm.$data.user.password)
    await pass2Input.trigger('blur')
    await new Promise((r) => setTimeout(r, 300))
    expect(wrapper.find('.el-form-item__error').exists()).toBe(false)
  })
})

describe('submit button', () => {

  test('validate before send request', async () => {
    await submitBtn.trigger('click')
    await new Promise((r) => setTimeout(r, 300))
    // password2 won't throw error when password is null
    expect(wrapper.findAll('.el-form-item__error')).toHaveLength(3)

    expect(axios.post).not.toHaveBeenCalled()
  })
  // 这个只是测试是否发送请求，请求的正确性需要另外的测试文件
  test('send request', async () => {
    await usernameInput.setValue(user.username)
    await telInput.setValue(user.tel)
    await passInput.setValue(user.pwd)
    await pass2Input.setValue(user.pwd)
    await submitBtn.trigger('click')
    
    await new Promise((r) => setTimeout(r, 300))
    await flushPromises()
    expect(axios.post).toHaveBeenCalled()
  })
})