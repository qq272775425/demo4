window.onload=function ()
{
	var M=11;
	var oDiv=document.getElementById('div1');
	var aDiv=oDiv.getElementsByClassName('hid');
	// var x=-10;
	// var y=0;
	var rotate = {
		x : -10,
		y : 0
	};
	
	var speedX=0;
	var speedY=0;
	
	for(var i=1;i<=M;i++)
	{
		var oNewDiv=document.createElement('div');
		
		oNewDiv.className='hid';
		
		(function (oNewDiv,i){

			setTimeout(function (){
				oNewDiv.style.WebkitTransform='rotateY('+(360*(i-1)/M)+'deg) translateZ(400px)';
		
			}, (M+1-i)*200);
			
		})(oNewDiv,i);
		
		oNewDiv.degY=360*(i-1)/M;
		
		oNewDiv.innerHTML='<div class="img"><span class="over"></span></div>';
		oNewDiv=oNewDiv.getElementsByClassName('img')[0];
		
		oNewDiv.style.background='url(img/'+i+'.jpg)';
		
		oNewDiv.getElementsByClassName('over')[0].style.background='-webkit-linear-gradient(rgba(0,0,0,1) 40%, rgba(255,255,255,0)), url(img/'+i+'.jpg)';
		// oNewDiv.getElementsByClassName('shadow')[0].style.backgroundSize='100% 100%';
		// oNewDiv.style.backgroundSize='100% 100%';
		
		oDiv.appendChild(oNewDiv.parentNode);

	}

	setTimeout(function (){
		// if(--i==M){
			// console.log(i);
			fixAll();
		// }
		
	}, 3000);
	
	document.onmousedown=function (ev)
	{
		var oEvent=ev||event;
		var mouseStartX=oEvent.clientX;
		var mouseStartY=oEvent.clientY;
		
		// var startX=x;
		// var startY=y;
		// console.log('startX:' + startX + ',startY:' + startY);
		
		var lastX=mouseStartX;
		var lastY=mouseStartY;
		// console.log('lastX:' + lastX + ',lastY:' + lastY);
		
		speedX=speedY=0;
		
		document.onmousemove=function(ev)
		{
			var oEvent=ev||event;
			
			rotate.x-=(oEvent.clientY-mouseStartY)/10;
			rotate.y+=(oEvent.clientX-mouseStartX)/10;
			
			speedX=(oEvent.clientX-lastX)/5;
			speedY=(oEvent.clientY-lastY)/5;
			
			fixAll();
			
			lastX=oEvent.clientX;
			lastY=oEvent.clientY;
		};
		
		document.onmouseup=function ()
		{
			document.onmousemove=null;
			document.onmouseup=null;
			
			startMove();
		};
		
		stopMove();
		
		return false;
	};
	
	var timer=null;
	function startMove()
	{
		clearInterval(timer);
		timer=setInterval(function (){
			rotate.x-=speedY;
			rotate.y+=speedX;
			
			speedY*=0.93;
			speedX*=0.93;
			
			if(Math.abs(speedX)<0.1 && Math.abs(speedY)<0.1)
				stopMove();
			
			fixAll();
		}, 30);
	}
	
	function stopMove()
	{
		clearInterval(timer);
	}
	
	function fixAll()
	{
		oDiv.style.WebkitTransform='perspective(1000px) rotateX('+rotate.x+'deg) rotateY('+rotate.y+'deg)';
		
		for(var i=0;i<aDiv.length;i++)
		{
			var deg=aDiv[i].degY+rotate.y;
			var a=(deg%360+360)%360;
			
			a=Math.abs(180-a);
			
			var d=0.1+(a/180)*0.9;
			
			if(d<0.2)d=0.2;
			
			aDiv[i].style.opacity=d;
			
			//aDiv[i].innerHTML=parseInt(a);
		}
	}
};