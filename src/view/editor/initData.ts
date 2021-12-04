import { TextComponentProps } from '@caee/caee-page-build-components'

export const initComps: Partial<TextComponentProps>[] = [
  {
    tag: 'h1',
    text: '一级标题',
    fontSize: '30px',
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: '"SimSun","STSong"',
    lineHeight: '1',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  {
    tag: 'h2',
    text: '二级标题',
    fontSize: '24px',
    fontWeight: '600',
  },
  {
    tag: 'p',
    text: '正文文字',
    fontSize: '16px',
    lineHeight: '1.2',
  },
  {
    tag: 'a',
    text: '链接内容',
    actionType: 'url',
    url: 'https://www.baidu.com/',
  },
  {
    tag: 'div',
    text: '示例按钮',
    width: '78px',
    height: '24px',
    lineHeight: '1.2',
    borderRadius: '2px',
    backgroundColor: '#0288d1',
    color: '#fff',
    textAlign: 'center',
  },
]
