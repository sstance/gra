<template>
    <div class="fillcontain">
        <search-item @showDialog="showaddDialog" @searchList="getList" @onBatchDeldata="onBatchDeldata"></search-item>
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                align='center'
                @select="selectTable"
                @select-all="selectAll"
                >
              <el-table-column
                v-if="idFlag"
                prop="id"
                label="id"
                align='center'
                width="180">
            </el-table-column>
            <el-table-column
                type="selection"
                align='center'
                width="60">
            </el-table-column>
              <el-table-column
                prop="username"
                label="用户姓名"
                align='center'
                width="80">
            </el-table-column>
              <el-table-column
                v-if="idFlag"
                prop="address"
                label="籍贯"
                align='center'
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="籍贯"
                align='center'
                >
                 <template slot-scope="scope">  
                    <span style="color:#00d053">+ {{ scope.row.tableAddress || scope.row.address }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="登录时间"
                align='center'
                sortable
                width="170">
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="gender"
                label="性别"
                align='center'
                width="130"
                :formatter="formatterType"
                :filters="fields.gender.filter.list"
                :filter-method="filterType">
            </el-table-column>
            <el-table-column
                prop="iden_num"
                label="识别次数"
                align='center'
                width="130"
                sortable> 
                <template slot-scope="scope">  
                    <span style="color:#00d053">{{ scope.row.iden_num }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="cor_num"
                label="正确次数"
                align='center'
                width="130"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#f56767">{{ scope.row.cor_num }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
                prop="operation"
                align='center'
                label="操作"
                width="180">
                <template slot-scope='scope'>
                    <el-button 
                        type="warning" 
                        icon='edit' 
                        size="mini"
                        @click='onEditdata(scope.row)'
                    >编辑</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onDeletedata(scope.row,scope.$index)'
                    >删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addDialog  v-if="addDialog.show" :isShow="addDialog.show" :dialogRow="addDialog.dialogRow"  @getFundList="getList"  @closeDialog="hideaddDialog"></addDialog>
        </div>
    </div>
    
</template>

<script>
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils'
    import SearchItem from "./components/searchItem";
    import addDialog from "./components/addDialog";
    import Pagination from "@/components/pagination";
    import { getgender , removedata, batchremovedata } from "@/api/data";

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:0,
                loading:true,
                idFlag:false,
                isShow:false, // 是否显示资金modal,默认为false
                editid:'',
                rowIds:[],
                sortnum:0,
                format_type_list: {
                    1: '男',
                    2: '女',    
                },
                addDialog:{  
                    show:false,
                    dialogRow:{}
                },
                NumData:{
                    page:1,
                    limit:20,
                    name:''
                },
                pageTotal:0,
                // 用于列表筛选
                fields: {
                    gender:{
                        filter: {
                            list: [{
                                text: '男',
                                value: 1
                            },{
                                text: '女',
                                value: 2
                            }],
                            multiple: true
                        }
                    },
                },
               
            }
        },
        components:{
            SearchItem,
            addDialog,
            Pagination
        },
        computed:{
            ...mapGetters(['search'])
        },
      	mounted() {
            this.getList();
	   },
        methods: {

            setAddress(value){

            },
            setTableHeight(){
                this.$nextTick(() => {
                   this.tableHeight =  document.body.clientHeight - 2
                })
            },
           
            getList(){
                const para = Object.assign({},this.NumData,this.search);
                getgender(para).then(res => {
                     this.loading = false;
                     this.pageTotal = res.data.total
                     this.tableData = res.data.moneyList
                })
            },
            // 显示资金弹框
            showaddDialog(val){
                this.$store.commit('SET_DIALOG_TITLE', val)
                this.addDialog.show = true;
            },
            hideaddDialog(){
                this.addDialog.show = false;
            },
            // 上下分页
            handleCurrentChange(val){
                this.NumData.page = val;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val){
                this.NumData.limit = val;
                this.getList()
            },
            getPay(val){
               if(mutils.isInteger(val)){
                   return -val;
               }else{
                   return val;
               }
            },
            /**
            * 格式化状态
            */
            formatterType(item) {
                const type = parseInt(item.gender);
                return this.format_type_list[type];
            },
            filterType(value, item) {
                const type = parseInt(item.gender);
                return this.format_type_list[value] == this.format_type_list[type];
            },
            // 编辑操作方法
            onEditdata(row){
                this.addDialog.dialogRow = {...row};
                this.showaddDialog();
            },
            // 删除数据
            onDeletedata(row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const para = { id: row.id }
                    removedata(para).then(res => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getList()
                    })
                })
                .catch(() => {})
            },
            onBatchDeldata(){
                this.$confirm('确认批量删除记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const ids = this.rowIds.map(item => item.id).toString()
                    const para = { ids: ids }
                    batchremovedata(para).then(res => {
                        this.$message({
                            message: '批量删除成功',
                            type: 'success'
                        })
                        this.getList()
                    })
                })
                .catch(() => {})
            },
            // 当用户手动勾选数据行的 Checkbox 时触发的事件
            selectTable(val, row){
                this.setSearchBtn(val);
            },
            // 用户全选checkbox时触发该事件
            selectAll(val){
                 val.forEach((item) => {
                     this.rowIds.push(item.id);
                });
                this.setSearchBtn(val);
            },
            setSearchBtn(val){
                let isFlag = true;
                if(val.length > 0){
                    isFlag = false;
                }else{
                    isFlag = true;
                }
                this.$store.commit('SET_SEARCHBTN_DISABLED',isFlag);
            }
        },
    }
</script>

<style lang="less" scoped>
    .table_container{
        padding: 10px;
        background: #fff;
        border-radius: 2px;
    }
    .el-dialog--small{
       width: 600px !important;
    }
    .pagination{
        text-align: left;
        margin-top: 10px;
    }
     
</style>


