webpackJsonp([6],{469:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(493);n.n(r);for(var u in r)["default","default"].indexOf(u)<0&&function(e){n.d(t,e,function(){return r[e]})}(u);var a=n(483),i=n.n(a),o=n(500),l=n(1),s=n.i(l.a)(i.a,o.a,o.b,!1,null,null,null);t.default=s.exports},483:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{username:"",numberValue:1,timer:"",number:"",roomType:1}},mounted:function(){this.$route.query.id;console.log(this.$route.query.id)},methods:{open:function(){if(!this.username)return void this.bottomToast("请输入包厢名称");this.$router.push({name:"room"})}},components:{}}},493:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{username:"",numberValue:1,timer:"",number:"",roomType:1}},mounted:function(){this.$route.query.id;console.log(this.$route.query.id)},methods:{open:function(){if(!this.username)return void this.bottomToast("请输入包厢名称");this.$router.push({name:"room"})}},components:{}}},500:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return u});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"wrapper",staticClass:"clearfix get-room-container"},[n("group",{attrs:{"label-width":"5em","label-margin-right":"2em","label-align":"justify"}},[n("x-input",{attrs:{title:"包厢名称:"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),n("datetime",{attrs:{format:"YYYY-MM-DD HH:mm","minute-list":["00","15","30","45"],title:"开台时间:"},on:{"on-change":e.change},model:{value:e.timer,callback:function(t){e.timer=t},expression:"timer"}}),e._v(" "),n("x-number",{attrs:{title:"人数:",align:"left",min:1,max:100},model:{value:e.numberValue,callback:function(t){e.numberValue=t},expression:"numberValue"}})],1),e._v(" "),n("group",{staticClass:"addNumber",attrs:{"label-width":"5em","label-margin-right":"2em","label-align":"justify"}},[n("x-input",{attrs:{title:"添加手牌:"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}}),e._v(" "),n("button",[e._v("添加")])],1),e._v(" "),n("group",{attrs:{title:"备注信息"}},[n("x-textarea",{attrs:{max:200,name:"detail",placeholder:"请详细描述你的问题","show-counter":!1}})],1),e._v(" "),n("div",{staticClass:"oper"},[n("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.open(t)}}},[e._v("确认开房")])],1)],1)},u=[]}});