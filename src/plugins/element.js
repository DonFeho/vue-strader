import Vue from 'vue'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import { Switch, Dropdown, DropdownMenu, DropdownItem, Loading, Button } from 'element-ui'

// Vue.use(ElementUI, { locale })
Vue.use({ locale })

Vue.use(Switch)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.use(Loading.directive)
