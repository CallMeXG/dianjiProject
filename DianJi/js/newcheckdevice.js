//初始化数据
//loadInitData();

//function loadInitData() {

//}
window.onload = function() {
	$("#checkDeviceName").val(localStorage.DeveciName);
	$("#checkDeviceNum").val(localStorage.DeveciId);
	$("#checkDeviceModel").val(localStorage.DeveciModel);
	console.log("-=-=")
	$("#checkPeople").val(localStorage.getItem('userName'));
}

$('#submit_btn').on('tap', function() {
	//检查项目
	var checkBZName = $('#checkName').val();
	//检查部位
	var checkBZBW = $('#checkBuWei').val();
	//检查方法
	var checkBZFF = $('#checkFangFa').val();
	//检查标准
	var checkBZBZ = $('#checkBiaoZhun').val();
	//检查工具
	var checkBZGJ = $('#checkGongJu').val();
	//检查周期
	var checkBZZQ = $('#checkZhouQi').val();
	//异常描述
	var checkMiaoShu = $('#checkTextValue').val();
	//点检人员
	var checkPhone = $('#checkPeople').val();
	//点检结果
	var checkSwitchType;
	var isActive = document.getElementById("checkSwitch").classList.contains("mui-active");
	if(isActive) {
		checkSwitchType = '0';
	} else {
		checkSwitchType = '1';
	}
	if(checkPhone.length > 0) {
		uploadimge(checkSwitchType, checkPhone, checkBZName, checkBZBW, checkBZFF, checkBZBZ, checkBZGJ, checkBZZQ, checkMiaoShu);
	} else {
		mui.alert('点检人员不得为空！')
	}
	console.log("[]=" + checkSwitchType)
	console.log("--" + checkBZName + '==' + checkBZBW + '==' + checkBZFF + '==' + checkBZBZ + '==' + checkBZGJ + '==' + checkBZZQ + '==' + checkMiaoShu)

})

var procinstid = 0;
//初始化页面执行操作  
$("#ti").click(function() {
	uploadimge();
})

function myAlert(tip) {
	plus.nativeUI.alert(tip, null, "提示信息");
}

//加载页面初始化需要加载的图片信息  
function showImgDetail(imgId, imgkey, id, src) {
	var html = "";
	html += '<div  id="Img' + imgId + imgkey + '" class="image-item ">';
	html += '    <img id="picBig" data-preview-src="" data-preview-group="1" ' + src + '/>';
	html += '    <span class="del" onclick="delImg(\'' + imgId + '\',\'' + imgkey + '\',' + id + ');">';
	html += '        <div class="fa fa-times-circle"></div>';
	html += '    </span>';
	html += '</div>';
	$("#" + imgkey + "S").append(html);
}
//删除图片  
function delImg(imgId, imgkey, id) {
	var bts = ["是", "否"];
	plus.nativeUI.confirm("是否删除图片？", function(e) {
		var i = e.index;
		if(i == 0) {
			var itemname = id + "img-" + imgkey;
			var itemvalue = plus.storage.getItem(itemname);
			if(itemvalue != null) {
				var index = itemvalue.indexOf(imgId + ",");
				if(index == -1) { //没有找到  
					delImgfromint(imgId, imgkey, id, index);
				} else {
					delImgFromLocal(itemname, itemvalue, imgId, imgkey, index); //修改，加了一个index参数  
				}

			} else {
				delImgfromint(imgId, imgkey, id);
			}
		}
	}, "查勘", bts);
	/*var isdel = confirm("是否删除图片？");  
	if(isdel == false){  
	    return;  
	}*/

}

function delImgFromLocal(itemname, itemvalue, imgId, imgkey, index) {
	var wa = plus.nativeUI.showWaiting();
	var left = itemvalue.substr(0, index - 1);
	var right = itemvalue.substring(index, itemvalue.length);
	var end = right.indexOf("}");
	right = right.substring(end + 1, right.length);
	var newitem = left + right;
	plus.storage.setItem(itemname, newitem);

	$("#Img" + imgId + imgkey).remove();
	wa.close();
}
//选取图片的来源，拍照和相册  
function showActionSheet(conf) {
	var divid = conf.id;
	var actionbuttons = [{
		title: "拍照"
	}, {
		title: "相册选取"
	}];
	var actionstyle = {
		title: "选择照片",
		cancel: "取消",
		buttons: actionbuttons
	};
	plus.nativeUI.actionSheet(actionstyle, function(e) {
		if(e.index == 1) {
			getImage(divid);
		} else if(e.index == 2) {
			galleryImg(divid);
		}
	});
}
//相册选取图片  
function galleryImg(divid) {
	plus.gallery.pick(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			compressImage(entry.toLocalURL(), entry.name, divid);
		}, function(e) {
			plus.nativeUI.toast("读取拍照文件错误：" + e.message);
		});
	}, function(e) {}, {
		filename: "_doc/camera/",
		filter: "image"
	});
}
// 拍照  
function getImage(divid) {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			compressImage(entry.toLocalURL(), entry.name, divid);
		}, function(e) {
			plus.nativeUI.toast("读取拍照文件错误：" + e.message);
		});
	}, function(e) {}, {
		filename: "_doc/camera/",
		index: 1
	});
}
//压缩图片  
function compressImage(url, filename, divid) {
	var name = "_doc/upload/" + divid + "-" + filename; //_doc/upload/F_ZDDZZ-1467602809090.jpg  
	plus.zip.compressImage({
			src: url, //src: (String 类型 )压缩转换原始图片的路径  
			dst: name, //压缩转换目标图片的路径  
			quality: 20, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100  
			overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件  
		},
		function(event) {
			//uploadf(event.target,divid);  
			var path = name; //压缩转换目标图片的路径  
			//event.target获取压缩转换后的图片url路  
			//filename图片名称  
			saveimage(event.target, divid, filename, path);
		},
		function(error) {
			plus.nativeUI.toast("压缩图片失败，请稍候再试");
		});
}
//保存信息到本地  
/**  
 *   
 * @param {Object} url  图片的地址  
 * @param {Object} divid  字段的名称  
 * @param {Object} name   图片的名称  
 */
