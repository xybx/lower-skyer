<template>
    <div class="layout-container">
        <el-header>
            头部组件
        </el-header>
        <div class="layout-main">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.layout-main {
    flex: 1;
}
</style>