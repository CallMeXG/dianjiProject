//全局变量，信号采样模式的datasource
var caiyangModelArray = new Array();

$(function() {

	var subCardid;
	var strSerialNO;
	
	var arrayDataModel = new Array();
	//初始化数据采集模式和信号采样模式
	function initShuJuCaiYangModel(strTypeName) {
		$("#datacaimodel").val(strTypeName);
		updateThreeTime(strTypeName);
	}

	function initXinHaoCaiYangModel(index) {

		//采样模式
		var caiModels = "#selcaiyangmodel" + index;
		$(caiModels).val(caiyangModelArray[0].mode_name);
		//采样点数
		var caiCountStr = "#selcaiyangcount" + index;
		$(caiCountStr).val(caiyangModelArray[0].sampling_number);
		//采样频率
		var strCaiyangpinlv = "#selcaiyangpinlv" + index;
		$(strCaiyangpinlv).val(caiyangModelArray[0].sampling_frequency);
		//采样量程
		var strCaiyangliangcheng = "#selcaiyangliangcheng" + index;
		$(strCaiyangliangcheng).val(caiyangModelArray[0].range_data + "g");
		//采样精度
		var strCaiyangjingdu = "#selcaiyangjingdu" + index;
		$(strCaiyangjingdu).val(caiyangModelArray[0].sampling_accuracy);
		//工作轴数
		var xyzzhou = caiyangModelArray[0].working_axis;
		var xaxis = xyzzhou.substring(0, 1);
		var yaxis = xyzzhou.substring(1, 2);
		var zaxis = xyzzhou.substring(2, 3);

		if(xaxis == "1") {
			var strXinputid = "xzhou" + index;
			var obj_xinput = document.getElementById(strXinputid);
			obj_xinput.checked = true;
		}
		if(yaxis == "1") {
			var strYinputid = "yzhou" + index;
			var obj_Yinput = document.getElementById(strYinputid);
			obj_Yinput.checked = true;
		}
		if(zaxis == "1") {
			var strZinputid = "zzhou" + index;
			var obj_Zinput = document.getElementById(strZinputid);
			obj_Zinput.checked = true;
		}
		//校准系数
		var strCaiyangxishu = "#selxishu" + index;
		$(strCaiyangxishu).val(caiyangModelArray[0].calibration_coefficient);
	}

	var sensorListArray = new Array();

	mui.plusReady(function() {
		$('#nestStap').click(function() {
			
			if(sensorListArray.length == 0) {
				mui.toast("传感器卡需要绑定传感器才能激活");
			} else {
				var bolNextPage = getChangeData();
				if(bolNextPage != false) {
					window.location.href = "carInfo_activate2.html";
					localStorage.setItem("postParam", JSON.stringify(bolNextPage));
				}

			}

		});

	});

	function getChangeData() {
		var paramArray = new Array();

		var paramDic = new Object();

		//ID
		paramDic.serial_no = strSerialNO;

		//数据采集时间、周期、上传时间
		//		var strCaijiTime = $("#datacaitime").val();
		var strCaijizhouqi = $("#datacaizhouqi").val();
		//		var strUploadTime = $("#datacailoadtime").val();
		var strUploadzhouqi = $("#datacailoadzhouqi").val();

		var arrCaijiTime = getCaijishijian();

		if(arrCaijiTime.indexOf('1') == -1) {
			mui.toast('数据采集时间至少选择一个时间');
			return false;
		} else {
			var arrTime = arrCaijiTime.split(',');
			var workPoint = {
				'sample_time_point': arrTime
			}
			paramDic.work_point_json = JSON.stringify(workPoint);
		}

		if(strCaijizhouqi.length == 0 || strUploadzhouqi.length == 0) {
			mui.toast("采集周期、上传周期必须全部填写！");
			return false;
		} else {
			//采集时间
			//			paramDic.sampling_time = strCaijiTime;
			//采集周期
			if(strCaijizhouqi != "00:00:00") {
				var arrZQ = strCaijizhouqi.split(':');
				var seconds = arrZQ[2];
				var mins = arrZQ[1] * 60;
				var hours = arrZQ[0] * 3600;
				var toCount = parseInt(hours) + parseInt(mins) + parseInt(seconds);
				if(toCount < 3600) {
					mui.toast("数据采集周期不得小于1小时");
					return false;
				} else {
					paramDic.sampling_duration = strCaijizhouqi;
				}
			} else {
				paramDic.sampling_duration = strCaijizhouqi;
			}
			//上传周期
			if(strUploadzhouqi != "00:00:00") {
				var arrZQ = strUploadzhouqi.split(':');
				var seconds = arrZQ[2];
				var mins = arrZQ[1] * 60;
				var hours = arrZQ[0] * 3600;
				var toCount = parseInt(hours) + parseInt(mins) + parseInt(seconds);
				if(toCount < 3600) {
					mui.toast("数据采集时间不得小于1小时");
					return false;
				} else {
					paramDic.update_duration = strUploadzhouqi;
				}
			} else {
				paramDic.update_duration = strUploadzhouqi;
			}


			var Ccenter = $('.Ccenter');
			for(var i = 0; i < Ccenter.length; i++) {

				var strsensorid = "#sunSensorId" + i;
				var objsensorid = $(strsensorid).val();

				var strmodel = "#selcaiyangmodel" + i;
				var objmodel = $(strmodel).val();

				var strcount = "#selcaiyangcount" + i;
				var objcount = $(strcount).val();

				var strpinlv = "#selcaiyangpinlv" + i;
				var objpinlv = $(strpinlv).val();

				var strliangcheng = "#selcaiyangliangcheng" + i;
				var objliangcheng = $(strliangcheng).val();

				var strjingdu = "#selcaiyangjingdu" + i;
				var objjingdu = $(strjingdu).val();

				var strxishu = "#selxishu" + i;
				var objxishu = $(strxishu).val();

				var stranzhuang = "#anzhuang" + i;
				var objanzhuang = $(stranzhuang).val();

				var sensorDic = new Object();

				sensorDic.sensor_no = objsensorid;
				sensorDic.serial_no = strSerialNO;
				
				

				if(objanzhuang.length > 0) {
					sensorDic.install_xy = objanzhuang;
				}
				else{
					mui.toast("安装位置必填");
					return false;
				}

				if(objmodel.length > 0) {
					sensorDic.sampling_model = objmodel;
				}
				else{
					mui.toast("信号采样模式必填");
					return false;
				}
				if(objcount.length > 0) {
					sensorDic.sampling_number = objcount;
				}
				else{
					mui.toast("信号采样点数必填");
					return false;
				}
				if(objpinlv.length > 0) {
					sensorDic.sampling_frequency = objpinlv;
				}
				else{
					mui.toast("信号采样频率必填");
					return false;
				}
				if(objliangcheng.length > 0) {
					sensorDic.range_data = objliangcheng;
				}
				else{
					mui.toast("信号采样量程必填");
					return false;
				}
				if(objjingdu.length > 0) {
					sensorDic.sampling_accuracy = objjingdu;
				}
				else{
					mui.toast("信号采样精度必填");
					return false;
				}
				if(objxishu.length > 0) {
					sensorDic.calibration_coefficient = objxishu;
				}
				else{
					mui.toast("传感器频率校准系数必填");
					return false;
				}

				var checkBol = checkCheckBox(i);
				if(checkBol == false) {
					mui.toast("请至少选择一个轴工作");
					return false;
				} else {
					sensorDic.working_axis = checkBol;
				}

				paramArray.push({
					simWorkModelPO: paramDic,
					sensorMsgPO: sensorDic
				});


			}

		}
		console.log("==========="+JSON.stringify(paramArray))
		return paramArray;
	}

	/**
	 * 激活修改信息
	 * @param  data json
	 */
	function nextStep(data) {
		//		console.log(data);
		$.ajax({
			type: 'get',
			url: commen_update_sim_Interface,
			data: data,
			dataType: 'json',
			success: function(msg) {
				if(msg.status == "SUCCESS") {
					mui.toast(msg.info);
					localStorage.serial_no = $('#serial_no').html();
					//					window.location.replace("carInfo_activate2.html");
					window.location.href = "carInfo_activate2.html";
				} else if(msg.status == "FAILED") {
					mui.toast(msg.message)
				}
			},
			error: function(e) {

			}
		})

	}

	function isUndefined(probe, key) {

		if(probe == undefined || probe == null) {
			val = '';
			return val;
		} else {
			return list[key];
		}

	}

	//dom插入标签
	function buildSim(sim, sensor, probe) {

		//				console.log(JSON.stringify(sim) + sensor)

		if(sim == null || sim == undefined) {
			sim = {}
		}
		if(sensor == null || sensor == undefined) {
			sensor = {}
		}
		if(probe == null || probe == undefined) {
			probe = {}
		}
		//		console.log(JSON.stringify(sim))
		//卡信息
		$('#ctrlName').html(sim.sim_name + " " + sim.serial_no);
		$('#titleName').html(sim.sim_name); //no
		if(sim.imei != undefined) {
			$('#imei').html(sim.imei);
		} else {
			$('#imei').html("----");
		}
		///*
		if(sim.internet_things_no != undefined) {
			$('#wulianwangID').html(sim.internet_things_no); //no
		} else {
			$('#wulianwangID').html("----"); //no
		}

		if(sim.produce != undefined) {
			$('#produce').html(sim.produce); //no
		} else {
			$('#produce').html("----"); //no
		}

		if(sim.pro_bitch != undefined) {
			$('#content').html(sim.pro_bitch); //no
		} else {
			$('#content').html("----"); //no
		}

		if(sim.version != undefined) {
			$('#version').html(sim.version); //no
		} else {
			$('#version').html("----"); //no
		}

		if(sim.create_time != undefined) {
			$('#nowTime').html(sim.create_time); //no
		} else {
			$('#nowTime').html("----"); //no
		}

		//		if(sim.led_model != undefined) {
		//			$('#rizhi').html(sim.led_model); //no
		//		} else {
		$('#rizhi').html("----"); //no
		//		}

		//		if(sim.sim_model != undefined) {
		//			$('#xiaoqu').html(sim.sim_model); //no
		//		} else {
		$('#xiaoqu').html("----"); //no
		//		}

		//		if(sim.imei != undefined) {
		//			$('#xinhao').html(sim.imei); //no
		//		} else {
		$('#xinhao').html("----"); //no
		//		}

		//		if(sim.serial_no != undefined) {
		//			$('#dianchi').html(sim.serial_no); //no
		//		} else {
		$('#dianchi').html("----"); //no
		//		}

		if(sim.serial_no != undefined) {
			$('#workStatus').html(simState(sim.state, sim.work_status)); //no
		} else {
			$('#workStatus').html("----"); //no
		}

		if(sim.software_version != undefined) {
			$('#software_version').html(sim.software_version); //no
		} else {
			$('#software_version').html("----"); //no
		}

		if(sim.sampling_time != undefined) {
			$('#datacaitime').html(sim.sampling_time); //no
		}

		if(sim.sampling_duration != undefined) {
			$('#datacaizhouqi').html(sim.sampling_duration); //no
		}

		if(sim.upload_time_mode != undefined) {
			$('#datacailoadtime').html(sim.software_version); //no
		}
		if(sim.update_duration != undefined) {
			$('#datacailoadzhouqi').html(sim.update_duration); //no
		}

		
		for(var i = 0; i < sensor.length; i++) {
			subCardid = sensor[i].sensor_no;
			var subSensor = sensor[i];

			var sensorStr = '<div class="Ccenter con"><div><img src="../img/img1.png" alt="" />';
			if(subSensor.sensor_no != undefined) {
				sensorStr += '<span id="idOfcard" class="name">传感器卡序列号：</span><span id="serial_no" class="val">' + subSensor.sensor_no + '</span><input hidden="hidden" id="sunSensorId' + i + '" value=' + subSensor.sensor_no + '></div>';

			} else {
				sensorStr += '<span id="idOfcard" class="name">传感器卡序列号：</span><span id="serial_no" class="val">' + subSensor.sensor_no + '</span></div>';

			}

			sensorStr += '<div><img src="../img/img14.png" alt="" /><span class="name">硬件版本：</span><span class="val">' + subSensor.fw_version + '</span></div>';

			sensorStr += '<div><img src="../img/img15.png" alt="" /><span class="name">固件版本：</span><span class="val">' + subSensor.version + '</span></div>';
			sensorStr += '<div><img src="../img/img16.png" alt="" /><span class="name">校准日期：</span><span class="val">' + subSensor.calibration_time + '</span></div>';
			if(subSensor.sensitives != undefined) {
				sensorStr += '<div><img src="../img/img17.png" alt="" /><span class="name">温度传感器灵敏度：</span><span class="val">' + subSensor.sensitives + '</span></div>';
			} else {
				sensorStr += '<div><img src="../img/img17.png" alt="" /><span class="name">温度传感器灵敏度：</span><span class="val">' + "----" + '</span></div>';
			}
			if(subSensor.probe_name != undefined) {
				sensorStr += '<div><img src="../img/img17.png" alt="" /><span class="name">振动探头名称：</span><span class="val">' + subSensor.probe_name + '</span></div>';
			} else {
				sensorStr += '<div><img src="../img/img17.png" alt="" /><span class="name">振动探头名称：</span><span class="val">' + "----" + '</span></div>';
			}
			if(subSensor.sensitivity != undefined) {
				sensorStr += '<div><img src="../img/img17.png" alt="" /><span class="name">振动传感器灵敏度：</span><span class="val">' + subSensor.sensitivity + '</span></div>';
			} else {
				sensorStr += '<div><img src="../img/img17.png" alt="" /><span class="name">振动传感器灵敏度：</span><span class="val">' + "----" + '</span></div>';
			}
			if(subSensor.install_xy) {
				sensorStr += '<div class="topologyLocation"><img src="../img/img19.png" alt="" /><span class="name modify">安装位置：</span><input id="anzhuang' + i + '" style="border: thin solid #5798f9;" type="text" value=' + subSensor.install_xy + ' /></div>';
			} else {
				sensorStr += '<div class="topologyLocation"><img src="../img/img19.png" alt="" /><span class="name modify">安装位置：</span><input id="anzhuang' + i + '" style="border: thin solid #5798f9;" type="text" /></div>';
			}
			if(subSensor.sampling_model) {
				sensorStr += '<div class="topologyLocation"><img src="../img/img19.png" alt="" /><span class="name modify">信号采样模式：</span><input id="selcaiyangmodel' + i + '" onclick="caiyangmodelClick(' + i + ')" style="border: thin solid #5798f9;" type="button" value=' + subSensor.sampling_model + ' /></div>';
			} else {
				sensorStr += '<div class="topologyLocation"><img src="../img/img19.png" alt="" /><span class="name modify">信号采样模式：</span><input id="selcaiyangmodel' + i + '" onclick="caiyangmodelClick(' + i + ')" style="border: thin solid #5798f9;" type="button" /></div>';
			}
			if(subSensor.sampling_number) {
				sensorStr += '<div class="topologyLocation"><img src="../img/img19.png" alt="" /><span class="name modify">信号采样点数：</span><input id="selcaiyangcount' + i + '" onclick="caiyangcountClick(' + i + ')" style="border: thin solid #5798f9;" type="button" value=' + subSensor.sampling_number + ' /></div>';
			} else {
				sensorStr += '<div class="topologyLocation"><img src="../img/img19.png" alt="" /><span class="name modify">信号采样点数：</span><input id="selcaiyangcount' + i + '" onclick="caiyangcountClick(' + i + ')" style="border: thin solid #5798f9;" type="button" /></div>';
			}
			if(subSensor.sampling_frequency) {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">信号采样频率：</span><input id="selcaiyangpinlv' + i + '" onclick="caiyangpinlvClick(' + i + ')" style="border: thin solid #5798f9;" type="button"' + subSensor.sampling_frequency + ' /></div>';
			} else {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">信号采样频率：</span><input id="selcaiyangpinlv' + i + '" onclick="caiyangpinlvClick(' + i + ')" style="border: thin solid #5798f9;" type="button" /></div>';
			}
			if(subSensor.range_data) {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">信号采样量程：</span><input id="selcaiyangliangcheng' + i + '" onclick="caiyangliangchengClick(' + i + ')" style="border: thin solid #5798f9;" type="button"' + subSensor.range_data + ' /></div>';
			} else {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">信号采样量程：</span><input id="selcaiyangliangcheng' + i + '" onclick="caiyangliangchengClick(' + i + ')" style="border: thin solid #5798f9;" type="button" /></div>';
			}
			if(subSensor.sampling_accuracy) {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">信号采样精度：</span><input id="selcaiyangjingdu' + i + '" onclick="caiyangjingduClick(' + i + ')" style="border: thin solid #5798f9;" type="button"' + subSensor.sampling_accuracy + ' /></div>';
			} else {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">信号采样精度：</span><input id="selcaiyangjingdu' + i + '" onclick="caiyangjingduClick(' + i + ')" style="border: thin solid #5798f9;" type="button" /></div>';
			}
			//			if(subSensor.sampling_model) {
			//				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">传感器工作轴数：</span><input id="selcaiyangzhou' + i + '" style="border: thin solid #5798f9;" type="button" /></div>';
			//			} else {
			//				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">传感器工作轴数：</span><input id="selcaiyangzhou' + i + '" style="border: thin solid #5798f9;" type="button" /></div>';
			//			}
			sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">传感器工作轴数（至少选择一个轴工作）：</span></div>';
			sensorStr += "<br/>";
			sensorStr += setCheckButton(i, subSensor.working_axis);
			if(subSensor.calibration_coefficient) {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">传感器频率校准系数：</span><input id="selxishu' + i + '" style="border: thin solid #5798f9;" type="text" value="' + subSensor.calibration_coefficient + ' /></div>';
			} else {
				sensorStr += '<div class="installLocation"><img src="../img/img18.png" alt="" />\<span class="name modify">传感器频率校准系数：</span><input id="selxishu' + i + '" style="border: thin solid #5798f9;height:16px" type="text" /></div>';
			}
			sensorStr += '<br/>';
			sensorStr += '<div class="Cbottom con">';
			sensorStr += '</div>';

			$('.center').append(sensorStr);

		}
		
		

		for(var i = 0; i < sensor.length; i++) {
			var strWorking = sensor[i].working_axis;

			checkwork_axis(i, strWorking);
			initXinHaoCaiYangModel(i);
		}
		
		initShuJuCaiYangModel(arrayDataModel[0].mode_name);
		
	}

	//卡工作状态
	function simState(statue, work_statues) {

		var sta_1 = statue;

		var sta_2 = work_statues;
		var strStute = "";
		///*
		if(sta_1 == 5) {
			if(sta_2 == 0) {
				strStute = "工作";
			}
			if(sta_2 == 1) {
				strStute = "失联";
			}
			if(sta_2 == 2) {
				strStute = "关机";
			}
			if(sta_2 == 3) {
				strStute = "休眠";
			}
			if(sta_2 == 4) {
				strStute = "故障";
			}

		}
		if(sta_1 == 6) {
			strStute = "未激活";
		}
		return strStute;
		//*/

	}

	//修改数据采集模式，并根据模式自动刷新下面三个时间
	
	var dataModelType = "";
	getModelDatasource();
	//先获取总的模式，
	function getModelDatasource() {
		$.ajax({
			type: "get",
			async: false,
			url: commen_gain_model_list_Interface,
			dataType: 'json',
			success: function(msg) {
				arrayDataModel = msg.data;
			}
		});
	}

	$("#datacaimodel").click(function() {
		//普通示例
		var userPicker = new mui.PopPicker();
		var setdataArray = new Array();
		for(var i = 0; i < arrayDataModel.length; i++) {
			var setdataDic = {
				text: arrayDataModel[i].mode_name
			};
			setdataArray.push(setdataDic);
		}
		userPicker.setData(setdataArray);
		var strid = "datacaimodel";
		var userResult = document.getElementById(strid);
		userPicker.show(function(items) {
			userResult.value = items[0].text;
			updateThreeTime(userResult.value);
		});
	})
	//选择好数据采集模式后，更新下面三个时间
	function updateThreeTime(strValue) {
		$.ajax({
			type: "get",
			async: false,
			data: {
				mode_name: strValue
			},
			url: commen_gain_model_list_Interface,
			dataType: 'json',
			success: function(msg) {
				//				var firststr = "datacaitime";
				var secondstr = "datacaizhouqi";
				//				var thirdstr = "datacailoadtime";
				var forthstr = "datacailoadzhouqi";

				//				var getdatatimeobj = document.getElementById(firststr);
				var timelengthobj = document.getElementById(secondstr);
				//				var uploadTimeobj = document.getElementById(thirdstr);
				var uploadzhouqiobj = document.getElementById(forthstr);

				timelengthobj.value = msg.data[0].sampling_duration;
				//				getdatatimeobj.value = msg.data[0].sampling_time;
				//				uploadTimeobj.value = msg.data[0].upload_time;
				uploadzhouqiobj.value = msg.data[0].update_duration;

				var dataCaijiTime = msg.data[0].sampling_time;
				var caijiTimeHours = dataCaijiTime.substr(0, 2);
				var numCaiTime = parseInt(caijiTimeHours);
				var caijiArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				caijiArray[numCaiTime] = 1;
				setDataForNewCaijiTime(caijiArray);
			}
		});
	}

	function setDataForNewCaijiTime(dataSource) {
		$('[name=itemCheck]:checkbox').each(function(index) {
			var idType = dataSource[index];
			var bolCheck = false;
			if(idType == 1) {
				bolCheck = true;
			}
			$(this).prop("checked", bolCheck);
		})
	}

	//数据采集时间
	$("#datacaitime").jeDate({
		format: "hh:mm:ss"
	});
	//数据采集周期
	$("#datacaizhouqi").jeDate({
		format: "hh:mm:ss"
	});
	//数据上传时间
	$("#datacailoadtime").jeDate({
		format: "hh:mm:ss"
	});
	//数据上传周期
	$("#datacailoadzhouqi").jeDate({
		format: "hh:mm:ss"
	});

	function evalAss() {

		$.ajax({
			type: "get",
			async: true,
			data: {
				serial_no: localStorage.simID,
				state: "ACTIVE"
			},
			url: appGetSim_Interface,
			dataType: 'json',
			success: function(msg) {

				//				console.log(JSON.stringify(msg))

				var sim = msg.data.sim[0];

				strSerialNO = sim.serial_no;

				//				console.log(strSerialNO)
				var sensor = msg.data.sensor;
				sensorListArray = sensor;
				var probe = msg.data.probe;

				buildSim(sim, sensor, probe);

			}
		});

	}

	evalAss();

})

