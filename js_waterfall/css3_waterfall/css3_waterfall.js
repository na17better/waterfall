/*
* @Author: na17better
* @Date:   2017-04-10 17:17:20
* @Last Modified by:   na17better
* @Last Modified time: 2017-04-10 17:19:41
*/

'use strict';
window.onload=function()
{
	//waterfall('main','box');
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
			//waterfall('main','box');

		}
		//checkScrollSlide();
	}
}
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