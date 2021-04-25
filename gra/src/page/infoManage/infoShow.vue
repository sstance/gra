<template>
    <div class="fillcontain">
        <!--个人信息栏-->
        <div class="info_container">
        <el-row class="info_row" :gutter="10">
                <el-col :span="4">
                <div class="area">
                    <!-- -->
                     <!--预览图片 -->
                    <viewer :images="images">
                        <img v-for="src in images" :src="src" :key="src" width="250" height="200">
                    </viewer>
                </div>
                </el-col>

                <el-col :span="5">
                <div class="area">
                    <div class="namearea" :gutter="10">
                        <p>姓名：JISOO</p>
                        <p>昵称：_sooyaa</p>
                        <p>年龄：23</p>
                        <p>绑定邮箱：jisoo@jisoo.com</p>
                        <p>绑定手机：jiso0</p>
                        <a class="detail" href="https://www.baidu.com">查看详情&nbsp;&nbsp;</a>
                    </div>
                </div>
                </el-col>

                <el-col :span="9">
                <div class="area">
                    <div class="tuiguang">
                        <p class="title">欢迎推广   :</p>
                        <p class="title"><span class="money">0.00</span><span class="yuan">元</span></p>
                        </div>
                    <div class="chongzhiarea">
                        <img :src="toMPicimg"/>
                        <p class="chongzhi">
                            <el-button type="warning" size="">充值</el-button>
                            <el-button type="danger" size="">提现</el-button>
                        </p>
                    </div>

                    <div class="tipsarea">
                       <Alert />
                       <page-main class="demo">
                            <el-row>
                                <el-rate v-model="value2" show-text ></el-rate>  
                            </el-row>
                       </page-main>
                       </div>
                    <div class="subarea">
                        <p class="sub">
                          <el-button type="primary" size="" @click="open" >   
                             用户评价并提交 </el-button>
                        </p>
                    </div>
                </div>
                </el-col>
                <el-col :span="6">
                <div class="area">
                    <div class="dataarea">
                        <p class="gtitle"><i class="el-icon-date el-icon--left"></i>个人数据</p>
                        <div class="gdataarea clear">
                            <div class="gdata left">
                                <p class="num">175</p>
                                <p class="title">身高</p>
                            </div>
                            <div class="gdata left">
                                <p class="num">140</p>
                                <p class="title">体重</p>
                            </div>
                            <div class="gdata left">
                                <p class="num">0</p>
                                <p class="title">粉丝</p>
                            </div>
                        </div>
                        <p class="morearea">谢谢您的关注，<a href="http://www.baidu.com" target="_blank">了解我的更多个人信息 》</a></p>
                    </div>
                </div>
                </el-col>
        </el-row>
        <!--资金信息栏-->
        <el-row class="data_row row" :gutter="10">
                <el-col :span="6">
                <div class="area">
                    <p class="title">设计流程</p> 
                    <p class="num"><span class="symbol"> </span>设计流程</p>
                    <a class="detail dbgcolor">查看详情&nbsp;&nbsp;</a>
                </div>
                </el-col>
                <el-col :span="6">
                    <div class="area">
                    <p class="title">技术代码</p>
                    <p class="num"><span class="symbol"></span>Python Vue</p>
                    <a class="detail zbgcolor">查看详情&nbsp;&nbsp;</a>
                </div>
                </el-col>
                <el-col :span="6">
                    <div class="area">
                    <p class="title">学习资源 </p>
                    <p class="num"><span class="symbol"></span>哔哩哔哩</p>
                    <a class="detail dbgcolor">查看详情&nbsp;&nbsp;</a>
                </div>
                </el-col>
                <el-col :span="6">
                <div class="area">
                    <p class="title">GitHub</p>
                    <p class="num"><span class="symbol"></span>枣庄学院</p>
                    <a class="detail zbgcolor" href="http://www.baidu.com">查看详情&nbsp;&nbsp;</a>
                </div>
                </el-col>
        </el-row>
        <!--广告信息栏-->
        <el-row class="ban_row row" :gutter="10">
            <el-col :span="24">
                <ul class="banarea">
                    <li v-for="(item,index) in bandata" :key="index">
                        <a :href="item.url" target="_blank" :style="{backgroundPosition:0 +' -'+ item.data+'px'}"></a>
                    </li>
                </ul>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