//信号采样模式
function caiyangmodelClick(index) {

	var userPicker = new mui.PopPicker();
	var setdataArray = new Array();
	for(var i = 0; i < caiyangModelArray.length; i++) {
		setdataArray.push({
			text: caiyangModelArray[i].mode_name,
			sampling_number: caiyangModelArray[i].sampling_number,
			sampling_frequency: caiyangModelArray[i].sampling_frequency,
			range_data: caiyangModelArray[i].range_data,
			sampling_accuracy: caiyangModelArray[i].sampling_accuracy,
			calibration_coefficient: caiyangModelArray[i].calibration_coefficient,
			working_axis: caiyangModelArray[i].working_axis
		});
	}
	userPicker.setData(setdataArray);
	var strid = "selcaiyangmodel" + index;
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		//采样模式
		userResult.value = items[0].text;
		//采样点数
		var caiCountStr = "#selcaiyangcount" + index;
		$(caiCountStr).val(items[0].sampling_number);
		//采样频率
		var strCaiyangpinlv = "#selcaiyangpinlv" + index;
		$(strCaiyangpinlv).val(items[0].sampling_frequency);
		//采样量程
		var strCaiyangliangcheng = "#selcaiyangliangcheng" + index;
		$(strCaiyangliangcheng).val(items[0].range_data + "g");
		//采样精度
		var strCaiyangjingdu = "#selcaiyangjingdu" + index;
		$(strCaiyangjingdu).val(items[0].sampling_accuracy);
		//工作轴数
		var xyzzhou = items[0].working_axis;
		var xaxis = xyzzhou.substring(0, 1);
		var yaxis = xyzzhou.substring(1, 2);
		var zaxis = xyzzhou.substring(2, 3);

		if(xaxis == "1") {
			var strXinputid = "xzhou" + index;
			var obj_xinput = document.getElementById(strXinputid);
			obj_xinput.checked = true;
		}
		if(yaxis == "1") {
			var strYinputid = "yzhou" + index;
			var obj_Yinput = document.getElementById(strYinputid);
			obj_Yinput.checked = true;
		}
		if(zaxis == "1") {
			var strZinputid = "zzhou" + index;
			var obj_Zinput = document.getElementById(strZinputid);
			obj_Zinput.checked = true;
		}
		//校准系数
		var strCaiyangxishu = "#selxishu" + index;
		$(strCaiyangxishu).val(items[0].calibration_coefficient);
		//console.log(items[0].sampling_number +"==" + items[0].sampling_frequency+"==" + items[0].range_data +"==" + items[0].sampling_accuracy)
	});
}

