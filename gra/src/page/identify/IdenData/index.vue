<template>
    <div class="fillcontain">
     <el-empty description="描述文字"></el-empty>
   </div>
</template>

<script>    
    import { mapGetters } from "vuex";
    export default {
        name:'IdenData',
        data(){
            return {

            }
        },
        computed:{
            ...mapGetters(['topTitle'])
        },
        created(){
            
        },
        methods:{

        }
    }

</script>

<style lang="less" scoped>

</style>