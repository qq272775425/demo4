/**
	过滤字符串首尾空格
*/
function trim(str){
	return str.replace(/^\s+|\s+$/g, '');
}

/**
	根据指定的className，查找元素
*/
function getElementsByClassName(className, node, tag){
	node = node || document;//如果省略node参数，就在document文件中搜索，否则就在指定的node节点中搜索
	if(node.getElementsByClassName){//如果当前浏览器支持最新的getElementsByClassName方法，就直接使用它
		return node.getElementsByClassName(className);
	}else{
		tag = tag || "*";
		var aResult = [];
		var elements = node.getElementsByTagName(tag);
		for(var i=0; i<elements.length; i++){
			var re = new RegExp('\\b'+className+'\\b', 'ig');// \\b
			if(elements[i].className.search(re) != -1){
				aResult.push(elements[i]);
			}
		}
	}
	return aResult;//返回数组
}

/**
	返回或设置元素的css属性
*/
function css(element, attr, value){//css(oDiv1, "width");
	attr = attr.replace(/\-./, function(word){//word = "-c";
		return word.charAt(1).toUpperCase();
	});
	if(arguments.length == 2){
		if(element.currentStyle){//IE
			return element.currentStyle[attr];//oDiv1.style.width
		}else{
			return window.getComputedStyle(element, false)[attr];
		}
		
	}else if(arguments.length == 3){
		element.style[attr] = value;//oDiv1.style.background-color = "green";
	}
}
/**
  cookie操作
*/
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function getCookie(c_name)
{
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1 ;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) 
				c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}

function removeCookie(name){
	setCookie(name, "", -1);
}

	
function addClass(elem, className){
	if(!elem) return;
	elem.className = trim(elem.className + " " + className);
}

function removeClass(elem, className){
	if(!elem) return;
	if(elem.className){
		var re = new RegExp('\\b'+className+'\\b', 'ig');
		elem.className = trim(elem.className.replace(re, ''));
	}
}

/**
	获得元素的样式
*/
function getElementStyle(element, attr){
	if(element.currentStyle){
		return element.currentStyle[attr];
	}else{
		return window.getComputedStyle(element, false)[attr];
	}
}

/**
	动画
*/
function doMove(element, properties, fn){
	clearInterval(element.timer);
	element.timer = setInterval(function(){
		var bStop = true;//一个标识，用来标识是否需要停止定时器，true为需要停止,false反之
		for(prop in properties){//prop = width、height、opacity
			var iCurrStyle = 0;
			//获得元素的属性的初始值
			if(prop == 'opacity'){//处理透明度
				iCurrStyle = parseInt(getElementStyle(element, prop)*100);
			}else{//其它普通属性
				iCurrStyle = parseInt(getElementStyle(element, prop));
			}
			
			var iSpeed = (properties[prop] - iCurrStyle) / 8;
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			if(iCurrStyle != properties[prop]){//如果元素的属性没有到达目标点
				bStop = false;
			}
			
			if(prop == 'opacity'){
				iCurrStyle += iSpeed;
				element.style.filter = 'alpha(opacity:'+iCurrStyle+')';//oe
				element.style.opacity = iCurrStyle / 100;//ff, chrome
			}else{
				element.style[prop] = iCurrStyle + iSpeed + 'px';
			}
		}
		if(bStop){
			clearInterval(element.timer);
			if(fn){
				fn();
			}
		}
	}, 30);
}