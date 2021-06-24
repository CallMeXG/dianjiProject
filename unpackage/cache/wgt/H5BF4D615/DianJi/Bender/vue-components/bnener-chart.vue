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
							@click="activeRadioClicked(item,index)">{{item}}</div>
					</template>
				</div>
			</div>
			<div style="clear: both;"></div>
			<div class="time-detail" v-show="showTime">
				<span class="title">时间</span>
				<div class="content" @click="showPickerTime=true">{{timeSelected}}</div>
			</div>

			<div class="charts-content" style="margin-top: 20px;">
				<span>绝缘值趋势图</span>
				<div>
					<div class="warning-class">
						<p>预报警值</p>
						<p>35 Ω</p>
					</div>
					<div class="warning-class">
						<p>主报警值</p>
						<p>45 Ω</p>
					</div>
				</div>
				<div style="clear: both;"></div>
				<div id="chart-jueyuan"></div>
			</div>

			<div class="charts-content">
				<span>三项电压值趋势图</span>
				<div id="chart-sanxiangdian"></div>
			</div>


			<van-popup v-model="showPicker" position="bottom">
				<van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
			</van-popup>

			<van-popup v-model="showPickerTime" position="bottom">
				<van-picker show-toolbar :columns="timeColumns" @confirm="onConfirmTime"
					@cancel="showPickerTime = false" />
			</van-popup>

		</div>
		<div v-show="active == 1">

			<div class="form-class">
				<div class="form-sub-item">
					<span>测点位置:</span>
					<div class="form-item-button" @click="showPickerCharaInstall=true">{{charaInsActive}}</div>
				</div>
				<div class="form-sub-item">
					<span>采集时间:</span>
					<div class="form-item-button" @click="showPickerCharaTime=true">{{charaTimeActive}}</div>
				</div>
			</div>

			<div class="characteristic-content">
				<div class="charac-title">ISO685 特征值</div>
				<p>
					<span class="left">被检测设备名称：</span>
					<span class="right">XXXX变压器</span>
				</p>
				<div style="clear: both;"></div>
				<p>
					<span class="left">当前绝缘值</span>
					<span class="right">30MΩ</span>
				</p>
				<div style="clear: both;"></div>
				<p>
					<span class="left">预报警值</span>
					<span class="right">25MΩ</span>
				</p>
				<div style="clear: both;"></div>
				<p>
					<span class="left">主报警值</span>
					<span class="right">20MΩ</span>
				</p>
				<div style="clear: both;"></div>
				<p>
					<span class="left">系统电压值U(L1-L2)</span>
					<span class="right">220VAC</span>
				</p>
				<div style="clear: both;"></div>
				<p>
					<span class="left">系统电压值U(L1-L3)</span>
					<span class="right">220VAC</span>
				</p>
				<div style="clear: both;"></div>
				<p>
					<span class="left">系统电压值U(L2-L3)</span>
					<span class="right">220VAC</span>
				</p>
				<div style="clear: both;"></div>
			</div>

			<van-popup v-model="showPickerCharaInstall" position="bottom">
				<van-picker show-toolbar :columns="charaInsColums" @confirm="onConfirmCharaIns"
					@cancel="showPickerCharaInstall = false" />
			</van-popup>
			
			<van-popup v-model="showPickerCharaTime" position="bottom">
				<van-picker show-toolbar :columns="charaTimeColums" @confirm="onConfirmCharaTime"
					@cancel="showPickerCharaTime = false" />
			</van-popup>

		</div>

		<van-tabbar v-model="active">
			<van-tabbar-item icon="chart-trending-o">趋势图</van-tabbar-item>
			<van-tabbar-item icon="tv-o">特征值</van-tabbar-item>
		</van-tabbar>

	</div>
</template>

