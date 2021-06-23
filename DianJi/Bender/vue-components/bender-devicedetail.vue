<template>
	<div style="background-color: white;">
		<div class="image-content" :style="{'width': imgContentWidth + 'px'}">
			<ul>
				<template v-for="(item, index) in photoList">
					<li>
						<img :src="item.photo_url" @click="clickImageToPreviews(index)" />
					</li>
				</template>
			</ul>
		</div>
		<div class="device-title"><span>设备编号：{{deviceData.devices_no}}</span><span><a @click="refreshDeviceDetail" style="float: right;color: white;margin-right: 10px;margin-top: 5px;" class="mui-icon mui-icon-spinner"></a></span></div>
		<van-image-preview v-model="showPre" :images="imagesPreviews" :start-position="previewIndex" @change="onChange">
		</van-image-preview>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				photoList: [],//图片源文件
				imgContentWidth: 0,//图片宽度
				showPre: false,//是否显示预览图片
				previewIndex: 0,//预览图片index
				imagesPreviews: [],//预览图片源文件
				deviceData:{},//设备详情信息
			}
		},
		methods: {
			onChange(index) {
				this.previewIndex = index;
			},
			//点击图片，进行预览
			clickImageToPreviews(index) {
				this.showPre = true;
				this.previewIndex = index;
			},
			//刷新数据
			refreshDeviceDetail(){
				this.$emit('refreshdata')
			},
			//接口获取数据后，调用该方法
			settingImagePreviewData(data){
				this.deviceData = data;
				if (data.photo_list != undefined) {
					this.photoList = data.photo_list
					this.imgContentWidth = this.photoList.length * 110;
					for (let i = 0; i < this.photoList.length; i++) {
						this.imagesPreviews.push(this.photoList[i].photo_url)
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.image-content {
		overflow-x: auto;
		overflow-y: hidden;
		height: 100px;
		margin-top: 5px;
		background-color: white;
	}

	.image-content img {
		width: 100px;
		height: 100px;
		margin-right: 10px;
		float: left;
		
	}
	.device-title{
		width: 100%;
		height: 35px;
		background-color: #524598;
		margin-top: 5px;
		color: white;
		line-height: 35px;
		font-size: 14px;
		padding-left: 10px;
	}
</style>
