export const TABS = {
  all: { title: 'CNode技术社区', name: '全部', totalPage: 740 },
  good: { title: '精华板块', name: '精华', totalPage: 18 },
  share: { title: '分享板块', name: '分享', totalPage: 203 },
  ask: { title: '问答板块', name: '问答', totalPage: 323 },
  job: { title: '招聘板块', name: '招聘', totalPage: 65 },
  dev: { title: '客户端测试板块', name: '客户端测试', totalPage: 153 },
}

export type TabKey = keyof typeof TABS

export const TAB_KEYS = Object.keys(TABS)

export const TAB_MAP = Object.fromEntries(TAB_KEYS.map(key => [key, TABS[key as TabKey]]))
