(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a8eb70e"],{"1bfa":function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"H100 flex flexv"},[i("div",{staticClass:"headBox flex"},[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.infoDialog={show:"saveSupplier",value:{form:{},cities:e.cities}}}}},[e._v("添加邮费模板")]),i("div",{staticClass:"flex1",staticStyle:{"min-width":"15px"}})],1),i("el-divider"),i("div",{ref:"tableBox",staticClass:"flex1"},[i("el-table",{staticClass:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData.data,height:e.tableHeight,border:"",stripe:""}},[i("el-table-column",{attrs:{prop:"name",label:"模板名称",align:"center","min-width":"140px"}}),i("el-table-column",{attrs:{prop:"is_free",label:"是否包邮",align:"center","min-width":"140px"}}),i("el-table-column",{attrs:{prop:"condition",label:"是否指定条件包邮",align:"center","min-width":"140px"}}),i("el-table-column",{attrs:{label:"操作",align:"center","min-width":"145px"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",plain:"",round:"",size:"mini"},on:{click:function(i){e.infoDialog={show:"saveSupplier",value:{form:t.row,cities:e.cities}}}}},[e._v("详情")])]}}])})],1)],1),i("el-pagination",{staticStyle:{"margin-top":"15px"},attrs:{background:"",layout:"prev, pager, next","current-page":e.form.page,"page-size":e.tableData.per_page,"page-count":e.tableData.last_page,total:e.tableData.total},on:{"update:currentPage":function(t){return e.$set(e.form,"page",t)},"update:current-page":function(t){return e.$set(e.form,"page",t)}}}),i("saveSupplier",{attrs:{show:e.infoDialog.show,value:e.infoDialog.value},on:{visibleChange:e.InfoVisibleChange}})],1)},n=[],a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{staticClass:"mydialog",attrs:{title:e.form.id?"修改邮费模板":"添加邮费模板",visible:e.show===e.$options.name,"close-on-click-modal":!1,"append-to-body":"",width:"1024px"},on:{close:e.close,closed:e.closed}},[i("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"模板配置",name:"first"}},[i("el-form",{staticClass:"form-box",attrs:{size:"mini","label-width":"80px"}},[i("el-row",[i("el-col",{attrs:{span:13}},[i("el-form-item",{attrs:{label:"模板名称","label-width":"80px"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入模板名称",clearable:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),i("el-col",{attrs:{span:11}},[i("el-form-item",{attrs:{label:"是否包邮"}},[i("el-switch",{attrs:{"active-value":1,"inactive-value":2},model:{value:e.form.is_free,callback:function(t){e.$set(e.form,"is_free",t)},expression:"form.is_free"}})],1)],1),2==e.form.is_free?i("el-col",{attrs:{span:13}},[i("el-form-item",{attrs:{label:"计价方式"}},[i("el-radio-group",{on:{change:e.checkType},model:{value:e.form.mode,callback:function(t){e.$set(e.form,"mode",t)},expression:"form.mode"}},[i("el-radio",{attrs:{label:1}},[e._v("计件")]),i("el-radio",{attrs:{label:2}},[e._v("称重")])],1)],1)],1):e._e(),2==e.form.is_free?i("el-col",{staticStyle:{"padding-left":"12px"},attrs:{span:12}},[i("el-checkbox",{model:{value:e.form.condition,callback:function(t){e.$set(e.form,"condition",t)},expression:"form.condition"}},[e._v("是否指定条件包邮")])],1):e._e()],1)],1)],1),1!=e.form.is_free?i("el-tab-pane",{attrs:{label:"计费规则",name:"second"}},[i("el-table",{staticClass:"sku_table",staticStyle:{width:"100%"},attrs:{data:e.form.rule,border:"",height:"480",size:"small"}},[i("el-table-column",{attrs:{label:"计价方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(1==t.row.mode?"计件":"称重"))])]}}],null,!1,936676155)}),1==e.form.mode?i("el-table-column",{attrs:{label:"件数"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-input",{staticStyle:{width:"70px"},attrs:{size:"mini",disabled:t.$index!==e.editIndex},model:{value:t.row.num,callback:function(i){e.$set(t.row,"num",i)},expression:"scope.row.num"}}),i("span",[e._v(" 件")])]}}],null,!1,2891584493)}):e._e(),2==e.form.mode?i("el-table-column",{attrs:{label:"重量"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-input",{staticStyle:{width:"70px"},attrs:{size:"mini",disabled:t.$index!==e.editIndex},model:{value:t.row.weight,callback:function(i){e.$set(t.row,"weight",i)},expression:"scope.row.weight"}}),i("span",[e._v(" kg")])]}}],null,!1,3732036545)}):e._e(),i("el-table-column",{attrs:{label:"费用"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-input",{staticStyle:{width:"70px"},attrs:{size:"mini",disabled:t.$index!==e.editIndex},model:{value:t.row.money,callback:function(i){e.$set(t.row,"money",i)},expression:"scope.row.money"}}),i("span",[e._v(" 元")])]}}],null,!1,1270390878)}),i("el-table-column",{attrs:{label:"地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.row.cateName,callback:function(i){e.$set(t.row,"cateName",i)},expression:"scope.row.cateName"}})]}}],null,!1,832746167)}),i("el-table-column",{attrs:{width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.editIndex==t.$index?i("el-button",{attrs:{size:"mini"},on:{click:function(t){e.editIndex=-1}}},[e._v("保存")]):i("el-button",{attrs:{size:"mini"},on:{click:function(i){e.editIndex=t.$index}}},[e._v("编辑")]),e.editIndex==t.$index?i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){e.editIndex=-1}}},[e._v("取消")]):i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.delete_goods(t.$index)}}},[e._v("删除")]),i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){e.infoDialog={show:"checkCitys",value:{form:t.row,cities:e.cities}}}}},[e._v("选择城市")])]}}],null,!1,3375891164)},[i("template",{slot:"header"},[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addGoods}},[e._v("新增规则")])],1)],2)],1)],1):e._e(),1!=e.form.is_free?i("el-tab-pane",{attrs:{label:"包邮条件",name:"third"}},[i("el-table",{staticClass:"sku_table",staticStyle:{width:"100%"},attrs:{data:e.form.proviso,border:"",height:"480",size:"small"}},[i("el-table-column",{attrs:{label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-select",{attrs:{clearable:"",placeholder:"请选择",disabled:t.$index!==e.editIndex2},model:{value:t.row.type,callback:function(i){e.$set(t.row,"type",i)},expression:"scope.row.type"}},e._l(e.types,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)]}}],null,!1,1722273587)}),i("el-table-column",{attrs:{label:"包邮条件"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-input",{staticStyle:{width:"100px"},attrs:{size:"mini",disabled:t.$index!==e.editIndex2},model:{value:t.row.condition,callback:function(i){e.$set(t.row,"condition",i)},expression:"scope.row.condition"}}),i("span",[e._v(e._s(1==t.row.type?"件":"kg"))])]}}],null,!1,1624271521)}),i("el-table-column",{attrs:{label:"地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-input",{attrs:{size:"mini",disabled:t.$index!==e.editIndex2},model:{value:t.row.cateName,callback:function(i){e.$set(t.row,"cateName",i)},expression:"scope.row.cateName"}})]}}],null,!1,168022232)}),i("el-table-column",{attrs:{width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.editIndex2==t.$index?i("el-button",{attrs:{size:"mini"},on:{click:function(t){e.editIndex2=-1}}},[e._v("保存")]):i("el-button",{attrs:{size:"mini"},on:{click:function(i){e.editIndex2=t.$index}}},[e._v("编辑")]),e.editIndex2==t.$index?i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){e.editIndex2=-1}}},[e._v("取消")]):i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.delete_goods2(t.$index)}}},[e._v("删除")]),i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){e.infoDialog={show:"checkCitys",value:{form:t.row,cities:e.cities}}}}},[e._v("选择城市")])]}}],null,!1,3599025052)},[i("template",{slot:"header"},[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addGoods2}},[e._v("新增条件")])],1)],2)],1)],1):e._e()],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:e.close}},[e._v("取 消")]),i("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1),e.viewIndex>=0?i("el-image-viewer",{attrs:{"on-close":e.viewIndexClose,"url-list":this.form.path,initialIndex:e.viewIndex}}):e._e()],1),i("checkCitys",{attrs:{show:e.infoDialog.show,value:e.infoDialog.value},on:{visibleChange:e.InfoVisibleChange}})],1)},s=[],l=(i("4160"),i("a434"),i("b0c0"),i("159b"),i("fd03")),c=i("08a9"),r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{staticClass:"mydialog",attrs:{title:"选择城市",visible:e.show===e.$options.name,"close-on-click-modal":!1,"append-to-body":"",width:"1024px"},on:{close:e.close,closed:e.closed}},[i("el-form",{staticClass:"form-box",attrs:{size:"mini","label-width":"80px"}},[i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"选择城市","label-width":"80px"}},[i("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),i("div",{staticStyle:{margin:"15px 0"}}),i("el-checkbox-group",{on:{change:e.handleCheckedCitiesChange},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},e._l(e.cities,(function(t){return i("el-checkbox",{key:t.name,attrs:{label:t.id}},[e._v(e._s(t.name))])})),1)],1)],1)],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:e.close}},[e._v("取 消")]),i("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)],1)},d=[],u={name:"checkCitys",components:{ElImageViewer:c["a"]},props:{value:{type:Object},show:{type:String}},watch:{show:function(e){e===this.$options.name&&(console.log(this.value),this.cities=this.value.cities,this.form=this.value.form)}},data:function(){return{checkAll:!1,cities:["上海","北京","广州","深圳"],isIndeterminate:!0,PostName:[],isdisabled:!0,viewIndex:-1,uploadcover:{url:l["a"]+"admin/upload",token:""},form:{id:"",token:"",region:[]}}},methods:{handleCheckAllChange:function(e){var t=[],i=[];this.cities.forEach((function(e){t.push(e.id),i.push(e.name)})),this.form.region=e?t:[],this.form.cateName=e?i:[],console.log(this.form.region),this.isIndeterminate=!1},handleCheckedCitiesChange:function(e){console.log(e);var t=e.length;this.checkAll=t===this.cities.length,this.isIndeterminate=t>0&&t<this.cities.length},checkType:function(e){console.log(e),this.form.mode=e},viewIndexClose:function(){this.viewIndex=-1},submit:function(){this.close()},close:function(){this.$emit("visibleChange",{getList:!1,show:""})},closed:function(){Object.assign(this.$data,this.$options.data())}}},f=u,m=(i("67d1"),i("2877")),h=Object(m["a"])(f,r,d,!1,null,"61c1549e",null),p=h.exports,b={name:"saveSupplier",components:{ElImageViewer:c["a"],checkCitys:p},props:{value:{type:Object},show:{type:String}},watch:{show:{handler:function(e){var t=this;e===this.$options.name&&(this.$ObjectMixed(this.form,this.value.form),console.log(this.value),this.cities=this.value.cities,this.form.id&&Object(l["o"])({id:this.form.id}).then((function(e){console.log("aaaaa"),console.log(e.data),t.form=e.data})),1==this.form.condition?this.form.condition=!0:this.form.condition=!1,console.log(this.form))},deep:!0,immediate:!0},"form.mode":function(e){this.form.rule.forEach((function(t){t.mode=e}))}},data:function(){return{tableData:[],infoDialog:{show:"",value:{}},editIndex:0,editIndex2:0,PostName:[],types:[{value:1,label:"计件"},{value:2,label:"称重"}],isdisabled:!0,viewIndex:-1,activeName:"first",uploadcover:{url:l["a"]+"admin/upload",token:""},form:{id:"",token:"",name:"",mode:1,is_free:1,condition:1,rule:[],proviso:[]}}},methods:{handleClick:function(e,t){console.log(e,t)},addGoods:function(){var e={id:"",num:"",weight:"",money:"",mode:this.form.mode,region:[]};this.form.rule.push(e)},addGoods2:function(){var e={id:"",condition:"",type:1,region:[]};this.form.proviso.push(e)},delete_goods:function(e){var t=this;this.$confirm("此操作将永久删除该选项, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message({type:"success",message:"删除成功!"}),t.form.rule.splice(e,1)}))},delete_goods2:function(e){var t=this;this.$confirm("此操作将永久删除该选项, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message({type:"success",message:"删除成功!"}),t.form.proviso.splice(e,1)}))},checkType:function(e){this.form.mode=e},checkType2:function(e){this.form.condition=e},viewIndexClose:function(){this.viewIndex=-1},submit:function(){var e=this;1==this.form.condition?this.form.condition=1:this.form.condition=2,console.log(this.form),Object(l["f"])(this.form).then((function(t){e.$message.success({message:t.msg||"操作成功"}),e.$emit("visibleChange",{getList:!0,show:""})}))},InfoVisibleChange:function(e){e.show||(this.infoDialog.value={},this.infoDialog.show=""),e.getList&&this.getList()},close:function(){this.$emit("visibleChange",{getList:!1,show:""})},closed:function(){Object.assign(this.$data,this.$options.data())}}},g=b,v=(i("97f2"),Object(m["a"])(g,a,s,!1,null,"41b47140",null)),x=v.exports,w={name:"resources",components:{saveSupplier:x},watch:{"form.page":function(e){e&&this.getList()}},data:function(){return{tableHeight:null,infoDialog:{show:"",value:{}},form:{status:"",page:1},cities:[],statusList:[{1:"上架",2:"上架"}],tableData:{}}},mounted:function(){this.tableHeight=this.$refs.tableBox.offsetHeight+"px",this.$ObjectMixed(this.form,this.$route.query),this.getStatusList(),this.getList(),this.getArea()},beforeRouteUpdate:function(e,t,i){Object.assign(this.$data,this.$options.data()),this.getStatusList(),this.getList(),i()},methods:{getList:function(){var e=this;Object(l["n"])(this.form).then((function(t){e.tableData=t.data,console.log(t.data)}))},getArea:function(){var e=this;Object(l["g"])({}).then((function(t){e.cities=t.data}))},InfoVisibleChange:function(e){e.show||(this.infoDialog.value={},this.infoDialog.show=""),e.getList&&this.getList()},getStatusList:function(){},changeStatus:function(e){var t=this;setGoods({id:e.id,mode:"status"}).then((function(i){1!=i.code&&(e.status=1==e.status?2:1,t.$message.error({message:i.msg||"未知错误"}))}))}}},k=w,y=(i("a4a7"),Object(m["a"])(k,o,n,!1,null,"bf11b0e2",null));t["default"]=y.exports},"67d1":function(e,t,i){"use strict";var o=i("79b6"),n=i.n(o);n.a},"79b6":function(e,t,i){},8495:function(e,t,i){},"97f2":function(e,t,i){"use strict";var o=i("ead6"),n=i.n(o);n.a},a434:function(e,t,i){"use strict";var o=i("23e7"),n=i("23cb"),a=i("a691"),s=i("50c4"),l=i("7b0b"),c=i("65f0"),r=i("8418"),d=i("1dde"),u=i("ae40"),f=d("splice"),m=u("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,p=Math.min,b=9007199254740991,g="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!f||!m},{splice:function(e,t){var i,o,d,u,f,m,v=l(this),x=s(v.length),w=n(e,x),k=arguments.length;if(0===k?i=o=0:1===k?(i=0,o=x-w):(i=k-2,o=p(h(a(t),0),x-w)),x+i-o>b)throw TypeError(g);for(d=c(v,o),u=0;u<o;u++)f=w+u,f in v&&r(d,u,v[f]);if(d.length=o,i<o){for(u=w;u<x-o;u++)f=u+o,m=u+i,f in v?v[m]=v[f]:delete v[m];for(u=x;u>x-o+i;u--)delete v[u-1]}else if(i>o)for(u=x-o;u>w;u--)f=u+o-1,m=u+i-1,f in v?v[m]=v[f]:delete v[m];for(u=0;u<i;u++)v[u+w]=arguments[u+2];return v.length=x-o+i,d}})},a4a7:function(e,t,i){"use strict";var o=i("8495"),n=i.n(o);n.a},ead6:function(e,t,i){}}]);