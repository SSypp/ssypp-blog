import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import * as types from "@/store/types"
import HelloWorld from '@/components/HelloWorld'
import Article from "@/components/article/article"
import ArticleDetails from "@/components/article/articledetail"
import ArticleList from "@/components/article/articlelist"
import AddArticle from "@/components/article/addarticle"
import Categories from "@/components/categories/categories"
import Add from "@/components/categories/add"
import Kind from "@/components/categories/catelist"
import Status from "@/components/user/status"
import Login from "@/components/user/login"
import Reg from "@/components/user/regs"
import Error4 from "@/components/error/404"
import Dev from "@/components/error/await"


Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: 'article',
      children: [{
          path: 'article',
          component: Article,
          redirect: 'article/articlelist',
          children: [{
              path: 'articlelist',
              component: ArticleList,
            },
            {
              path: 'addarticle',
              component: AddArticle,
            }
          ]},
          {
            name:"detail",
            path: 'details/:id',
            component: ArticleDetails,
          },
          {
          path: 'categories',
          component: Categories,
          redirect: 'categories/kind',
          children: [{
              path: 'kind',
              component: Kind,
            },
            {
              path: 'add',
              component: Add,
            }
          ]
        },
        {
          path: 'user',
          component: Status
        },
        {
          path: 'dev',
          component: Dev
        }
      ],
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: "*",
      component: Error4
    }
  ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem("token")) {
  store.commit(types.LOGIN, window.localStorage.getItem("token"))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})

export default router;