//采样点数
function caiyangcountClick(index) {
	var userPicker = new mui.PopPicker();
	var setdataArray = new Array();
	var sum = 256;
	setdataArray.push({
		text: sum
	});
	for(var i = 0; i < 7; i++) {
		sum = sum * 2;
		var textDic = {
			text: sum
		};
		setdataArray.push(textDic);
	}
	userPicker.setData(setdataArray);
	var strid = "selcaiyangcount" + index;
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		userResult.value = items[0].text;
	});
}

//采样频率
function caiyangpinlvClick(index) {
	var userPicker = new mui.PopPicker();
	var setdataArray = new Array();
	userPicker.setData([{
		text: "200"
	}, {
		text: "400"
	}, {
		text: "800"
	}, {
		text: "1600"
	}, {
		text: "3200"
	}]);
	var strid = "selcaiyangpinlv" + index;
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		userResult.value = items[0].text;
	});
}

//采样量程
function caiyangliangchengClick(index) {
	var userPicker = new mui.PopPicker();
	userPicker.setData([{
		text: "±2g"
	}, {
		text: "±4g"
	}, {
		text: "±8g"
	}, {
		text: "±16g"
	}]);
	var strid = "selcaiyangliangcheng" + index;
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		userResult.value = items[0].text;
	});
}

