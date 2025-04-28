import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

// https://vite.dev/config/
export default defineConfig({
    base:'',
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue','vue-router','pinia'],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    server:{
        port:5168,
        open:true,
        hmr: {
            overlay: true,
        },
        host: "0.0.0.0",
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build:{
        outDir:'lowsky',
        assetsDir: "static",
        cssCodeSplit: true,
        chunkSizeWarningLimit: 20480,
        reportCompressedSize: true,
        minify: "esbuild", // 混淆器| 'terser' | 'esbuild'
        sourcemap: false,
        rollupOptions:{
            output: {
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name]-[hash].js",
                assetFileNames: (assetInfo:any)=>{
                   if(/\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)){
                       return 'static/images/[name]-[hash].[ext]'
                   } else if(/\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)){
                       return 'static/fonts/[name]-[hash].[ext]'
                   } else if(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)){
                       return 'static/media/[name]-[hash].[ext]'
                   } else {
                       return 'static/[ext]/[name]-[hash].[ext]'
                   }
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or 'modern' 解决scss api 被废弃的问题
            },
        },
        postcss: {
            plugins: [
                postcsspxtoviewport8plugin({
                    unitToConvert: 'px', // 要转化的单位
                    viewportWidth: 1920, // UI设计稿的宽度
                    unitPrecision: 3, // 转换后的精度，即小数点位数
                    propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                    viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                    fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                    selectorBlackList: [], // 指定不转换为视窗单位的类名，
                    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                    mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                    replace: true, // 是否转换后直接更换属性值
                    // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                    exclude: [],
                    landscape: false // 是否处理横屏情况
                })
            ]
        }
    }
});
