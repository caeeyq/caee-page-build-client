import { shallowMount, VueWrapper, flushPromises } from '@vue/test-utils'
import axios, { AxiosStatic } from 'axios'
import Uploader from '../index.vue'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<AxiosStatic>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: VueWrapper<any>

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('测试组件Uploader', () => {
  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: { action: 'test.url' },
    })
  })
  it('1.上传前能正确渲染组件', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.get('button').text()).toBe('点击上传')
    expect(wrapper.get('input').isVisible()).toBeFalsy()
  })
  it('2.上传成功过程能正确展示', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: { download_url: 'test-url' } })
    const fileInput = wrapper.get('input').element as HTMLInputElement
    const fileList = [testFile] as unknown as FileList
    Object.defineProperty(fileInput, 'files', {
      value: fileList,
      writable: false,
    })
    await wrapper.get('input').trigger('change')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button').text()).toBe('上传中')
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('上传成功')
  })
  it('3.上传失败过程能正确展示', async () => {
    mockAxios.post.mockRejectedValueOnce({ status: 'error' })
    await wrapper.get('input').trigger('change')
    expect(mockAxios.post).toHaveBeenCalledTimes(2)
    expect(wrapper.get('button').text()).toBe('上传中')
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('上传失败')
  })
})