//采样精度
function caiyangjingduClick(index) {
	var userPicker = new mui.PopPicker();
	var setdataArray = new Array();
	for(var i = 10; i < 49; i++) {
		var setdataDic = {
			text: i
		};
		setdataArray.push(setdataDic);
	}
	userPicker.setData(setdataArray);
	var strid = "selcaiyangjingdu" + index;
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		userResult.value = items[0].text;
	});
}

//传感器工作轴数
function setCheckButton(i, str_working) {

	return '<label class="checkLabel"><input id="xzhou' + i + '" class="checkXYZBox" type="checkbox" value="" />X轴 </label><label class="checkLabel"><input id="yzhou' + i + '" class="checkXYZBox" type="checkbox" value="" />Y轴 </label><label class="checkLabel"><input id="zzhou' + i + '" class="checkXYZBox" type="checkbox" value="" />Z轴 </label>';

}
//传感器工作轴数
function checkwork_axis(i, str_working) {

	if(str_working != undefined) {
		var xaxis = str_working.substring(0, 1);
		var yaxis = str_working.substring(1, 2);
		var zaxis = str_working.substring(2, 3);

		if(xaxis == "1") {
			var strXinputid = "xzhou" + i;
			var obj_xinput = document.getElementById(strXinputid);
			obj_xinput.checked = true;
		}
		if(yaxis == "1") {
			var strYinputid = "yzhou" + i;
			var obj_Yinput = document.getElementById(strYinputid);
			obj_Yinput.checked = true;
		}
		if(zaxis == "1") {
			var strZinputid = "zzhou" + i;
			var obj_Zinput = document.getElementById(strZinputid);
			obj_Zinput.checked = true;
		}
	}

}

