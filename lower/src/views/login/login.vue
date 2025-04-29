<template>
    <div class="login-container animate__animated animate__backInLeft">
        <el-row>
            <el-col :span="24">
                <div class="headFont">
                    <h3 class="animate__animated animate__backInDown animate__delay-1s">{{headFont}}</h3>
                </div>
                <div class="loginbody">
                    <div class="bodyleft animate__animated animate__fadeInLeft animate__delay-1s">
                        <div class="leftbox">
                            <div class="leftline animate__animated animate__fadeInUp animate__delay-1s">
                                <u class="upfont animate__animated animate__zoomInUp animate__delay-2s">高</u>
                                <span class="animate__animated animate__fadeInLeft animate__delay-2s">人工智能辅助</span>
                                <u class="lowfont animate__animated animate__zoomInDown animate__delay-2s">低</u>
                            </div>
                            <div class="fontcont">
                                <ul class="contlist">
                                    <li v-for="(item,index) in fontData" :key="index">
                                        <dl class="fontitem">
                                            <dt class="itemtit animate__animated" :class="item.className1">{{item.title}}</dt>
                                            <div class="itembox animate__animated" :class="item.className2">
                                                <dd v-for="(val,k) in item.children" :key="k" :class="['animate__animated ', val.className]">{{val.title}}</dd>
                                            </div>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <div class="bottomline animate__animated animate__backInLeft animate__delay-1s">
                                <u class="onefont animate__animated animate__fadeInDown animate__delay-2s">第一层次</u>
                                <u class="twofont animate__animated animate__fadeInDown animate__delay-3s">第二层次</u>
                                <u class="thdfont animate__animated animate__fadeInDown animate__delay-4s">第三层次</u>
                                <span class="animate__animated animate__flipInX animate__delay-2s">决策参考时序</span>
                            </div>
                        </div>
                    </div>
                    <div class="bodyright animate__animated animate__fadeInRight animate__delay-1s">
                        <el-card class="formbody animate__animated animate__pulse animate__delay-3s">
                            <h3>用户登录</h3>
                            <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="loginbox">
                               <el-form-item prop="phone">
                                   <el-input v-model.trim="loginForm.phone" autofocus clearable placeholder="请输入手机号" maxlength="11" type="text">
                                       <template #prefix>
                                          <i class="iconfont icon-shoujihao"></i>
                                       </template>
                                   </el-input>
                               </el-form-item>
                                <el-form-item prop="code">
                                    <el-input v-model.trim="loginForm.code" autofocus clearable maxlength="6" placeholder="请输入验证码" type="text" @keyup.enter="handleLogin">
                                        <template #prefix>
                                            <i class="iconfont icon-yanzhengma1"></i>
                                        </template>
                                        <template #append>
                                            <span v-if="showcode" class="wx-code" @click="handleCode">获取微信验证码</span>
                                            <span v-else>{{ timeCount }}秒后重新获取</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-button :loading="loading" type="primary" size="large" class="logbtn" @click.prevent="handleLogin">登 录</el-button>
                                <span class="tips" @click="handleTips">首次登录需先绑定个人微信</span>
                            </el-form>
                        </el-card>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import {isPhone} from '@/utils/validate';
import type { FormRules } from 'element-plus';
import { useUserStore } from '@/stores/modules/user'

