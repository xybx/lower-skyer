<template>
    <div class="layout-container animate__animated animate__backInLeft">
        <el-container>
           <Header />
            <el-main>
              <RouterView />
           </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Header from '../header/header.vue';

</script>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    background: url('@/assets/images/home/homebg.png') top center no-repeat;
    background-size: 100% 100%;
    .el-container{
      height: 100%;
      display:flex;
      flex-direction: column;
      flex:1;
      .el-main{
        padding: 0;
        overflow: hidden;
      }
  }
}
</style>