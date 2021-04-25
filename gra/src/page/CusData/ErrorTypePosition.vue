<template>
    <div class="fillcontain">
        <div class="fillcontainer" ref="fillcontainer">
            <el-row :gutter="10"> 
                <el-col :span="12" style="height:100%;">
                    <div id="ErrorTypePosition"></div> 
                </el-col>
                <el-col :span="12" style="height:100%;">
                    <div id="ErrorTypePosition2"></div> 
                </el-col>
            </el-row>
       </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import '../../../node_modules/echarts/theme/vintage.js';

    export default {
        data(){
          return {
            chart:null,
            chart_bar:null,
            data:{
                legendData: ['字体重叠','字体倾斜','篇幅较大','样本模糊'],
                seriesData:[
                    {value:this.randomData(), name:'字体重叠'},
                    {value:this.randomData(), name:'字体倾斜'},
                    {value:this.randomData(), name:'篇幅较大'},
                    {value:this.randomData(), name:'样本模糊'},
              
                ]
            }
          }
        },
        methods: {
          randomData() {
            return Math.round(Math.random()*100);
          },
          drawpie(id, radius, centery) {
            if ( this.chart &&  this.chart.dispose) { 
                 this.chart.dispose(); 
            } 
            this.chart = echarts.init(document.getElementById(id), 'vintage');
            this.chart.setOption({
                angleAxis: {},
                radiusAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月'],
                    z: 10
                },
                polar: {},
                series: [{
                        type: 'bar',
                        data: [0, 2, 0, 4, 3],
                        coordinateSystem: 'polar',
                        name: '字体重叠',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [2, 4, 0, 1, 3],
                        coordinateSystem: 'polar',
                        name: '字体倾斜',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 0, 3, 4, 3],
                        coordinateSystem: 'polar',
                        name: '篇幅较大',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [3, 2, 0, 0, 3],
                        coordinateSystem: 'polar',
                        name: '样本模糊',
                        stack: 'a'
                    }, 
                    ],
                    legend: {
                        show: true,
                        data: ['字体重叠', '字体倾斜', '篇幅较大','样本模糊']
                    }
            });
          },
          drawbar(id){
            if ( this.chart_bar &&  this.chart_bar.dispose) { 
                this.chart_bar.dispose(); 
            } 
            this.chart_bar = echarts.init(document.getElementById(id),'vintage');
            this.chart_bar.setOption({
                 angleAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月',],
                        z: 10
                    },
                    radiusAxis: {},
                    polar: {},
                    series: [{
                        type: 'bar',
                        data: [8, 2, 3, 4, 7],
                        coordinateSystem: 'polar',
                        name: '字体重叠',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [6, 4, 6, 1, 3],
                        coordinateSystem: 'polar',
                        name: '字体倾斜',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 8, 3, 4, 5],
                        coordinateSystem: 'polar',
                        name: '篇幅较大',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [6, 2, 1, 8, 3],
                        coordinateSystem: 'polar',
                        name: '样本模糊',
                        stack: 'a'
                    }, 
                    ],
                    legend: {
                        show: true,
                        data: ['字体重叠', '字体倾斜', '篇幅较大','样本模糊']
                    }
            })
          }
        },
        mounted() {
            this.$nextTick(function() {
                // this.$refs.fillcontainer.style.height = (document.body.clientHeight - 160)+'px'
                this.drawpie('ErrorTypePosition');
                this.drawbar('ErrorTypePosition2');
                // 保证页面在放大或缩小时，也能够动态的显示数据
                window.onresize = () => {
                    // this.$refs.fillcontainer.style.height = (document.body.clientHeight - 160)+'px'
                    this.drawpie('ErrorTypePosition');
                    this.drawbar('ErrorTypePosition2');
                }

            })
        }
    }
</script>

<style lang="less" scoped>
      #ErrorTypePosition,#ErrorTypePosition2 {
        position: relative;
        width: 96%;
        height: 530px;
        padding: 10px;
        border-radius: 10px;
     }	
</style>


