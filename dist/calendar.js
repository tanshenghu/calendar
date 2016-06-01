define("widget/calendar/1.0.0/calendar",[],{handler:{getId:function(a){return document.getElementById(a)},getele:function(a){return document.getElementsByTagName(a)},createEle:function(a){return document.createElement(a)},newDate:function(a){return a?new Date(a):new Date},retain:function(a){return 10>a?"0"+a:a},grand:function(a){var b;return b=0===a%4&&0!==a%100?!0:0===a%400?!0:!1},getDayCount:function(a,b){var c=this,d=0;switch(b){case 1:d=31;break;case 2:d=function(){return c.grand(a)?29:28}();break;case 3:d=31;break;case 5:d=31;break;case 7:d=31;break;case 8:d=31;break;case 10:d=31;break;case 12:d=31;break;default:d=30}return d}},init:function(a,b){return this.cache.popBox=this.handler.getId(a),this.callback=b,this.dataTable={},this.dataTable.prevMonth={},this.dataTable.nextMonth={},this.createEle(),this.dataTable},cache:{},createEle:function(){var a=this,b=a.cache;a.createEle.adds=function(b,c,d){for(var e=document.createDocumentFragment(),f=0;c>f;f++){var g=a.handler.createEle(b);"function"==typeof d&&d.apply(g,[f]),e.appendChild(g)}return e};var c=a.createEle.adds,d=a.handler.createEle("div"),e=a.handler.createEle("label"),f=a.handler.createEle("span"),g=a.handler.createEle("label");d.className="titlebox",e.className="prevBtn",e.innerHTML="&lt;",e.title="上个月",f.className="curDate",g.className="nextBtn",g.innerHTML="&gt;",g.title="下个月",d.appendChild(e),d.appendChild(f),d.appendChild(g),b.popBox.appendChild(d);var h=a.handler.createEle("table"),i=a.handler.createEle("thead"),j=["日","一","二","三","四","五","六"],k=c("th",7,function(a){(0==a||6==a)&&(this.className="rest"),this.innerHTML=j[a]}),l=a.handler.createEle("tbody");i.appendChild(k),h.appendChild(i),h.appendChild(l),b.popBox.appendChild(h),b.titleBox=d,b.prevBtn=e,b.curDate=f,b.nextBtn=g,b.table=h,b.thead=i,b.tbody=l,a.createDate(a.handler.newDate()),a.evt()},createDate:function(a){this.dataTable={},this.dataTable.prevMonth={},this.dataTable.nextMonth={},a.setDate(1);var b=this,c=b.createEle.adds,d=b.cache,e=a.getFullYear(),f=a.getMonth()+1,g=d.tbody.getElementsByTagName("tr");if(0!==g.length)for(var h=0,i=g.length;i>h;h++)d.tbody.removeChild(g[0]);var j=function(a){var g=b.handler.newDate(),h=b.handler.retain,i=g.getFullYear(),j=g.getMonth()+1,g=g.getDate();d.curDate.innerHTML=e+"年"+(10>f?"0"+f:f)+"月",d.curDate.curyear=e,d.curDate.curmonth=f;var k=a.getDay(),l=b.handler.getDayCount(e,f),m=b.handler.getDayCount(e,f-1),n=!1,o=0,p=0===(k+l)%7?(k+l)/7:parseInt((k+l)/7)+1,q=c("tr",p,function(a){this.appendChild(c("td",7,function(c){var p=b.handler.createEle("div");p.className="day_box";var q=7*a+c+1-k,r=b.handler.newDate();if(0===a&&0!==k&&k>c&&(p.innerHTML='<span class="dayNO">'+(m-k+1+c)+"</span>",this.className="prev-Month",r.setMonth(d.curDate.curmonth-2),this.activeDate=r.getFullYear()+"-"+h(r.getMonth()+1)+"-"+h(m-k+1+c),b.dataTable.prevMonth[c]=this,b.dataTable.prevMonth.length=c+1),e==i&&f==j&&q===g&&(this.className="today"),n){var s=q;s>l?(o++,s=o,this.className="next-Month",r.setMonth(d.curDate.curmonth),this.activeDate=r.getFullYear()+"-"+h(r.getMonth()+1)+"-"+h(s),b.dataTable.nextMonth[o-1]=this,b.dataTable.nextMonth.length=o):(b.dataTable[b.dataTable.length]=this,b.dataTable.length++,this.activeDate=d.curDate.curyear+"-"+h(d.curDate.curmonth)+"-"+h(s)),p.innerHTML='<span class="dayNO">'+s+"</span>"}0===a&&c===k&&(p.innerHTML='<span class="dayNO">1</span>',b.dataTable[0]=this,b.dataTable.total=l,b.dataTable.length=1,n=!0,this.activeDate=d.curDate.curyear+"-"+h(d.curDate.curmonth)+"-01"),this.appendChild(p)}))});d.tbody.appendChild(q),"function"==typeof b.callback&&b.callback.apply(b.dataTable,[d.popBox,d.titleBox,d.table])};j(a)},evt:function(){var a=this,b=a.cache,c=function(c){var d=b.curDate.curyear,e=b.curDate.curmonth;e=c===!0?e-2:e;var f=a.handler.newDate();f.setFullYear(d),f.setMonth(e,1),a.createDate(f)};b.prevBtn.onclick=function(){var a=this.className&&this.className.indexOf("disabled")>-1;!a&&c(!0)},b.nextBtn.onclick=function(){var a=this.className&&this.className.indexOf("disabled")>-1;!a&&c(!1)}}});