## `calendar` By TanShenghu

<br>

**自己接外面私单的一个项目，详情页面有日历，设计稿上的日历能左右翻月份并在当月部分日期上能显示购物优惠、打折、金额等信息。于是花点时间自己写了一个日历方法(原生js不依赖任何库文件)**

<br>

![日历-calendar](http://www.tanshenghu.com/widget/calendar/examples/eg.jpg)

<br>

[demo](http://www.tanshenghu.com/widget/calendar/examples/calendar.html)

## javascript


```javascript
seajs.use('calendar', function( Calendar ){
		
		var tds = Calendar.init( 'popdata' );
		
	});
```


## html

```html
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta name="Keywords" content="">
	<meta name="Description" content="">
	<meta name="Author" content="TanShenghu">
	<title>calendar</title>
	<style>
	*{margin:0;padding:0;}
	.showPopDate{
		width:500px;
		height:317px;
		margin:30px auto 0 auto;
		text-align:center;
	}
	.showPopDate .titlebox{
		height:30px;
		line-height:30px;
		background:#268eef;
		position:relative;
		color:white;
	}
	.showPopDate .prevBtn,.showPopDate .nextBtn{
		position: absolute;
		top:5px;
		height:20px;
		line-height:20px;
		cursor:pointer;
		
	}.showPopDate .prevBtn{
		left:7px;
	}
	.showPopDate .nextBtn{
		right:7px;
	}
	.showPopDate table{
		width:100%;
		border-left:1px solid #dedede;
		border-top:1px solid #dedede;
		background:#f1f1f1;
	}
	.showPopDate table th{
		font-size:14px;
		background-color:#666;
		color:yellow;
	}
	.showPopDate table .rest{
		color:red;
	}
	.showPopDate table th,.showPopDate table td{
		border-right:1px solid #dedede;
		border-bottom:1px solid #dedede;
		padding:2px 3px;
		text-align:center;
		vertical-align:middle;
	}
	.showPopDate tbody .no-Month{
		background:#ccc;
		color:#f1f1f1;
	}
	.showPopDate tbody .today{
		background:orange;
	}
	</style>
	<script src="https://a.alipayobjects.com/seajs/seajs/2.2.0/sea.js"></script>
	<script>
	seajs.config({
	  paths: {
        'tanshenghu': 'http://www.tanshenghu.com/tanshenghu'
      },	
	  alias: {
		'Calendar': 'tanshenghu/calendar/1.0.0/calendar'
	  }
	});
	</script>
</head>
<body>
	<div id="popdata" class="showPopDate"></div>
	<script>
	seajs.use('Calendar', function( Calendar ){
		
		var Tds = Calendar.init( 'popdata', function(popBox, titleBox, table){
			var tds = this;
		});
		// 第一个参数为元素节点的id必选，第二个参数为function可选，可以经过第二个参数function定义一些自己需要处理的事务
		//console.log( Tds );
		
	});
	</script>
</body>
</html>
```


### 完     The End