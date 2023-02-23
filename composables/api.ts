export const tabsInfo = {
  all: { title: 'CNode技术社区', name: '全部', total: 740 },
  good: { title: '精华板块', name: '精华', total: 18 },
  share: { title: '分享板块', name: '分享', total: 203 },
  ask: { title: '问答板块', name: '问答', total: 323 },
  job: { title: '招聘板块', name: '招聘', total: 65 },
  dev: { title: '客户端测试板块', name: '客户端测试', total: 153 }
}

export type Tab = keyof typeof tabsInfo

export const validTabs = Object.keys(tabsInfo) as Tab[]
