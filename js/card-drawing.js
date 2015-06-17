$(function()
{
	//设置表格宽高相等
	$("table").css("height", $("table").css("width"));

	
	var $color = $("#color");
	var $reset = $("#reset");
	var $size = $("#size");
	var $generateImg = $("#generateImg");

	reSize();

	$size.change(function()
	{
		reSize();
		bindEvent();
	});

	bindEvent();
	$color.change(bindEvent);
	$reset.click(function()
	{
		$("td").removeClass("active").animate({backgroundColor: "white"});
	});

	function reSize()
	{
		$("table").empty();
		//定义保存行元素的数组
		var aTr = [];
		//生成每行单元格
		for(var i=0; i<$size.val(); i++)
		{
			aTr[i] = $("<tr></tr>");
			for(var j=0; j<$size.val(); j++)
			{
				aTr[i].append("<td></td>");
			}
			$("table").append(aTr[i]);
		}

		$("td").css({"width": 100/$size.val() + "%", "backgroundColor": "white"});
	}

	function bindEvent()
	{
		$("td").unbind()//取消上次绑定的事件，并重新绑定
		.click(
			function()
			{
				$(this).toggleClass("active");
			})
		.hover(
			function()
			{
				if(!$(this).hasClass("active"))
				{
					$(this).css("backgroundColor", $color.val());
				}
			},
			function()
			{
				if(!$(this).hasClass("active"))
				{
					$(this).animate({backgroundColor: '#fff'}, 100);
				}
			});
	}

	//点击生成图片按钮，保存绘图区域
	$generateImg.mouseover(function()//每当鼠标移入按钮时重新绑定下载链接的路径
	{
		html2canvas($("table"), 
		{
		    onrendered: function(canvas)
		    {
	            $generateImg.children("a").attr("href", canvas.toDataURL());
	            $generateImg.children("a").attr("download", "myDesign.png");
		    }
		}); 
	});
	$generateImg.trigger("click");//先触发一次click事件，使<a>元素的href属性变为新值
})