
export const topRouterMap = [
    {
        'parentName':'infoShow',
        'data':[
            {
                path: 'infoShow1',
                name: 'infoShow1',
                meta: {
                    title: '个人信息子菜单1',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/infoManage/infoShow')
            },
            {
                path: 'infoShow2',
                name: 'infoShow2',
                meta: {
                    title: '个人信息子菜单2',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/identify/IdenData')
            },
            
            
        ]
    },
    {
        'parentName':'infoModify',
        'data':[
            {
                path:'infoModify1',
                name:'infoModify1',
                meta:{
                    title:'修改信息菜单',
                    icon:'fa-asterisk',
                    routerType:'topmenu'
                },
                component: () => import('@/page/infoManage/infoModify')
            },
          
        ]
    }
]