function checkCheckBox(i) {

	var strXinputid = "xzhou" + i;
	var obj_xinput = document.getElementById(strXinputid);
	var strYinputid = "yzhou" + i;
	var obj_Yinput = document.getElementById(strYinputid);
	var strZinputid = "zzhou" + i;
	var obj_Zinput = document.getElementById(strZinputid);

	if(obj_xinput.checked == false && obj_Yinput.checked == false && obj_Zinput.checked == false) {
		return false;
	} else {
		var xcheck = "0";
		var ycheck = "0";
		var zcheck = "0";
		if(obj_xinput.checked == true) {
			xcheck = "1";
		}
		if(obj_Yinput.checked == true) {
			ycheck = "1";
		}
		if(obj_Zinput.checked == true) {
			zcheck = "1";
		}
		var totalCheck = xcheck + ycheck + zcheck;
		return totalCheck;
	}

}

//从服务器获取采样模式等信息,总体的
getCaiModelData();

function getCaiModelData() {
	$.ajax({
		type: "get",
		url: commen_gain_sampling_model_list_Interface,
		data: "",
		async: false,
		dataType: "json",
		success: function(respMsg) {
			if(respMsg.status == "SUCCESS") {

				caiyangModelArray = respMsg.data;

			} else {
				mui.toast(respMsg.message);
			}
		}
	})
}

function getCaijishijian() {
	var checkedArray = new Array(); //放已经选择的checkbox的value
	checkedArray.length = 0;
	var indexPathTitle = '[name=itemCheck]:checkbox';
	$(indexPathTitle).each(function() {
		var checkBol = $(this).is(':checked');
		var cheNum = 0;
		if(checkBol == true) {
			cheNum = 1;
		}
		checkedArray.push(cheNum);
	});
	if(checkedArray.length == 0) {
		alert("采集时间至少选择一个");
		return;
	}
	return checkedArray.toString();
	
	
	
	
	
}