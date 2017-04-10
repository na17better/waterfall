/*
* @Author: na17better
* @Date:   2017-04-08 23:35:05
* @Last Modified by:   na17better
* @Last Modified time: 2017-04-09 12:57:44
*/

'use strict';
window.onload=function()
{
	waterfall('main','box');
	var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'}]};
	window.onscroll=function()
	{
		if(checkScrollSlide)
		{
			var oParent=document.getElementById('main');
			//将数据块渲染到当前页面的尾部；s1.遍历后台的json数据；
			for(var i=0;i<dataInt.data.length;i++)
			{
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src='images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');

		}
		//checkScrollSlide();
	}
}
function waterfall(parent,box)
{
	//将main下的所有box元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数=页面宽/盒子宽
	var oBoxW=oBoxs[0].offsetWidth;
	//console.log(oBoxW);
	//alert(oBoxs.length);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	console.log(cols);
	//设置main的宽度=
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto;';
	console.log(window.getComputedStyle(document.getElementById('main'),false)['width']);
	//存放每一列高度的数组
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++)
	{
		if(i<cols)
		{
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			//console.log(minH);
			var index=getMinhIndex(hArr,minH);

			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			//oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}
function getByClass(parent,clsName)
{
	//用来获取所有获得到的class为box的元素；
	var boxArr=new Array();
	var oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++)
	{
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getMinhIndex(arr,value){
	for(var i in arr){
		if(arr[i]==value)
		{
			return i;
		}
	}
}

//检测是否具备了滚动条加载数据库的条件
function checkScrollSlide()
{
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//标准模式(后者)和混杂模式（前者）获取滚动条滚走距离
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	//console.log(scrollTop);
	//可视区
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	//console.log(height);
	return (lastBoxH<scrollTop+height)?true:false;
}
