<template>
    <component :is="headerRender()"></component>
</template>

<script lang="tsx" setup>
import {useUserStore} from '@/stores/modules/user';
import { getYearDay, timeSec,getWeek } from '@/utils/timer';

const userName = ref<string>('系统管理员');
let timestamp = ref<any>(null)
const years = ref<string>('')
const weeks = ref<string>('')
const timer = ref<string>('')
const router = useRouter()
const {resetAll} = useUserStore()

const logout = ()=>{
    resetAll()
    router.push('/login')
}

const manageClick = ()=>{
    ElMessage.warning('努力开发中，请耐心等待...')
}

const getYear = ()=>{
    years.value = getYearDay()
}

const currentTime = ()=>{
    weeks.value = getWeek()
    timer.value = timeSec()
    clearInterval(timestamp.value);
    timestamp.value = setInterval(()=>{
        currentTime()
    },1000)
}

onMounted(()=>{
    getYear()
    currentTime()
})

onUnmounted(()=>{
    clearInterval(timestamp.value)
})

const headerRender = ()=>{
    return (
        <el-header class="header-container">
            <div class="headerL animate__animated animate__backInLeft animate__delay-1s">
                <span>{years.value}</span>
                <span><u>{weeks.value}</u>{timer.value}</span>
                <span>欢迎您：{userName.value}</span>
            </div>
            <div class="headerR animate__animated animate__fadeInRight animate__delay-1s">
               <el-button onClick={manageClick}>运维管理</el-button>
               <el-button onClick={logout}>退出登录</el-button>
            </div>
        </el-header>
    )
}

</script>

<style lang="scss" scoped>
@use './header.scss';
</style>