import page from '../permission/page.vue'
import Alert from './components/alert'
    export default {
  components: { page ,Alert},
        names: 'images',
        data(){
            return {
               value2: null,
               bandata:[
                   {url:'http://www.baidu.com',data:300},
                   {url:'http://www.sina.com',data:200},
                   {url:'http://www.360.com',data:100},
                   {url:'http://www.weibo.com',data:0},
                   {url:'http://www.hao123.com',data:100},
               ],   
               images:[
                    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F201402%2F08%2F20140208214107_JhEdF.thumb.700_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619674584&t=4675e7e9f12283df75eea96e5c297c65"
               ],
               //这行代码是邀请好友，在个人信息里面
               toMPicimg: require('@/assets/img/toMPic02.png')
            }
        },
        created(){
             //图片是从后台查的
            this.getData()
        },
      	mounted() {
         
	    },
        methods: {
            open(){
            var _this = this
            this.$alert('感谢你的提交', '评价', {
            confirmButtonText: '确定',
            
        });
            },

            getData() {
                var _this = this
                _this.$http.get('/admin/attach/product')
                    .then(function (response) {
                        _this.images = response.data.data
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        },
    }
</script>

<style lang="less" scoped>
    .info_container{
       padding: 20px;
       background: #fff;
       box-sizing: border-box;
       overflow: auto;
    }
    .row{
        margin:20px;
    }
   .info_row{
        .area{
           border:1px solid #dfdfdf;
           height:178px;
           overflow:hidden;
            .imgarea{
                text-align:center;
                padding:10px;
                img {
                    width:120px;
                    height:120px;
                    border-radius: 50%;
                }
            }
            .namearea{
                padding:10px;
                font-size:14px;
                p{
                    line-height:24px;
                }
                .awards{
                    text-align:center;
                    width:100%;
                    height:30px;
                    line-height:30px;
                    cursor: pointer;
                    background-color: #3bc5ff;
                    border:1px solid #3bc5ff;
                    color: white;
                    display: block;
                }
                .awards:hover{
                    background-color: #f9c855;
                    border:1px solid #f9c855;
                }
            }
            .tuiguang{
                padding:10px;
                float:left;
                .title{
                    font-size:15px;
                    font-weight:bolder;
                    line-height:50px;
                    .money{
                        color:#c10000;
                        margin-right:5px;
                    }
                    .yuan{
                            font-weight:100;
                            font-size:13px;
                    }
                }
                
            }
            .chongzhiarea{
                    padding:10px;
                    text-align:center;
                    img{
                        width: 80%;
                        height: 40px;
                    }
                    .chongzhi{
                        margin-top:10px;
                    }
            }
            .subarea{
                    padding:15px;
                    text-align:center;
                    .sub{
                         
                         margin-top:-52px;
                    }
            }
            .tipsarea{
                clear:both;
                font-size:14px;
                padding:10px;
                padding-top:15px;
                a{
                    color:#3bc5ff;
                }
            }
            .dataarea{
                 padding:10px;
                 text-align:center;
                 font-size:14px;
                .gtitle{
                    width:100%;
                    height:30px;
                    line-height:30px;
                    cursor: pointer;
                    background-color: #3bc5ff;
                    color: white;
                    display: block;
                }
                .gdataarea{
                    padding-left: 25px;
                    p{
                        line-height:38px;
                    }
                    .num{
                        font-weight:bolder;
                        color:#c10000;
                    }
                    .title{
                        color:#3bc5ff;
                    }
                    .gdata{
                        margin:10px;
                    }
                }
                .morearea{
                    a{
                        color:#3bc5ff;
                    }
                }
            }
        }
   } 
   .data_row{
       font-size:18px;
       .area{
           border:1px solid #dfdfdf;
           height:200px;
           overflow:hidden;
           padding:10px;
           text-align:center;
           font-weight:bolder;
            .symbol{
                font-size: 16px;
                font-style: italic;
                font-family: "microsoft yahei";
                margin-right: 10px;
                color:#232323;
                font-weight:100;
            }
           p{
               line-height:70px;
           }
           .num{
               color:#c10000;
           }
           .detail{
               margin-top:5px;
               font-size:14px;
               text-align: center;
               width: 100%;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                color: white;
                display: block;
                border:1px solid #3bc5ff;
           }
           .dbgcolor{
              background-color: #3bc5ff;
           }
           .zbgcolor{
               color:#3bc5ff;
           }
           .dbgcolor:hover{
                background-color: #fff;
                color:#3bc5ff
           }
           .zbgcolor:hover{
                background-color: #3bc5ff;
                color:#fff;
           }
       }
   }
   .ban_row{
        .banarea{
            width: 100%;
            display: flex;
            //将连接在一起的图片切分开
            justify-content: space-between;
            li{
                a{
                    background: url(../../assets/img/iu.jpg);
                    width: 200px;
                    height: 50px;
                    display: block;
                }
            }
        }
   }
</style>