function saveimage(url, divid, name, path) {
	var state = 0;
	var wt = plus.nativeUI.showWaiting();
	//  plus.storage.clear();   
	name = name.substring(0, name.indexOf("."));
	var id = document.getElementById("ckjl.id").value;
	var itemname = id + "img-" + divid;
	var itemvalue = plus.storage.getItem(itemname);
	if(itemvalue == null) {
		itemvalue = "{" + name + "," + path + "," + url + "}";
	} else {
		itemvalue = itemvalue + "{" + name + "," + path + "," + url + "}";
	}
	plus.storage.setItem(itemname, itemvalue);

	var src = 'src="' + url + '"';
	//alert("itemvalue="+itemvalue);  
	showImgDetail(name, divid, id, src);
	wt.close();

}
//上传图片，实例中没有添加上传按钮  
function uploadimge(checkSwitchType, checkPhone, checkBZName, checkBZBW, checkBZFF, checkBZBZ, checkBZGJ, checkBZZQ, checkMiaoShu) {
	//				        plus.storage.clear(); 

	var wa = plus.nativeUI.showWaiting();
	var DkeyNames = [];
	var id = document.getElementById("ckjl.id").value;
	var length = id.toString().length;
	var idnmae = id.toString();
	var numKeys = plus.storage.getLength();

	var task = plus.uploader.createUpload(new_commen_spot_check_device_Interface, {
			method: "POST"
		},
		function(t, status) {
			if(status == 200) {
				wa.close();
				if(JSON.parse(t["responseText"]).status == "SUCCESS") {
					plus.storage.removeItem(itemkey)

					mui.toast("点检成功");
					//					window.history.back();
					var wobj = plus.webview.getWebviewById("checkHistoryID");
					wobj.reload(true);
					mui.back();

				} else {
					alert("点检失败");
				}

			} else {
				wa.close();
				plus.storage.removeItem(itemkey)

				alert("点检失败");
				history.go(0);
			}
		}
	);

	var ss = task.addData("devices_no", localStorage.DeveciId);
	task.addData("devices_name", localStorage.DeveciName);
	task.addData("ck_result", checkSwitchType);
	task.addData("ck_project", checkBZName);
	task.addData("ck_location", checkBZBW);
	task.addData("ck_method", checkBZFF);
	task.addData("ck_standard", checkBZBZ);
	task.addData("ck_tool", checkBZGJ);
	task.addData("ck_cycle", checkBZZQ);
	task.addData("ck_content", checkMiaoShu);
	task.addData("ck_user_phone", checkPhone);

	// for(var i=0; i<imgArray.length;i++){    
	//var itemkey=id+"img-"+imgArray[i];  

	var itemkey = id + "img-" + "F_CKJLB";
	if(plus.storage.getItem(itemkey) != null) {
		var itemvalue = plus.storage.getItem(itemkey).split("{");
		for(var img = 1; img < itemvalue.length; img++) {
			var imgname = itemvalue[img].substr(0, itemvalue[img].indexOf(","));
			var imgurl = itemvalue[img].substring(itemvalue[img].indexOf(",") + 1, itemvalue[img].lastIndexOf(","));
			task.addFile(imgurl, {
				key: imgurl
			});

		}
	}
	// }  
	console.log("[][][===" + plus.storage.getItem(itemkey))
	if(plus.storage.getItem(itemkey) != null) {
		if(plus.storage.getItem(itemkey).length > 0) {
			//												console.log(plus.storage.getItem(itemkey))

			if(itemvalue.length < 11) { //最多九张照片，但数组长度为10 ，故小于11
				task.start();

			} else {
				alert("照片最多为9张")
				wa.close();
			}

		} else {
			//			alert("请选择图片")
			
			wa.close();
			task.start();
		}
	} else {
		task.start();
	}
	//*/

} //  uploadimge 函数结束
//		</script>