<script>
	const timeList = {
		'real': [],
		'小时': ['2021-06-24 12:00:00', '2021-06-24 11:00:00', '2021-06-24 10:00:00', '2021-06-24 09:00:00',
			'2021-06-24 08:00:00'
		],
		'天': ['2021-06-24', '2021-06-23', '2021-06-22', '2021-06-21', '2021-06-20'],
		'月': ['2021-06', '2021-05', '2021-04', '2021-03', '2021-02'],
		'年': ['2021', '2020']
	}
	module.exports = {
		data() {
			return {
				installXY: '请选择测点',
				active: 0, // 选择趋势图或特征值页面
				columns: ['测点01', '测点02', '测点03', '测点04', '测点05'], //测点列表
				showPicker: false, //是否显示测点选择列表
				radioColums: ['实时', '小时', '天', '月', '年'], //时长选择选项
				activeRadio: 3, //时长选择
				timeSelected: '2021-06',
				timeColumns: ['2021-06', '2021-05', '2021-04'], //时间选择选项
				showPickerTime: false, //时间弹框
				showTime: true, //是否显示时间选择
				jueyuanChart: null,
				sanxiangdianChart: null,
				//特征值
				showPickerCharaInstall: false, //特征值--测点
				charaInsColums: ['测点01', '测点02', '测点04', '测点03'],
				charaInsActive: '测点01',
				
				showPickerCharaTime: false,
				charaTimeColums: ['2021-06-24 12:01:00', '2021-06-24 11:52:36', '2021-06-24 10:22:56'],
				charaTimeActive: '2021-06-24 12:09:33',
			}
		},
		mounted() {
			this.initJueYuanEcharts()
			this.initSanXiangDianEcharts()
		},
		methods: {
			// 测点选择事件
			onConfirm(value) {
				this.installXY = value;
				this.showPicker = false;
				this.changeChartData()
				this.changeSanXiangDianChart()
			},
			// 选择时长
			activeRadioClicked(item, index) {
				this.activeRadio = index;

				if (item == '实时') {
					this.showTime = false
					return
				}
				this.showTime = true
				const that = this
				Object.keys(timeList).forEach(function(key) {

					if (key != 'real') {
						if (item == key) {
							that.timeColumns = timeList[key]
							that.timeSelected = that.timeColumns[0]
						}
					}

				})

				this.changeChartData()
				this.changeSanXiangDianChart()


			},
			//初始化绝缘值图表
			initJueYuanEcharts() {
				this.jueyuanChart = echarts.init(document.getElementById('chart-jueyuan'));

				// 指定图表的配置项和数据
				var option = {
					title: {
						text: ''
					},
					grid: {
						top: 30
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						triggerOn: 'click',

					},
					legend: {
						show: false
					},
					xAxis: {
						type: 'time',
						splitLine: {
							show: false
						}
					},
					yAxis: {
						splitLine: {
							show: false
						},
						name: 'Ω',
						max: 48
					},
					series: [{
						name: '绝缘值',
						type: 'line',
						lineStyle: {
							color: '#5692E8',
							width: '1'
						},
						data: [],
						smooth: true,
						symbol: 'none',
						markLine: {
							symbol: 'none',
							silent: true,
							data: [{
									yAxis: 35,
									lineStyle: {
										type: 'solid',
										color: '#d89e07'
									},
									label: {
										position: 'end'
									}
								},
								{
									yAxis: 45,
									lineStyle: {
										type: 'solid',
										color: '#d83b53'
									},
									label: {
										position: 'end'
									}
								}
							]
						}
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				this.jueyuanChart.setOption(option);

				this.changeChartData()
			},

			//初始化三项电压图表
			initSanXiangDianEcharts() {
				this.sanxiangdianChart = echarts.init(document.getElementById('chart-sanxiangdian'));

				// 指定图表的配置项和数据
				var options = {
					title: {
						text: ''
					},
					grid: {
						top: 30
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						triggerOn: 'click',

					},
					legend: {
						show: false
					},
					xAxis: {
						type: 'time',
						splitLine: {
							show: false
						},
						inverse: true
					},
					yAxis: {
						splitLine: {
							show: false
						},
						name: 'Ω'
					},
					series: [{
						name: '三项电压',
						type: 'line',
						lineStyle: {
							color: '#5692E8',
							width: '1'
						},
						data: [],
						smooth: true,
						symbol: 'none',
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				this.sanxiangdianChart.setOption(options);
				this.changeSanXiangDianChart()
			},

			//时间选择 
			onConfirmTime(value) {
				this.showPickerTime = false
				this.timeSelected = value;
				this.changeChartData()
				this.changeSanXiangDianChart()
			},
			// 改变绝缘值charts数据
			changeChartData() {
				let seriesData = []
				let nowDate = new Date().getTime()
				for (var i = 0; i < 1440; i++) {
					let oneHour = moment(nowDate - i * 60 * 1000).format('YYYY-MM-DD HH:mm:ss')
					seriesData.push([oneHour, Math.floor(Math.random() * 8 + 25)])
				}
				if (this.jueyuanChart != undefined) {
					this.jueyuanChart.setOption({
						series: [{
							data: seriesData
						}]
					})
				}
			},

			changeSanXiangDianChart() {
				let seriesData1 = []
				let seriesData2 = []
				let seriesData3 = []
				let XData = []
				let nowDate = new Date().getTime()
				for (var i = 0; i < 10; i++) {
					let oneHour = moment(nowDate - i * 60 * 1000).format('YYYY-MM-DD HH:mm:ss')
					// XData.push(oneHour)
					seriesData1.push([oneHour, Math.floor(Math.random() * 8 + 25)])

					seriesData2.push([oneHour, Math.floor(Math.random() * 8 + 25)])

					seriesData3.push([oneHour, Math.floor(Math.random() * 8 + 25)])
				}

				if (this.sanxiangdianChart != undefined) {
					this.sanxiangdianChart.setOption({
						series: [{
								name: '三项电压',
								type: 'line',
								lineStyle: {
									color: '#5692E8',
									width: '1'
								},
								data: seriesData1,
								smooth: true,
								symbol: 'none',
							},
							{
								name: '三项电压',
								type: 'line',
								lineStyle: {
									color: '#ffaa00',
									width: '1'
								},
								data: seriesData2,
								smooth: true,
								symbol: 'none',
							},
							{
								name: '三项电压',
								type: 'line',
								lineStyle: {
									color: '#ff557f',
									width: '1'
								},
								data: seriesData3,
								smooth: true,
								symbol: 'none',
							}
						]
					})
				}

			},





			/***特征值*****************************************************/

			onConfirmCharaIns(value) {
				this.charaInsActive = value
				this.showPickerCharaInstall = false
			},
			onConfirmCharaTime(value){
				this.charaTimeActive = value
				this.showPickerCharaTime = false
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
		height: 420px;
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
	}

	#chart-sanxiangdian {
		width: 100%;
		height: 300px;
	}

	.warning-class {
		float: left;
		width: 50%;
		margin-top: 20px;
	}

	.form-sub-item {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-bottom: 10px;
	}

	.form-sub-item span {
		font-size: 14px;
	}

	.form-sub-item .form-item-button {
		float: right;
		width: calc(100% - 70px);
		height: 40px;
		background-color: white;
		border: 1px solid #cacaca;
		border-radius: 5px;
		text-align: center;
	}

	.characteristic-content {
		width: calc(100% + 20px);
		height: 300px;
		background-color: white;
		margin-left: -10px;
		margin-bottom: -10px;
		clear: both;
	}

	.characteristic-content p {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #eeeeee;
		margin-left: 20px;
	}

	.characteristic-content p .left {
		float: left;
		padding-left: 20px;
	}

	.characteristic-content p .right {
		float: right;
		padding-right: 30px;
	}

	.charac-title {
		margin: 15px;
		padding-top: 15px;
	}
</style>
