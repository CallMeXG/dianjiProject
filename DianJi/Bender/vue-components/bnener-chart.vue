<template>
	<div class="app-content">

		<div v-show="active == 0">
			<div class="install-button" @click="showPicker=true">
				<span style="padding-left: 5px;font-size: 14px;">选择测点:</span>
				<div>{{installXY}}</div>
			</div>
			<div class="time-long">
				<span class="title">时长: </span>
				<div class="content">
					<template v-for="(item, index) in radioColums">
						<div class="radio-box" :class="{'radio-box-active': index == activeRadio}"
							@click="activeRadioClicked(index)">{{item}}</div>
					</template>
				</div>
			</div>
			<div style="clear: both;"></div>
			<div class="time-detail">
				<span class="title">时间</span>
				<div class="content">2021</div>
			</div>

			<div class="charts-content">
				<span>绝缘值趋势图</span>
				<div id="chart-jueyuan"></div>
			</div>

			<div class="charts-content">
				<span>三项电压值趋势图</span>

			</div>


			<van-popup v-model="showPicker" position="bottom">
				<van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
			</van-popup>

		</div>
		<div v-show="active == 1">特征值页面</div>

		<van-tabbar v-model="active">
			<van-tabbar-item icon="chart-trending-o">趋势图</van-tabbar-item>
			<van-tabbar-item icon="tv-o">特征值</van-tabbar-item>
		</van-tabbar>

	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				installXY: '请选择测点',
				active: 0, // 选择趋势图或特征值页面
				columns: ['测点01', '测点02', '测点03', '测点04', '测点05'], //测点列表
				showPicker: false, //是否显示测点选择列表
				radioColums: ['实时', '小时', '天', '月', '年'], //时长选择选项
				activeRadio: 0, //时长选择
			}
		},
		mounted() {
			this.initJueYuanEcharts()
		},
		methods: {
			// 测点点击事件
			onConfirm(value) {
				this.installXY = value;
				this.showPicker = false;
			},
			// 选择时长
			activeRadioClicked(index) {
				this.activeRadio = index;
			},
			//初始化绝缘值图表
			initJueYuanEcharts(){
				var myChart = echarts.init(document.getElementById('chart-jueyuan'));
				
				// 指定图表的配置项和数据
				var option = {
					title: {
						text: 'ECharts 入门示例'
					},
					tooltip: {},
					legend: {
						data: ['销量']
					},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}]
				};
				
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
		}
	}
</script>

<style scoped="scoped">
	.app-content {
		padding: 10px;
		background-color: #fafafa;
	}


	.install-button {
		width: 100%;
		height: 40px;
		border: 1px solid #d6d6d6;
		line-height: 40px;
		border-radius: 3px;
	}

	.install-button div {
		height: 38px;
		border: none;
		padding: 0;
		width: calc(100% - 80px);
		color: #007AFF;
		float: right;
		text-align: center;
	}

	.time-long {
		margin-top: 20px;
		line-height: 35px;
	}

	.time-long .title {
		font-size: 14px;
	}

	.time-long .content {
		width: calc(100% - 40px);
		height: 40px;
		float: right;

		display: flex;
		justify-content: space-between;
	}

	.time-long .content .radio-box {
		width: calc((100% - 40px) / 5);
		height: 35px;
		border: 1px solid #cacaca;
		border-radius: 5px;
		line-height: 35px;
		text-align: center;
	}

	.time-long .content .radio-box-active {
		background-color: #524598;
		color: white;
	}

	.time-detail {
		height: 40px;
		line-height: 40px;
		margin-top: 20px;
		margin-bottom: 10px;
	}

	.time-detail .title {
		font-size: 14px;
	}

	.time-detail .content {
		font-size: 14px;
		width: calc(100% - 40px);
		border: 1px solid #cacaca;
		float: right;
		height: 40px;
		border-radius: 5px;
		text-align: center;
		color: #007AFF;
	}


	.charts-content {
		width: 100%;
		height: 500px;
		background-color: white;
		margin-bottom: 20px;
		text-align: center;
		font-size: 18px;
		padding-top: 15px;
		font-weight: 800;
	}

	#chart-jueyuan {
		width: 100%;
		height: 300px;
		margin-top: 20px;
	}
</style>
