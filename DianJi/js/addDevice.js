var companyArray = new Array();
var reginArray = new Array();
var companyID = null;
var regionID = null;

getInitCompany();

function getInitCompany() {
	$.ajax({
		type: "get",
		url: commen_gain_company_map_Interface,
		async: true,
		dataType: "json",
		success: function(respData) {
			console.log(JSON.stringify(respData))
			var dataArray = respData.data;
			for(var i = 0; i < dataArray.length; i++) {
				var subRegionArray = dataArray[i].region_list;
				var company_region = new Array();
				for(var j = 0; j < subRegionArray.length; j++) {
					var obj_subRegion = {
						value: subRegionArray[j].id,
						text: subRegionArray[j].region_name
					}
					company_region.push(obj_subRegion);
				}

				var obj_company = {
					value: dataArray[i].id,
					text: dataArray[i].company_name,
					children: company_region
				};
				companyArray.push(obj_company)
			}
		}
	});
}

//选择出厂时间
$("#devices_out_time").jeDate({
	format: "YYYY-MM-DD"
});
//选择企业名称
$("#id_companyName").click(function() {
	var userPicker = new mui.PopPicker();
	var setdataArray = new Array();
	console.log(JSON.stringify(companyArray));
	userPicker.setData(companyArray);
	var strid = "id_companyName";
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		userResult.value = items[0].text;
		companyID = items[0].value;
		regionID = null;
		reginArray = items[0].children;
		$("#id_changName").val("");
	});
})
//选择分厂
$("#id_changName").click(function() {
	var userPicker = new mui.PopPicker();
	userPicker.setData(reginArray);
	var strid = "id_changName";
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		userResult.value = items[0].text;
		regionID = items[0].value;
	});
})
//电机基座刚度
$("#add_gangdu").click(function() {
	var userPicker = new mui.PopPicker();
	userPicker.setData([{
		text: "刚性"
	}, {
		text: "弹性"
	}]);
	var strid = "add_gangdu";
	var userResult = document.getElementById(strid);
	userPicker.show(function(items) {
		userResult.value = items[0].text;
	});
})

//$("#addDevice").on('tap', function() {
//	//获得主页面的webview
////	var main = plus.webview.getWebviewById('headerindex.html');
////	//触发主页面的gohome事件
////	mui.fire(main, 'backhome');
//	mui.back();
//})

///*
$('#addDevice').click(function() {
	

	var company_id = companyID;
	var region_id = regionID;

	var devices_name = $('#devices_name').val();
	var devices_no = $('#devices_no').val();
	var devices_model = $('#devices_model').val();
	//	var company = $('#company').val();
	var devices_out_time = $('#devices_out_time').val();
	var devices_power = $('#devices_power').val();
	var install_way = $('#install_way').val();
	var work_voltage = $('#work_voltage').val();
	var devices_produce = $('#devices_produce').val();
	var power_factor = $('#power_factor').val();
	var protection = $('#protection').val();
	var insulation = $('#insulation').val();
	var bearing_model = $('#bearing_model').val();
	var work_shop = $('#work_shop').val();
	var pro_line = $('#pro_line').val();
	var use_scenes = $('#use_scenes').val();
	var create_time = $('#create_time').val();

	//新增
	var zhuansu = $('#add_zhuansu').val();
	var duishu = $('#add_duishu').val();
	var gangdu = $('#add_gangdu').val();
	var jiegoutu = $('#add_jigoutu').val();
	var chuandongbi = $('#add_chuandongbi').val();
	var chilunshu = $('#add_chilunshu').val();
	var lianzhouType = $('#add_lianzhoutype').val();

	if(companyID == null) {
		mui.toast('请选择企业名称');
		return false;
	}
	if(region_id == null) {
		mui.toast('请选择分厂');
		return false;
	}

	if(devices_name == '' || devices_name == undefined) {
		mui.toast('设备名称不能为空');
		return false;
	}
	if(devices_no == '' || devices_no == undefined) {
		mui.toast('设备编号不能为空');
		return false;
	}

	if(devices_model == '' || devices_model == undefined) {
		mui.toast('设备型号不能为空');
		return false;
	}

	if(pro_line == '' || pro_line == undefined) {
		mui.toast('生产产线不能为空');
		return false;
	}
	if(use_scenes == '' || use_scenes == undefined) {
		mui.toast('应用场景不能为空');
		return false;
	}

	var data = {
		strLoginId: localStorage.getItem("strLoginId"),
		strLoginToken: localStorage.getItem("strLoginToken"),
		company_id: company_id,
		region_id: region_id,
		devices_name: devices_name,
		devices_no: devices_no,
		devices_model: devices_model,
		//		company: company,
		devices_out_time: devices_out_time,
		devices_power: devices_power,
		install_way: install_way,
		work_voltage: work_voltage,
		devices_produce: devices_produce,
		power_factor: power_factor,
		protection: protection,
		insulation: insulation,
		bearing_model: bearing_model,
		//		work_shop: work_shop,
		pro_line: pro_line,
		use_scenes: use_scenes,
		create_time: create_time,
		rated_speed: zhuansu,
		magnetism_pair: duishu,
		base_rigidity: gangdu,
		gearbox_transmission_ratio: chuandongbi,
		gearbox_gear_pair: chilunshu,
		coupling_type: lianzhouType,
		devices_type: 'E'
	};

	console.log(JSON.stringify(data));
///*
	$.ajax({
		type: "get",
		url: commen_add_device_Interface,
		async: true,
		dataType: 'json',
		data: data,
		success: function(msg) {
			console.log(msg);
			if(msg.status == "SUCCESS") {
				mui.toast(msg.message);
				mui.back();
			} 
			if (msg.status == 'ILLEGAL') {
				mui.alert('您的账户登录过期，请退出重新登录！')
			}
		}
	});
	
	//*/

})
//*/