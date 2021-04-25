<template>
  <div class="search_container searchArea">
        <el-form 
            :inline="true" 
            :model='search_data' 
            :rules="rules"
            ref="search_data" 
            class="demo-form-inline search-form">
            <el-form-item label="">
                <el-input v-model="search_data.name" placeholder="用户名"  @keyup.enter.native='onScreeoutdata("search_data")'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size ="mini" icon="search" @click='onScreeoutdata("search_data")'>筛选</el-button>
            </el-form-item>
            <el-form-item class="btnRight">
                <el-button type="primary" size ="mini" icon="view" @click='onBatchDeldata()' :disabled="searchBtnDisabled">批量删除</el-button>
                <el-button type="primary" size ="mini" icon="view" @click='onAdddata()'>添加</el-button>
                <el-button style='margin:0 0 20px 20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">export excel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
   import { mapGetters } from 'vuex'

  export default {
      name:'searchItem',
      data(){
          return {
            downloadLoading: false,
            search_data:{
                startTime:'',
                endTime:'',
                name:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ]
            }
          }
      },
       computed:{
        ...mapGetters(['searchBtnDisabled']),

      },
      created(){
      },
      methods:{
            handleDownload() {
                    this.downloadLoading = true
                    import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['用户姓名', '籍贯', '登陆时间', '性别', '识别次数', '正确次数', '错误次数', '操作']
                    const filterVal = ['用户姓名', '籍贯', '登陆时间', '性别', '识别次数', '正确次数', '错误次数', '操作']
                    const list = this.tableData
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename || 'excel-list',
                        autoWidth: this.autoWidth
                    })
                    this.downloadLoading = false
                    })
                },
          onScreeoutdata(searchForm){
              this.$refs[searchForm].validate((valid) => {
					if (valid) {
                        this.$store.commit('SET_SEARCH',this.search_data);
                        this.$emit("searchList");
                    }
              })
          },
          onAdddata(){
              this.$emit("showDialog",'add');
          },
          onBatchDeldata(){
              this.$emit("onBatchDeldata");
          }
      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
</style>