interface FontProps{
      title?: string,
      className?:string,
      className1?:string,
      className2?:string,
      children?: FontProps[] | []
  }
  const route = useRoute()
  const router = useRouter()
  const showcode = ref<boolean>(true)
  const loading = ref<boolean>(false)
  const headFont = ref<string>('')
  const fontData = ref<FontProps[] | []>([])
  const loginRef = ref<any>()
  const loginForm = ref({})
  const login = (form:any)=> useUserStore().login(form)
  const timeCount = ref<number>(60);
  let intervalId:any = null;


  const validatePhone = (rule: any, value: any, callback: any) => {
        if (!isPhone(value)) callback(new Error("请输入正确的手机号格式"));
        else callback();
  };

  const loginRules = reactive<FormRules>({
      phone: [{ required: true, trigger: "blur", message: "请输入手机号", }, { min: 11, message: "请输入正确的手机号格式", trigger: "blur", validator: validatePhone,}],
      code: [
          { required: true, trigger: "blur", message: "请输入验证码" },
          { min: 6, max: 6, trigger: "blur", message: "请输入正确格式的验证码"},
      ],
  })


  const handleCode = ()=>{
      showcode.value = false;
      countdown(59);
      getPhoneCode();
  }

  const countdown = (seconds: number) => {
    return new Promise((resolve, reject) => {
        let remainingSeconds = seconds;
        intervalId = setInterval(() => {
            if (remainingSeconds === -1) {
                showcode.value = true;
                clearInterval(intervalId);
                resolve("success");
            } else {
                timeCount.value = remainingSeconds;
                console.log("剩余时间：" + remainingSeconds + "秒");
                remainingSeconds--;
            }
        }, 1000);
    });
  };

  const getPhoneCode = async () => {
    // let params = { phone: Number(loginForm.value.phone) };
    // let res = (await getCode(params).catch((err: any) => {
    //     ElMessage.error("发送失败");
    // })) as any;
    // if (res.code == 200) {
    //     ElMessage.success("已发送");
    // } else {
    //     ElMessage.error("发送失败");
    // }
  };

  const handleTips = ()=>{

  }

  const getLoginInfo = ()=>{
      headFont.value = '福清市工业发展大模型平台'
  }
  const getFontData = ()=>{
      let arr = [
          {title:'工业基础数据信息仓',className1:'animate__bounceInDown animate__delay-2s',className2:'animate__bounceInUp animate__delay-2s',children:[{title:'低效工业用地评估',className:'animate__fadeInLeft animate__delay-3s'},{title: '企业生产经营大数据',className:'animate__fadeInLeft animate__delay-4s'},{title: '项目建设全周期管理',className:'animate__fadeInRight animate__delay-3s'}]},
          {title:'产业链与用地画像仓',className1:'animate__bounceInDown animate__delay-2s',className2:'animate__bounceInUp animate__delay-2s',children:[{title:'产业链运行空间画像',className:'animate__zoomIn animate__delay-3s'},{title: '产业链评估',className:'animate__zoomIn animate__delay-4s'},{title: '产业区位分析',className:'animate__zoomIn animate__delay-5s'},{title: '产业聚集度分析',className:'animate__zoomIn animate__delay-3s'},{title: '产业缺位分析',className:'animate__zoomIn animate__delay-4s'},{title: '产业关联度分析',className:'animate__zoomIn animate__delay-5s'},{title: '产业链运行状态',className:'animate__zoomIn animate__delay-4s'}]},
          {title:'工业发展辅助决策仓',className1:'animate__bounceInDown animate__delay-2s',className2:'animate__bounceInUp animate__delay-2s',children:[{title: '工业用地招商一张图',className:'animate__flipInX animate__delay-3s'},{title: '工业发展态势分析台',className:'animate__flipInX animate__delay-3s'},{title: '闲置土地管理与展示',className:'animate__flipInX animate__delay-4s'},{title: '低效企业管理与展示',className:'animate__flipInX animate__delay-4s'},{title: '增量用地管理与展示',className:'animate__flipInX animate__delay-5s'},{title: '工业全产业链分布图',className:'animate__flipInX animate__delay-5s'}]}
      ]
      fontData.value = arr
  }

  const handleLogin = async ()=>{
      await login(loginForm.value)
      ElMessage.success('登录成功')
      setTimeout(()=>{
          router.push('/')
      },500)
      // if (loginRef.value){
      //     loginRef.value?.validate(async (valid:any)=>{
      //         console.log(45646);
      //         // ElMessage.error('开发中...')
      //
      //
      //     })
      // }
  }


  onMounted(()=>{
      getLoginInfo()
      getFontData()
  })


</script>

<style lang="scss" scoped>
@use './login.scss';
</style>