<template>
    <component :is="homeRneder()"></component>
</template>

<script lang="tsx" setup>
import type { ListProps } from './homeType';

const homeTit = ref<string>('福清市工业发展大模型平台')
const ListData = ref<ListProps[] | []>([])

const getList = ()=>{
    ListData.value = [
      {pid:1,icon:'icon-hangyechanyelian',className:'animate__backInUp',title:'项目建设管理全周期',content:'构建工业项目全生命周期监管体系，借助信息化手段，实现全周期闭合管理，有效防止产生低效用地、闲置土地问题。'},
      {pid:1,icon:'icon-liuchengguanli',className:'animate__zoomInDown',title:'企业生产经营大数据',content:'对各职能部门在项目落地过程中的工作执行效能进行跟踪监督，实现全流程超时预警，结果纳入全市绩效管理体系。'},
      {pid:1,icon:'icon-jianguan3',className:'animate__zoomInUp',title:'产业链与用地画像仓',content:'构建商业综合体项目全生命周期监管体系，借助信息化手段，发挥商业综合体价值，提升城市生活品质，改善营商环境。'},
      {pid:1,icon:'icon-gongyeyongdi',className:'animate__fadeInUp',title:'工业用地招商一张图',content:'构建工业项目全生命周期监管体系，借助信息化手段，实现全周期闭合管理，有效防止产生低效用地、闲置土地问题。'},
      {pid:1,icon:'icon-anquantaishi',className:'animate__fadeInRight',title:'工业发展态势分析台',content:'对各职能部门在项目落地过程中的工作执行效能进行跟踪监督，实现全流程超时预警，结果纳入全市绩效管理体系。'},

    ]
}

onMounted(()=>{
    getList()
})


const homeRneder = ()=>{
    return (
        <div class="home-container">
            <h3 class="animate__animated animate__backInDown animate__delay-1s">{homeTit.value}</h3>
            <ul class="listbox">
                {
                   ListData.value.map((item:ListProps) =>{
                       return (
                           <li class={['animate__animated animate__delay-2s',item.className]}>
                               <i class={['iconfont', item.icon]}></i>
                               <h3>{item.title}</h3>
                               <p>{item.content}</p>
                           </li>
                       )
                   })
                }
            </ul>
        </div>
    )
}

</script>

<style lang="scss" scoped>
@use './home.scss';
</style>