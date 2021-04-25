<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
	import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        data(){
            return {
				id:"lineChart",
                myChart:null,
            }
        },
        mounted(){
            this.loadChart();
        },
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
			loadChart(){
  				this.$nextTick(() => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                    this.myChart.setOption(this.initOption());
                })
			},
			initOption(){
				let data = {
					title: {
						text: ''
					},
					tooltip : {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data:['模糊样本','字体倾斜','字体重叠','篇幅较大']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['周一','周二','周三','周四','周五','周六','周日']
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'模糊样本',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[30, 35, 28, 27, 34, 31, 40]
						},
						{
							name:'字体倾斜',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[7, 6, 7, 8, 9, 10, 8]
						},
						{
							name:'字体重叠',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[9, 9, 10, 12, 11, 11, 7]
						},
						{
							name:'篇幅较大',
							type:'line',
							stack: '总量',	
							areaStyle: {normal: {}},
							data:[2, 2, 1, 3, 2, 2, 3]
						},
					
					]
				}
				return data;
			},
		},
        watch: {
            // id:()=>{
            //     this.initOption()
            // }
        }
    }
</script>

<style lang="less">

</style>
