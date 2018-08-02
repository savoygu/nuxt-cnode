import Vue from 'vue'

import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'

import Row from '~/components/row'
import '~/components/row/index.scss'

import Col from '~/components/col'
import '~/components/col/index.scss'

import Pagination from '~/components/pagination'
import '~/components/pagination/index.scss'

Vue.component('cn-breadcrumb', Breadcrumb)
Vue.component('cn-breadcrumb-item', BreadcrumbItem)
Vue.component('cn-row', Row)
Vue.component('cn-col', Col)
Vue.component('cn-pagination',Pagination)
