<template>
	<div>
		<div class="title">
		       <h2>留言板</h2>
		</div>
		<p>
			昵称:
			<input type="text" v-model="name">
		</p>
		
		<p>
			留言内容:<br>
			<textarea name="" id="" cols="300" rows="7" v-model="content"></textarea>&nbsp;
			
			<span :class="{'text-color':!onSubmit}">{{userLength}}/{{maxLength}}</span>
		</p>
		 <div class="subarea">
                        <p class="sub">
                          <el-button type="primary" size="" @click="add" >   
                             提交 </el-button>
                        </p>
        </div>
		<hr>
		
		<div>
			<div v-for="(item,index) in list" style="border-bottom: 1px dashed;">
				
				<p class="ly-p1">
					<span>
						{{item.name}}:                              
						{{item.time | TimeFilter}}
					</span>
				
					
					<span @click="praise(item)" class="praise">点赞:{{item.star}}</span>
				</p>
				
				<div>
					{{item.content}}
				</div>
				
				<div class="del">
	                <p>
					    <button @click="del(item,index)">删除</button>
				    </p>
				</div>
			
				
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				name:'', //用户名
				content:'', //输入的内容
				list:[], //留言列表
				userLength:0,//用户实时输入字数长度
				maxLength:30,//最多限制字数
				onSubmit:true //是否可以提交
			}
		},
		created() { //初始化保存
			let liuyan = localStorage.liuyan
			if(liuyan){
				this.list = JSON.parse(liuyan)
			}
		},
		watch:{ //侦听器
			content(newVal,oldVal){
				this.userLength = newVal.length
				if(this.userLength>this.maxLength){
					// this.content = oldVal //输入最大字数后不能再输入
					this.onSubmit = false
				}else{
					this.onSubmit = true
				}
			}
		},
		methods:{
			add(){ //添加
				
				if(this.name.trim()==''){ //非空判断
					alert('请输入用户名')
					return
				}else if(this.content.trim()==''){
					alert('请输入内容')
					return
				}
				
				if(this.userLength>this.maxLength){ //字数超出提示
					alert('你输入的字数已超过最大限制！')
					return
				}
			
				this.list.push({
					name:this.name,
					content:this.content,
					time:new Date().getTime(),
					star:0
				})
				this.name = '' //提交后清空用户名
				this.content = '' //提交后清空内容
				
				this.save()//本地保存
			},
			del(item,index){ //删除
				let rel = window.confirm(`确定要删除${item.name}的留言吗？`)
				if(rel){
					this.list.splice(index,1)
					this.save()//本地保存
				}
			},
			praise(item){ //点赞
				item.star++
				this.save()//本地保存
			},
			save(){ //本地保存
				localStorage.liuyan = JSON.stringify(this.list)
			}
			
		},
		filters: { //过滤时间
			TimeFilter(time) {
				let oldDate = new Date(time)
				let newDate = new Date()
				var dayNum = "";
				var getTime = (newDate.getTime() - oldDate.getTime()) / 1000;
				let year = oldDate.getFullYear();
				let month = oldDate.getMonth() + 1;
				let day = oldDate.getDate();
				let hour = oldDate.getHours();
				let minute = oldDate.getMinutes();
				let second = oldDate.getSeconds();
				return dayNum + " " + year + "-" + month + "-" + day;
			}
		}
		
	}
</script>

<style scoped="scoped">
	.ly-p1{
		display: flex;
		justify-content: space-between;
		color:rgb(0, 110, 255);
		margin-bottom:10px;
		font-weight:bolder;
	}
	.praise:hover{
		color: rgb(55, 0, 255);
		cursor: pointer;
		
	}
	.text-color{
		color: rgb(55, 0, 255);
	}
	.sub{
         padding-left: 600px;                
        
      }
	.title{
		 padding-left: 600px;  
		 color: black 
	}
	.del{
		margin-top:10px;
		color: red;
	}
</style>

