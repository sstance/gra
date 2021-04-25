<template>
	 <div class='footer'>
        <p class="intro rflex">
            <span>Copyright © 2021 文本识别后台管理</span>
        </p>

    </div>
</template>

<script>
    import { github } from "@/utils/env";

export default {
    name: "footerNav",
	data(){
		return {
           
		}
	},
	methods:{

	}
}
</script>

<style lang="less">
	.footer{
        width: 100%;
        padding: 10px 0;
        font-size:12px;
        text-align: center;
        background: #fff;
        p{
            line-height: 30px;
        }
        .intro{
            width: 240px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>


