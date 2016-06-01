define({
	
	handler: {
		getId: function( id ){return document.getElementById( id );},
		getele: function( tagname ){return document.getElementsByTagName( tagname );},
		createEle: function( tagname ){return document.createElement( tagname );},
		newDate: function( date ){return date ? new Date( date ) : new Date( );},
		retain: function( num ){return num<10?'0'+num:num;},
		// 求润年的方法
		/*
			公元年数可被4整除（但不可被100整除）为闰年,但是正百的年数必须是可以被400整除的才是闰年。
			其他都是平年
			
			润年二月份有29天
			一年中七个31天 1  3   5  7  8  10  12
		*/
		grand: function( year ){
			var result;
			if( year%4===0 && year%100!==0 ){
				result = true;
			}else{
				if( year%400 ===0 ){
					result = true;
				}else{
					result = false;
				}
			}
			
			return result;
		},
		
		getDayCount: function( year, month ){
			var _this = this, result = 0;
			switch( month ){
				case 1: result=31; break;
				case 2: result = function(){ return _this.grand(year) ? 29 : 28 }(); break;
				case 3: result=31; break;
				case 5: result=31; break;
				case 7: result=31; break;
				case 8: result=31; break;
				case 10: result=31; break;
				case 12: result=31; break;
				default : result=30; break;
			}
			return result;
		}
	},
	init: function( id, callback ){
		
		this.cache.popBox = this.handler.getId( id );
		
		this.callback = callback;
		
		this.dataTable = {};
		this.dataTable.prevMonth = {};
		this.dataTable.nextMonth = {};
		
		// 创建元素节点 
		this.createEle();
		
		// 以伪数组形式返回至外界 用于返回当前日历下所有日期与td对象,以便后期处理
		return this.dataTable;
	},
	cache: {},
	createEle: function(){
		
		// 节点数据缓存
		var _this = this, cache = _this.cache;
		
		// 循环添加节点
		_this.createEle.adds = function( ele, leep, callback ){
			var frg = document.createDocumentFragment();
			for(var i=0; i<leep; i++){
				var new_ele = _this.handler.createEle( ele );
				// 特殊情况时 可执行回调
				typeof callback === 'function' && callback.apply( new_ele, [i] );
				frg.appendChild( new_ele );
			}
			return frg;
		};
		
		var adds = _this.createEle.adds;
		
		// 开始添加 title 头部
		var titleBox = _this.handler.createEle( 'div' ),
		prevBtn = _this.handler.createEle( 'label' ),
		curDate = _this.handler.createEle( 'span' ),
		nextBtn = _this.handler.createEle( 'label' );
		
		titleBox.className = 'titlebox';
		prevBtn.className = 'prevBtn';
		prevBtn.innerHTML = '&lt;';
		prevBtn.title = '\u4E0A\u4E2A\u6708';
		curDate.className = 'curDate';
		nextBtn.className = 'nextBtn';
		nextBtn.innerHTML = '&gt;';
		nextBtn.title = '\u4E0B\u4E2A\u6708';
		
		titleBox.appendChild( prevBtn );
		titleBox.appendChild( curDate );
		titleBox.appendChild( nextBtn );
		
		cache.popBox.appendChild( titleBox );
		// title 部分添加完成
		
		// 开始创建 表格
		var table = _this.handler.createEle( 'table' ),
		thead = _this.handler.createEle( 'thead' ),
		week = ['\u65E5','\u4E00','\u4E8C','\u4E09','\u56DB','\u4E94','\u516D'],
		th = adds( 'th', 7, function( i ){
			if( i==0 || i==6 ){
				this.className = 'rest';
			}
				
			this.innerHTML = week[ i ];
		}),
		tbody = _this.handler.createEle( 'tbody' );
		
		thead.appendChild( th );
		table.appendChild( thead );
		table.appendChild( tbody );
		
		cache.popBox.appendChild( table );
		
		cache.titleBox = titleBox;
		cache.prevBtn = prevBtn;
		cache.curDate = curDate;
		cache.nextBtn = nextBtn;
		
		cache.table = table;
		cache.thead = thead;
		cache.tbody = tbody;
		
		// 生成当前日历
		_this.createDate( _this.handler.newDate() );
		
		// 日历切换 事件驱动
		_this.evt( );
	},
	// 生成日期
	createDate: function( date ){
		
		// 重置将要抛出的日期对象，若不清空重置在上下月切换时会存在数据污染
		this.dataTable = {};
		this.dataTable.prevMonth = {};
		this.dataTable.nextMonth = {};
		
		// 需要写一个算法当月1号从周几开始往后排，能排多少个行tr
		date.setDate( 1 );
		var _this = this,
			adds  = _this.createEle.adds,
			cache = _this.cache,
			curYear = date.getFullYear(),
			curMonth = date.getMonth()+1;
		
		// 每次调用该 方法时，需要清空tbody里面的元素
		var istr = cache.tbody.getElementsByTagName('tr');
		if( istr.length!==0 ){
			
			for(var cur=0,trlen=istr.length; cur<trlen; cur++){

				cache.tbody.removeChild( istr[ 0 ] );
				
			}
			
		}
		
		// 定位坐标 日期对号入座 - 方法
		var coor = function( setData ){
				
				// 非切换 此时此刻当前日历，用于判断特殊样式显示“今天”
				var nowDate  =  _this.handler.newDate(),
				Retain       =  _this.handler.retain, // 日期保留两位数
				nowYear      =  nowDate.getFullYear(),
				nowMonth     =  nowDate.getMonth()+1,
				nowDate      =  nowDate.getDate();
				
				// 在title中显示 年份
				cache.curDate.innerHTML = curYear +'\u5E74'+ (curMonth<10?'0'+curMonth:curMonth) + '\u6708';
				// 写于数据缓存
				cache.curDate.curyear = curYear;
				cache.curDate.curmonth = curMonth;
				
				// 选择日历之后1号，对应的星期
				var startWeek = setData.getDay(),
				
				// 选择日历之后，当月天数，便于计算多少个tr行
				dayCount = _this.handler.getDayCount( curYear, curMonth ),
				
				// 上一个月的天数
				prevMonthDayCount = _this.handler.getDayCount( curYear, curMonth-1 ),
				
				// 1号之后的日期推算
				linkDay = false,
				
				// 下个月与当前月连接处
				nextMonthStartDay = 0,
				
				// 求tr的个数，不能直接用30或者31天去模，因为有时候1号从星期三开始应该把前端的三天加起来再取模
				trLen = (startWeek+dayCount)%7===0 ?  (startWeek+dayCount)/7 : parseInt((startWeek+dayCount)/7) + 1;
				
				// 得到了当月所需要要的tr行数，开始创建tr
				var trs = adds( 'tr', trLen, function(i){
					// 创建tr的同时需要创建td
					this.appendChild( adds( 'td', 7, function(j){
						
						// 考虑日历每个单元格内还会存放其它元素，需要创建一个div
						var odiv = _this.handler.createEle('div');
						odiv.className = 'day_box';
						
						// 计算当前循环到哪个日期了
						var thisDate = i*7+j+1-startWeek;
						
						// 重新实例化一个日期对象，在每个td上面去挂接一个年月日的数据
						var tdDate = _this.handler.newDate( );
						
						// 上一个月下旬末端日期与当月连接处
						if( i===0 && startWeek!==0 && j<startWeek ){
							odiv.innerHTML = '<span class="dayNO">'+(prevMonthDayCount-startWeek+1 + j)+'</span>';
							this.className = 'prev-Month';
							
							// 开始在td节点上面挂接当前 期号 对应的年月日
							tdDate.setMonth( cache.curDate.curmonth-2 );
							this.activeDate = tdDate.getFullYear()+'-'+Retain(tdDate.getMonth()+1)+'-'+Retain(prevMonthDayCount-startWeek+1 + j);
							
							// 上个月数据对象存储
							_this.dataTable.prevMonth[ j ] = this;
							_this.dataTable.prevMonth.length = j+1;
							
						}
						
						// 当天“今天”特殊样式显示
						if( curYear==nowYear && curMonth==nowMonth && thisDate === nowDate ){
							this.className = 'today';
						}
						
						// 1号已经插入，随后的日期依次入队插入
						if( linkDay ){
							
							var newDay = thisDate;
							
							// 下一个月与当月连接处
							if( newDay>dayCount ){
								nextMonthStartDay++;
								newDay = nextMonthStartDay;
								this.className = 'next-Month';
								
								// 开始在td节点上面挂接当前 期号 对应的年月日
								tdDate.setMonth( cache.curDate.curmonth );
								this.activeDate = tdDate.getFullYear()+'-'+Retain(tdDate.getMonth()+1)+'-'+Retain(newDay);
								
								// 下个月数据对象存储
								_this.dataTable.nextMonth[ nextMonthStartDay-1 ] = this;
								_this.dataTable.nextMonth.length = nextMonthStartDay;
								
							}else{
								
								// 当月的数据对象存储
								_this.dataTable[ _this.dataTable.length ] = this;
								_this.dataTable.length++;
								
								// 开始在td节点上面挂接当前 期号 对应的年月日
								this.activeDate = cache.curDate.curyear+'-'+Retain(cache.curDate.curmonth)+'-'+Retain(newDay);
								
							}
							odiv.innerHTML = '<span class="dayNO">'+newDay+'</span>';
							
						}
						
						// 第一行时开始插入日期
						if( i===0 && j===startWeek ){
							odiv.innerHTML = '<span class="dayNO">'+1+'</span>';
							
							// 存入将要返回至外界的对象
							_this.dataTable[ 0 ] = this;
							_this.dataTable.total = dayCount;
							_this.dataTable.length = 1;
							
							linkDay = true;
							
							// 开始在td节点上面挂接当前 期号 对应的年月日
							this.activeDate = cache.curDate.curyear+'-'+Retain(cache.curDate.curmonth)+'-01';
							
						}
						
						// 把div放进td里面
						this.appendChild( odiv );
						
						
						
					}));
					
				});
				
				cache.tbody.appendChild( trs );
				
				// 开始执行 callback
				typeof _this.callback === 'function' && _this.callback.apply( _this.dataTable, [cache.popBox,cache.titleBox, cache.table] );
				
			};
			
		coor( date );
		
	},
	// 左右 月切换
	evt: function(){
		
		var _this = this,
			cache = _this.cache;
			
		
		var pagingDate = function( btn_who ){
			
			var curYear = cache.curDate.curyear, //   当前切换状态下处于哪年
			curMonth = cache.curDate.curmonth; //     当前切换状态下处于哪月
			
			// btn_who 上一个月传true,下一个月传false
			curMonth = btn_who===true ? curMonth-2 : curMonth;
			
			var myDate = _this.handler.newDate();
			myDate.setFullYear( curYear );
			myDate.setMonth( curMonth, 1 ); // 需要填写第二个参数，将其设置为1号，否则会在当前是31号而下月只有30号的情况，有bug产生
			
			// 开始计算 翻日历
			_this.createDate( myDate );
		};
		
		cache.prevBtn.onclick = function(){
			
			var cls = this.className && this.className.indexOf('disabled')>-1;
			!cls && pagingDate( true );
			
		};
		cache.nextBtn.onclick = function(){
			
			var cls = this.className && this.className.indexOf('disabled')>-1;
			!cls && pagingDate( false );
			
		};
		
		
	}
});