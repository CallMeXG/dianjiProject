<template>
	<div style="background-color: white;">
		<div style="width: 100%;height: 5px;background-color: white;"></div>
		<p>
			<span class="item-key">设备名称：</span>
			<span class="item-value">{{deviceData.devices_name}}</span>
		</p>
		<p>
			<span class="item-key">设备编号：</span>
			<span class="item-value">{{deviceData.devices_no}}</span>
		</p>
		<p>
			<span class="item-key">企业名称：</span>
			<span class="item-value">{{deviceData.company_name}}</span>
		</p>
		<p>
			<span class="item-key">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;厂：</span>
			<span class="item-value">{{deviceData.region_name}}</span>
		</p>
		<p>
			<span class="item-key">设备类型：</span>
			<span class="item-value">变压器</span>
		</p>
		<p>
			<span class="item-key">设备型号：</span>
			<span class="item-value">{{deviceData.devices_model}}</span>
		</p>
		<p>
			<span class="item-key">输出电压：</span>
			<span class="item-value">{{deviceData.devices_model}}</span>
			<span class="item-unit">V</span>
		</p>
		<p v-show="false">
			<span class="item-key">出厂时间：</span>
			<span class="item-value">{{deviceData.devices_out_time}}</span>
		</p>
		<p v-show="false">
			<span class="item-key">额定功率：</span>
			<span class="item-value">{{deviceData.devices_power}}</span>
		</p>
		<p v-show="false">
			<span class="item-key">安装方式：</span>
			<span class="item-value">{{deviceData.install_way}}</span>
		</p>
		<p v-show="false">
			<span class="item-key">工作电压：</span>
			<span class="item-value">{{deviceData.work_voltage}}</span>
		</p>
		<p v-show="false">
			<span class="item-key">生产厂商：</span>
			<span class="item-value">{{deviceData.devices_produce}}</span>
		</p>
		<p v-show="false">
			<span class="item-key">工作状态：</span>
			<span class="item-value">{{deviceData.company_name}}</span>
		</p>
		<p v-show="false">
			<span class="item-key">生产产线：</span>
			<span class="item-value">{{deviceData.pro_line}}</span>
		</p>
		<p v-show="false">
			<span class="item-key">应用场景：</span>
			<span class="item-value">{{deviceData.use_scenes}}</span>
		</p>
		<div class="tree-list-content">
			<p class="title">拓扑关系</p>
			<el-collapse>
				<el-collapse-item :title="item.serial_no" :name="item.id" v-for="(item,index) in treeData">
					<div class="col-item-content">
						<p><span>Imie: </span><span>{{item.imei}}</span></p>
						<p><span>物联网卡号: </span><span>{{item.internet_things_no}}</span></p>
						<p><span>生产厂商: </span><span>{{item.produce}}</span></p>
						<p><span>生产批次: </span><span>{{item.pro_bitch}}</span></p>
						<p><span>硬件版本: </span><span>{{item.version}}</span></p>
						<p><span>本地时间: </span><span>{{item.local_time}}</span></p>
						<p><span>日志: </span><span>--</span></p>
						<p><span>小区信息:
							</span><span>{{item.mcc}}{{item.mnc}}-{{item.lac}}-{{item.cell_no}}-{{item.bsic}}</span></p>
						<p>
							<span>信号强度: </span>
							<span>
								<template v-if="item.signal_intensity == undefined"><img class="xinhao"
										src="../../img/xinhaoNO.png"></template>
								<template v-if="item.signal_intensity == 0"><img class="xinhao"
										src="../../img/xinhaonull.png"></template>
								<template v-if="item.signal_intensity > 0 && item.signal_intensity < 9 "><img
										class="xinhao" src="../../img/xinhao1.png"></template>
								<template v-if="item.signal_intensity > 8 && item.signal_intensity < 13 "><img
										class="xinhao" src="../../img/xinhao2.png"></template>
								<template v-if="item.signal_intensity > 12 && item.signal_intensity < 18 "><img
										class="xinhao" src="../../img/xinhao3.png"></template>
								<template v-if="item.signal_intensity > 17 && item.signal_intensity < 21 "><img
										class="xinhao" src="../../img/xinhao4.png"></template>
								<template v-if="item.signal_intensity > 20 && item.signal_intensity < 26 "><img
										class="xinhao" src="../../img/xinhao6.png"></template>
								<template v-if="item.signal_intensity > 25 && item.signal_intensity < 31 "><img
										class="xinhao" src="../../img/xinhao6.png"></template>
							</span>
						</p>
						<p>
							<span>电池电量: </span>
							<span>
								<template v-if="item.dump_percentage == undefined">----</template>
								<template v-if="item.dump_percentage > -1 && item.dump_percentage < 16 "><img
										class="dianchi" src="../../img/dianchi16.jpg"></template>
								<template v-if="item.dump_percentage > 15 && item.dump_percentage < 34 "><img
										class="dianchi" src="../../img/dianchi34.jpg"></template>
								<template v-if="item.dump_percentage > 33 && item.dump_percentage < 50 "><img
										class="dianchi" src="../../img/dianchi50.jpg"></template>
								<template v-if="item.dump_percentage > 49 && item.dump_percentage < 67 "><img
										class="dianchi" src="../../img/dianchi67.jpg"></template>
								<template v-if="item.dump_percentage > 66 && item.dump_percentage < 84 "><img
										class="dianchi" src="../../img/dianchi84.jpg"></template>
								<template v-if="item.dump_percentage > 83"><img class="dianchi"
										src="../../img/dianchi100.jpg"></template>
							</span>
						</p>
						<p><span>固件版本: </span><span>{{item.software_version}}</span></p>
						<p>
							<span>激活状态: </span>
							<span>
								<template v-if="item.state == 5">已激活</template>
								<template v-if="item.state == 6">未激活</template>
								<template v-if="item.state == 7">待激活</template>
								<template v-if="item.state == 8">待解绑</template>
								<template v-if="item.state == 9">配置待同步</template>
								<template v-if="item.state == undefined">----</template>
							</span>
						</p>
						<p><span>激活时间: </span><span>{{item.active_time}}</span></p>
						<p><span>最后一次连接服务器时间: </span><span>{{item.connectionVO.connection_time}}</span></p>
						<p>
							<span>工作状态: </span>
							<span>
								<template v-if="item.work_status == 0">工作</template>
								<template v-if="item.work_status == 1">失联</template>
								<template v-if="item.work_status == 2">关机</template>
								<template v-if="item.work_status == 3">休眠</template>
								<template v-if="item.work_status == 4">故障</template>
								<template v-if="item.work_status == undefined">----</template>
							</span>
						</p>
						<p>
							<span>供电模式: </span>
							<span>
								<template v-if="item.supply_type == '0'">电池供电</template>
								<template v-if="item.supply_type == '1'">外接电源</template>
							</span>
						</p>
						<p>
							<span>cpx工作模式: </span>
							<span>
								<template v-if="item.connect_model == '0'">省电模式</template>
								<template v-if="item.connect_model == '1'">长连接模式</template>
							</span>
						</p>

						<p><span>采样间隔时间: </span><span>{{item.sampling_interval}}</span></p>
						<p><span>上传间隔时间: </span><span>{{item.upload_duration}}</span></p>
						<p><span>心跳间隔时间: </span><span>{{item.heart_duration}}</span></p>
						<p><span>休眠时间: </span><span>{{item.sleep_time}}</span></p>
						<p><span>唤醒时间: </span><span>{{item.notify_time}}</span></p>

						<el-collapse>
							<el-collapse-item :title="subItem.ios_no"  v-for="(subItem,subIndex) in item.ios685Data">
								<div class="col-item-content">
									<p><span>ISO685名称: </span><span>{{subItem.ios_name}}</span></p>
									<p><span>生产厂商: </span><span>{{subItem.ios_product}}</span></p>
									<p><span>ISO685 序列号: </span><span>{{subItem.ios_xuliehao}}</span></p>
									<p><span>ISO685 CPX通道号: </span><span>{{subItem.ios_tongdaohao}}</span></p>
									<p><span>MODBUS地址: </span><span>{{subItem.iso_MODBUS}}</span></p>
								</div>
							</el-collapse-item>
						</el-collapse>

					</div>
				</el-collapse-item>
			</el-collapse>
		</div>


	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				deviceData: {}, //设备详情信息
				treeData: [], //拓扑关系
			}
		},
		methods: {
			//接口获取数据后，调用该方法
			setDeviceDetailData(data) {

				this.deviceData = data
				this.treeData = []
				if (data.sim_list != undefined) {
					for (let i = 0; i < data.sim_list.length; i++) {
						this.gainTreeData(data.sim_list[i].serial_no)
					}
				}

			},
			handleNodeClick(data) {
				console.log(data);
			},
			//获取拓扑关系
			gainTreeData(id) {
				const that = this;
				$.ajax({
					type: 'get',
					url: commen_gain_sim_Interface,
					async: true,
					data: {
						serial_no: id
					},
					dataType: 'json',
					success: function(msg) {
						if (msg.status == "SUCCESS") {
							if (typeof(msg.data) != "undefined") {
								let datas = msg.data
								let tempData = {}
								Object.keys(datas).forEach(function(key) {
									if (key == 'serial_no') {
										tempData.serial_no = '---  传感器卡:   ' + datas.serial_no
									} else {
										tempData[key] = datas[key]
									}
									
									let iso685list = [
										{
											ios_no: '---- ISO685： 201425',
											ios_name: 'ISO685 名称',
											ios_product: 'BNENDER',
											ios_xuliehao: '09807162839',
											ios_tongdaohao: '5',
											iso_MODBUS: '100'
										},
										{
											ios_no: '---- ISO685： 56789',
											ios_name: 'ios685 name',
											ios_product: 'BNENDER',
											ios_xuliehao: '2545120246',
											ios_tongdaohao: '10',
											iso_MODBUS: '105'
										}
									]
									
									tempData.ios685Data = iso685list
									
								})
								
								
								console.log('--',tempData)
								
								that.treeData.push(tempData)
							}
						}
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	p {
		margin: 0;
		padding: 0;
	}

	.item-key {
		width: 80px;
		display: inline-block;
		margin-left: 10px;
		line-height: 25px;
		margin-bottom: 5px;
		text-align: right;
		color: #000000;
	}

	.item-value {
		width: calc(100% - 160px);
		background-color: #f5f5f5;
		display: inline-block;
		line-height: 25px;
		padding-left: 10px;
		border-radius: 5px;
		margin-bottom: 5px;
	}

	.item-unit {
		margin-left: 5px;
		display: inline-block;
	}

	.tree-list-content {
		margin: 20px 10px;
	}

	.tree-list-content p .xinhao {
		width: 30px;
		height: 23px;
		padding-top: 3px;
	}

	.tree-list-content p .dianchi {
		height: 20px;
		padding-top: 5px;
	}

	.tree-list-content .title {
		font-size: 14px;
		color: #000000;
		margin-bottom: 10px;
	}

	.tree-content {
		margin: 10px;
	}

	.el-collapse {
		border-top: none
	}

	.col-item-content {
		margin: 0 10px;
	}

	.col-item-content p {
		margin: 0;
		padding: 0;
		line-height: 30px;
	}

	.el-collapse-item__arrow {
		display: block;
	}

	.el-collapse-item__header {
		border-bottom: none;
		background-color: #f3f3f3;
		margin-top: 3px;
		height: 33px;
	}

	.el-collapse-item__wrap {
		border-bottom: none;
	}
</style>
