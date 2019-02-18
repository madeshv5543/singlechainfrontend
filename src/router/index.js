import Vue from 'vue'
import Router from 'vue-router'
import config from '@/services/config.js'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const tree = () => import('@/views/mypages/tree')

const PurchasOrder = () => import('@/views/mypages/purchaseOrder')
const ProductOrder = () => import('@/views/mypages/ProductOrder')
const viewedi = () => import('@/views/mypages/viewedi')
const productlist = () => import('@/views/mypages/productlist')
const product = () => import('@/views/mypages/product')




const newOrder = () => import('@/views/mypages/createOrder')
const profile = () => import('@/views/mypages/profile')
const editlist = () => import('@/views/mypages/editlist')
const editOrder = () => import('@/views/mypages/editOrder')
const viewOrder = () => import('@/views/mypages/orderview')
const newLoc = () => import('@/views/mypages/createLoc')
const poLanding  =  () => import('@/views/mypages/polanding')
const locLanding = () => import('@/views/mypages/locLanding')
const locList = () => import('@/views/mypages/loclist')
const editLoc = () => import('@/views/mypages/editLoc')
const viewLoc = () => import('@/views/mypages/viewLoc')
const BolLanding  = () => import('@/views/mypages/bol/landingBol')
const CreateBol = () => import('@/views/mypages/bol/createBol')
const BolList = () => import('@/views/mypages/bol/bolList')
const EditBol = () => import('@/views/mypages/bol/editBol')
const Viewbol= () => import('@/views/mypages/bol/viewBol')
const user = () => import('@/views/mypages/user')
const admin = () => import('@/views/mypages/admin')

const company = () => import('@/views/mypages/company')
const colist= () => import('@/views/mypages/colist')
const clist= () => import('@/views/mypages/clist')


Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/purchaseOrders',
          name: 'PurchaseOrder',
          component: poLanding
        },
        {
          path: '/purchaseOrderList',
          name: 'PurchaseOrderList',
          component: PurchasOrder
        },
        {
          path: '/viewedi',
          name: 'viewedi',
          component: viewedi
        },
        {
          path: '/productOrder',
          name: 'ProductOrder',
          component: ProductOrder
        },
        {
          path: '/product',
          name: 'createproduct',
          component: product
        },
        {
          path: '/productlist',
          name: 'product',
          component: productlist
        },
        {
          path: '/editlist/:id',
          name: 'editlist',
          component: editlist
        },
        {
          path: '/deletelist/:id',
          component: productlist
        },
        {
          path: '/loc',
          name: 'Loc',
          component: locLanding

        },
        {
          path: '/loclist',
          name: 'LocList',
          component: locList
        },
        {
          path: '/newOrder',
          name: 'NewOrder',
          component: newOrder
        },
        {
          path: '/tree',
          name: 'tree',
          component: tree
        },
        {
          path: '/newLoc',
          name: 'NewLoc',
          component: newLoc
        },
        {
          path: '/editLoc/:id',
          name: 'EditLoc',
          component: editLoc        
        },
        {
          path: '/viewLoc/:id',
          name: 'ViewLoc',
          component: viewLoc
        },
        {
          path: '/myprofile',
          name: 'MyProfile',
          component:  profile
        },
        {
          path: '/editOrder/:id',
          name: 'EditOrder',
          component:editOrder
        },
        {
          path: '/viewOrder/:id',
          name: 'ViewOrder',
          component: viewOrder
        },
        {
          path: '/bol',
          name: "BolLanding",
          component: BolLanding
        },
        {
          path: '/createBol',
          name: 'CreateBol',
          component: CreateBol
        },
        {
          path: '/bolList',
          name: 'BolList',
          component: BolList
        },
        {
          path: '/editBol/:id',
          name: 'EditBol',
          component: EditBol
        },
        {
          path: '/viewBol/:id',
          name: 'ViewBol',
          component: Viewbol
        },

        {
          path: 'mypages',
          redirect: '/mypages/user',
          name: 'user',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'user',
              name: 'user',
              component: user
            },
            {
              path: 'admin',
              name: 'admin',
              component: admin
            },
            {
              path: 'productlist',
              name: 'productlist',
              component: productlist
            },
            {
              path: 'company',
              name: 'company',
              component: company
            },
            {
              path: 'colist',
              name: 'colist',
              component: colist
            },
            {
              path: 'clist',
              name: 'clist',
              component: clist
            },
              ]
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Users'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login','/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = JSON.parse(localStorage.getItem(config.USER_DATA));

  if(authRequired && !loggedIn) {
      return next('login')
  }

  if(!authRequired && loggedIn) {
      return next('dashboard')
  }

  if(to.meta.canseesponser) {
      if(loggedIn.accountType.toLowerCase() === 'Seller'.toLowerCase()) {
          return next()
      }else {
          return next('dashboard')
      }
  }

  if(to.meta.canseecampaigner) {
      if(loggedIn.accountType.toLowerCase() === 'Buyer'.toLowerCase()) {
          return next()
      }else {
          return next('dashboard')
      }
  }

  next()

})

export default router;
