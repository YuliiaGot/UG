/*
 * jQuery timepicker addon
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 1.2
 * Last Modified: 02/02/2013
 *
 * Copyright 2013 Trent Richardson
 * You may use this project under MIT or GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 */
(function($){$.ui.timepicker=$.ui.timepicker||{};if($.ui.timepicker.version){return}$.extend($.ui,{timepicker:{version:"1.2"}});var Timepicker=function(){this.regional=[];this.regional[""]={currentText:"Now",closeText:"Done",amNames:["AM","A"],pmNames:["PM","P"],timeFormat:"HH:mm",timeSuffix:"",timeOnlyTitle:"Choose Time",timeText:"Time",hourText:"Hour",minuteText:"Minute",secondText:"Second",millisecText:"Millisecond",timezoneText:"Time Zone",isRTL:false};this._defaults={showButtonPanel:true,timeOnly:false,showHour:true,showMinute:true,showSecond:false,showMillisec:false,showTimezone:false,showTime:true,stepHour:1,stepMinute:1,stepSecond:1,stepMillisec:1,hour:0,minute:0,second:0,millisec:0,timezone:null,useLocalTimezone:false,defaultTimezone:"+0000",hourMin:0,minuteMin:0,secondMin:0,millisecMin:0,hourMax:23,minuteMax:59,secondMax:59,millisecMax:999,minDateTime:null,maxDateTime:null,onSelect:null,hourGrid:0,minuteGrid:0,secondGrid:0,millisecGrid:0,alwaysSetTime:true,separator:" ",altFieldTimeOnly:true,altTimeFormat:null,altSeparator:null,altTimeSuffix:null,pickerTimeFormat:null,pickerTimeSuffix:null,showTimepicker:true,timezoneIso8601:false,timezoneList:null,addSliderAccess:false,sliderAccessArgs:null,controlType:"slider",defaultValue:null,parse:"strict"};$.extend(this._defaults,this.regional[""])};$.extend(Timepicker.prototype,{$input:null,$altInput:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,millisec_slider:null,timezone_select:null,hour:0,minute:0,second:0,millisec:0,timezone:null,defaultTimezone:"+0000",hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,millisecMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,millisecMaxOriginal:null,ampm:"",formattedDate:"",formattedTime:"",formattedDateTime:"",timezoneList:null,units:["hour","minute","second","millisec"],control:null,setDefaults:function(e){extendRemove(this._defaults,e||{});return this},_newInst:function($input,o){var tp_inst=new Timepicker,inlineSettings={},fns={},overrides,i;for(var attrName in this._defaults){if(this._defaults.hasOwnProperty(attrName)){var attrValue=$input.attr("time:"+attrName);if(attrValue){try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}}overrides={beforeShow:function(e,t){if($.isFunction(tp_inst._defaults.evnts.beforeShow)){return tp_inst._defaults.evnts.beforeShow.call($input[0],e,t,tp_inst)}},onChangeMonthYear:function(e,t,n){tp_inst._updateDateTime(n);if($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)){tp_inst._defaults.evnts.onChangeMonthYear.call($input[0],e,t,n,tp_inst)}},onClose:function(e,t){if(tp_inst.timeDefined===true&&$input.val()!==""){tp_inst._updateDateTime(t)}if($.isFunction(tp_inst._defaults.evnts.onClose)){tp_inst._defaults.evnts.onClose.call($input[0],e,t,tp_inst)}}};for(i in overrides){if(overrides.hasOwnProperty(i)){fns[i]=o[i]||null}}tp_inst._defaults=$.extend({},this._defaults,inlineSettings,o,overrides,{evnts:fns,timepicker:tp_inst});tp_inst.amNames=$.map(tp_inst._defaults.amNames,function(e){return e.toUpperCase()});tp_inst.pmNames=$.map(tp_inst._defaults.pmNames,function(e){return e.toUpperCase()});if(typeof tp_inst._defaults.controlType==="string"){if($.fn[tp_inst._defaults.controlType]===undefined){tp_inst._defaults.controlType="select"}tp_inst.control=tp_inst._controls[tp_inst._defaults.controlType]}else{tp_inst.control=tp_inst._defaults.controlType}if(tp_inst._defaults.timezoneList===null){var timezoneList=["-1200","-1100","-1000","-0930","-0900","-0800","-0700","-0600","-0500","-0430","-0400","-0330","-0300","-0200","-0100","+0000","+0100","+0200","+0300","+0330","+0400","+0430","+0500","+0530","+0545","+0600","+0630","+0700","+0800","+0845","+0900","+0930","+1000","+1030","+1100","+1130","+1200","+1245","+1300","+1400"];if(tp_inst._defaults.timezoneIso8601){timezoneList=$.map(timezoneList,function(e){return e=="+0000"?"Z":e.substring(0,3)+":"+e.substring(3)})}tp_inst._defaults.timezoneList=timezoneList}tp_inst.timezone=tp_inst._defaults.timezone;tp_inst.hour=tp_inst._defaults.hour<tp_inst._defaults.hourMin?tp_inst._defaults.hourMin:tp_inst._defaults.hour>tp_inst._defaults.hourMax?tp_inst._defaults.hourMax:tp_inst._defaults.hour;tp_inst.minute=tp_inst._defaults.minute<tp_inst._defaults.minuteMin?tp_inst._defaults.minuteMin:tp_inst._defaults.minute>tp_inst._defaults.minuteMax?tp_inst._defaults.minuteMax:tp_inst._defaults.minute;tp_inst.second=tp_inst._defaults.second<tp_inst._defaults.secondMin?tp_inst._defaults.secondMin:tp_inst._defaults.second>tp_inst._defaults.secondMax?tp_inst._defaults.secondMax:tp_inst._defaults.second;tp_inst.millisec=tp_inst._defaults.millisec<tp_inst._defaults.millisecMin?tp_inst._defaults.millisecMin:tp_inst._defaults.millisec>tp_inst._defaults.millisecMax?tp_inst._defaults.millisecMax:tp_inst._defaults.millisec;tp_inst.ampm="";tp_inst.$input=$input;if(o.altField){tp_inst.$altInput=$(o.altField).css({cursor:"pointer"}).focus(function(){$input.trigger("focus")})}if(tp_inst._defaults.minDate===0||tp_inst._defaults.minDateTime===0){tp_inst._defaults.minDate=new Date}if(tp_inst._defaults.maxDate===0||tp_inst._defaults.maxDateTime===0){tp_inst._defaults.maxDate=new Date}if(tp_inst._defaults.minDate!==undefined&&tp_inst._defaults.minDate instanceof Date){tp_inst._defaults.minDateTime=new Date(tp_inst._defaults.minDate.getTime())}if(tp_inst._defaults.minDateTime!==undefined&&tp_inst._defaults.minDateTime instanceof Date){tp_inst._defaults.minDate=new Date(tp_inst._defaults.minDateTime.getTime())}if(tp_inst._defaults.maxDate!==undefined&&tp_inst._defaults.maxDate instanceof Date){tp_inst._defaults.maxDateTime=new Date(tp_inst._defaults.maxDate.getTime())}if(tp_inst._defaults.maxDateTime!==undefined&&tp_inst._defaults.maxDateTime instanceof Date){tp_inst._defaults.maxDate=new Date(tp_inst._defaults.maxDateTime.getTime())}tp_inst.$input.bind("focus",function(){tp_inst._onFocus()});return tp_inst},_addTimePicker:function(e){var t=this.$altInput&&this._defaults.altFieldTimeOnly?this.$input.val()+" "+this.$altInput.val():this.$input.val();this.timeDefined=this._parseTime(t);this._limitMinMaxDateTime(e,false);this._injectTimePicker()},_parseTime:function(e,t){if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0])}if(t||!this._defaults.timeOnly){var n=$.datepicker._get(this.inst,"dateFormat");try{var r=parseDateTimeInternal(n,this._defaults.timeFormat,e,$.datepicker._getFormatConfig(this.inst),this._defaults);if(!r.timeObj){return false}$.extend(this,r.timeObj)}catch(i){$.timepicker.log("Error parsing the date/time string: "+i+"\ndate/time string = "+e+"\ntimeFormat = "+this._defaults.timeFormat+"\ndateFormat = "+n);return false}return true}else{var s=$.datepicker.parseTime(this._defaults.timeFormat,e,this._defaults);if(!s){return false}$.extend(this,s);return true}},_injectTimePicker:function(){var e=this.inst.dpDiv,t=this.inst.settings,n=this,r="",i="",s={},o={},u=null;if(e.find("div.ui-timepicker-div").length===0&&t.showTimepicker){var a=' style="display:none;"',f='<div class="ui-timepicker-div'+(t.isRTL?" ui-timepicker-rtl":"")+'"><dl>'+'<dt class="ui_tpicker_time_label"'+(t.showTime?"":a)+">"+t.timeText+"</dt>"+'<dd class="ui_tpicker_time"'+(t.showTime?"":a)+"></dd>";for(var l=0,c=this.units.length;l<c;l++){r=this.units[l];i=r.substr(0,1).toUpperCase()+r.substr(1);s[r]=parseInt(t[r+"Max"]-(t[r+"Max"]-t[r+"Min"])%t["step"+i],10);o[r]=0;f+='<dt class="ui_tpicker_'+r+'_label"'+(t["show"+i]?"":a)+">"+t[r+"Text"]+"</dt>"+'<dd class="ui_tpicker_'+r+'"><div class="ui_tpicker_'+r+'_slider"'+(t["show"+i]?"":a)+"></div>";if(t["show"+i]&&t[r+"Grid"]>0){f+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';if(r=="hour"){for(var h=t[r+"Min"];h<=s[r];h+=parseInt(t[r+"Grid"],10)){o[r]++;var p=$.datepicker.formatTime(useAmpm(t.pickerTimeFormat||t.timeFormat)?"hht":"HH",{hour:h},t);f+='<td data-for="'+r+'">'+p+"</td>"}}else{for(var d=t[r+"Min"];d<=s[r];d+=parseInt(t[r+"Grid"],10)){o[r]++;f+='<td data-for="'+r+'">'+(d<10?"0":"")+d+"</td>"}}f+="</tr></table></div>"}f+="</dd>"}f+='<dt class="ui_tpicker_timezone_label"'+(t.showTimezone?"":a)+">"+t.timezoneText+"</dt>";f+='<dd class="ui_tpicker_timezone" '+(t.showTimezone?"":a)+"></dd>";f+="</dl></div>";var v=$(f);if(t.timeOnly===true){v.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all">'+'<div class="ui-datepicker-title">'+t.timeOnlyTitle+"</div>"+"</div>");e.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()}for(var l=0,c=n.units.length;l<c;l++){r=n.units[l];i=r.substr(0,1).toUpperCase()+r.substr(1);n[r+"_slider"]=n.control.create(n,v.find(".ui_tpicker_"+r+"_slider"),r,n[r],t[r+"Min"],s[r],t["step"+i]);if(t["show"+i]&&t[r+"Grid"]>0){u=100*o[r]*t[r+"Grid"]/(s[r]-t[r+"Min"]);v.find(".ui_tpicker_"+r+" table").css({width:u+"%",marginLeft:t.isRTL?"0":u/(-2*o[r])+"%",marginRight:t.isRTL?u/(-2*o[r])+"%":"0",borderCollapse:"collapse"}).find("td").click(function(e){var t=$(this),i=t.html(),s=parseInt(i.replace(/[^0-9]/g),10),o=i.replace(/[^apm]/ig),u=t.data("for");if(u=="hour"){if(o.indexOf("p")!==-1&&s<12){s+=12}else{if(o.indexOf("a")!==-1&&s===12){s=0}}}n.control.value(n,n[u+"_slider"],r,s);n._onTimeChange();n._onSelectHandler()}).css({cursor:"pointer",width:100/o[r]+"%",textAlign:"center",overflow:"hidden"})}}this.timezone_select=v.find(".ui_tpicker_timezone").append("<select></select>").find("select");$.fn.append.apply(this.timezone_select,$.map(t.timezoneList,function(e,t){return $("<option />").val(typeof e=="object"?e.value:e).text(typeof e=="object"?e.label:e)}));if(typeof this.timezone!="undefined"&&this.timezone!==null&&this.timezone!==""){var m=new Date(this.inst.selectedYear,this.inst.selectedMonth,this.inst.selectedDay,12);var g=$.timepicker.timeZoneOffsetString(m);if(g==this.timezone){selectLocalTimeZone(n)}else{this.timezone_select.val(this.timezone)}}else{if(typeof this.hour!="undefined"&&this.hour!==null&&this.hour!==""){this.timezone_select.val(t.defaultTimezone)}else{selectLocalTimeZone(n)}}this.timezone_select.change(function(){n._defaults.useLocalTimezone=false;n._onTimeChange();n._onSelectHandler()});var y=e.find(".ui-datepicker-buttonpane");if(y.length){y.before(v)}else{e.append(v)}this.$timeObj=v.find(".ui_tpicker_time");if(this.inst!==null){var b=this.timeDefined;this._onTimeChange();this.timeDefined=b}if(this._defaults.addSliderAccess){var w=this._defaults.sliderAccessArgs,E=this._defaults.isRTL;w.isRTL=E;setTimeout(function(){if(v.find(".ui-slider-access").length===0){v.find(".ui-slider:visible").sliderAccess(w);var e=v.find(".ui-slider-access:eq(0)").outerWidth(true);if(e){v.find("table:visible").each(function(){var t=$(this),n=t.outerWidth(),r=t.css(E?"marginRight":"marginLeft").toString().replace("%",""),i=n-e,s=r*i/n+"%",o={width:i,marginRight:0,marginLeft:0};o[E?"marginRight":"marginLeft"]=s;t.css(o)})}}},10)}}},_limitMinMaxDateTime:function(e,t){var n=this._defaults,r=new Date(e.selectedYear,e.selectedMonth,e.selectedDay);if(!this._defaults.showTimepicker){return}if($.datepicker._get(e,"minDateTime")!==null&&$.datepicker._get(e,"minDateTime")!==undefined&&r){var i=$.datepicker._get(e,"minDateTime"),s=new Date(i.getFullYear(),i.getMonth(),i.getDate(),0,0,0,0);if(this.hourMinOriginal===null||this.minuteMinOriginal===null||this.secondMinOriginal===null||this.millisecMinOriginal===null){this.hourMinOriginal=n.hourMin;this.minuteMinOriginal=n.minuteMin;this.secondMinOriginal=n.secondMin;this.millisecMinOriginal=n.millisecMin}if(e.settings.timeOnly||s.getTime()==r.getTime()){this._defaults.hourMin=i.getHours();if(this.hour<=this._defaults.hourMin){this.hour=this._defaults.hourMin;this._defaults.minuteMin=i.getMinutes();if(this.minute<=this._defaults.minuteMin){this.minute=this._defaults.minuteMin;this._defaults.secondMin=i.getSeconds();if(this.second<=this._defaults.secondMin){this.second=this._defaults.secondMin;this._defaults.millisecMin=i.getMilliseconds()}else{if(this.millisec<this._defaults.millisecMin){this.millisec=this._defaults.millisecMin}this._defaults.millisecMin=this.millisecMinOriginal}}else{this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal}}else{this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal}}else{this._defaults.hourMin=this.hourMinOriginal;this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal}}if($.datepicker._get(e,"maxDateTime")!==null&&$.datepicker._get(e,"maxDateTime")!==undefined&&r){var o=$.datepicker._get(e,"maxDateTime"),u=new Date(o.getFullYear(),o.getMonth(),o.getDate(),0,0,0,0);if(this.hourMaxOriginal===null||this.minuteMaxOriginal===null||this.secondMaxOriginal===null){this.hourMaxOriginal=n.hourMax;this.minuteMaxOriginal=n.minuteMax;this.secondMaxOriginal=n.secondMax;this.millisecMaxOriginal=n.millisecMax}if(e.settings.timeOnly||u.getTime()==r.getTime()){this._defaults.hourMax=o.getHours();if(this.hour>=this._defaults.hourMax){this.hour=this._defaults.hourMax;this._defaults.minuteMax=o.getMinutes();if(this.minute>=this._defaults.minuteMax){this.minute=this._defaults.minuteMax;this._defaults.secondMax=o.getSeconds();if(this.second>=this._defaults.secondMax){this.second=this._defaults.secondMax;this._defaults.millisecMax=o.getMilliseconds()}else{if(this.millisec>this._defaults.millisecMax){this.millisec=this._defaults.millisecMax}this._defaults.millisecMax=this.millisecMaxOriginal}}else{this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal}}else{this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal}}else{this._defaults.hourMax=this.hourMaxOriginal;this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal}}if(t!==undefined&&t===true){var a=parseInt(this._defaults.hourMax-(this._defaults.hourMax-this._defaults.hourMin)%this._defaults.stepHour,10),f=parseInt(this._defaults.minuteMax-(this._defaults.minuteMax-this._defaults.minuteMin)%this._defaults.stepMinute,10),l=parseInt(this._defaults.secondMax-(this._defaults.secondMax-this._defaults.secondMin)%this._defaults.stepSecond,10),c=parseInt(this._defaults.millisecMax-(this._defaults.millisecMax-this._defaults.millisecMin)%this._defaults.stepMillisec,10);if(this.hour_slider){this.control.options(this,this.hour_slider,"hour",{min:this._defaults.hourMin,max:a});this.control.value(this,this.hour_slider,"hour",this.hour-this.hour%this._defaults.stepHour)}if(this.minute_slider){this.control.options(this,this.minute_slider,"minute",{min:this._defaults.minuteMin,max:f});this.control.value(this,this.minute_slider,"minute",this.minute-this.minute%this._defaults.stepMinute)}if(this.second_slider){this.control.options(this,this.second_slider,"second",{min:this._defaults.secondMin,max:l});this.control.value(this,this.second_slider,"second",this.second-this.second%this._defaults.stepSecond)}if(this.millisec_slider){this.control.options(this,this.millisec_slider,"millisec",{min:this._defaults.millisecMin,max:c});this.control.value(this,this.millisec_slider,"millisec",this.millisec-this.millisec%this._defaults.stepMillisec)}}},_onTimeChange:function(){var e=this.hour_slider?this.control.value(this,this.hour_slider,"hour"):false,t=this.minute_slider?this.control.value(this,this.minute_slider,"minute"):false,n=this.second_slider?this.control.value(this,this.second_slider,"second"):false,r=this.millisec_slider?this.control.value(this,this.millisec_slider,"millisec"):false,i=this.timezone_select?this.timezone_select.val():false,s=this._defaults,o=s.pickerTimeFormat||s.timeFormat,u=s.pickerTimeSuffix||s.timeSuffix;if(typeof e=="object"){e=false}if(typeof t=="object"){t=false}if(typeof n=="object"){n=false}if(typeof r=="object"){r=false}if(typeof i=="object"){i=false}if(e!==false){e=parseInt(e,10)}if(t!==false){t=parseInt(t,10)}if(n!==false){n=parseInt(n,10)}if(r!==false){r=parseInt(r,10)}var a=s[e<12?"amNames":"pmNames"][0];var f=e!=this.hour||t!=this.minute||n!=this.second||r!=this.millisec||this.ampm.length>0&&e<12!=($.inArray(this.ampm.toUpperCase(),this.amNames)!==-1)||this.timezone===null&&i!=this.defaultTimezone||this.timezone!==null&&i!=this.timezone;if(f){if(e!==false){this.hour=e}if(t!==false){this.minute=t}if(n!==false){this.second=n}if(r!==false){this.millisec=r}if(i!==false){this.timezone=i}if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0])}this._limitMinMaxDateTime(this.inst,true)}if(useAmpm(s.timeFormat)){this.ampm=a}this.formattedTime=$.datepicker.formatTime(s.timeFormat,this,s);if(this.$timeObj){if(o===s.timeFormat){this.$timeObj.text(this.formattedTime+u)}else{this.$timeObj.text($.datepicker.formatTime(o,this,s)+u)}}this.timeDefined=true;if(f){this._updateDateTime()}},_onSelectHandler:function(){var e=this._defaults.onSelect||this.inst.settings.onSelect;var t=this.$input?this.$input[0]:null;if(e&&t){e.apply(t,[this.formattedDateTime,this])}},_updateDateTime:function(e){e=this.inst||e;var t=$.datepicker._daylightSavingAdjust(new Date(e.selectedYear,e.selectedMonth,e.selectedDay)),n=$.datepicker._get(e,"dateFormat"),r=$.datepicker._getFormatConfig(e),i=t!==null&&this.timeDefined;this.formattedDate=$.datepicker.formatDate(n,t===null?new Date:t,r);var s=this.formattedDate;if(e.lastVal==""){e.currentYear=e.selectedYear;e.currentMonth=e.selectedMonth;e.currentDay=e.selectedDay}if(this._defaults.timeOnly===true){s=this.formattedTime}else if(this._defaults.timeOnly!==true&&(this._defaults.alwaysSetTime||i)){s+=this._defaults.separator+this.formattedTime+this._defaults.timeSuffix}this.formattedDateTime=s;if(!this._defaults.showTimepicker){this.$input.val(this.formattedDate)}else if(this.$altInput&&this._defaults.altFieldTimeOnly===true){this.$altInput.val(this.formattedTime);this.$input.val(this.formattedDate)}else if(this.$altInput){this.$input.val(s);var o="",u=this._defaults.altSeparator?this._defaults.altSeparator:this._defaults.separator,a=this._defaults.altTimeSuffix?this._defaults.altTimeSuffix:this._defaults.timeSuffix;if(this._defaults.altFormat)o=$.datepicker.formatDate(this._defaults.altFormat,t===null?new Date:t,r);else o=this.formattedDate;if(o)o+=u;if(this._defaults.altTimeFormat)o+=$.datepicker.formatTime(this._defaults.altTimeFormat,this,this._defaults)+a;else o+=this.formattedTime+a;this.$altInput.val(o)}else{this.$input.val(s)}this.$input.trigger("change")},_onFocus:function(){if(!this.$input.val()&&this._defaults.defaultValue){this.$input.val(this._defaults.defaultValue);var e=$.datepicker._getInst(this.$input.get(0)),t=$.datepicker._get(e,"timepicker");if(t){if(t._defaults.timeOnly&&e.input.val()!=e.lastVal){try{$.datepicker._updateDatepicker(e)}catch(n){$.timepicker.log(n)}}}}},_controls:{slider:{create:function(e,t,n,r,i,s,o){var u=e._defaults.isRTL;return t.prop("slide",null).slider({orientation:"horizontal",value:u?r*-1:r,min:u?s*-1:i,max:u?i*-1:s,step:o,slide:function(t,r){e.control.value(e,$(this),n,u?r.value*-1:r.value);e._onTimeChange()},stop:function(t,n){e._onSelectHandler()}})},options:function(e,t,n,r,i){if(e._defaults.isRTL){if(typeof r=="string"){if(r=="min"||r=="max"){if(i!==undefined)return t.slider(r,i*-1);return Math.abs(t.slider(r))}return t.slider(r)}var s=r.min,o=r.max;r.min=r.max=null;if(s!==undefined)r.max=s*-1;if(o!==undefined)r.min=o*-1;return t.slider(r)}if(typeof r=="string"&&i!==undefined)return t.slider(r,i);return t.slider(r)},value:function(e,t,n,r){if(e._defaults.isRTL){if(r!==undefined)return t.slider("value",r*-1);return Math.abs(t.slider("value"))}if(r!==undefined)return t.slider("value",r);return t.slider("value")}},select:{create:function(e,t,n,r,i,s,o){var u='<select class="ui-timepicker-select" data-unit="'+n+'" data-min="'+i+'" data-max="'+s+'" data-step="'+o+'">',a=e._defaults.timeFormat.indexOf("t")!==-1?"toLowerCase":"toUpperCase",f=0;for(var l=i;l<=s;l+=o){u+='<option value="'+l+'"'+(l==r?" selected":"")+">";if(n=="hour"&&useAmpm(e._defaults.pickerTimeFormat||e._defaults.timeFormat))u+=$.datepicker.formatTime("hh TT",{hour:l},e._defaults);else if(n=="millisec"||l>=10)u+=l;else u+="0"+l.toString();u+="</option>"}u+="</select>";t.children("select").remove();$(u).appendTo(t).change(function(t){e._onTimeChange();e._onSelectHandler()});return t},options:function(e,t,n,r,i){var s={},o=t.children("select");if(typeof r=="string"){if(i===undefined)return o.data(r);s[r]=i}else s=r;return e.control.create(e,t,o.data("unit"),o.val(),s.min||o.data("min"),s.max||o.data("max"),s.step||o.data("step"))},value:function(e,t,n,r){var i=t.children("select");if(r!==undefined)return i.val(r);return i.val()}}}});$.fn.extend({timepicker:function(e){e=e||{};var t=Array.prototype.slice.call(arguments);if(typeof e=="object"){t[0]=$.extend(e,{timeOnly:true})}return $(this).each(function(){$.fn.datetimepicker.apply($(this),t)})},datetimepicker:function(e){e=e||{};var t=arguments;if(typeof e=="string"){if(e=="getDate"){return $.fn.datepicker.apply($(this[0]),t)}else{return this.each(function(){var e=$(this);e.datepicker.apply(e,t)})}}else{return this.each(function(){var t=$(this);t.datepicker($.timepicker._newInst(t,e)._defaults)})}}});$.datepicker.parseDateTime=function(e,t,n,r,i){var s=parseDateTimeInternal(e,t,n,r,i);if(s.timeObj){var o=s.timeObj;s.date.setHours(o.hour,o.minute,o.second,o.millisec)}return s.date};$.datepicker.parseTime=function(e,t,n){var r=extendRemove(extendRemove({},$.timepicker._defaults),n||{});var i=function(e,t,n){var r=function(e,t){var n=[];if(e){$.merge(n,e)}if(t){$.merge(n,t)}n=$.map(n,function(e){return e.replace(/[.*+?|()\[\]{}\\]/g,"\\$&")});return"("+n.join("|")+")?"};var i=function(e){var t=e.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z|'.*?')/g),n={h:-1,m:-1,s:-1,l:-1,t:-1,z:-1};if(t){for(var r=0;r<t.length;r++){if(n[t[r].toString().charAt(0)]==-1){n[t[r].toString().charAt(0)]=r+1}}}return n};var s="^"+e.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[lz]|'.*?')/g,function(e){var t=e.length;switch(e.charAt(0).toLowerCase()){case"h":return t===1?"(\\d?\\d)":"(\\d{"+t+"})";case"m":return t===1?"(\\d?\\d)":"(\\d{"+t+"})";case"s":return t===1?"(\\d?\\d)":"(\\d{"+t+"})";case"l":return"(\\d?\\d?\\d)";case"z":return"(z|[-+]\\d\\d:?\\d\\d|\\S+)?";case"t":return r(n.amNames,n.pmNames);default:return"("+e.replace(/\'/g,"").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g,function(e){return"\\"+e})+")?"}}).replace(/\s/g,"\\s?")+n.timeSuffix+"$",o=i(e),u="",a;a=t.match(new RegExp(s,"i"));var f={hour:0,minute:0,second:0,millisec:0};if(a){if(o.t!==-1){if(a[o.t]===undefined||a[o.t].length===0){u="";f.ampm=""}else{u=$.inArray(a[o.t].toUpperCase(),n.amNames)!==-1?"AM":"PM";f.ampm=n[u=="AM"?"amNames":"pmNames"][0]}}if(o.h!==-1){if(u=="AM"&&a[o.h]=="12"){f.hour=0}else{if(u=="PM"&&a[o.h]!="12"){f.hour=parseInt(a[o.h],10)+12}else{f.hour=Number(a[o.h])}}}if(o.m!==-1){f.minute=Number(a[o.m])}if(o.s!==-1){f.second=Number(a[o.s])}if(o.l!==-1){f.millisec=Number(a[o.l])}if(o.z!==-1&&a[o.z]!==undefined){var l=a[o.z].toUpperCase();switch(l.length){case 1:l=n.timezoneIso8601?"Z":"+0000";break;case 5:if(n.timezoneIso8601){l=l.substring(1)=="0000"?"Z":l.substring(0,3)+":"+l.substring(3)}break;case 6:if(!n.timezoneIso8601){l=l=="Z"||l.substring(1)=="00:00"?"+0000":l.replace(/:/,"")}else{if(l.substring(1)=="00:00"){l="Z"}}break}f.timezone=l}return f}return false};var s=function(e,t,n){try{var r=new Date("2012-01-01 "+t);if(isNaN(r.getTime())){r=new Date("2012-01-01T"+t);if(isNaN(r.getTime())){r=new Date("01/01/2012 "+t);if(isNaN(r.getTime())){throw"Unable to parse time with native Date: "+t}}}return{hour:r.getHours(),minute:r.getMinutes(),second:r.getSeconds(),millisec:r.getMilliseconds(),timezone:$.timepicker.timeZoneOffsetString(r)}}catch(s){try{return i(e,t,n)}catch(o){$.timepicker.log("Unable to parse \ntimeString: "+t+"\ntimeFormat: "+e)}}return false};if(typeof r.parse==="function"){return r.parse(e,t,r)}if(r.parse==="loose"){return s(e,t,r)}return i(e,t,r)};$.datepicker.formatTime=function(e,t,n){n=n||{};n=$.extend({},$.timepicker._defaults,n);t=$.extend({hour:0,minute:0,second:0,millisec:0,timezone:"+0000"},t);var r=e,i=n.amNames[0],s=parseInt(t.hour,10);if(s>11){i=n.pmNames[0]}r=r.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[lz]|('.*?'|".*?"))/g,function(e){switch(e){case"HH":return("0"+s).slice(-2);case"H":return s;case"hh":return("0"+convert24to12(s)).slice(-2);case"h":return convert24to12(s);case"mm":return("0"+t.minute).slice(-2);case"m":return t.minute;case"ss":return("0"+t.second).slice(-2);case"s":return t.second;case"l":return("00"+t.millisec).slice(-3);case"z":return t.timezone===null?n.defaultTimezone:t.timezone;case"T":return i.charAt(0).toUpperCase();case"TT":return i.toUpperCase();case"t":return i.charAt(0).toLowerCase();case"tt":return i.toLowerCase();default:return e.replace(/\'/g,"")||"'"}});r=$.trim(r);return r};$.datepicker._base_selectDate=$.datepicker._selectDate;$.datepicker._selectDate=function(e,t){var n=this._getInst($(e)[0]),r=this._get(n,"timepicker");if(r){r._limitMinMaxDateTime(n,true);n.inline=n.stay_open=true;this._base_selectDate(e,t);n.inline=n.stay_open=false;this._notifyChange(n);this._updateDatepicker(n)}else{this._base_selectDate(e,t)}};$.datepicker._base_updateDatepicker=$.datepicker._updateDatepicker;$.datepicker._updateDatepicker=function(e){var t=e.input[0];if($.datepicker._curInst&&$.datepicker._curInst!=e&&$.datepicker._datepickerShowing&&$.datepicker._lastInput!=t){return}if(typeof e.stay_open!=="boolean"||e.stay_open===false){this._base_updateDatepicker(e);var n=this._get(e,"timepicker");if(n){n._addTimePicker(e)}}};$.datepicker._base_doKeyPress=$.datepicker._doKeyPress;$.datepicker._doKeyPress=function(e){var t=$.datepicker._getInst(e.target),n=$.datepicker._get(t,"timepicker");if(n){if($.datepicker._get(t,"constrainInput")){var r=useAmpm(n._defaults.timeFormat),i=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),s=n._defaults.timeFormat.toString().replace(/[hms]/g,"").replace(/TT/g,r?"APM":"").replace(/Tt/g,r?"AaPpMm":"").replace(/tT/g,r?"AaPpMm":"").replace(/T/g,r?"AP":"").replace(/tt/g,r?"apm":"").replace(/t/g,r?"ap":"")+" "+n._defaults.separator+n._defaults.timeSuffix+(n._defaults.showTimezone?n._defaults.timezoneList.join(""):"")+n._defaults.amNames.join("")+n._defaults.pmNames.join("")+i,o=String.fromCharCode(e.charCode===undefined?e.keyCode:e.charCode);return e.ctrlKey||o<" "||!i||s.indexOf(o)>-1}}return $.datepicker._base_doKeyPress(e)};$.datepicker._base_updateAlternate=$.datepicker._updateAlternate;$.datepicker._updateAlternate=function(e){var t=this._get(e,"timepicker");if(t){var n=t._defaults.altField;if(n){var r=t._defaults.altFormat||t._defaults.dateFormat,i=this._getDate(e),s=$.datepicker._getFormatConfig(e),o="",u=t._defaults.altSeparator?t._defaults.altSeparator:t._defaults.separator,a=t._defaults.altTimeSuffix?t._defaults.altTimeSuffix:t._defaults.timeSuffix,f=t._defaults.altTimeFormat!==null?t._defaults.altTimeFormat:t._defaults.timeFormat;o+=$.datepicker.formatTime(f,t,t._defaults)+a;if(!t._defaults.timeOnly&&!t._defaults.altFieldTimeOnly&&i!==null){if(t._defaults.altFormat)o=$.datepicker.formatDate(t._defaults.altFormat,i,s)+u+o;else o=t.formattedDate+u+o}$(n).val(o)}}else{$.datepicker._base_updateAlternate(e)}};$.datepicker._base_doKeyUp=$.datepicker._doKeyUp;$.datepicker._doKeyUp=function(e){var t=$.datepicker._getInst(e.target),n=$.datepicker._get(t,"timepicker");if(n){if(n._defaults.timeOnly&&t.input.val()!=t.lastVal){try{$.datepicker._updateDatepicker(t)}catch(r){$.timepicker.log(r)}}}return $.datepicker._base_doKeyUp(e)};$.datepicker._base_gotoToday=$.datepicker._gotoToday;$.datepicker._gotoToday=function(e){var t=this._getInst($(e)[0]),n=t.dpDiv;this._base_gotoToday(e);var r=this._get(t,"timepicker");selectLocalTimeZone(r);var i=new Date;this._setTime(t,i);$(".ui-datepicker-today",n).click()};$.datepicker._disableTimepickerDatepicker=function(e){var t=this._getInst(e);if(!t){return}var n=this._get(t,"timepicker");$(e).datepicker("getDate");if(n){n._defaults.showTimepicker=false;n._updateDateTime(t)}};$.datepicker._enableTimepickerDatepicker=function(e){var t=this._getInst(e);if(!t){return}var n=this._get(t,"timepicker");$(e).datepicker("getDate");if(n){n._defaults.showTimepicker=true;n._addTimePicker(t);n._updateDateTime(t)}};$.datepicker._setTime=function(e,t){var n=this._get(e,"timepicker");if(n){var r=n._defaults;n.hour=t?t.getHours():r.hour;n.minute=t?t.getMinutes():r.minute;n.second=t?t.getSeconds():r.second;n.millisec=t?t.getMilliseconds():r.millisec;n._limitMinMaxDateTime(e,true);n._onTimeChange();n._updateDateTime(e)}};$.datepicker._setTimeDatepicker=function(e,t,n){var r=this._getInst(e);if(!r){return}var i=this._get(r,"timepicker");if(i){this._setDateFromField(r);var s;if(t){if(typeof t=="string"){i._parseTime(t,n);s=new Date;s.setHours(i.hour,i.minute,i.second,i.millisec)}else{s=new Date(t.getTime())}if(s.toString()=="Invalid Date"){s=undefined}this._setTime(r,s)}}};$.datepicker._base_setDateDatepicker=$.datepicker._setDateDatepicker;$.datepicker._setDateDatepicker=function(e,t){var n=this._getInst(e);if(!n){return}var r=t instanceof Date?new Date(t.getTime()):t;this._updateDatepicker(n);this._base_setDateDatepicker.apply(this,arguments);this._setTimeDatepicker(e,r,true)};$.datepicker._base_getDateDatepicker=$.datepicker._getDateDatepicker;$.datepicker._getDateDatepicker=function(e,t){var n=this._getInst(e);if(!n){return}var r=this._get(n,"timepicker");if(r){if(n.lastVal===undefined){this._setDateFromField(n,t)}var i=this._getDate(n);if(i&&r._parseTime($(e).val(),r.timeOnly)){i.setHours(r.hour,r.minute,r.second,r.millisec)}return i}return this._base_getDateDatepicker(e,t)};$.datepicker._base_parseDate=$.datepicker.parseDate;$.datepicker.parseDate=function(e,t,n){var r;try{r=this._base_parseDate(e,t,n)}catch(i){r=this._base_parseDate(e,t.substring(0,t.length-(i.length-i.indexOf(":")-2)),n);$.timepicker.log("Error parsing the date string: "+i+"\ndate string = "+t+"\ndate format = "+e)}return r};$.datepicker._base_formatDate=$.datepicker._formatDate;$.datepicker._formatDate=function(e,t,n,r){var i=this._get(e,"timepicker");if(i){i._updateDateTime(e);return i.$input.val()}return this._base_formatDate(e)};$.datepicker._base_optionDatepicker=$.datepicker._optionDatepicker;$.datepicker._optionDatepicker=function(e,t,n){var r=this._getInst(e),i;if(!r){return null}var s=this._get(r,"timepicker");if(s){var o=null,u=null,a=null,f=s._defaults.evnts,l={},c;if(typeof t=="string"){if(t==="minDate"||t==="minDateTime"){o=n}else if(t==="maxDate"||t==="maxDateTime"){u=n}else if(t==="onSelect"){a=n}else if(f.hasOwnProperty(t)){if(typeof n==="undefined"){return f[t]}l[t]=n;i={}}}else if(typeof t=="object"){if(t.minDate){o=t.minDate}else if(t.minDateTime){o=t.minDateTime}else if(t.maxDate){u=t.maxDate}else if(t.maxDateTime){u=t.maxDateTime}for(c in f){if(f.hasOwnProperty(c)&&t[c]){l[c]=t[c]}}}for(c in l){if(l.hasOwnProperty(c)){f[c]=l[c];if(!i){i=$.extend({},t)}delete i[c]}}if(i&&isEmptyObject(i)){return}if(o){if(o===0){o=new Date}else{o=new Date(o)}s._defaults.minDate=o;s._defaults.minDateTime=o}else if(u){if(u===0){u=new Date}else{u=new Date(u)}s._defaults.maxDate=u;s._defaults.maxDateTime=u}else if(a){s._defaults.onSelect=a}}if(n===undefined){return this._base_optionDatepicker.call($.datepicker,e,t)}return this._base_optionDatepicker.call($.datepicker,e,i||t,n)};var isEmptyObject=function(e){var t;for(t in e){if(e.hasOwnProperty(e)){return false}}return true};var extendRemove=function(e,t){$.extend(e,t);for(var n in t){if(t[n]===null||t[n]===undefined){e[n]=t[n]}}return e};var useAmpm=function(e){return e.indexOf("t")!==-1&&e.indexOf("h")!==-1};var convert24to12=function(e){if(e>12){e=e-12}if(e==0){e=12}return String(e)};var splitDateTime=function(e,t,n,r){try{var i=r&&r.separator?r.separator:$.timepicker._defaults.separator,s=r&&r.timeFormat?r.timeFormat:$.timepicker._defaults.timeFormat,o=s.split(i),u=o.length,a=t.split(i),f=a.length;if(f>1){return[a.splice(0,f-u).join(i),a.splice(0,u).join(i)]}}catch(l){$.timepicker.log("Could not split the date from the time. Please check the following datetimepicker options"+"\nthrown error: "+l+"\ndateTimeString"+t+"\ndateFormat = "+e+"\nseparator = "+r.separator+"\ntimeFormat = "+r.timeFormat);if(l.indexOf(":")>=0){var c=t.length-(l.length-l.indexOf(":")-2),h=t.substring(c);return[$.trim(t.substring(0,c)),$.trim(t.substring(c))]}else{throw l}}return[t,""]};var parseDateTimeInternal=function(e,t,n,r,i){var s;var o=splitDateTime(e,n,r,i);s=$.datepicker._base_parseDate(e,o[0],r);if(o[1]!==""){var u=o[1],a=$.datepicker.parseTime(t,u,i);if(a===null){throw"Wrong time format"}return{date:s,timeObj:a}}else{return{date:s}}};var selectLocalTimeZone=function(e,t){if(e&&e.timezone_select){e._defaults.useLocalTimezone=true;var n=typeof t!=="undefined"?t:new Date;var r=$.timepicker.timeZoneOffsetString(n);if(e._defaults.timezoneIso8601){r=r.substring(0,3)+":"+r.substring(3)}e.timezone_select.val(r)}};$.timepicker=new Timepicker;$.timepicker.timeZoneOffsetString=function(e){var t=e.getTimezoneOffset()*-1,n=t%60,r=(t-n)/60;return(t>=0?"+":"-")+("0"+(r*101).toString()).slice(-2)+("0"+(n*101).toString()).slice(-2)};$.timepicker.timeRange=function(e,t,n){return $.timepicker.handleRange("timepicker",e,t,n)};$.timepicker.dateTimeRange=function(e,t,n){$.timepicker.dateRange(e,t,n,"datetimepicker")};$.timepicker.dateRange=function(e,t,n,r){r=r||"datepicker";$.timepicker.handleRange(r,e,t,n)};$.timepicker.handleRange=function(e,t,n,r){function i(e,r,i){if(r.val()&&new Date(t.val())>new Date(n.val())){r.val(i)}}function s(t,n,r){if(!$(t).val()){return}var i=$(t)[e].call($(t),"getDate");if(i.getTime){$(n)[e].call($(n),"option",r,i)}}$.fn[e].call(t,$.extend({onClose:function(e,t){i(this,n,e)},onSelect:function(e){s(this,n,"minDate")}},r,r.start));$.fn[e].call(n,$.extend({onClose:function(e,n){i(this,t,e)},onSelect:function(e){s(this,t,"maxDate")}},r,r.end));if(e!="timepicker"&&r.reformat){$([t,n]).each(function(){var t=$(this)[e].call($(this),"option","dateFormat"),n=new Date($(this).val());if($(this).val()&&n){$(this).val($.datepicker.formatDate(t,n))}})}i(t,n,t.val());s(t,n,"minDate");s(n,t,"maxDate");return $([t.get(0),n.get(0)])};$.timepicker.log=function(e){if(window.console)console.log(e)};$.timepicker.version="1.2"})(jQuery)