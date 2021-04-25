<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="addFundDialog.title" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <div class="form">
            <el-form 
                ref="form" 
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth" 
                style="margin:10px;width:auto;">
                 <el-form-item prop='username' label="用户名:">
                    <el-input type="text" v-model="form.username"></el-input>
                </el-form-item>
                
                <el-form-item prop='gender' label="性别:" >
                    <el-select v-model="form.gender" placeholder="性别">
                        <el-option
                            v-for="item in payType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item prop="address" label="籍贯:">
                    <el-cascader
                        v-model="form.address"
                        placeholder="请选择地区"
                        :props="{ expandTrigger: 'hover'}"
                        :options="areaData"
                        @change="handleChange"
                        ref="cascaderAddr">
                    </el-cascader>
                </el-form-item>
                
                 <el-form-item prop='iden_num'  label="识别次数:">
                    <el-input v-model.number="form.iden_num"></el-input>
                </el-form-item>

                <el-form-item prop='cor_num' label="正确次数:">
                    <el-input v-model.number="form.cor_num"></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
   import { mapState, mapGetters } from 'vuex'
   import { adddata,updatedata } from "@/api/data";
   import AreaJson from "@/assets/datas/area.json"

  export default {
      name:'addDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    //income
                    if(rule.field == "iden_num"){
                        text='识别次数';
                    }else if(rule.field == "cor_num"){
                        text='正确次数';
                    }
                    callback(new Error(text+'不能为空~'));
                }else{
                   let numReg = /^[0-9]+.?[0-9]*$/;
                   if(!numReg.test(value)){
                      callback(new Error('请输入正数值'));
                   }else{
                      callback();
                   }
                }
            };
          return {
            areaData:[],
            isVisible: this.isShow,
            form:{
                //incomePayType
                gender:'',
                address:[],
                tableAddress:'',
                username: '',
                 //income
                iden_num: '',
                cor_num:'',
                remarks: ''
            },
            payType:[
                {label:'男',value:'1'},
                {label:'女',value:'2'},
             
            ],
            form_rules: {
                username   : [
                    {required: true, message : '用户名不能为空！',trigger : 'blur'}
                ],
                 //income
                iden_num   : [
                    { required: true, validator:validateData,trigger: 'blur'}
                ],
                cor_num   : [
                    { required: true, validator:validateData,trigger: 'blur'}
                ],
                //incomePayType
                gender:[
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                address:[
                    { required: true, message: '请选择籍贯', trigger: 'change' }
                ]
            },
            //详情弹框信息
            dialog: {
                width:'400px',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean,
          dialogRow:Object
      },
      computed:{
        ...mapGetters(['addFundDialog']),
      },
      created(){
            this.areaData = AreaJson
      },
      mounted(){
        if(this.addFundDialog.type === 'edit'){
            this.form = this.dialogRow;
            console.log(this.form);
            
            this.form.gender = (this.dialogRow.gender).toString();
            // this.form.address = ["120000", "120200", "120223"]

        }else{
            this.$nextTick(() => {
                this.$refs['form'].resetFields()
            })
        }
      },
      methods:{
          getCascaderObj(val, opt){
            return val.map(function (value, index, array) {
                for (var item of opt) {
                    if (item.value == value) { 
                        opt = item.children; 
                        return item.label; 
                    }
                }
                return null;
            });
         },
          handleChange(value) {
            console.log([...value]); // ["120000", "120200", "120223"]
            this.form.address = [...value];
            let vals = this.getCascaderObj([...value], this.areaData); // arr
            this.form.tableAddress = vals.join(',').replace(/,/g,'');
          },
          closeDialog(){
              this.$emit('closeDialog');
          },
          //表单提交
          onSubmit(form){
            this.$refs[form].validate((valid) => {
                if (valid) {//表单数据验证完成之后，提交数据;
                    let formData = this[form];
                    const para = Object.assign({}, formData)
                    console.log(para);
                    // edit
                    if(this.addFundDialog.type === 'edit'){
                        updatedata(para).then(res => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.$refs['form'].resetFields()
                            this.isVisible = false
                            this.$emit('getFundList');
                       })
                    }else{
                        // add
                        adddata(para).then(res => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            this.$refs['form'].resetFields()
                            this.isVisible = false
                            this.$emit('getFundList');
                       })
                    }
                }
            })
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
