<template>
  <div class="Table">
    <el-table
      :data="tableData"
      stripe
      height="424"
      style="width: 100%">
      <el-table-column
        class-name="salesUsername"
        prop="username"
        label="姓名"
        width="150"
      >
        <template slot-scope="scope">
            <img class="userImg" :src="userImg" alt="tuxiang"/>
            {{(scope.row.username).substring(0,12)}}
        </template>
      </el-table-column>
      
      <el-table-column
        prop="date"
        label=" 日期"
        width="180"
      >
        <template slot-scope="scope">
           <icon-svg icon-class="icontime" />
           {{scope.row.date}}
        </template>
      </el-table-column>
      <el-table-column
        class-name="Status"
        prop="status"
        label="状态"
        >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1" class="saleBgcolor">隐身</span>
          <span v-if="scope.row.status === 2" class="taxBgcolor">离线</span>
          <span v-if="scope.row.status === 3" class="extenedBgcolor">在线</span>
          <span v-if="scope.row.status === 4" class="likeBgcolor">隐身</span>
        </template>
      </el-table-column>
    
    </el-table>
  </div>
</template>

<script>
  import { getSalesTableList } from "@/api/sales";
  import userImg from "@/assets/img/iu.jpg";

  export default {
    data() {
      return {
        tableData: [],
        userImg:userImg
      }
    },
    mounted(){
        this.getSalesList();
    },
    methods:{
        // 获取列表数据
        getSalesList(){
            getSalesTableList({}).then(res => {
                console.log(res);
                this.pageTotal = res.data.total
                this.tableData = res.data.list
            })
        },
    }
  }
</script>

<style lang="less" scoped>

</style>