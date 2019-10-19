
function timeAxisInit(options){
	this._init(options);
};
timeAxisInit.prototype = {
	//初始化参数
	_init : function(options){
		this.arcColor = options.arcColor;//圆框上线的颜色
		this.arcBgColor = options.arcBgColor;//圆内的颜色
		this.arcLineSize = options.arcLineSize;//圆框上线的大小
		this.lineColor = options.lineColor;//线的颜色
		this.lineSize = options.lineSize;//线的大小
		this.shadowColor = options.shadowColor;//阴影的大小
		this.titleSize = options.titleSize || '12';//标题大小

		this.arcBgColor2 = options.arcBgColor2;//改变之后的颜色
		this.indexes = options.indexes || '';
		this.ids = options.ids || '';
	},
	changeByIndex : function(indexes){
		this.indexes = indexes;
	},
	changeById : function(ids){
		this.ids = ids;
	},
	/**
		画时间轴
	*/
	drawTimeAxis : function(timeAxisBoxId){
		var timeAxisBox = document.getElementById(timeAxisBoxId);
		var allPontBox = timeAxisBox.children;
		this.initBox(timeAxisBox);
		this.initPointBox(timeAxisBox,allPontBox);
	},
	/**
		调整盒子大小
	*/
	initBox : function(timeAxisBox){
		var parentElement = timeAxisBox.parentElement;
		timeAxisBox.style.width = (parentElement.scrollWidth || parentElement.clientWidth)+'px';
	},
	/**
		初始化小盒子大小
	*/
	initPointBox : function(timeAxisBox,allPontBox){
		var averWidth = 99/allPontBox.length;//每个点的宽度
		//var backgroudColorArr = new Array('red','blue','green','orange','yellow');
		for (var i = 0; i < allPontBox.length; i++) {
			var pointBoxItem = allPontBox[i];
			pointBoxItem.style.width = averWidth+'%';//初始化宽度
			pointBoxItem.style.height = timeAxisBox.clientHeight;
			pointBoxItem.style.float = 'left';//初始化定位
			//pointBoxItem.style.backgroundColor = backgroudColorArr[i];//初始化颜色
			//画点
			if(i == 0){
				this.drawPoint(i,'start',pointBoxItem);
				continue;
			}
			if(i>0 && i<allPontBox.length-1){
				this.drawPoint(i,'middle',pointBoxItem);
				continue;
			}
			if(i = allPontBox.length-1){
				this.drawPoint(i,'end',pointBoxItem);
				continue;
			}
		}
	},
	/**
		添加文字和节点
	*/
	drawPoint : function(i,position,pointBoxItem){
 		//点
 		var pointDiv = this.getPoint(i,position,pointBoxItem);
 		//文字
 		var titleDiv = document.createElement("div");
 		titleDiv.style.textAlign = "center";
		titleDiv.innerHTML=pointBoxItem.title;
		titleDiv.style.fontSize = (this.titleSize + "px") ||'12px';

		pointBoxItem.innerHTML = "";//清空之前的div
		pointBoxItem.appendChild(pointDiv);
 		pointBoxItem.appendChild(titleDiv);
	},
	/**
		使用canvas画圆  返回canvas的DOM节点
	*/
	getPoint : function(i,position,pointBoxItem){
		//单个点的盒子宽度
		var pointBoxItemWidth = pointBoxItem.clientWidth;
		//单个点的盒子高度
 		var pointBoxItemHeight = pointBoxItem.parentElement.clientHeight;

		var c = document.createElement("canvas");
		c.setAttribute("width",pointBoxItemWidth+"px");
		c.setAttribute("height",pointBoxItemHeight+"px");

		//设置样式
		c.style.width = "100%";//canvas的宽度

		/*
			var arcColor = "white";//圆框的颜色
			var arcBgColor= "#00BFFF";//圆内的颜色
			var arcLineSize = 4;//圆框线的粗细
			var lineColor = "#00BFFF";//连接线的粗细
			var lineSize = 3;//连接线的粗细
			var shadowColor = "black"//阴影颜色
		*/

			var arcColor = this.arcColor || 'white';//圆框的颜色

			var arcBgColor = "";
			if(this.indexes.indexOf(i)>=0 || this.ids.indexOf(pointBoxItem.id)>=0){
				arcBgColor= this.arcBgColor2 || 'white';//圆内的颜色
			}else{
				arcBgColor= this.arcBgColor || 'white';//圆内的颜色
			}
			
			var arcLineSize = this.arcLineSize || 0;//圆框线的粗细
			var lineColor = this.lineColor || 'white';//连接线的粗细
			var lineSize = this.lineSize || 0;//连接线的粗细
			var shadowColor = this.shadowColor || 'white';//阴影颜色

		//画圆
		var ctx = c.getContext("2d");
		ctx.strokeStyle=arcColor;
		ctx.beginPath();
		//圆的中心的 x 坐标,圆的半径
		var x = pointBoxItemWidth/2;
		var y = pointBoxItemHeight/1.5;
		var r = pointBoxItemWidth/16;	
		
		ctx.shadowBlur=4;
		ctx.shadowOffsetX=0.5;
		ctx.shadowOffsetY=-0.5;
		ctx.shadowColor="black";

		ctx.arc(x,y,r,0,2*Math.PI);
		ctx.lineWidth=arcLineSize;
		ctx.stroke();

		ctx.fillStyle=arcBgColor;
		ctx.fill();

		ctx.strokeStyle = lineColor;
		ctx.lineWidth= lineSize;


		//划线	 
		if(position == 'start'){
		//圆的中心的 x 坐标,圆的半径
			ctx.beginPath();
			ctx.lineCap="butt";
			ctx.moveTo(x+r,y);
			ctx.lineTo(pointBoxItemWidth,y);
			ctx.stroke();
		}
		if(position == 'middle'){
			ctx.beginPath();
			ctx.lineCap="butt";
			ctx.moveTo(0,y);
			ctx.lineTo(x-r,y);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineCap="butt";
			ctx.moveTo(x+r,y);
			ctx.lineTo(pointBoxItemWidth,y);
			ctx.stroke();
		}

		if(position == 'end'){
			ctx.beginPath();
			ctx.lineCap="butt";
			ctx.moveTo(0,y);
			ctx.lineTo(x-r,y);
			ctx.stroke();
		}
		return c;
	},
};
 


 
