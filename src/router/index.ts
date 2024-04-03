// 创建路由器实例
import { createRouter,createWebHashHistory,RouteRecordRaw }  from 'vue-router'
// 静态路由
const constantRoutes:RouteRecordRaw[] = [
    {
        path:'/',
        component:()=>import('@/components/HelloWorld.vue')
    }
]
// 创建路由器实例
const router= createRouter({
    history:createWebHashHistory(),
    routes:constantRoutes as RouteRecordRaw[],
    // 刷新时，滚动条位置还原
    scrollBehavior:()=>({left:0,top:0})
});
// 重置路由
export function resetRouter(){
    router.replace({path:'/login'})
}
// 导出路由
export default router;