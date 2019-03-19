<template>
	<div class="footer">
		<div v-for="(item,index) in items" :key='index' @click="lik(index,item.push)">
			<!-- <div v-for="(item,index) in items" :index='index' :class='[item.clas,{on:index == idx}]' @click="lik(index,item.push)"> -->
			<img :src='index==idx?item.icon:item.iconSelect'>
			<p :class="{on:index == idx}">{{item.name}}</p>
		</div>
	</div>
</template>
 
<script type="text/javascript">
	
	export default{
		props:['idx'],
		data(){
			return {
				items:[{
					cls:"home",
					name:"墨鱼",
					push:"/moyu",
					icon:"../static/images/moyv.png",
					iconSelect:"../static/images/moyv.png"
				},
				{
					cls:"find",
					name:"发现",
					push:"/find",
					icon:"../static/images/faxian.png",
					iconSelect:"../static/images/faxian.png"
				},
				{
					cls:"publish",
					name:"发布",
					push:"",
					icon:"../static/images/fabu.png",
					iconSelect:"../static/images/fabu.png"
				},
				{
					cla:"community",
					name:"客服",
					push:"/kefu",
					icon:"../static/images/kefu.png",
					iconSelect:"../static/images/kefu.png"
				},
				{
					cla:"mine",
					name:"我的",
					push:"/user",
					icon:"../static/images/wode.png",
					iconSelect:"../static/images/wode.png"
				}]
			}
		},
		methods:{
			lik(index,lujing){		
				this.$emit('ddd',index)		
				this.$router.push(lujing)
				
				// console.log(index,lujing)
			}
		}
	} 
 
</script>

<style scoped lang='less'>
.footer{
	display: flex;
	position: fixed;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	height: 70px;
	width: 100%;
	background-color: white;
	border-top: 1px solid #F6F6F7;
	div{
		flex: 1;
		font-size: 16px;
		img{
			display: block;
			width: 30px;
			height: 30px;
			margin:10px auto 5px;
		}
		p{
			color:#cccccc;
		}
	}
	.on{
		color: black;
	}
}	
</style>