<template>
    <div class="skybox">
        <el-skeleton :rows="24" :loading="loading" :throttle="{leading: 200, trailing:200, initVal: true }" animated>
            <template #default>
                <el-container>
                    <el-main>
                        <div class="headBanner animate__animated animate__fadeInLeft">
                            <h3 class="animate__animated animate__backInDown animate__delay-1s">{{headTitZn}}</h3>
                            <span class="animate__animated animate__backInUp animate__delay-1s">{{headTitEn}}</span>
                        </div>
                        <div class="imglist">
                            <div :class="['imgitem animate__animated animate__delay-1s',item.class]" v-for="(item,index) in imgData" :key="index">
                                <el-image :src="item.url" :initial-index="index" :preview-src-list="previewList" preview-teleported></el-image>
                            </div>
                        </div>
                        <ul class="linklist">
                            <li v-for="(item,index) in linkData" :key="index" :style="computedStyle[index]">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </el-main>
                    <el-footer>
                        <p><span>{{footTitOne}}</span>{{footTitTwo}}</p>
                    </el-footer>
                </el-container>
            </template>
        </el-skeleton>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, computed } from 'vue';
    import littleOne from "@/assets/images/litimg1.jpg"
    import littleTwo from "@/assets/images/litimg2.jpg"
    import littleThd from "@/assets/images/litimg3.jpg"
    import littleFou from "@/assets/images/litimg4.jpg"
    import bigOne from "@/assets/images/bigimg1.jpg"
    import bigTwo from "@/assets/images/bigimg2.jpg"
    import bigThd from "@/assets/images/bigimg3.jpg"
    import bigFou from "@/assets/images/bigimg4.jpg"
    import linkPic from "@/assets/images/footbg.jpg"
    import linkPic2 from "@/assets/images/bg1.png"
    interface linkProps{
        url?:string,
        title?:string
    }
    const loading = ref<boolean>(true)
    const headTitZn = ref<string>('')
    const headTitEn = ref<string>('')
    const footTitOne = ref<string>('')
    const footTitTwo = ref<string>('')
    const imgData = ref<string[]>([])
    const previewList = ref<string[]>([])
    const linkData = ref<linkProps[]|[]>([])

    const getHeadTitle = ()=>{
        headTitZn.value = '福清低空经济新赛道'
        headTitEn.value = 'Fuqing low altitude economy new track'
    }

    const getFootTitle = ()=>{
        footTitOne.value = '本栏目由福清市自然资源和规划局创办'
        footTitTwo.value = '欢迎服务于自然资源和城市规建管领域的福清低空经济新质生产力企业入驻该栏目'
    }

    const getImgList = ()=>{
        let arr = [{url:littleOne,class:'animate__backInLeft'},{url:littleTwo,class:'animate__backInRight'},{url:littleThd,class: 'animate__bounceInUp'},{url:littleFou,class:'animate__fadeInUp'}]
        let nrr = [bigOne,bigTwo,bigThd,bigFou]
        imgData.value = arr
        previewList.value = nrr
    }

    const computedStyle = computed({
        get: () => {
            return linkData.value.map(item=>{
                return {background:'url('+ item.url +') top center no-repeat'}
            })
        },
        set: (v) => {
            return v;
        },
    })

    const getLink = ()=>{
        let link = [
            {url:linkPic,title:'待入住企业'},
            {url:linkPic,title:'待入住企业'},
            {url:linkPic,title:'待入住企业'},
            {url:linkPic,title:'待入住企业'},
            {url:linkPic,title:'待入住企业'},
            {url:linkPic,title:'待入住企业'},
        ]
        linkData.value = link
    }
    function getload(){
        setTimeout(()=>{
            loading.value = false
        },360)
    }

    onMounted(()=>{
        getHeadTitle()
        getFootTitle()
        getImgList()
        getLink()
        getload()
    })

</script>

<style lang="scss" scoped>
@use './skyhome.scss';
</style>