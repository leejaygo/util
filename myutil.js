var zhtoolUtil = {
	//去除数组中重复的元素
	uniqueArray: function(arr) {
		arr = arr || [];
		var a = {};
		for (var i = 0, len = arr.length; i < len; i++) {
			var key = arr[i];
			if (typeof(a[key]) == 'undefined') {
				a[key] = 1;
			}
		}

		//一下可以分两种一个是直接改变原数组，另一种是不改变原数组
		//改变原数组
		/*arr.length = 0;
		for(var key1 in a){
			arr[arr.length] = key1;
		}
		return arr;*/

		//不改变原数组，返回新数组
		var arrtmp = [];
		var num = 0;
		for (var key1 in a) {
			arrtmp[num] = key1;
			num++;
		}

		return arrtmp;
	},
	//判断两个数组是否相同两种，一种是严格意义的相同就是元素、顺序都相同，第二种是元素相同但顺序可以不同
	//严格意义的数组相同1
	isAbosoluteSame: function(arr1, arr2) {
		var ifsame = true;
		if (arr1.length == arr2.length) {
			for (var i = 0, len = arr1.length; i < len; i++) {
				if (arr1[i] != arr2[i]) {
					ifsame = false;
					break;
				}
			}
		} else {
			ifsame = false;
		}
		return ifsame;
	},

	isAbosoluteSame2: function(arr1, arr2) {
		var ifsame = false;
		if (arr1.toString() == arr2.toString()) {
			ifsame = true;
		}
		return ifsame;
	},
	/*
	 *不严格的数组相同
	 *@param {array} arr1 arr2  比较是否相等的两个数组
	 */
	notAbosoluteSame: function(arr1, arr2) {
		var ifsame = false;
		var len1 = arr1.length,
			len2 = arr2.length;
		if (len1 == len2) {
			var tmp = [];
			for (var i = 0; i < len1; i++) {
				for (var j = 0; j < len2; j++) {
					if (arr1[i] == arr2[j]) {
						tmp.push(1);
					}
				}
			}
			if (tmp.length == len1) {
				ifsame = true;
			} else {
				ifsame = false;
			}
		} else {
			ifsame = false;
		}
		return ifsame;
	},
	/** 
	 * 根据类名获得元素 
	 * 参数说明: 
	 *      1、className 类名 
	 *      2、tag 元素名 默认所有元素 
	 *      3、elm 父元素 默认doucment 
	 */
	getElementByclassname: function(classname, tag, elm) {
		var testclass = new RegExp("(^|/s)" + classname + "(/s|$)");
		var tag = tag || "*";
		var elem = elem || document;

		var elements = (tag == "*" && elem.all) ? elem.all : elem.getElementsByTagName(tag);
		var returnelements = [];
		for (var i = 0, len = elements.length; i < len; i++) {
			if (testclass.test(elements[i].className)) {
				returnelements.push(elements[i]);
			}
		}
		return returnelements;
	},
	/*
	 *根据div的id来拖动div
	 *@param {string} objid       点击拖动div中元素的id
	 *@param {string} dragdivid    整个移动div的id
	 */
	//不足：不能兼容IE浏览器
	dragElement: function(objid, dragdivid) {
		var dragpos = document.getElementById(objid);
		dragpos.style.cursor = "move";

		var dgdiv = document.getElementById(dragdivid);
		var dgdiv_width = dgdiv.currentStyle ? dgdiv.currentStyle.width : document.defaultView.getComputedStyle(dgdiv, null).width;
		var dgdiv_height = dgdiv.currentStyle ? dgdiv.currentStyle.height : document.defaultView.getComputedStyle(dgdiv, null).height;

		var dgdiv_border = dgdiv.currentStyle ? dgdiv.currentStyle.borderWidth : document.defaultView.getComputedStyle(dgdiv, null).borderWidth;

		var delpx_wd = dgdiv_width.substring(0, dgdiv_width.length - 2);
		var delpx_he = dgdiv_height.substring(0, dgdiv_height.length - 2);
		var delpx_border = dgdiv_border.substring(0, dgdiv_border.length - 2);
		dragpos.onmousedown = function(e) {
			var inneroffsetx = e.clientX - dgdiv.offsetLeft;
			var inneroffsety = e.clientY - dgdiv.offsetTop;

			document.onmousemove = function(evt) {
				var left = evt.clientX - inneroffsetx;
				var top = evt.clientY - inneroffsety;

				var clientwd = document.documentElement.clientWidth;
				var clienthe = document.documentElement.clientHeight;

				if (left < 0) {
					left = 0;
				} else if (left > (clientwd - delpx_wd - delpx_border * 2)) {
					left = clientwd - delpx_wd - delpx_border * 2;
				}

				if (top < 0) {
					top = 0;
				} else if (top > (clienthe - delpx_he - delpx_border * 2)) {
					top = clienthe - delpx_he - delpx_border * 2;
				}

				dgdiv.style.left = left + 'px';
				dgdiv.style.top = top + 'px';
			}
			document.onmouseup = function(e) {
				document.onmousemove = null;
				document.onmouseup = null;
			}

		}
	},
	operateArray: {
		//找出数组中的数值最大值
		//@param {array} arr
		getMaxInArr: function(arr) {
			return Math.max.apply(null, arr); //apply的精辟利用
		},

		//把一个数组push到另一个数组,可以避免for循环
		arrPushToarr: function(arr1, arr2) {
			Array.prototype.push.apply(arr1, arr2);
			return arr1;
		},

		//复制数组
		copyArray: function(arr) {
			return arr.slice(0);
		},

		isElementInarr: function(ele, arr) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === ele) {
					return true;
				}
			}
			return false;
		}
	},

	/**
	 * [getType 获取对象的类型]
	 * @param  {[type]} o [任何类型的值]
	 * @return {[type]}   [number，string，array，function，object，date，regexp，boolean字符串]
	 */
	getType: function(o){
    	var _t;
    	return ((_t = typeof(o)) == "object" ? o ===null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
    },

	//判断一个是否为数组
	isArray: function(arr) {
		return Object.prototype.toString.call(arr) === '[object Array]';
	},

	// 判断fn是否为一个函数，返回一个bool值
	isFunction: function(fn) {
		return Object.prototype.toString.call(fn) === '[object Function]';
	},
	//对象

	// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
	// 尝试使用一行简洁的正则表达式完成该题目,所用正则表达式出自jquery源码
	trim: function(str) {
		// your implement
		return str.replace(/(^[\s\xA0]+)|([\s\xA0]+$)/g, "");
	},

	//删除左边的空格
	ltrim: function(str) {　
		return str.replace(/^[\s\xA0]+/g, "");
	},

	//删除右边的空格
	rtrim: function(str) {　　
		return str.replace(/[\s\xA0]+$/g, "");
	},
	//给DOM元素添加事件
	/**
	 *参数说明
	 *   1、evtType事件类型
	 *	2、ele绑定事件的dom元素	
	 *	3、事件函数
	 */
	addHandle: function(evtType, ele, handle) {
		if (ele.addEventListener) {

			ele.addEventListener(evtType, handle, false);

		} else if (ele.attachEvent) {

			ele.attachEvent("on" + evtType, handle);

		} else {

			ele["on" + evtType] = handle;
		}
		//如果是mousewheel事件要加上下面的判断
		// if (evtType == 'mousewheel' && this.getIEVersion() === 0) { //对于mousewheel事件单独处理
		// 	ele.addEventListener("DOMMouseScroll", func, false);
		// }
	},

	/**
	 * [getIEVersion 获取IE的版本号，如果不是IE就返回0]
	 * @return {[type]} [description]
	 */
	getIEVersion: function(){
		var userAgent = window.navigator.userAgent.toLowerCase();
	    //if(/msie 10\.0/i.test(userAgent)) return 10;
	    //if(/msie 9\.0/i.test(userAgent)) return 9;
	    if(/msie 8\.0/i.test(userAgent)) return 8;
	    if(/msie 7\.0/i.test(userAgent)) return 7;
	    if(/msie 6\.0/i.test(userAgent)) return 6;
	    return 0;
	},

	//移除DOM上绑定的元素
	/*
	 *参数说明
	 *	1、evtType事件类型
	 *	2、ele绑定事件的dom元素
	 *	3、事件函数
	 */
	removeHandle: function(evtType, ele, handle) {
		if (ele.removeEventListener) {
			ele.removeEventListener(evtType, handle, false);
		} else if (ele.detachEvent) {
			ele.detachEvent('on' + evtType, handle);
		} else {
			ele["on" + evtType] = null;
		}
	},

	//对象深拷贝
	cloneObj: function (obj) {
		var newobj, s;
		if (typeof obj !== 'object') {
			return;
		}
		newobj = obj.constructor === Object ? {} : [];
		if (window.JSON) {
			s = JSON.stringify(obj), //序列化对象
			newobj = JSON.parse(s);
			//反序列化（还原）
		} else {
			if (newobj.constructor === Array) {
				newobj.concat(obj);
			} else {
				for (var i in obj) {
					newobj[i] = obj[i];
				}
			}
		}
		return newobj;
	},

	//函数:判断键盘是否按下Ctrl按键
	ifctrl: function(e) {
		var nav4 = window.Event ? true : false; //初始化变量
		if (nav4) { //对于Netscape浏览器
			//判断是否按下Ctrl按键
			if ((typeof e.ctrlKey != 'undefined') ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			//对于IE浏览器，判断是否按下Ctrl按键
			if (window.event.ctrlKey) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	},

	//函数:判断键盘是否按下shift按键
	ifshift: function(e) { //函数:判断键盘Shift按键
		var nav4 = window.Event ? true : false; //初始化变量
		if (nav4) { //对于Netscape浏览器
			//判断是否按下Ctrl按键
			if ((typeof e.shiftKey != 'undefined') ? e.shiftKey : e.modifiers & Event.SHIFT_MASK > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			//对于IE浏览器，判断是否按下Ctrl按键
			if (window.event.shiftKey) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	},

	/**
	 * [loadScript 动态加载脚本]
	 * @param  {[String]}   url      [脚本的url]
	 * @param  {Function} callback [加载成功后的回调函数]
	 * @return {[type]}            [description]
	 */
	loadScript: function(url, callback) {
		var sts = document.getElementsByTagName('script');
		for (var i = 0, l = sts.length; i < l; i++) {
			if (sts[i].src == url) {
				alert("已有同名的脚本！");
				return;
			}
		}
		var st = document.createElement('scirpt');
		st.type = "text/javascript";
		if (st.readyState) {
			if (st.readyState == "loaded" || st.readyState == "complete") {
				st.onreadystatechange = null;
				if (callback) {
					callback();
				} else {
					return;
				}
			}
		} else {
			st.onload = function() {
				if (callback) {
					callback();
				} else {
					return;
				}
			};
		}
		st.src = url;
		document.body.appendChild(st);
	},

	/**
	 * [setCookie 设置cookie]
	 * @param {[String]} name  [键名]
	 * @param {[String]} value [值]
	 * @param {[String]} days  [过期时间]
	 */
	setCookie: function(name, value, days) {
		toolUtil.delCookie(name);
		if (days) {
			days = days
		} else {
			days = 10;
		}
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 3600 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString();
	},
	
	/**
	 * [delCookie 删除特定cookie]
	 * @param  {[String]} name [删除特定键名的cookie]
	 * @return {[type]}      [description]
	 */
	delCookie: function(name) {
		var date = new Date();
		date.setTime(date.getTime() - 10);
		var val = toolUtil.getCookie(name);
		if (val === "") {
			return;
		} else {
			document.cookie = name + "=" + val + ";expires=" + date.toGMTString();
		}
	},
	/**
	 * [getCookie 获取单个cookie的值]
	 * @param  {[String]} name [要获取cookie值的键名]
	 * @return {[type]}      [description]
	 */
	getCookie: function(name) {
		var tmp = document.cookie.split(";");
		for (var i = 0, l = tmp.length; i < l; i++) {
			var arr = tmp[i].split("=");
			if (arr[0] == name) {
				if (arr.length > 1)
					return unescape(arr[1]);
			} else {
				return "";
			}
		}
		return "";
	},
	/**
	 * [getDateall 获取中文格式的年月日时分秒]
	 * @return {[type]} [description]
	 */
	getDateall: function() {
		var mydate = new Date();

		var year = mydate.getFullYear(); //年
		var month = mydate.getMonth() + 1; //月
		if (month < 10) {
			month = "0" + month;
		}
		var day = mydate.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		var xingqiji = mydate.getDay() + 1;
		if (xingqiji < 10) {
			xingqiji = "0" + xingqiji;
		}
		var hour = mydate.getHours();
		if (hour < 10) {
			hour = "0" + hour;
		}
		var minite = mydate.getMinutes();
		if (minite < 10) {
			minite = "0" + minite;
		}
		var secondes = mydate.getSeconds();
		if (secondes < 10) {
			secondes = "0" + secondes;
		}
		var milliseconds = mydate.getMilliseconds();
		if (milliseconds < 10) {
			milliseconds = "0" + milliseconds;
		}

		var wholetime = "" + year + month + day + hour + minite + secondes + milliseconds;

		return wholetime;
	},
	/**
	 * [removeNode 删除该节点]
	 * @param  {[Object]} node [要删除的节点]
	 * @return {[type]}      [description]
	 */
	removeNode: function(node) {
		if (node) {
			node.parentNode.removeChild(node);
		}
	},

	/**
	 * [deleAllChildNodes 删除该类名后的所有子元素]
	 * @param  {[Object]} node [要删除该节点下的所有子节点]
	 * @return {[type]}      [description]
	 */
	deleAllChildNodes: function(node) {
		if (node) {
			while (node.hasChildNodes()) {
				node.removeChild(node.firstChild);
			}
		}
	},

	/**
	 * [_hasClass 判断标签中是否有该class值]
	 * @param  {[Object]}  ele     [判断的元素]
	 * @param  {[string]}  clsName [元素中要判读是否存在的类名]
	 * @return {Boolean}         [是否存在]
	 */
	_hasClass: function(ele, clsName) {
		var _existcls = ele.className;
		var _acls = _existcls.split(" ");
		for (var i = 0, len = _acls.length; i < len; i++) {
			if (_acls[i] === clsName) {
				return true;
			}
		}
		return false;
	},

	/**
	 * [_addClass 在元素中添加类名]
	 * @param {[Object]} ele     [要添加类名的元素]
	 * @param {[String]} clsName [要添加的类名字符串]
	 */
	_addClass: function(ele, clsName) {
		var _existcls = ele.className;
		var _acls = _existcls.split(" ");
		for (var i = 0, len = _acls.length; i < len; i++) {
			if (_acls[i] == clsName) {
				return;
			}
		}
		if (_existcls.length > 0) {
			_existcls = _existcls + " " + clsName;
		} else {
			_existcls = clsName;
		}

		ele.className = _existcls;
	},
	/**
	 * [_removeClass 删除元素中存在的该类名字符串]
	 * @param  {[Object]} ele     [要删除特定类名元素]
	 * @param  {[String]} clsName [要删除类名的字符串]
	 * @return {[type]}         [description]
	 */
	_removeClass: function(ele, clsName) {
		var _existcls = ele.className;
		var _acls = _existcls.split(" ");
		var optcls = "";
		for (var i = 0, len = _acls.length; i < len; i++) {
			if (_acls[i] !== clsName) {
				optcls = optcls + _acls[i] + " ";
			}
		}
		optcls = optcls.substring(0, optcls.length - 1);
		ele.className = optcls;
	},

	/**
	 * [getEleStyle 获取元素该样式的值]
	 * @param  {[Object]} obj       [元素]
	 * @param  {[String]} attribute [要获取的样式，如left，right等]
	 * @return {[String]}           [要获取的样式的值]
	 */
	getEleStyle: function (obj, attribute) {
		// 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性
		var arr = attribute.split('-');
		var attr = arr[0];
		if (attr.length > 1) {
			for (var i = 1; i < arr.length; i++) {
				attr += arr[i].substring(0, 1).toUpperCase() + arr[i].substring(1);
				//除第一个单词外，其余单词首字母转为大写，并拼接起来
			}
		} else {
			attr = attribute;
		}
		return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr];
	},

	/**
	 * [ajax 原生Ajax请求]
	 * @param  {[String]}   method      [请求的方法，get，post]
	 * @param  {[String]}   url         [请求的服务器url]
	 * @param  {[Object]}   data        [json格式的键值对请求参数]
	 * @param  {[Boolean]}   async       [同步或者异步请求]
	 * @param  {Function} callback    [请求成功的回调]
	 * @param  {[Function]}   timoutFunc  [超时的回到函数]
	 * @param  {[Number]}   timeout     [请求超时的时间]
	 * @param  {[String]}   otherParams [可选，一般没用]
	 * @return {[type]}               [description]
	 */
	ajax: function (method, url, data, async, callback,timoutFunc,timeout,otherParams) {
		var timer_out;//设置超时id
		var parames_len=arguments.length;
		if(arguments.length==7||arguments.length==8){
			//创建计时器
			timer_out=setTimeout(function(){
				if (xdr){  
	                xdr.abort(); 
	            }else if(xhr){
	            	//alert(typeof xhr);
	            	alert(xhr);
	            	xhr.abort(); 
	            }
				timoutFunc();
			},timeout);  
		}
		var xhr = null;
		var xdr = null;
		if (data instanceof Object) {  
			var str = "";
			for (k in data) { 
				str += k + "=" + encodeURIComponent(data[k]) + "&";
				//str += k + "=" + escape(data[k]) + "&";
			}
			data = str;   
		}
		if (window.XDomainRequest) {
			xdr = new XDomainRequest();
			if (xdr) {
				xdr.onerror = showerr;
				xdr.onload = function () {
					if (timer_out){  
	                   clearTimeout(timer_out);  
	                }
	                if(arguments.length==8){
	                    callback(xdr.responseText,otherParams);
	                }else{
	                	callback(xdr.responseText);
	                }
					
				};
				if ("get" == method.toLowerCase()) {
					if (data == null || data == "") {
						xdr.open("get", url);
					} else {
						xdr.open("get", url + "?" + data);
					}
					xdr.send();
				} else if ("post" == method.toLowerCase()) {
					xdr.open("post", url);
					xdr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
					xdr.send(data);
				}
			}
		} else {
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}

			xhr.onreadystatechange = function (e) {
				if (4 == xhr.readyState) {
					if (200 == xhr.status) { 
						if (callback) {
							if (timer_out){
	                           clearTimeout(timer_out);  
	                        }
	                        if(parames_len==8){
	                            callback(xhr.responseText,otherParams);
	                        }else{
	                        	callback(xhr.responseText);
	                        }
						}
					} else if (404 == xhr.status) {
						if (hander404) {
							hander404();
						}
					} else if (500 == xhr.status) {
						if (hander500) {
							hander500();
						}
					}
				}
			}

			if ("get" == method.toLowerCase()) {
				if (data == null || data == "") {
					xhr.open("get", url, async);
				} else {
					xhr.open("get", url + "?" + data, async);
				}
				xhr.send(null);
			} else if ("post" == method.toLowerCase()) {
				xhr.open("post", url, async);
				xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
				xhr.send(data);
			}
		}
		function handler404() {
			alert("ReqUrl：not found");
		}

		function handler500() {
			alert("服务器错误，请稍后再试");
		}

		function showerr(e){

		}
	},
	/**
	 * [insertAfter_cust 在元素后面插入一个元素]
	 * @param  {[Object]} newElement    [要插入的元素]
	 * @param  {[Object]} targetElement [被插入的元素]
	 * @return {[type]}               [description]
	 */
	insertAfter_cust: function (newElement,targetElement){
	    var parent = targetElement.parentNode;  
	    if(parent.lastChild == targetElement){  
	        parent.appendChild(newElement);  
	      }else{  
	        parent.insertBefore(newElement,targetElement.nextSibling);  
	      }  
	}
	


};