import { shallowMount, VueWrapper, flushPromises } from '@vue/test-utils'
import axios, { AxiosStatic } from 'axios'
import Uploader from '../index.vue'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<AxiosStatic>
const mockComponents = {
  'el-button': { template: '<button><slot></slot></button>' },
  'el-icon': { template: '<i><slot></slot></i>' },
}

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
function setInputValue(input: HTMLInputElement) {
  const fileList = [testFile] as unknown as FileList
  Object.defineProperty(input, 'files', {
    value: fileList,
    writable: false,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: VueWrapper<any>
describe('测试组件Uploader', () => {
  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: { action: 'test.url' },
      global: {
        stubs: mockComponents,
      },
    })
  })
  it('1.上传前能正确渲染组件', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.get('button').text()).toBe('点击上传')
    expect(wrapper.get('input').isVisible()).toBeFalsy()
  })
  it('2.上传成功过程能正确展示', async () => {
    mockAxios.post.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { download_url: 'test-url' } })
          })
        })
    )
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    await wrapper.get('input').trigger('change')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button').text()).toBe('上传中')
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
    expect(wrapper.findAll('li').length).toBe(1)
    const lastChild = wrapper.find('li:last-child')
    expect(lastChild.classes()).toContain('caee-uploader__list-item--loading')
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('点击上传')
    expect(lastChild.classes()).toContain('caee-uploader__list-item--success')
    expect(wrapper.get('.caee-uploader__list-item-name').text()).toBe(
      testFile.name
    )
  })
  it('3.上传失败过程能正确展示', async () => {
    mockAxios.post.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          setTimeout(reject)
        })
    )
    await wrapper.get('input').trigger('change')
    expect(mockAxios.post).toHaveBeenCalledTimes(2)
    expect(wrapper.get('button').text()).toBe('上传中')
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
    expect(wrapper.findAll('li').length).toBe(2)
    const lastChild = wrapper.find('li:last-child')
    expect(lastChild.classes()).toContain('caee-uploader__list-item--loading')
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('点击上传')
    expect(lastChild.classes()).toContain('caee-uploader__list-item--error')
    await wrapper.get('.caee-uploader__del-icon').trigger('click')
    expect(wrapper.findAll('li').length).toBe(1)
  })
  it('4.slot插槽能正常工作', async () => {
    mockAxios.post.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { download_url: 'test-url.com' } })
          })
        })
    )
    const wrapper = shallowMount(Uploader, {
      props: { action: 'test.url' },
      global: {
        stubs: mockComponents,
      },
      slots: {
        default: '<button class="custom-button">click-up</button>',
        loading: '<div class="custom-loading">loading</div>',
        uploaded: `<template #uploaded="{ uploadedData }">
          <div class="custom-result">{{ uploadedData.download_url }}</div>
        </template>`,
      },
    })
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    expect(wrapper.get('.custom-button').text()).toBe('click-up')
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('.custom-loading').text()).toBe('loading')
    await flushPromises()
    expect(wrapper.get('.custom-result').text()).toBe('test-url.com')
  })
})
