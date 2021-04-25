<template>
		<section class="data_section" ref="data_section"> 
			<a :href="github" target="_blank">
				
			</a>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
					<log-list></log-list>
				</el-col>
				<el-col :span="17">
					<bar-chart type="barChart"></bar-chart>
				</el-col>
			</el-row>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
				    <pie-chart type="ordertype"></pie-chart>
				</el-col>
				<el-col :span="10">
					<line-chart></line-chart>
				</el-col>
			   	<el-col :span="7">
					<radar-chart></radar-chart>
				</el-col>
			</el-row> 
			<el-row :gutter="10" class="row_list">
				<el-col :span="11">
					<sales-table></sales-table>
				</el-col>
				<el-col :span="7">
					<comment-list></comment-list>
				</el-col>
				<el-col :span="6">
					<card-list></card-list>
				</el-col>
			</el-row>
			
		</section>
</template>

<script>
	import echarts from 'echarts'
	import salesTable from "./components/salesTable";  
	import commentList from "./components/commentList"; 
	import cardList from "./components/cardList";  
	import logList from "./components/logList"; 
	import barChart from 'cps/echarts/barChart' 
	import pieChart from 'cps/echarts/pieChart' 
	import radarChart from 'cps/echarts/radarChart' 
	import lineChart from 'cps/echarts/lineChart' 
	import { github } from "@/utils/env";

    export default {
    	data(){
    		return {
			  github:github
    		}
    	},
    	components: {
		   salesTable,
		   commentList,
		   cardList,
		   logList,
		   barChart,
		   pieChart,
		   radarChart,
		   lineChart
		},	
		created(){
		},
    	mounted(){
		},
    	methods: {
    	}
    }
</script>

<style lang="less" scoped>
	.data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
		    .number{
				font-size: 22px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
     
	}
  
</style>
