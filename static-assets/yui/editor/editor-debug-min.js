(function(){var b=YAHOO.util.Dom,a=YAHOO.util.Event,c=YAHOO.lang;
if(YAHOO.widget.Button){YAHOO.widget.ToolbarButtonAdvanced=YAHOO.widget.Button;
YAHOO.widget.ToolbarButtonAdvanced.prototype.buttonType="rich";
YAHOO.widget.ToolbarButtonAdvanced.prototype.checkValue=function(f){var e=this.getMenu().getItems();
if(e.length===0){this.getMenu()._onBeforeShow();
e=this.getMenu().getItems()
}for(var d=0;
d<e.length;
d++){e[d].cfg.setProperty("checked",false);
if(e[d].value==f){e[d].cfg.setProperty("checked",true)
}}}
}else{YAHOO.widget.ToolbarButtonAdvanced=function(){}
}YAHOO.widget.ToolbarButton=function(e,d){YAHOO.log("ToolbarButton Initalizing","info","ToolbarButton");
YAHOO.log(arguments.length+" arguments passed to constructor","info","Toolbar");
if(c.isObject(arguments[0])&&!b.get(e).nodeType){d=e
}var g=(d||{});
var f={element:null,attributes:g};
if(!f.attributes.type){f.attributes.type="push"
}f.element=document.createElement("span");
f.element.setAttribute("unselectable","on");
f.element.className="yui-button yui-"+f.attributes.type+"-button";
f.element.innerHTML='<span class="first-child"><a href="#">LABEL</a></span>';
f.element.firstChild.firstChild.tabIndex="-1";
f.attributes.id=b.generateId();
YAHOO.widget.ToolbarButton.superclass.constructor.call(this,f.element,f.attributes)
};
YAHOO.extend(YAHOO.widget.ToolbarButton,YAHOO.util.Element,{buttonType:"normal",_handleMouseOver:function(){if(!this.get("disabled")){this.addClass("yui-button-hover");
this.addClass("yui-"+this.get("type")+"-button-hover")
}},_handleMouseOut:function(){this.removeClass("yui-button-hover");
this.removeClass("yui-"+this.get("type")+"-button-hover")
},checkValue:function(f){if(this.get("type")=="menu"){var e=this._button.options;
for(var d=0;
d<e.length;
d++){if(e[d].value==f){e.selectedIndex=d
}}}},init:function(e,d){YAHOO.widget.ToolbarButton.superclass.init.call(this,e,d);
this.on("mouseover",this._handleMouseOver,this,true);
this.on("mouseout",this._handleMouseOut,this,true)
},initAttributes:function(d){YAHOO.widget.ToolbarButton.superclass.initAttributes.call(this,d);
this.setAttributeConfig("value",{value:d.value});
this.setAttributeConfig("menu",{value:d.menu||false});
this.setAttributeConfig("type",{value:d.type,writeOnce:true,method:function(h){var g,f;
if(!this._button){this._button=this.get("element").getElementsByTagName("a")[0]
}switch(h){case"select":case"menu":g=document.createElement("select");
var j=this.get("menu");
for(var e=0;
e<j.length;
e++){f=document.createElement("option");
f.innerHTML=j[e].text;
f.value=j[e].value;
if(j[e].checked){f.selected=true
}g.appendChild(f)
}this._button.parentNode.replaceChild(g,this._button);
a.on(g,"change",this._handleSelect,this,true);
this._button=g;
break
}}});
this.setAttributeConfig("disabled",{value:d.disabled||false,method:function(e){if(e){this.addClass("yui-button-disabled");
this.addClass("yui-"+this.get("type")+"-button-disabled")
}else{this.removeClass("yui-button-disabled");
this.removeClass("yui-"+this.get("type")+"-button-disabled")
}if(this.get("type")=="menu"){this._button.disabled=e
}}});
this.setAttributeConfig("label",{value:d.label,method:function(e){if(!this._button){this._button=this.get("element").getElementsByTagName("a")[0]
}if(this.get("type")=="push"){this._button.innerHTML=e
}}});
this.setAttributeConfig("title",{value:d.title});
this.setAttributeConfig("container",{value:null,writeOnce:true,method:function(e){this.appendTo(e)
}})
},_handleSelect:function(e){var d=a.getTarget(e);
var f=d.options[d.selectedIndex].value;
this.fireEvent("change",{type:"change",value:f})
},getMenu:function(){return this.get("menu")
},destroy:function(){a.purgeElement(this.get("element"),true);
this.get("element").parentNode.removeChild(this.get("element"));
for(var d in this){if(c.hasOwnProperty(this,d)){this[d]=null
}}},fireEvent:function(e,d){if(this.DOM_EVENTS[e]&&this.get("disabled")){return
}YAHOO.widget.ToolbarButton.superclass.fireEvent.call(this,e,d)
},toString:function(){return"ToolbarButton ("+this.get("id")+")"
}})
})();
(function(){var c=YAHOO.util.Dom,a=YAHOO.util.Event,d=YAHOO.lang;
var b=function(f){var e=f;
if(d.isString(f)){e=this.getButtonById(f)
}if(d.isNumber(f)){e=this.getButtonByIndex(f)
}if((!(e instanceof YAHOO.widget.ToolbarButton))&&(!(e instanceof YAHOO.widget.ToolbarButtonAdvanced))){e=this.getButtonByValue(f)
}if((e instanceof YAHOO.widget.ToolbarButton)||(e instanceof YAHOO.widget.ToolbarButtonAdvanced)){return e
}return false
};
YAHOO.widget.Toolbar=function(i,h){YAHOO.log("Toolbar Initalizing","info","Toolbar");
YAHOO.log(arguments.length+" arguments passed to constructor","info","Toolbar");
if(d.isObject(arguments[0])&&!c.get(i).nodeType){h=i
}var k={};
if(h){d.augmentObject(k,h)
}var j={element:null,attributes:k};
if(d.isString(i)&&c.get(i)){j.element=c.get(i)
}else{if(d.isObject(i)&&c.get(i)&&c.get(i).nodeType){j.element=c.get(i)
}}if(!j.element){YAHOO.log("No element defined, creating toolbar container","warn","Toolbar");
j.element=document.createElement("DIV");
j.element.id=c.generateId();
if(k.container&&c.get(k.container)){YAHOO.log("Container found in config appending to it ("+c.get(k.container).id+")","info","Toolbar");
c.get(k.container).appendChild(j.element)
}}if(!j.element.id){j.element.id=((d.isString(i))?i:c.generateId());
YAHOO.log("No element ID defined for toolbar container, creating..","warn","Toolbar")
}YAHOO.log("Initing toolbar with id: "+j.element.id,"info","Toolbar");
var f=document.createElement("fieldset");
var g=document.createElement("legend");
g.innerHTML="Toolbar";
f.appendChild(g);
var e=document.createElement("DIV");
j.attributes.cont=e;
c.addClass(e,"yui-toolbar-subcont");
f.appendChild(e);
j.element.appendChild(f);
j.element.tabIndex=-1;
j.attributes.element=j.element;
j.attributes.id=j.element.id;
YAHOO.widget.Toolbar.superclass.constructor.call(this,j.element,j.attributes)
};
YAHOO.extend(YAHOO.widget.Toolbar,YAHOO.util.Element,{_addMenuClasses:function(h,e,j){c.addClass(this.element,"yui-toolbar-"+j.get("value")+"-menu");
if(c.hasClass(j._button.parentNode.parentNode,"yui-toolbar-select")){c.addClass(this.element,"yui-toolbar-select-menu")
}var f=this.getItems();
for(var g=0;
g<f.length;
g++){c.addClass(f[g].element,"yui-toolbar-"+j.get("value")+"-"+((f[g].value)?f[g].value.replace(/ /g,"-").toLowerCase():f[g]._oText.nodeValue.replace(/ /g,"-").toLowerCase()));
c.addClass(f[g].element,"yui-toolbar-"+j.get("value")+"-"+((f[g].value)?f[g].value.replace(/ /g,"-"):f[g]._oText.nodeValue.replace(/ /g,"-")))
}},buttonType:YAHOO.widget.ToolbarButton,dd:null,_colorData:{"#111111":"Obsidian","#2D2D2D":"Dark Gray","#434343":"Shale","#5B5B5B":"Flint","#737373":"Gray","#8B8B8B":"Concrete","#A2A2A2":"Gray","#B9B9B9":"Titanium","#000000":"Black","#D0D0D0":"Light Gray","#E6E6E6":"Silver","#FFFFFF":"White","#BFBF00":"Pumpkin","#FFFF00":"Yellow","#FFFF40":"Banana","#FFFF80":"Pale Yellow","#FFFFBF":"Butter","#525330":"Raw Siena","#898A49":"Mildew","#AEA945":"Olive","#7F7F00":"Paprika","#C3BE71":"Earth","#E0DCAA":"Khaki","#FCFAE1":"Cream","#60BF00":"Cactus","#80FF00":"Chartreuse","#A0FF40":"Green","#C0FF80":"Pale Lime","#DFFFBF":"Light Mint","#3B5738":"Green","#668F5A":"Lime Gray","#7F9757":"Yellow","#407F00":"Clover","#8A9B55":"Pistachio","#B7C296":"Light Jade","#E6EBD5":"Breakwater","#00BF00":"Spring Frost","#00FF80":"Pastel Green","#40FFA0":"Light Emerald","#80FFC0":"Sea Foam","#BFFFDF":"Sea Mist","#033D21":"Dark Forrest","#438059":"Moss","#7FA37C":"Medium Green","#007F40":"Pine","#8DAE94":"Yellow Gray Green","#ACC6B5":"Aqua Lung","#DDEBE2":"Sea Vapor","#00BFBF":"Fog","#00FFFF":"Cyan","#40FFFF":"Turquoise Blue","#80FFFF":"Light Aqua","#BFFFFF":"Pale Cyan","#033D3D":"Dark Teal","#347D7E":"Gray Turquoise","#609A9F":"Green Blue","#007F7F":"Seaweed","#96BDC4":"Green Gray","#B5D1D7":"Soapstone","#E2F1F4":"Light Turquoise","#0060BF":"Summer Sky","#0080FF":"Sky Blue","#40A0FF":"Electric Blue","#80C0FF":"Light Azure","#BFDFFF":"Ice Blue","#1B2C48":"Navy","#385376":"Biscay","#57708F":"Dusty Blue","#00407F":"Sea Blue","#7792AC":"Sky Blue Gray","#A8BED1":"Morning Sky","#DEEBF6":"Vapor","#0000BF":"Deep Blue","#0000FF":"Blue","#4040FF":"Cerulean Blue","#8080FF":"Evening Blue","#BFBFFF":"Light Blue","#212143":"Deep Indigo","#373E68":"Sea Blue","#444F75":"Night Blue","#00007F":"Indigo Blue","#585E82":"Dockside","#8687A4":"Blue Gray","#D2D1E1":"Light Blue Gray","#6000BF":"Neon Violet","#8000FF":"Blue Violet","#A040FF":"Violet Purple","#C080FF":"Violet Dusk","#DFBFFF":"Pale Lavender","#302449":"Cool Shale","#54466F":"Dark Indigo","#655A7F":"Dark Violet","#40007F":"Violet","#726284":"Smoky Violet","#9E8FA9":"Slate Gray","#DCD1DF":"Violet White","#BF00BF":"Royal Violet","#FF00FF":"Fuchsia","#FF40FF":"Magenta","#FF80FF":"Orchid","#FFBFFF":"Pale Magenta","#4A234A":"Dark Purple","#794A72":"Medium Purple","#936386":"Cool Granite","#7F007F":"Purple","#9D7292":"Purple Moon","#C0A0B6":"Pale Purple","#ECDAE5":"Pink Cloud","#BF005F":"Hot Pink","#FF007F":"Deep Pink","#FF409F":"Grape","#FF80BF":"Electric Pink","#FFBFDF":"Pink","#451528":"Purple Red","#823857":"Purple Dino","#A94A76":"Purple Gray","#7F003F":"Rose","#BC6F95":"Antique Mauve","#D8A5BB":"Cool Marble","#F7DDE9":"Pink Granite","#C00000":"Apple","#FF0000":"Fire Truck","#FF4040":"Pale Red","#FF8080":"Salmon","#FFC0C0":"Warm Pink","#441415":"Sepia","#82393C":"Rust","#AA4D4E":"Brick","#800000":"Brick Red","#BC6E6E":"Mauve","#D8A3A4":"Shrimp Pink","#F8DDDD":"Shell Pink","#BF5F00":"Dark Orange","#FF7F00":"Orange","#FF9F40":"Grapefruit","#FFBF80":"Canteloupe","#FFDFBF":"Wax","#482C1B":"Dark Brick","#855A40":"Dirt","#B27C51":"Tan","#7F3F00":"Nutmeg","#C49B71":"Mustard","#E1C4A8":"Pale Tan","#FDEEE0":"Marble"},_colorPicker:null,STR_COLLAPSE:"Collapse Toolbar",STR_SPIN_LABEL:"Spin Button with value {VALUE}. Use Control Shift Up Arrow and Control Shift Down arrow keys to increase or decrease the value.",STR_SPIN_UP:"Click to increase the value of this input",STR_SPIN_DOWN:"Click to decrease the value of this input",_titlebar:null,browser:YAHOO.env.ua,_buttonList:null,_buttonGroupList:null,_sep:null,_sepCount:null,_dragHandle:null,_toolbarConfigs:{renderer:true},CLASS_CONTAINER:"yui-toolbar-container",CLASS_DRAGHANDLE:"yui-toolbar-draghandle",CLASS_SEPARATOR:"yui-toolbar-separator",CLASS_DISABLED:"yui-toolbar-disabled",CLASS_PREFIX:"yui-toolbar",init:function(f,e){YAHOO.widget.Toolbar.superclass.init.call(this,f,e)
},initAttributes:function(e){YAHOO.widget.Toolbar.superclass.initAttributes.call(this,e);
this.addClass(this.CLASS_CONTAINER);
this.setAttributeConfig("buttonType",{value:e.buttonType||"basic",writeOnce:true,validator:function(f){switch(f){case"advanced":case"basic":return true
}return false
},method:function(f){if(f=="advanced"){if(YAHOO.widget.Button){this.buttonType=YAHOO.widget.ToolbarButtonAdvanced
}else{YAHOO.log("Can not find YAHOO.widget.Button","error","Toolbar");
this.buttonType=YAHOO.widget.ToolbarButton
}}else{this.buttonType=YAHOO.widget.ToolbarButton
}}});
this.setAttributeConfig("buttons",{value:[],writeOnce:true,method:function(g){for(var f in g){if(d.hasOwnProperty(g,f)){if(g[f].type=="separator"){this.addSeparator()
}else{if(g[f].group!==undefined){this.addButtonGroup(g[f])
}else{this.addButton(g[f])
}}}}}});
this.setAttributeConfig("disabled",{value:false,method:function(f){if(this.get("disabled")===f){return false
}if(f){this.addClass(this.CLASS_DISABLED);
this.set("draggable",false);
this.disableAllButtons()
}else{this.removeClass(this.CLASS_DISABLED);
if(this._configs.draggable._initialConfig.value){this.set("draggable",true)
}this.resetAllButtons()
}}});
this.setAttributeConfig("cont",{value:e.cont,readOnly:true});
this.setAttributeConfig("grouplabels",{value:((e.grouplabels===false)?false:true),method:function(f){if(f){c.removeClass(this.get("cont"),(this.CLASS_PREFIX+"-nogrouplabels"))
}else{c.addClass(this.get("cont"),(this.CLASS_PREFIX+"-nogrouplabels"))
}}});
this.setAttributeConfig("titlebar",{value:false,method:function(g){if(g){if(this._titlebar&&this._titlebar.parentNode){this._titlebar.parentNode.removeChild(this._titlebar)
}this._titlebar=document.createElement("DIV");
this._titlebar.tabIndex="-1";
a.on(this._titlebar,"focus",function(){this._handleFocus()
},this,true);
c.addClass(this._titlebar,this.CLASS_PREFIX+"-titlebar");
if(d.isString(g)){var f=document.createElement("h2");
f.tabIndex="-1";
f.innerHTML='<a href="#" tabIndex="0">'+g+"</a>";
this._titlebar.appendChild(f);
a.on(f.firstChild,"click",function(h){a.stopEvent(h)
});
a.on([f,f.firstChild],"focus",function(){this._handleFocus()
},this,true)
}if(this.get("firstChild")){this.insertBefore(this._titlebar,this.get("firstChild"))
}else{this.appendChild(this._titlebar)
}if(this.get("collapse")){this.set("collapse",true)
}}else{if(this._titlebar){if(this._titlebar&&this._titlebar.parentNode){this._titlebar.parentNode.removeChild(this._titlebar)
}}}}});
this.setAttributeConfig("collapse",{value:false,method:function(h){if(this._titlebar){var g=null;
var f=c.getElementsByClassName("collapse","span",this._titlebar);
if(h){if(f.length>0){return true
}g=document.createElement("SPAN");
g.innerHTML="X";
g.title=this.STR_COLLAPSE;
c.addClass(g,"collapse");
this._titlebar.appendChild(g);
a.addListener(g,"click",function(){if(c.hasClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed")){this.collapse(false)
}else{this.collapse()
}},this,true)
}else{g=c.getElementsByClassName("collapse","span",this._titlebar);
if(g[0]){if(c.hasClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed")){this.collapse(false)
}g[0].parentNode.removeChild(g[0])
}}}}});
this.setAttributeConfig("draggable",{value:(e.draggable||false),method:function(f){if(f&&!this.get("titlebar")){YAHOO.log("Dragging enabled","info","Toolbar");
if(!this._dragHandle){this._dragHandle=document.createElement("SPAN");
this._dragHandle.innerHTML="|";
this._dragHandle.setAttribute("title","Click to drag the toolbar");
this._dragHandle.id=this.get("id")+"_draghandle";
c.addClass(this._dragHandle,this.CLASS_DRAGHANDLE);
if(this.get("cont").hasChildNodes()){this.get("cont").insertBefore(this._dragHandle,this.get("cont").firstChild)
}else{this.get("cont").appendChild(this._dragHandle)
}this.dd=new YAHOO.util.DD(this.get("id"));
this.dd.setHandleElId(this._dragHandle.id)
}}else{YAHOO.log("Dragging disabled","info","Toolbar");
if(this._dragHandle){this._dragHandle.parentNode.removeChild(this._dragHandle);
this._dragHandle=null;
this.dd=null
}}if(this._titlebar){if(f){this.dd=new YAHOO.util.DD(this.get("id"));
this.dd.setHandleElId(this._titlebar);
c.addClass(this._titlebar,"draggable")
}else{c.removeClass(this._titlebar,"draggable");
if(this.dd){this.dd.unreg();
this.dd=null
}}}},validator:function(g){var f=true;
if(!YAHOO.util.DD){f=false
}return f
}})
},addButtonGroup:function(j){if(!this.get("element")){this._queue[this._queue.length]=["addButtonGroup",arguments];
return false
}if(!this.hasClass(this.CLASS_PREFIX+"-grouped")){this.addClass(this.CLASS_PREFIX+"-grouped")
}var k=document.createElement("DIV");
c.addClass(k,this.CLASS_PREFIX+"-group");
c.addClass(k,this.CLASS_PREFIX+"-group-"+j.group);
if(j.label){var f=document.createElement("h3");
f.innerHTML=j.label;
k.appendChild(f)
}if(!this.get("grouplabels")){c.addClass(this.get("cont"),this.CLASS_PREFIX,"-nogrouplabels")
}this.get("cont").appendChild(k);
var h=document.createElement("ul");
k.appendChild(h);
if(!this._buttonGroupList){this._buttonGroupList={}
}this._buttonGroupList[j.group]=h;
for(var g=0;
g<j.buttons.length;
g++){var e=document.createElement("li");
e.className=this.CLASS_PREFIX+"-groupitem";
h.appendChild(e);
if((j.buttons[g].type!==undefined)&&j.buttons[g].type=="separator"){this.addSeparator(e)
}else{j.buttons[g].container=e;
this.addButton(j.buttons[g])
}}},addButtonToGroup:function(g,h,i){var f=this._buttonGroupList[h];
var e=document.createElement("li");
e.className=this.CLASS_PREFIX+"-groupitem";
g.container=e;
this.addButton(g,i);
f.appendChild(e)
},addButton:function(k,j){if(!this.get("element")){this._queue[this._queue.length]=["addButton",arguments];
return false
}if(!this._buttonList){this._buttonList=[]
}YAHOO.log("Adding button of type: "+k.type,"info","Toolbar");
if(!k.container){k.container=this.get("cont")
}if((k.type=="menu")||(k.type=="split")||(k.type=="select")){if(d.isArray(k.menu)){for(var s in k.menu){if(d.hasOwnProperty(k.menu,s)){var y={fn:function(o,i,m){if(!k.menucmd){k.menucmd=k.value
}k.value=((m.value)?m.value:m._oText.nodeValue)
},scope:this};
k.menu[s].onclick=y
}}}}var t={},q=false;
for(var n in k){if(d.hasOwnProperty(k,n)){if(!this._toolbarConfigs[n]){t[n]=k[n]
}}}if(k.type=="select"){t.type="menu"
}if(k.type=="spin"){t.type="push"
}if(t.type=="color"){if(YAHOO.widget.Overlay){t=this._makeColorButton(t)
}else{q=true
}}if(t.menu){if((YAHOO.widget.Overlay)&&(k.menu instanceof YAHOO.widget.Overlay)){k.menu.showEvent.subscribe(function(){this._button=t
})
}else{for(var r=0;
r<t.menu.length;
r++){if(!t.menu[r].value){t.menu[r].value=t.menu[r].text
}}if(this.browser.webkit){t.focusmenu=false
}}}if(q){k=false
}else{this._configs.buttons.value[this._configs.buttons.value.length]=k;
var w=new this.buttonType(t);
w.get("element").tabIndex="-1";
w.get("element").setAttribute("role","button");
w._selected=true;
if(this.get("disabled")){w.set("disabled",true)
}if(!k.id){k.id=w.get("id")
}YAHOO.log("Button created ("+k.type+")","info","Toolbar");
if(j){var f=w.get("element");
var p=null;
if(j.get){p=j.get("element").nextSibling
}else{if(j.nextSibling){p=j.nextSibling
}}if(p){p.parentNode.insertBefore(f,p)
}}w.addClass(this.CLASS_PREFIX+"-"+w.get("value"));
var v=document.createElement("span");
v.className=this.CLASS_PREFIX+"-icon";
w.get("element").insertBefore(v,w.get("firstChild"));
if(w._button.tagName.toLowerCase()=="button"){w.get("element").setAttribute("unselectable","on");
var x=document.createElement("a");
x.innerHTML=w._button.innerHTML;
x.href="#";
x.tabIndex="-1";
a.on(x,"click",function(i){a.stopEvent(i)
});
w._button.parentNode.replaceChild(x,w._button);
w._button=x
}if(k.type=="select"){if(w._button.tagName.toLowerCase()=="select"){v.parentNode.removeChild(v);
var g=w._button;
var u=w.get("element");
u.parentNode.replaceChild(g,u)
}else{w.addClass(this.CLASS_PREFIX+"-select")
}}if(k.type=="spin"){if(!d.isArray(k.range)){k.range=[10,100]
}this._makeSpinButton(w,k)
}w.get("element").setAttribute("title",w.get("label"));
if(k.type!="spin"){if((YAHOO.widget.Overlay)&&(t.menu instanceof YAHOO.widget.Overlay)){var h=function(o){var i=true;
if(o.keyCode&&(o.keyCode==9)){i=false
}if(i){if(this._colorPicker){this._colorPicker._button=k.value
}var m=w.getMenu().element;
if(c.getStyle(m,"visibility")=="hidden"){w.getMenu().show()
}else{w.getMenu().hide()
}}YAHOO.util.Event.stopEvent(o)
};
w.on("mousedown",h,k,this);
w.on("keydown",h,k,this)
}else{if((k.type!="menu")&&(k.type!="select")){w.on("keypress",this._buttonClick,k,this);
w.on("mousedown",function(i){YAHOO.util.Event.stopEvent(i);
this._buttonClick(i,k)
},k,this);
w.on("click",function(i){YAHOO.util.Event.stopEvent(i)
})
}else{w.on("mousedown",function(i){YAHOO.util.Event.stopEvent(i)
});
w.on("click",function(i){YAHOO.util.Event.stopEvent(i)
});
w.on("change",function(i){if(!k.menucmd){k.menucmd=k.value
}k.value=i.value;
this._buttonClick(i,k)
},this,true);
var l=this;
w.on("appendTo",function(){var i=this;
if(i.getMenu()&&i.getMenu().mouseDownEvent){i.getMenu().mouseDownEvent.subscribe(function(z,o){YAHOO.log("mouseDownEvent","warn","Toolbar");
var m=o[1];
YAHOO.util.Event.stopEvent(o[0]);
i._onMenuClick(o[0],i);
if(!k.menucmd){k.menucmd=k.value
}k.value=((m.value)?m.value:m._oText.nodeValue);
l._buttonClick.call(l,o[1],k);
i._hideMenu();
return false
});
i.getMenu().clickEvent.subscribe(function(o,m){YAHOO.log("clickEvent","warn","Toolbar");
YAHOO.util.Event.stopEvent(m[0])
});
i.getMenu().mouseUpEvent.subscribe(function(o,m){YAHOO.log("mouseUpEvent","warn","Toolbar");
YAHOO.util.Event.stopEvent(m[0])
})
}})
}}}else{w.on("mousedown",function(i){YAHOO.util.Event.stopEvent(i)
});
w.on("click",function(i){YAHOO.util.Event.stopEvent(i)
})
}if(this.browser.ie){}if(this.browser.webkit){w.hasFocus=function(){return true
}
}this._buttonList[this._buttonList.length]=w;
if((k.type=="menu")||(k.type=="split")||(k.type=="select")){if(d.isArray(k.menu)){YAHOO.log("Button type is ("+k.type+"), doing extra renderer work.","info","Toolbar");
var e=w.getMenu();
if(e&&e.renderEvent){e.renderEvent.subscribe(this._addMenuClasses,w);
if(k.renderer){e.renderEvent.subscribe(k.renderer,w)
}}}}}return k
},addSeparator:function(e,h){if(!this.get("element")){this._queue[this._queue.length]=["addSeparator",arguments];
return false
}var f=((e)?e:this.get("cont"));
if(!this.get("element")){this._queue[this._queue.length]=["addSeparator",arguments];
return false
}if(this._sepCount===null){this._sepCount=0
}if(!this._sep){YAHOO.log("Separator does not yet exist, creating","info","Toolbar");
this._sep=document.createElement("SPAN");
c.addClass(this._sep,this.CLASS_SEPARATOR);
this._sep.innerHTML="|"
}YAHOO.log("Separator does exist, cloning","info","Toolbar");
var g=this._sep.cloneNode(true);
this._sepCount++;
c.addClass(g,this.CLASS_SEPARATOR+"-"+this._sepCount);
if(h){var i=null;
if(h.get){i=h.get("element").nextSibling
}else{if(h.nextSibling){i=h.nextSibling
}else{i=h
}}if(i){if(i==h){i.parentNode.appendChild(g)
}else{i.parentNode.insertBefore(g,i)
}}}else{f.appendChild(g)
}return g
},_createColorPicker:function(h){if(c.get(h+"_colors")){c.get(h+"_colors").parentNode.removeChild(c.get(h+"_colors"))
}var e=document.createElement("div");
e.className="yui-toolbar-colors";
e.id=h+"_colors";
e.style.display="none";
a.on(window,"load",function(){document.body.appendChild(e)
},this,true);
this._colorPicker=e;
var g="";
for(var f in this._colorData){if(d.hasOwnProperty(this._colorData,f)){g+='<a style="background-color: '+f+'" href="#">'+f.replace("#","")+"</a>"
}}g+="<span><em>X</em><strong></strong></span>";
window.setTimeout(function(){e.innerHTML=g
},0);
a.on(e,"mouseover",function(m){var k=this._colorPicker;
var l=k.getElementsByTagName("em")[0];
var j=k.getElementsByTagName("strong")[0];
var i=a.getTarget(m);
if(i.tagName.toLowerCase()=="a"){l.style.backgroundColor=i.style.backgroundColor;
j.innerHTML=this._colorData["#"+i.innerHTML]+"<br>"+i.innerHTML
}},this,true);
a.on(e,"focus",function(i){a.stopEvent(i)
});
a.on(e,"click",function(i){a.stopEvent(i)
});
a.on(e,"mousedown",function(j){a.stopEvent(j);
var i=a.getTarget(j);
if(i.tagName.toLowerCase()=="a"){var l=this.fireEvent("colorPickerClicked",{type:"colorPickerClicked",target:this,button:this._colorPicker._button,color:i.innerHTML,colorName:this._colorData["#"+i.innerHTML]});
if(l!==false){var k={color:i.innerHTML,colorName:this._colorData["#"+i.innerHTML],value:this._colorPicker._button};
this.fireEvent("buttonClick",{type:"buttonClick",target:this.get("element"),button:k})
}this.getButtonByValue(this._colorPicker._button).getMenu().hide()
}},this,true)
},_resetColorPicker:function(){var f=this._colorPicker.getElementsByTagName("em")[0];
var e=this._colorPicker.getElementsByTagName("strong")[0];
f.style.backgroundColor="transparent";
e.innerHTML=""
},_makeColorButton:function(e){if(!this._colorPicker){this._createColorPicker(this.get("id"))
}e.type="color";
e.menu=new YAHOO.widget.Overlay(this.get("id")+"_"+e.value+"_menu",{visible:false,position:"absolute",iframe:true});
e.menu.setBody("");
e.menu.render(this.get("cont"));
c.addClass(e.menu.element,"yui-button-menu");
c.addClass(e.menu.element,"yui-color-button-menu");
e.menu.beforeShowEvent.subscribe(function(){e.menu.cfg.setProperty("zindex",5);
e.menu.cfg.setProperty("context",[this.getButtonById(e.id).get("element"),"tl","bl"]);
this._resetColorPicker();
var f=this._colorPicker;
if(f.parentNode){f.parentNode.removeChild(f)
}e.menu.setBody("");
e.menu.appendToBody(f);
this._colorPicker.style.display="block"
},this,true);
return e
},_makeSpinButton:function(r,l){r.addClass(this.CLASS_PREFIX+"-spinbutton");
var s=this,n=r._button.parentNode.parentNode,i=l.range,h=document.createElement("a"),g=document.createElement("a");
h.href="#";
g.href="#";
h.tabIndex="-1";
g.tabIndex="-1";
h.className="up";
h.title=this.STR_SPIN_UP;
h.innerHTML=this.STR_SPIN_UP;
g.className="down";
g.title=this.STR_SPIN_DOWN;
g.innerHTML=this.STR_SPIN_DOWN;
n.appendChild(h);
n.appendChild(g);
var m=YAHOO.lang.substitute(this.STR_SPIN_LABEL,{VALUE:r.get("label")});
r.set("title",m);
var q=function(t){t=((t<i[0])?i[0]:t);
t=((t>i[1])?i[1]:t);
return t
};
var p=this.browser;
var f=false;
var k=this.STR_SPIN_LABEL;
if(this._titlebar&&this._titlebar.firstChild){f=this._titlebar.firstChild
}var e=function(u){YAHOO.util.Event.stopEvent(u);
if(!r.get("disabled")&&(u.keyCode!=9)){var v=parseInt(r.get("label"),10);
v++;
v=q(v);
r.set("label",""+v);
var t=YAHOO.lang.substitute(k,{VALUE:r.get("label")});
r.set("title",t);
if(!p.webkit&&f){}s._buttonClick(u,l)
}};
var o=function(u){YAHOO.util.Event.stopEvent(u);
if(!r.get("disabled")&&(u.keyCode!=9)){var v=parseInt(r.get("label"),10);
v--;
v=q(v);
r.set("label",""+v);
var t=YAHOO.lang.substitute(k,{VALUE:r.get("label")});
r.set("title",t);
if(!p.webkit&&f){}s._buttonClick(u,l)
}};
var j=function(t){if(t.keyCode==38){e(t)
}else{if(t.keyCode==40){o(t)
}else{if(t.keyCode==107&&t.shiftKey){e(t)
}else{if(t.keyCode==109&&t.shiftKey){o(t)
}}}}};
r.on("keydown",j,this,true);
a.on(h,"mousedown",function(t){a.stopEvent(t)
},this,true);
a.on(g,"mousedown",function(t){a.stopEvent(t)
},this,true);
a.on(h,"click",e,this,true);
a.on(g,"click",o,this,true)
},_buttonClick:function(n,f){var e=true;
if(n&&n.type=="keypress"){if(n.keyCode==9){e=false
}else{if((n.keyCode===13)||(n.keyCode===0)||(n.keyCode===32)){}else{e=false
}}}if(e){var p=true,h=false;
f.isSelected=this.isSelected(f.id);
if(f.value){YAHOO.log("fireEvent::"+f.value+"Click","info","Toolbar");
h=this.fireEvent(f.value+"Click",{type:f.value+"Click",target:this.get("element"),button:f});
if(h===false){p=false
}}if(f.menucmd&&p){YAHOO.log("fireEvent::"+f.menucmd+"Click","info","Toolbar");
h=this.fireEvent(f.menucmd+"Click",{type:f.menucmd+"Click",target:this.get("element"),button:f});
if(h===false){p=false
}}if(p){YAHOO.log("fireEvent::buttonClick","info","Toolbar");
this.fireEvent("buttonClick",{type:"buttonClick",target:this.get("element"),button:f})
}if(f.type=="select"){var l=this.getButtonById(f.id);
if(l.buttonType=="rich"){var k=f.value;
for(var j=0;
j<f.menu.length;
j++){if(f.menu[j].value==f.value){k=f.menu[j].text;
break
}}l.set("label",'<span class="yui-toolbar-'+f.menucmd+"-"+(f.value).replace(/ /g,"-").toLowerCase()+'">'+k+"</span>");
var o=l.getMenu().getItems();
for(var g=0;
g<o.length;
g++){if(o[g].value.toLowerCase()==f.value.toLowerCase()){o[g].cfg.setProperty("checked",true)
}else{o[g].cfg.setProperty("checked",false)
}}}}if(n){a.stopEvent(n)
}}},_keyNav:null,_navCounter:null,_navigateButtons:function(f){switch(f.keyCode){case 37:case 39:if(f.keyCode==37){this._navCounter--
}else{this._navCounter++
}if(this._navCounter>(this._buttonList.length-1)){this._navCounter=0
}if(this._navCounter<0){this._navCounter=(this._buttonList.length-1)
}if(this._buttonList[this._navCounter]){var e=this._buttonList[this._navCounter].get("element");
if(this.browser.ie){e=this._buttonList[this._navCounter].get("element").getElementsByTagName("a")[0]
}if(this._buttonList[this._navCounter].get("disabled")){this._navigateButtons(f)
}else{e.focus()
}}break
}},_handleFocus:function(){if(!this._keyNav){var e="keypress";
if(this.browser.ie){e="keydown"
}a.on(this.get("element"),e,this._navigateButtons,this,true);
this._keyNav=true;
this._navCounter=-1
}},getButtonById:function(g){var e=this._buttonList.length;
for(var f=0;
f<e;
f++){if(this._buttonList[f]&&this._buttonList[f].get("id")==g){return this._buttonList[f]
}}return false
},getButtonByValue:function(n){var h=this.get("buttons");
var f=h.length;
for(var k=0;
k<f;
k++){if(h[k].group!==undefined){for(var e=0;
e<h[k].buttons.length;
e++){if((h[k].buttons[e].value==n)||(h[k].buttons[e].menucmd==n)){return this.getButtonById(h[k].buttons[e].id)
}if(h[k].buttons[e].menu){for(var l=0;
l<h[k].buttons[e].menu.length;
l++){if(h[k].buttons[e].menu[l].value==n){return this.getButtonById(h[k].buttons[e].id)
}}}}}else{if((h[k].value==n)||(h[k].menucmd==n)){return this.getButtonById(h[k].id)
}if(h[k].menu){for(var g=0;
g<h[k].menu.length;
g++){if(h[k].menu[g].value==n){return this.getButtonById(h[k].id)
}}}}}return false
},getButtonByIndex:function(e){if(this._buttonList[e]){return this._buttonList[e]
}else{return false
}},getButtons:function(){return this._buttonList
},disableButton:function(f){var e=b.call(this,f);
if(e){e.set("disabled",true)
}else{return false
}},enableButton:function(f){if(this.get("disabled")){return false
}var e=b.call(this,f);
if(e){if(e.get("disabled")){e.set("disabled",false)
}}else{return false
}},isSelected:function(f){var e=b.call(this,f);
if(e){return e._selected
}return false
},selectButton:function(i,g){var f=b.call(this,i);
if(f){f.addClass("yui-button-selected");
f.addClass("yui-button-"+f.get("value")+"-selected");
f._selected=true;
if(g){if(f.buttonType=="rich"){var h=f.getMenu().getItems();
for(var e=0;
e<h.length;
e++){if(h[e].value==g){h[e].cfg.setProperty("checked",true);
f.set("label",'<span class="yui-toolbar-'+f.get("value")+"-"+(g).replace(/ /g,"-").toLowerCase()+'">'+h[e]._oText.nodeValue+"</span>")
}else{h[e].cfg.setProperty("checked",false)
}}}}}else{return false
}},deselectButton:function(f){var e=b.call(this,f);
if(e){e.removeClass("yui-button-selected");
e.removeClass("yui-button-"+e.get("value")+"-selected");
e.removeClass("yui-button-hover");
e._selected=false
}else{return false
}},deselectAllButtons:function(){var e=this._buttonList.length;
for(var f=0;
f<e;
f++){this.deselectButton(this._buttonList[f])
}},disableAllButtons:function(){if(this.get("disabled")){return false
}var e=this._buttonList.length;
for(var f=0;
f<e;
f++){this.disableButton(this._buttonList[f])
}},enableAllButtons:function(){if(this.get("disabled")){return false
}var e=this._buttonList.length;
for(var f=0;
f<e;
f++){this.enableButton(this._buttonList[f])
}},resetAllButtons:function(j){if(!d.isObject(j)){j={}
}if(this.get("disabled")){return false
}var e=this._buttonList.length;
for(var f=0;
f<e;
f++){var h=this._buttonList[f];
if(h){var g=h._configs.disabled._initialConfig.value;
if(j[h.get("id")]){this.enableButton(h);
this.selectButton(h)
}else{if(g){this.disableButton(h)
}else{this.enableButton(h)
}this.deselectButton(h)
}}}},destroyButton:function(j){var g=b.call(this,j);
if(g){var h=g.get("id");
g.destroy();
var e=this._buttonList.length;
for(var f=0;
f<e;
f++){if(this._buttonList[f]&&this._buttonList[f].get("id")==h){this._buttonList[f]=null
}}}else{return false
}},destroy:function(){this.get("element").innerHTML="";
this.get("element").className="";
for(var e in this){if(d.hasOwnProperty(this,e)){this[e]=null
}}return true
},collapse:function(f){var e=c.getElementsByClassName("collapse","span",this._titlebar);
if(f===false){c.removeClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed");
if(e[0]){c.removeClass(e[0],"collapsed")
}this.fireEvent("toolbarExpanded",{type:"toolbarExpanded",target:this})
}else{if(e[0]){c.addClass(e[0],"collapsed")
}c.addClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed");
this.fireEvent("toolbarCollapsed",{type:"toolbarCollapsed",target:this})
}},toString:function(){return"Toolbar (#"+this.get("element").id+") with "+this._buttonList.length+" buttons."
}})
})();
(function(){var c=YAHOO.util.Dom,a=YAHOO.util.Event,d=YAHOO.lang,b=YAHOO.widget.Toolbar;
YAHOO.widget.SimpleEditor=function(h,m){YAHOO.log("SimpleEditor Initalizing","info","SimpleEditor");
var g={};
if(d.isObject(h)&&(!h.tagName)&&!m){d.augmentObject(g,h);
h=document.createElement("textarea");
this.DOMReady=true;
if(g.container){var k=c.get(g.container);
k.appendChild(h)
}else{document.body.appendChild(h)
}}else{if(m){d.augmentObject(g,m)
}}var i={element:null,attributes:g},f=null;
if(d.isString(h)){f=h
}else{if(i.attributes.id){f=i.attributes.id
}else{this.DOMReady=true;
f=c.generateId(h)
}}i.element=h;
var j=document.createElement("DIV");
i.attributes.element_cont=new YAHOO.util.Element(j,{id:f+"_container"});
var e=document.createElement("div");
c.addClass(e,"first-child");
i.attributes.element_cont.appendChild(e);
if(!i.attributes.toolbar_cont){i.attributes.toolbar_cont=document.createElement("DIV");
i.attributes.toolbar_cont.id=f+"_toolbar";
e.appendChild(i.attributes.toolbar_cont)
}var l=document.createElement("DIV");
e.appendChild(l);
i.attributes.editor_wrapper=l;
YAHOO.widget.SimpleEditor.superclass.constructor.call(this,i.element,i.attributes)
};
YAHOO.extend(YAHOO.widget.SimpleEditor,YAHOO.util.Element,{_resizeConfig:{handles:["br"],autoRatio:true,status:true,proxy:true,useShim:true,setSize:false},_setupResize:function(){if(!YAHOO.util.DD||!YAHOO.util.Resize){return false
}if(this.get("resize")){var e={};
d.augmentObject(e,this._resizeConfig);
this.resize=new YAHOO.util.Resize(this.get("element_cont").get("element"),e);
this.resize.on("resize",function(g){var l=this.get("animate");
this.set("animate",false);
this.set("width",g.width+"px");
var i=g.height,j=(this.toolbar.get("element").clientHeight+2),k=0;
if(this.dompath){k=(this.dompath.clientHeight+1)
}var f=(i-j-k);
this.set("height",f+"px");
this.get("element_cont").setStyle("height","");
this.set("animate",l)
},this,true)
}},resize:null,_setupDD:function(){if(!YAHOO.util.DD){return false
}if(this.get("drag")){YAHOO.log("Attaching DD instance to Editor","info","SimpleEditor");
var f=this.get("drag"),e=YAHOO.util.DD;
if(f==="proxy"){e=YAHOO.util.DDProxy
}this.dd=new e(this.get("element_cont").get("element"));
this.toolbar.addClass("draggable");
this.dd.setHandleElId(this.toolbar._titlebar)
}},dd:null,_lastCommand:null,_undoNodeChange:function(){},_storeUndo:function(){},_checkKey:function(f,j){var g=false;
if((j.keyCode===f.key)){if(f.mods&&(f.mods.length>0)){var l=0;
for(var h=0;
h<f.mods.length;
h++){if(this.browser.mac){if(f.mods[h]=="ctrl"){f.mods[h]="meta"
}}if(j[f.mods[h]+"Key"]===true){l++
}}if(l===f.mods.length){g=true
}}else{g=true
}}return g
},_keyMap:{SELECT_ALL:{key:65,mods:["ctrl"]},CLOSE_WINDOW:{key:87,mods:["shift","ctrl"]},FOCUS_TOOLBAR:{key:27,mods:["shift"]},FOCUS_AFTER:{key:27},CREATE_LINK:{key:76,mods:["shift","ctrl"]},BOLD:{key:66,mods:["shift","ctrl"]},ITALIC:{key:73,mods:["shift","ctrl"]},UNDERLINE:{key:85,mods:["shift","ctrl"]},UNDO:{key:90,mods:["ctrl"]},REDO:{key:90,mods:["shift","ctrl"]},JUSTIFY_LEFT:{key:219,mods:["shift","ctrl"]},JUSTIFY_CENTER:{key:220,mods:["shift","ctrl"]},JUSTIFY_RIGHT:{key:221,mods:["shift","ctrl"]}},_cleanClassName:function(e){return e.replace(/ /g,"-").toLowerCase()
},_textarea:null,_docType:'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',editorDirty:null,_defaultCSS:"html { height: 95%; } body { padding: 7px; background-color: #fff; font:13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } .warning-localfile { border-bottom: 1px dashed red !important; } .yui-busy { cursor: wait !important; } img.selected { border: 2px dotted #808080; } img { cursor: pointer !important; border: none; } body.ptags.webkit div { margin: 11px 0; }",_defaultToolbar:null,_lastButton:null,_baseHREF:function(){var e=document.location.href;
if(e.indexOf("?")!==-1){e=e.substring(0,e.indexOf("?"))
}e=e.substring(0,e.lastIndexOf("/"))+"/";
return e
}(),_lastImage:null,_blankImageLoaded:null,_fixNodesTimer:null,_nodeChangeTimer:null,_lastNodeChangeEvent:null,_lastNodeChange:0,_rendered:null,DOMReady:null,_selection:null,_mask:null,_showingHiddenElements:null,currentWindow:null,currentEvent:null,operaEvent:null,currentFont:null,currentElement:null,dompath:null,beforeElement:null,afterElement:null,invalidHTML:{form:true,input:true,button:true,select:true,link:true,html:true,body:true,iframe:true,script:true,style:true,textarea:true},toolbar:null,_contentTimer:null,_contentTimerCounter:0,_disabled:["createlink","fontname","fontsize","forecolor","backcolor"],_alwaysDisabled:{undo:true,redo:true},_alwaysEnabled:{},_semantic:{bold:true,italic:true,underline:true},_tag2cmd:{b:"bold",strong:"bold",i:"italic",em:"italic",u:"underline",sup:"superscript",sub:"subscript",img:"insertimage",a:"createlink",ul:"insertunorderedlist",ol:"insertorderedlist"},_createIframe:function(){var j=document.createElement("iframe");
j.id=this.get("id")+"_editor";
var g={border:"0",frameBorder:"0",marginWidth:"0",marginHeight:"0",leftMargin:"0",topMargin:"0",allowTransparency:"true",width:"100%"};
if(this.get("autoHeight")){g.scrolling="no"
}for(var h in g){if(d.hasOwnProperty(g,h)){j.setAttribute(h,g[h])
}}var f="javascript:;";
if(this.browser.ie){f="javascript:false;"
}j.setAttribute("src",f);
var e=new YAHOO.util.Element(j);
e.setStyle("visibility","hidden");
return e
},_isElement:function(f,e){if(f&&f.tagName&&(f.tagName.toLowerCase()==e)){return true
}if(f&&f.getAttribute&&(f.getAttribute("tag")==e)){return true
}return false
},_hasParent:function(f,e){if(!f||!f.parentNode){return false
}while(f.parentNode){if(this._isElement(f,e)){return f
}if(f.parentNode){f=f.parentNode
}else{return false
}}return false
},_getDoc:function(){var f=false;
if(this.get){if(this.get("iframe")){if(this.get("iframe").get){if(this.get("iframe").get("element")){try{if(this.get("iframe").get("element").contentWindow){if(this.get("iframe").get("element").contentWindow.document){f=this.get("iframe").get("element").contentWindow.document;
return f
}}}catch(g){}}}}}return false
},_getWindow:function(){return this.get("iframe").get("element").contentWindow
},_focusWindow:function(e){if(this.browser.webkit){if(e){this._getSelection().setBaseAndExtent(this._getDoc().body.firstChild,0,this._getDoc().body.firstChild,1);
if(this.browser.webkit3){this._getSelection().collapseToStart()
}else{this._getSelection().collapse(false)
}}else{this._getSelection().setBaseAndExtent(this._getDoc().body,1,this._getDoc().body,1);
if(this.browser.webkit3){this._getSelection().collapseToStart()
}else{this._getSelection().collapse(false)
}}this._getWindow().focus()
}else{this._getWindow().focus()
}},_hasSelection:function(){var g=this._getSelection();
var e=this._getRange();
var f=false;
if(!g||!e){return f
}if(this.browser.ie||this.browser.opera){if(e.text){f=true
}if(e.html){f=true
}}else{if(this.browser.webkit){if(g+""!==""){f=true
}}else{if(g&&(g.toString()!=="")&&(g!==undefined)){f=true
}}}return f
},_getSelection:function(){var e=null;
if(this._getDoc()&&this._getWindow()){if(this._getDoc().selection){e=this._getDoc().selection
}else{e=this._getWindow().getSelection()
}if(this.browser.webkit){if(e.baseNode){this._selection={};
this._selection.baseNode=e.baseNode;
this._selection.baseOffset=e.baseOffset;
this._selection.extentNode=e.extentNode;
this._selection.extentOffset=e.extentOffset
}else{if(this._selection!==null){e=this._getWindow().getSelection();
e.setBaseAndExtent(this._selection.baseNode,this._selection.baseOffset,this._selection.extentNode,this._selection.extentOffset);
this._selection=null
}}}}return e
},_selectNode:function(g,j){if(!g){return false
}var h=this._getSelection(),f=null;
if(this.browser.ie){try{f=this._getDoc().body.createTextRange();
f.moveToElementText(g);
f.select()
}catch(i){YAHOO.log("IE failed to select element: "+g.tagName,"warn","SimpleEditor")
}}else{if(this.browser.webkit){if(j){h.setBaseAndExtent(g,1,g,g.innerText.length)
}else{h.setBaseAndExtent(g,0,g,g.innerText.length)
}}else{if(this.browser.opera){h=this._getWindow().getSelection();
f=this._getDoc().createRange();
f.selectNode(g);
h.removeAllRanges();
h.addRange(f)
}else{f=this._getDoc().createRange();
f.selectNodeContents(g);
h.removeAllRanges();
h.addRange(f)
}}}this.nodeChange()
},_getRange:function(){var f=this._getSelection();
if(f===null){return null
}if(this.browser.webkit&&!f.getRangeAt){var i=this._getDoc().createRange();
try{i.setStart(f.anchorNode,f.anchorOffset);
i.setEnd(f.focusNode,f.focusOffset)
}catch(h){i=this._getWindow().getSelection()+""
}return i
}if(this.browser.ie||this.browser.opera){try{return f.createRange()
}catch(g){return null
}}if(f.rangeCount>0){return f.getRangeAt(0)
}return null
},_setDesignMode:function(f){try{var h=true;
if(this.browser.ie&&(f.toLowerCase()=="off")){h=false
}if(h){this._getDoc().designMode=f
}}catch(g){}},_toggleDesignMode:function(){var f=this._getDoc().designMode.toLowerCase(),e="on";
if(f=="on"){e="off"
}this._setDesignMode(e);
return e
},_initEditorEvents:function(){var e=this._getDoc();
a.on(e,"mouseup",this._handleMouseUp,this,true);
a.on(e,"mousedown",this._handleMouseDown,this,true);
a.on(e,"click",this._handleClick,this,true);
a.on(e,"dblclick",this._handleDoubleClick,this,true);
a.on(e,"keypress",this._handleKeyPress,this,true);
a.on(e,"keyup",this._handleKeyUp,this,true);
a.on(e,"keydown",this._handleKeyDown,this,true)
},_removeEditorEvents:function(){var e=this._getDoc();
a.removeListener(e,"mouseup",this._handleMouseUp,this,true);
a.removeListener(e,"mousedown",this._handleMouseDown,this,true);
a.removeListener(e,"click",this._handleClick,this,true);
a.removeListener(e,"dblclick",this._handleDoubleClick,this,true);
a.removeListener(e,"keypress",this._handleKeyPress,this,true);
a.removeListener(e,"keyup",this._handleKeyUp,this,true);
a.removeListener(e,"keydown",this._handleKeyDown,this,true)
},_initEditor:function(){if(this.browser.ie){this._getDoc().body.style.margin="0"
}if(!this.get("disabled")){if(this._getDoc().designMode.toLowerCase()!="on"){this._setDesignMode("on");
this._contentTimerCounter=0
}}if(!this._getDoc().body){YAHOO.log("Body is null, check again","error","SimpleEditor");
this._contentTimerCounter=0;
this._checkLoaded();
return false
}YAHOO.log("editorLoaded","info","SimpleEditor");
this.toolbar.on("buttonClick",this._handleToolbarClick,this,true);
if(!this.get("disabled")){this._initEditorEvents();
this.toolbar.set("disabled",false)
}this.fireEvent("editorContentLoaded",{type:"editorLoaded",target:this});
if(this.get("dompath")){YAHOO.log("Delayed DomPath write","info","SimpleEditor");
var e=this;
setTimeout(function(){e._writeDomPath.call(e);
e._setupResize.call(e)
},150)
}var g=[];
for(var f in this.browser){if(this.browser[f]){g.push(f)
}}if(this.get("ptags")){g.push("ptags")
}c.addClass(this._getDoc().body,g.join(" "));
this.nodeChange(true)
},_checkLoaded:function(){this._contentTimerCounter++;
if(this._contentTimer){clearTimeout(this._contentTimer)
}if(this._contentTimerCounter>500){YAHOO.log("ERROR: Body Did Not load","error","SimpleEditor");
return false
}var h=false;
try{if(this._getDoc()&&this._getDoc().body){if(this.browser.ie){if(this._getDoc().body.readyState=="complete"){h=true
}}else{if(this._getDoc().body._rteLoaded===true){h=true
}}}}catch(g){h=false;
YAHOO.log("checking body (e)"+g,"error","SimpleEditor")
}if(h===true){YAHOO.log("Firing _initEditor","info","SimpleEditor");
this._initEditor()
}else{var f=this;
this._contentTimer=setTimeout(function(){f._checkLoaded.call(f)
},20)
}},_setInitialContent:function(){YAHOO.log("Populating editor body with contents of the text area","info","SimpleEditor");
var i=((this._textarea)?this.get("element").value:this.get("element").innerHTML),k=null;
var g=d.substitute(this.get("html"),{TITLE:this.STR_TITLE,CONTENT:this._cleanIncomingHTML(i),CSS:this.get("css"),HIDDEN_CSS:((this.get("hiddencss"))?this.get("hiddencss"):"/* No Hidden CSS */"),EXTRA_CSS:((this.get("extracss"))?this.get("extracss"):"/* No Extra CSS */")}),f=true;
if(document.compatMode!="BackCompat"){YAHOO.log("Adding Doctype to editable area","info","SimpleEditor");
g=this._docType+"\n"+g
}else{YAHOO.log("DocType skipped because we are in BackCompat Mode.","warn","SimpleEditor")
}if(this.browser.ie||this.browser.webkit||this.browser.opera||(navigator.userAgent.indexOf("Firefox/1.5")!=-1)){try{if(this.browser.air){k=this._getDoc().implementation.createHTMLDocument();
var l=this._getDoc();
l.open();
l.close();
k.open();
k.write(g);
k.close();
var h=l.importNode(k.getElementsByTagName("html")[0],true);
l.replaceChild(h,l.getElementsByTagName("html")[0]);
l.body._rteLoaded=true
}else{k=this._getDoc();
k.open();
k.write(g);
k.close()
}}catch(j){YAHOO.log("Setting doc failed.. (_setInitialContent)","error","SimpleEditor");
f=false
}}else{this.get("iframe").get("element").src="data:text/html;charset=utf-8,"+encodeURIComponent(g)
}this.get("iframe").setStyle("visibility","");
if(f){this._checkLoaded()
}},_setMarkupType:function(e){switch(this.get("markup")){case"css":this._setEditorStyle(true);
break;
case"default":this._setEditorStyle(false);
break;
case"semantic":case"xhtml":if(this._semantic[e]){this._setEditorStyle(false)
}else{this._setEditorStyle(true)
}break
}},_setEditorStyle:function(f){try{this._getDoc().execCommand("useCSS",false,!f)
}catch(e){}},_getSelectedElement:function(){var j=this._getDoc(),g=null,h=null,k=null,f=true;
if(this.browser.ie){this.currentEvent=this._getWindow().event;
g=this._getRange();
if(g){k=g.item?g.item(0):g.parentElement();
if(this._hasSelection()){}if(k===j.body){k=null
}}if((this.currentEvent!==null)&&(this.currentEvent.keyCode===0)){k=a.getTarget(this.currentEvent)
}}else{h=this._getSelection();
g=this._getRange();
if(!h||!g){return null
}if(!this._hasSelection()&&this.browser.webkit3){}if(this.browser.gecko){if(g.startContainer){f=false;
if(g.startContainer.nodeType===3){k=g.startContainer.parentNode
}else{if(g.startContainer.nodeType===1){k=g.startContainer
}else{f=true
}}if(!f){this.currentEvent=null
}}}if(f){if(h.anchorNode&&(h.anchorNode.nodeType==3)){if(h.anchorNode.parentNode){k=h.anchorNode.parentNode
}if(h.anchorNode.nextSibling!=h.focusNode.nextSibling){k=h.anchorNode.nextSibling
}}if(this._isElement(k,"br")){k=null
}if(!k){k=g.commonAncestorContainer;
if(!g.collapsed){if(g.startContainer==g.endContainer){if(g.startOffset-g.endOffset<2){if(g.startContainer.hasChildNodes()){k=g.startContainer.childNodes[g.startOffset]
}}}}}}}if(this.currentEvent!==null){try{switch(this.currentEvent.type){case"click":case"mousedown":case"mouseup":if(this.browser.webkit){k=a.getTarget(this.currentEvent)
}break;
default:break
}}catch(i){YAHOO.log("Firefox 1.5 errors here: "+i,"error","SimpleEditor")
}}else{if((this.currentElement&&this.currentElement[0])&&(!this.browser.ie)){}}if(this.browser.opera||this.browser.webkit){if(this.currentEvent&&!k){k=YAHOO.util.Event.getTarget(this.currentEvent)
}}if(!k||!k.tagName){k=j.body
}if(this._isElement(k,"html")){k=j.body
}if(this._isElement(k,"body")){k=j.body
}if(k&&!k.parentNode){k=j.body
}if(k===undefined){k=null
}return k
},_getDomPath:function(e){if(!e){e=this._getSelectedElement()
}var f=[];
while(e!==null){if(e.ownerDocument!=this._getDoc()){e=null;
break
}if(e.nodeName&&e.nodeType&&(e.nodeType==1)){f[f.length]=e
}if(this._isElement(e,"body")){break
}e=e.parentNode
}if(f.length===0){if(this._getDoc()&&this._getDoc().body){f[0]=this._getDoc().body
}}return f.reverse()
},_writeDomPath:function(){var m=this._getDomPath(),k=[],g="",n="";
for(var e=0;
e<m.length;
e++){var o=m[e].tagName.toLowerCase();
if((o=="ol")&&(m[e].type)){o+=":"+m[e].type
}if(c.hasClass(m[e],"yui-tag")){o=m[e].getAttribute("tag")
}if((this.get("markup")=="semantic")||(this.get("markup")=="xhtml")){switch(o){case"b":o="strong";
break;
case"i":o="em";
break
}}if(!c.hasClass(m[e],"yui-non")){if(c.hasClass(m[e],"yui-tag")){n=o
}else{g=((m[e].className!=="")?"."+m[e].className.replace(/ /g,"."):"");
if((g.indexOf("yui")!=-1)||(g.toLowerCase().indexOf("apple-style-span")!=-1)){g=""
}n=o+((m[e].id)?"#"+m[e].id:"")+g
}switch(o){case"body":n="body";
break;
case"a":if(m[e].getAttribute("href",2)){n+=":"+m[e].getAttribute("href",2).replace("mailto:","").replace("http://","").replace("https://","")
}break;
case"img":var f=m[e].height;
var l=m[e].width;
if(m[e].style.height){f=parseInt(m[e].style.height,10)
}if(m[e].style.width){l=parseInt(m[e].style.width,10)
}n+="("+l+"x"+f+")";
break
}if(n.length>10){n='<span title="'+n+'">'+n.substring(0,10)+"...</span>"
}else{n='<span title="'+n+'">'+n+"</span>"
}k[k.length]=n
}}var j=k.join(" "+this.SEP_DOMPATH+" ");
if(this.dompath.innerHTML!=j){this.dompath.innerHTML=j
}},_fixNodes:function(){var l=this._getDoc(),j=[];
for(var e in this.invalidHTML){if(YAHOO.lang.hasOwnProperty(this.invalidHTML,e)){if(e.toLowerCase()!="span"){var f=l.body.getElementsByTagName(e);
if(f.length){for(var g=0;
g<f.length;
g++){j.push(f[g])
}}}}}for(var k=0;
k<j.length;
k++){if(j[k].parentNode){if(d.isObject(this.invalidHTML[j[k].tagName.toLowerCase()])&&this.invalidHTML[j[k].tagName.toLowerCase()].keepContents){this._swapEl(j[k],"span",function(h){h.className="yui-non"
})
}else{j[k].parentNode.removeChild(j[k])
}}}var m=this._getDoc().getElementsByTagName("img");
c.addClass(m,"yui-img")
},_isNonEditable:function(h){if(this.get("allowNoEdit")){var g=a.getTarget(h);
if(this._isElement(g,"html")){g=null
}var l=this._getDomPath(g);
for(var f=(l.length-1);
f>-1;
f--){if(c.hasClass(l[f],this.CLASS_NOEDIT)){try{this._getDoc().execCommand("enableObjectResizing",false,"false")
}catch(k){}this.nodeChange();
a.stopEvent(h);
YAHOO.log("CLASS_NOEDIT found in DOM Path, stopping event","info","SimpleEditor");
return true
}}try{this._getDoc().execCommand("enableObjectResizing",false,"true")
}catch(j){}}return false
},_setCurrentEvent:function(e){this.currentEvent=e
},_handleClick:function(g){var f=this.fireEvent("beforeEditorClick",{type:"beforeEditorClick",target:this,ev:g});
if(f===false){return false
}if(this._isNonEditable(g)){return false
}this._setCurrentEvent(g);
if(this.currentWindow){this.closeWindow()
}if(this.currentWindow){this.closeWindow()
}if(this.browser.webkit){var e=a.getTarget(g);
if(this._isElement(e,"a")||this._isElement(e.parentNode,"a")){a.stopEvent(g);
this.nodeChange()
}}else{this.nodeChange()
}this.fireEvent("editorClick",{type:"editorClick",target:this,ev:g})
},_handleMouseUp:function(g){var f=this.fireEvent("beforeEditorMouseUp",{type:"beforeEditorMouseUp",target:this,ev:g});
if(f===false){return false
}if(this._isNonEditable(g)){return false
}var e=this;
if(this.browser.opera){var h=a.getTarget(g);
if(this._isElement(h,"img")){this.nodeChange();
if(this.operaEvent){clearTimeout(this.operaEvent);
this.operaEvent=null;
this._handleDoubleClick(g)
}else{this.operaEvent=window.setTimeout(function(){e.operaEvent=false
},700)
}}}if(this.browser.webkit||this.browser.opera){if(this.browser.webkit){a.stopEvent(g)
}}this.nodeChange();
this.fireEvent("editorMouseUp",{type:"editorMouseUp",target:this,ev:g})
},_handleMouseDown:function(f){var e=this.fireEvent("beforeEditorMouseDown",{type:"beforeEditorMouseDown",target:this,ev:f});
if(e===false){return false
}if(this._isNonEditable(f)){return false
}this._setCurrentEvent(f);
var g=a.getTarget(f);
if(this.browser.webkit&&this._hasSelection()){var h=this._getSelection();
if(!this.browser.webkit3){h.collapse(true)
}else{h.collapseToStart()
}}if(this.browser.webkit&&this._lastImage){c.removeClass(this._lastImage,"selected");
this._lastImage=null
}if(this._isElement(g,"img")||this._isElement(g,"a")){if(this.browser.webkit){a.stopEvent(f);
if(this._isElement(g,"img")){c.addClass(g,"selected");
this._lastImage=g
}}if(this.currentWindow){this.closeWindow()
}this.nodeChange()
}this.fireEvent("editorMouseDown",{type:"editorMouseDown",target:this,ev:f})
},_handleDoubleClick:function(f){var e=this.fireEvent("beforeEditorDoubleClick",{type:"beforeEditorDoubleClick",target:this,ev:f});
if(e===false){return false
}if(this._isNonEditable(f)){return false
}this._setCurrentEvent(f);
var g=a.getTarget(f);
if(this._isElement(g,"img")){this.currentElement[0]=g;
this.toolbar.fireEvent("insertimageClick",{type:"insertimageClick",target:this.toolbar});
this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this})
}else{if(this._hasParent(g,"a")){this.currentElement[0]=this._hasParent(g,"a");
this.toolbar.fireEvent("createlinkClick",{type:"createlinkClick",target:this.toolbar});
this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this})
}}this.nodeChange();
this.fireEvent("editorDoubleClick",{type:"editorDoubleClick",target:this,ev:f})
},_handleKeyUp:function(g){var f=this.fireEvent("beforeEditorKeyUp",{type:"beforeEditorKeyUp",target:this,ev:g});
if(f===false){return false
}if(this._isNonEditable(g)){return false
}this._setCurrentEvent(g);
switch(g.keyCode){case this._keyMap.SELECT_ALL.key:if(this._checkKey(this._keyMap.SELECT_ALL,g)){this.nodeChange()
}break;
case 32:case 35:case 36:case 37:case 38:case 39:case 40:case 46:case 8:case this._keyMap.CLOSE_WINDOW.key:if((g.keyCode==this._keyMap.CLOSE_WINDOW.key)&&this.currentWindow){if(this._checkKey(this._keyMap.CLOSE_WINDOW,g)){this.closeWindow()
}}else{if(!this.browser.ie){if(this._nodeChangeTimer){clearTimeout(this._nodeChangeTimer)
}var e=this;
this._nodeChangeTimer=setTimeout(function(){e._nodeChangeTimer=null;
e.nodeChange.call(e)
},100)
}else{this.nodeChange()
}this.editorDirty=true
}break
}this.fireEvent("editorKeyUp",{type:"editorKeyUp",target:this,ev:g});
this._storeUndo()
},_handleKeyPress:function(g){var f=this.fireEvent("beforeEditorKeyPress",{type:"beforeEditorKeyPress",target:this,ev:g});
if(f===false){return false
}if(this.get("allowNoEdit")){if(g&&g.keyCode&&(g.keyCode==63272)){YAHOO.log("allowNoEdit is set, forward delete key has been disabled","warn","SimpleEditor");
a.stopEvent(g)
}}if(this._isNonEditable(g)){return false
}this._setCurrentEvent(g);
if(this.browser.opera){if(g.keyCode===13){var e=this._getSelectedElement();
if(!this._isElement(e,"li")){this.execCommand("inserthtml","<br>");
a.stopEvent(g)
}}}if(this.browser.webkit){if(!this.browser.webkit3){if(g.keyCode&&(g.keyCode==122)&&(g.metaKey)){if(this._hasParent(this._getSelectedElement(),"li")){YAHOO.log("We are in an LI and we found CMD + z, stopping the event","warn","SimpleEditor");
a.stopEvent(g)
}}}this._listFix(g)
}this.fireEvent("editorKeyPress",{type:"editorKeyPress",target:this,ev:g})
},_handleKeyDown:function(n){var k=this.fireEvent("beforeEditorKeyDown",{type:"beforeEditorKeyDown",target:this,ev:n});
if(k===false){return false
}var j=null,l=null;
if(this._isNonEditable(n)){return false
}this._setCurrentEvent(n);
if(this.currentWindow){this.closeWindow()
}if(this.currentWindow){this.closeWindow()
}var m=false,g=null,f=false;
switch(n.keyCode){case this._keyMap.FOCUS_TOOLBAR.key:if(this._checkKey(this._keyMap.FOCUS_TOOLBAR,n)){var i=this.toolbar.getElementsByTagName("h2")[0];
if(i&&i.firstChild){i.firstChild.focus()
}}else{if(this._checkKey(this._keyMap.FOCUS_AFTER,n)){this.afterElement.focus()
}}a.stopEvent(n);
m=false;
break;
case this._keyMap.CREATE_LINK.key:if(this._hasSelection()){if(this._checkKey(this._keyMap.CREATE_LINK,n)){var e=true;
if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){YAHOO.log("Toolbar Button for (createlink) was not found, skipping exec.","info","SimpleEditor");
e=false
}}if(e){this.execCommand("createlink","");
this.toolbar.fireEvent("createlinkClick",{type:"createlinkClick",target:this.toolbar});
this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});
m=false
}}}break;
case this._keyMap.UNDO.key:case this._keyMap.REDO.key:if(this._checkKey(this._keyMap.REDO,n)){g="redo";
m=true
}else{if(this._checkKey(this._keyMap.UNDO,n)){g="undo";
m=true
}}break;
case this._keyMap.BOLD.key:if(this._checkKey(this._keyMap.BOLD,n)){g="bold";
m=true
}break;
case this._keyMap.ITALIC.key:if(this._checkKey(this._keyMap.ITALIC,n)){g="italic";
m=true
}break;
case this._keyMap.UNDERLINE.key:if(this._checkKey(this._keyMap.UNDERLINE,n)){g="underline";
m=true
}break;
case 9:if(this.browser.ie){l=this._getRange();
j=this._getSelectedElement();
if(!this._isElement(j,"li")){if(l){l.pasteHTML("&nbsp;&nbsp;&nbsp;&nbsp;");
l.collapse(false);
l.select()
}a.stopEvent(n)
}}if(this.browser.gecko>1.8){j=this._getSelectedElement();
if(this._isElement(j,"li")){if(n.shiftKey){this._getDoc().execCommand("outdent",null,"")
}else{this._getDoc().execCommand("indent",null,"")
}}else{if(!this._hasSelection()){this.execCommand("inserthtml","&nbsp;&nbsp;&nbsp;&nbsp;")
}}a.stopEvent(n)
}break;
case 13:if(this.get("ptags")&&!n.shiftKey){if(this.browser.gecko){j=this._getSelectedElement();
if(!this._isElement(j,"li")){m=true;
g="insertparagraph";
a.stopEvent(n)
}}if(this.browser.webkit){j=this._getSelectedElement();
if(!this._hasParent(j,"li")){m=true;
g="insertparagraph";
a.stopEvent(n)
}}}else{if(this.browser.ie){YAHOO.log("Stopping P tags","info","SimpleEditor");
l=this._getRange();
j=this._getSelectedElement();
if(!this._isElement(j,"li")){if(l){l.pasteHTML("<br>");
l.collapse(false);
l.select()
}a.stopEvent(n)
}}}break
}if(this.browser.ie){this._listFix(n)
}if(m&&g){this.execCommand(g,null);
a.stopEvent(n);
this.nodeChange()
}this.fireEvent("editorKeyDown",{type:"editorKeyDown",target:this,ev:n})
},_listFix:function(k){var m=null,i=null,e=false,g=null;
if(this.browser.webkit){if(k.keyCode&&(k.keyCode==13)){if(this._hasParent(this._getSelectedElement(),"li")){var h=this._hasParent(this._getSelectedElement(),"li");
if(h.previousSibling){if(h.firstChild&&(h.firstChild.length==1)){this._selectNode(h)
}}}}}if(k.keyCode&&((!this.browser.webkit3&&(k.keyCode==25))||((this.browser.webkit3||!this.browser.webkit)&&((k.keyCode==9)&&k.shiftKey)))){m=this._getSelectedElement();
if(this._hasParent(m,"li")){m=this._hasParent(m,"li");
YAHOO.log("We have a SHIFT tab in an LI, reverse it..","info","SimpleEditor");
if(this._hasParent(m,"ul")||this._hasParent(m,"ol")){YAHOO.log("We have a double parent, move up a level","info","SimpleEditor");
i=this._hasParent(m,"ul");
if(!i){i=this._hasParent(m,"ol")
}if(this._isElement(i.previousSibling,"li")){i.removeChild(m);
i.parentNode.insertBefore(m,i.nextSibling);
if(this.browser.ie){g=this._getDoc().body.createTextRange();
g.moveToElementText(m);
g.collapse(false);
g.select()
}if(this.browser.webkit){this._selectNode(m.firstChild)
}a.stopEvent(k)
}}}}if(k.keyCode&&((k.keyCode==9)&&(!k.shiftKey))){YAHOO.log("List Fix - Tab","info","SimpleEditor");
var f=this._getSelectedElement();
if(this._hasParent(f,"li")){e=this._hasParent(f,"li").innerHTML
}if(this.browser.webkit){this._getDoc().execCommand("inserttext",false,"\t")
}m=this._getSelectedElement();
if(this._hasParent(m,"li")){YAHOO.log("We have a tab in an LI","info","SimpleEditor");
i=this._hasParent(m,"li");
YAHOO.log("parLI: "+i.tagName+" :: "+i.innerHTML);
var j=this._getDoc().createElement(i.parentNode.tagName.toLowerCase());
if(this.browser.webkit){var l=c.getElementsByClassName("Apple-tab-span","span",i);
if(l[0]){i.removeChild(l[0]);
i.innerHTML=d.trim(i.innerHTML);
if(e){i.innerHTML='<span class="yui-non">'+e+"</span>&nbsp;"
}else{i.innerHTML='<span class="yui-non">&nbsp;</span>&nbsp;'
}}}else{if(e){i.innerHTML=e+"&nbsp;"
}else{i.innerHTML="&nbsp;"
}}i.parentNode.replaceChild(j,i);
j.appendChild(i);
if(this.browser.webkit){this._getSelection().setBaseAndExtent(i.firstChild,1,i.firstChild,i.firstChild.innerText.length);
if(!this.browser.webkit3){i.parentNode.parentNode.style.display="list-item";
setTimeout(function(){i.parentNode.parentNode.style.display="block"
},1)
}}else{if(this.browser.ie){g=this._getDoc().body.createTextRange();
g.moveToElementText(i);
g.collapse(false);
g.select()
}else{this._selectNode(i)
}}a.stopEvent(k)
}if(this.browser.webkit){a.stopEvent(k)
}this.nodeChange()
}},nodeChange:function(e){var f=this;
this._storeUndo();
if(this.get("nodeChangeDelay")){window.setTimeout(function(){f._nodeChange.apply(f,arguments)
},0)
}else{this._nodeChange()
}},_nodeChange:function(g){var k=parseInt(this.get("nodeChangeThreshold"),10),r=Math.round(new Date().getTime()/1000),u=this;
if(g===true){this._lastNodeChange=0
}if((this._lastNodeChange+k)<r){if(this._fixNodesTimer===null){this._fixNodesTimer=window.setTimeout(function(){u._fixNodes.call(u);
u._fixNodesTimer=null
},0)
}}this._lastNodeChange=r;
if(this.currentEvent){try{this._lastNodeChangeEvent=this.currentEvent.type
}catch(D){}}var C=this.fireEvent("beforeNodeChange",{type:"beforeNodeChange",target:this});
if(C===false){return false
}if(this.get("dompath")){window.setTimeout(function(){u._writeDomPath.call(u)
},0)
}if(!this.get("disabled")){if(this.STOP_NODE_CHANGE){this.STOP_NODE_CHANGE=false;
return false
}else{var w=this._getSelection(),t=this._getRange(),f=this._getSelectedElement(),p=this.toolbar.getButtonByValue("fontname"),o=this.toolbar.getButtonByValue("fontsize"),m=this.toolbar.getButtonByValue("undo"),h=this.toolbar.getButtonByValue("redo");
var q={};
if(this._lastButton){q[this._lastButton.id]=true
}if(!this._isElement(f,"body")){if(p){q[p.get("id")]=true
}if(o){q[o.get("id")]=true
}}if(h){delete q[h.get("id")]
}this.toolbar.resetAllButtons(q);
for(var E=0;
E<this._disabled.length;
E++){var s=this.toolbar.getButtonByValue(this._disabled[E]);
if(s&&s.get){if(this._lastButton&&(s.get("id")===this._lastButton.id)){}else{if(!this._hasSelection()&&!this.get("insert")){switch(this._disabled[E]){case"fontname":case"fontsize":break;
default:this.toolbar.disableButton(s)
}}else{if(!this._alwaysDisabled[this._disabled[E]]){this.toolbar.enableButton(s)
}}if(!this._alwaysEnabled[this._disabled[E]]){this.toolbar.deselectButton(s)
}}}}var v=this._getDomPath();
var F=null,z=null;
for(var A=0;
A<v.length;
A++){F=v[A].tagName.toLowerCase();
if(v[A].getAttribute("tag")){F=v[A].getAttribute("tag").toLowerCase()
}z=this._tag2cmd[F];
if(z===undefined){z=[]
}if(!d.isArray(z)){z=[z]
}if(v[A].style.fontWeight.toLowerCase()=="bold"){z[z.length]="bold"
}if(v[A].style.fontStyle.toLowerCase()=="italic"){z[z.length]="italic"
}if(v[A].style.textDecoration.toLowerCase()=="underline"){z[z.length]="underline"
}if(v[A].style.textDecoration.toLowerCase()=="line-through"){z[z.length]="strikethrough"
}if(z.length>0){for(var y=0;
y<z.length;
y++){this.toolbar.selectButton(z[y]);
this.toolbar.enableButton(z[y])
}}switch(v[A].style.textAlign.toLowerCase()){case"left":case"right":case"center":case"justify":var x=v[A].style.textAlign.toLowerCase();
if(v[A].style.textAlign.toLowerCase()=="justify"){x="full"
}this.toolbar.selectButton("justify"+x);
this.toolbar.enableButton("justify"+x);
break
}}if(p){var B=p._configs.label._initialConfig.value;
p.set("label",'<span class="yui-toolbar-fontname-'+this._cleanClassName(B)+'">'+B+"</span>");
this._updateMenuChecked("fontname",B)
}if(o){o.set("label",o._configs.label._initialConfig.value)
}var n=this.toolbar.getButtonByValue("heading");
if(n){n.set("label",n._configs.label._initialConfig.value);
this._updateMenuChecked("heading","none")
}var l=this.toolbar.getButtonByValue("insertimage");
if(l&&this.currentWindow&&(this.currentWindow.name=="insertimage")){this.toolbar.disableButton(l)
}if(this._lastButton&&this._lastButton.isSelected){this.toolbar.deselectButton(this._lastButton.id)
}this._undoNodeChange()
}}this.fireEvent("afterNodeChange",{type:"afterNodeChange",target:this})
},_updateMenuChecked:function(e,f,h){if(!h){h=this.toolbar
}var g=h.getButtonByValue(e);
g.checkValue(f)
},_handleToolbarClick:function(f){var h="";
var i="";
var g=f.button.value;
if(f.button.menucmd){h=g;
g=f.button.menucmd
}this._lastButton=f.button;
if(this.STOP_EXEC_COMMAND){YAHOO.log("execCommand skipped because we found the STOP_EXEC_COMMAND flag set to true","warn","SimpleEditor");
YAHOO.log("NOEXEC::execCommand::("+g+"), ("+h+")","warn","SimpleEditor");
this.STOP_EXEC_COMMAND=false;
return false
}else{this.execCommand(g,h);
if(!this.browser.webkit){var e=this;
setTimeout(function(){e._focusWindow.call(e)
},5)
}}a.stopEvent(f)
},_setupAfterElement:function(){if(!this.beforeElement){this.beforeElement=document.createElement("h2");
this.beforeElement.className="yui-editor-skipheader";
this.beforeElement.tabIndex="-1";
this.beforeElement.innerHTML=this.STR_BEFORE_EDITOR;
this.get("element_cont").get("firstChild").insertBefore(this.beforeElement,this.toolbar.get("nextSibling"))
}if(!this.afterElement){this.afterElement=document.createElement("h2");
this.afterElement.className="yui-editor-skipheader";
this.afterElement.tabIndex="-1";
this.afterElement.innerHTML=this.STR_LEAVE_EDITOR;
this.get("element_cont").get("firstChild").appendChild(this.afterElement)
}},_disableEditor:function(f){if(f){this._removeEditorEvents();
if(!this._mask){if(!!this.browser.ie){this._setDesignMode("off")
}if(this.toolbar){this.toolbar.set("disabled",true)
}this._mask=document.createElement("DIV");
c.setStyle(this._mask,"height","100%");
c.setStyle(this._mask,"width","100%");
c.setStyle(this._mask,"position","absolute");
c.setStyle(this._mask,"top","0");
c.setStyle(this._mask,"left","0");
c.setStyle(this._mask,"opacity",".5");
c.addClass(this._mask,"yui-editor-masked");
this.get("iframe").get("parentNode").appendChild(this._mask)
}}else{this._initEditorEvents();
if(this._mask){this._mask.parentNode.removeChild(this._mask);
this._mask=null;
if(this.toolbar){this.toolbar.set("disabled",false)
}this._setDesignMode("on");
this._focusWindow();
var e=this;
window.setTimeout(function(){e.nodeChange.call(e)
},100)
}}},SEP_DOMPATH:"<",STR_LEAVE_EDITOR:"You have left the Rich Text Editor.",STR_BEFORE_EDITOR:"This text field can contain stylized text and graphics. To cycle through all formatting options, use the keyboard shortcut Shift + Escape to place focus on the toolbar and navigate between options with your arrow keys. To exit this text editor use the Escape key and continue tabbing. <h4>Common formatting keyboard shortcuts:</h4><ul><li>Control Shift B sets text to bold</li> <li>Control Shift I sets text to italic</li> <li>Control Shift U underlines text</li> <li>Control Shift L adds an HTML link</li></ul>",STR_TITLE:"Rich Text Area.",STR_IMAGE_HERE:"Image URL Here",STR_LINK_URL:"Link URL",STOP_EXEC_COMMAND:false,STOP_NODE_CHANGE:false,CLASS_NOEDIT:"yui-noedit",CLASS_CONTAINER:"yui-editor-container",CLASS_EDITABLE:"yui-editor-editable",CLASS_EDITABLE_CONT:"yui-editor-editable-container",CLASS_PREFIX:"yui-editor",browser:function(){var e=YAHOO.env.ua;
if(e.webkit>=420){e.webkit3=e.webkit
}else{e.webkit3=0
}e.mac=false;
if(navigator.userAgent.indexOf("Macintosh")!==-1){e.mac=true
}return e
}(),init:function(f,e){YAHOO.log("init","info","SimpleEditor");
if(!this._defaultToolbar){this._defaultToolbar={collapse:true,titlebar:"Text Editing Tools",draggable:false,buttons:[{group:"fontstyle",label:"Font Name and Size",buttons:[{type:"select",label:"Arial",value:"fontname",disabled:true,menu:[{text:"Arial",checked:true},{text:"Arial Black"},{text:"Comic Sans MS"},{text:"Courier New"},{text:"Lucida Console"},{text:"Tahoma"},{text:"Times New Roman"},{text:"Trebuchet MS"},{text:"Verdana"}]},{type:"spin",label:"13",value:"fontsize",range:[9,75],disabled:true}]},{type:"separator"},{group:"textstyle",label:"Font Style",buttons:[{type:"push",label:"Bold CTRL + SHIFT + B",value:"bold"},{type:"push",label:"Italic CTRL + SHIFT + I",value:"italic"},{type:"push",label:"Underline CTRL + SHIFT + U",value:"underline"},{type:"push",label:"Strike Through",value:"strikethrough"},{type:"separator"},{type:"color",label:"Font Color",value:"forecolor",disabled:true},{type:"color",label:"Background Color",value:"backcolor",disabled:true}]},{type:"separator"},{group:"indentlist",label:"Lists",buttons:[{type:"push",label:"Create an Unordered List",value:"insertunorderedlist"},{type:"push",label:"Create an Ordered List",value:"insertorderedlist"}]},{type:"separator"},{group:"insertitem",label:"Insert Item",buttons:[{type:"push",label:"HTML Link CTRL + SHIFT + L",value:"createlink",disabled:true},{type:"push",label:"Insert Image",value:"insertimage"}]}]}
}YAHOO.widget.SimpleEditor.superclass.init.call(this,f,e);
YAHOO.widget.EditorInfo._instances[this.get("id")]=this;
this.currentElement=[];
this.on("contentReady",function(){this.DOMReady=true;
this.fireQueue()
},this,true)
},initAttributes:function(e){YAHOO.widget.SimpleEditor.superclass.initAttributes.call(this,e);
var f=this;
this.setAttributeConfig("nodeChangeDelay",{value:((e.nodeChangeDelay===false)?false:true)});
this.setAttributeConfig("maxUndo",{writeOnce:true,value:e.maxUndo||30});
this.setAttributeConfig("ptags",{writeOnce:true,value:e.ptags||false});
this.setAttributeConfig("insert",{writeOnce:true,value:e.insert||false,method:function(l){if(l){var k={fontname:true,fontsize:true,forecolor:true,backcolor:true};
var j=this._defaultToolbar.buttons;
for(var h=0;
h<j.length;
h++){if(j[h].buttons){for(var g=0;
g<j[h].buttons.length;
g++){if(j[h].buttons[g].value){if(k[j[h].buttons[g].value]){delete j[h].buttons[g].disabled
}}}}}}}});
this.setAttributeConfig("container",{writeOnce:true,value:e.container||false});
this.setAttributeConfig("plainText",{writeOnce:true,value:e.plainText||false});
this.setAttributeConfig("iframe",{value:null});
this.setAttributeConfig("textarea",{value:null,writeOnce:true});
this.setAttributeConfig("container",{readOnly:true,value:null});
this.setAttributeConfig("nodeChangeThreshold",{value:e.nodeChangeThreshold||3,validator:YAHOO.lang.isNumber});
this.setAttributeConfig("allowNoEdit",{value:e.allowNoEdit||false,validator:YAHOO.lang.isBoolean});
this.setAttributeConfig("limitCommands",{value:e.limitCommands||false,validator:YAHOO.lang.isBoolean});
this.setAttributeConfig("element_cont",{value:e.element_cont});
this.setAttributeConfig("editor_wrapper",{value:e.editor_wrapper||null,writeOnce:true});
this.setAttributeConfig("height",{value:e.height||c.getStyle(f.get("element"),"height"),method:function(g){if(this._rendered){if(this.get("animate")){var h=new YAHOO.util.Anim(this.get("iframe").get("parentNode"),{height:{to:parseInt(g,10)}},0.5);
h.animate()
}else{c.setStyle(this.get("iframe").get("parentNode"),"height",g)
}}}});
this.setAttributeConfig("autoHeight",{value:e.autoHeight||false,method:function(g){if(g){if(this.get("iframe")){this.get("iframe").get("element").setAttribute("scrolling","no")
}this.on("afterNodeChange",this._handleAutoHeight,this,true);
this.on("editorKeyDown",this._handleAutoHeight,this,true);
this.on("editorKeyPress",this._handleAutoHeight,this,true)
}else{if(this.get("iframe")){this.get("iframe").get("element").setAttribute("scrolling","auto")
}this.unsubscribe("afterNodeChange",this._handleAutoHeight);
this.unsubscribe("editorKeyDown",this._handleAutoHeight);
this.unsubscribe("editorKeyPress",this._handleAutoHeight)
}}});
this.setAttributeConfig("width",{value:e.width||c.getStyle(this.get("element"),"width"),method:function(g){if(this._rendered){if(this.get("animate")){var h=new YAHOO.util.Anim(this.get("element_cont").get("element"),{width:{to:parseInt(g,10)}},0.5);
h.animate()
}else{this.get("element_cont").setStyle("width",g)
}}}});
this.setAttributeConfig("blankimage",{value:e.blankimage||this._getBlankImage()});
this.setAttributeConfig("css",{value:e.css||this._defaultCSS,writeOnce:true});
this.setAttributeConfig("html",{value:e.html||'<html><head><title>{TITLE}</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><base href="'+this._baseHREF+'"><style>{CSS}</style><style>{HIDDEN_CSS}</style><style>{EXTRA_CSS}</style></head><body onload="document.body._rteLoaded = true;">{CONTENT}</body></html>',writeOnce:true});
this.setAttributeConfig("extracss",{value:e.extracss||"",writeOnce:true});
this.setAttributeConfig("handleSubmit",{value:e.handleSubmit||false,method:function(g){if(this.get("element").form){if(!this._formButtons){this._formButtons=[]
}if(g){a.on(this.get("element").form,"submit",this._handleFormSubmit,this,true);
var h=this.get("element").form.getElementsByTagName("input");
for(var k=0;
k<h.length;
k++){var j=h[k].getAttribute("type");
if(j&&(j.toLowerCase()=="submit")){a.on(h[k],"click",this._handleFormButtonClick,this,true);
this._formButtons[this._formButtons.length]=h[k]
}}}else{a.removeListener(this.get("element").form,"submit",this._handleFormSubmit);
if(this._formButtons){a.removeListener(this._formButtons,"click",this._handleFormButtonClick)
}}}}});
this.setAttributeConfig("disabled",{value:false,method:function(g){if(this._rendered){this._disableEditor(g)
}}});
this.setAttributeConfig("saveEl",{value:this.get("element")});
this.setAttributeConfig("toolbar_cont",{value:null,writeOnce:true});
this.setAttributeConfig("toolbar",{value:e.toolbar||this._defaultToolbar,writeOnce:true,method:function(g){if(!g.buttonType){g.buttonType=this._defaultToolbar.buttonType
}this._defaultToolbar=g
}});
this.setAttributeConfig("animate",{value:((e.animate)?((YAHOO.util.Anim)?true:false):false),validator:function(h){var g=true;
if(!YAHOO.util.Anim){g=false
}return g
}});
this.setAttributeConfig("panel",{value:null,writeOnce:true,validator:function(h){var g=true;
if(!YAHOO.widget.Overlay){g=false
}return g
}});
this.setAttributeConfig("focusAtStart",{value:e.focusAtStart||false,writeOnce:true,method:function(g){if(g){this.on("editorContentLoaded",function(){var h=this;
setTimeout(function(){h._focusWindow.call(h,true);
h.editorDirty=false
},400)
},this,true)
}}});
this.setAttributeConfig("dompath",{value:e.dompath||false,method:function(g){if(g&&!this.dompath){this.dompath=document.createElement("DIV");
this.dompath.id=this.get("id")+"_dompath";
c.addClass(this.dompath,"dompath");
this.get("element_cont").get("firstChild").appendChild(this.dompath);
if(this.get("iframe")){this._writeDomPath()
}}else{if(!g&&this.dompath){this.dompath.parentNode.removeChild(this.dompath);
this.dompath=null
}}}});
this.setAttributeConfig("markup",{value:e.markup||"semantic",validator:function(g){switch(g.toLowerCase()){case"semantic":case"css":case"default":case"xhtml":return true
}return false
}});
this.setAttributeConfig("removeLineBreaks",{value:e.removeLineBreaks||false,validator:YAHOO.lang.isBoolean});
this.setAttributeConfig("drag",{writeOnce:true,value:e.drag||false});
this.setAttributeConfig("resize",{writeOnce:true,value:e.resize||false})
},_getBlankImage:function(){if(!this.DOMReady){this._queue[this._queue.length]=["_getBlankImage",arguments];
return""
}var e="";
if(!this._blankImageLoaded){if(YAHOO.widget.EditorInfo.blankImage){this.set("blankimage",YAHOO.widget.EditorInfo.blankImage);
this._blankImageLoaded=true
}else{var f=document.createElement("div");
f.style.position="absolute";
f.style.top="-9999px";
f.style.left="-9999px";
f.className=this.CLASS_PREFIX+"-blankimage";
document.body.appendChild(f);
e=YAHOO.util.Dom.getStyle(f,"background-image");
e=e.replace("url(","").replace(")","").replace(/"/g,"");
e=e.replace("app:/","");
this.set("blankimage",e);
this._blankImageLoaded=true;
f.parentNode.removeChild(f);
YAHOO.widget.EditorInfo.blankImage=e
}}else{e=this.get("blankimage")
}return e
},_handleAutoHeight:function(){var i=this._getDoc(),f=i.body,j=i.documentElement;
var e=parseInt(c.getStyle(this.get("editor_wrapper"),"height"),10);
var g=f.scrollHeight;
if(this.browser.webkit){g=j.scrollHeight
}if(g<parseInt(this.get("height"),10)){g=parseInt(this.get("height"),10)
}if((e!=g)&&(g>=parseInt(this.get("height"),10))){c.setStyle(this.get("editor_wrapper"),"height",g+"px");
if(this.browser.ie){this.get("iframe").setStyle("height","99%");
this.get("iframe").setStyle("zoom","1");
var h=this;
window.setTimeout(function(){h.get("iframe").setStyle("height","100%")
},1)
}}},_formButtons:null,_formButtonClicked:null,_handleFormButtonClick:function(f){var e=a.getTarget(f);
this._formButtonClicked=e
},_handleFormSubmit:function(h){this.saveHTML();
var g=this.get("element").form,e=this._formButtonClicked||false;
a.removeListener(g,"submit",this._handleFormSubmit);
if(YAHOO.env.ua.ie){if(e&&!e.disabled){e.click()
}}else{if(e&&!e.disabled){e.click()
}var f=document.createEvent("HTMLEvents");
f.initEvent("submit",true,true);
g.dispatchEvent(f);
if(YAHOO.env.ua.webkit){if(YAHOO.lang.isFunction(g.submit)){g.submit()
}}}},_handleFontSize:function(g){var e=this.toolbar.getButtonById(g.button.id);
var f=e.get("label")+"px";
this.execCommand("fontsize",f);
this.STOP_EXEC_COMMAND=true
},_handleColorPicker:function(g){var f=g.button;
var e="#"+g.color;
if((f=="forecolor")||(f=="backcolor")){this.execCommand(f,e)
}},_handleAlign:function(h){var g=null;
for(var e=0;
e<h.button.menu.length;
e++){if(h.button.menu[e].value==h.button.value){g=h.button.menu[e].value
}}var f=this._getSelection();
this.execCommand(g,f);
this.STOP_EXEC_COMMAND=true
},_handleAfterNodeChange:function(){var s=this._getDomPath(),n=null,j=null,o=null,f=false,l=this.toolbar.getButtonByValue("fontname"),m=this.toolbar.getButtonByValue("fontsize"),e=this.toolbar.getButtonByValue("heading");
for(var g=0;
g<s.length;
g++){n=s[g];
var r=n.tagName.toLowerCase();
if(n.getAttribute("tag")){r=n.getAttribute("tag")
}j=n.getAttribute("face");
if(c.getStyle(n,"font-family")){j=c.getStyle(n,"font-family");
j=j.replace(/'/g,"")
}if(r.substring(0,1)=="h"){if(e){for(var k=0;
k<e._configs.menu.value.length;
k++){if(e._configs.menu.value[k].value.toLowerCase()==r){e.set("label",e._configs.menu.value[k].text)
}}this._updateMenuChecked("heading",r)
}}}if(l){for(var q=0;
q<l._configs.menu.value.length;
q++){if(j&&l._configs.menu.value[q].text.toLowerCase()==j.toLowerCase()){f=true;
j=l._configs.menu.value[q].text
}}if(!f){j=l._configs.label._initialConfig.value
}var p='<span class="yui-toolbar-fontname-'+this._cleanClassName(j)+'">'+j+"</span>";
if(l.get("label")!=p){l.set("label",p);
this._updateMenuChecked("fontname",j)
}}if(m){o=parseInt(c.getStyle(n,"fontSize"),10);
if((o===null)||isNaN(o)){o=m._configs.label._initialConfig.value
}m.set("label",""+o)
}if(!this._isElement(n,"body")&&!this._isElement(n,"img")){this.toolbar.enableButton(l);
this.toolbar.enableButton(m);
this.toolbar.enableButton("forecolor");
this.toolbar.enableButton("backcolor")
}if(this._isElement(n,"img")){if(YAHOO.widget.Overlay){this.toolbar.enableButton("createlink")
}}if(this._hasParent(n,"blockquote")){this.toolbar.selectButton("indent");
this.toolbar.disableButton("indent");
this.toolbar.enableButton("outdent")
}if(this._hasParent(n,"ol")||this._hasParent(n,"ul")){this.toolbar.disableButton("indent")
}this._lastButton=null
},_handleInsertImageClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("insertimage")){YAHOO.log("Toolbar Button for (insertimage) was not found, skipping exec.","info","SimpleEditor");
return false
}}this.toolbar.set("disabled",true);
this.on("afterExecCommand",function(){var e=this.currentElement[0],g="http://";
if(!e){e=this._getSelectedElement()
}if(e){if(e.getAttribute("src")){g=e.getAttribute("src",2);
if(g.indexOf(this.get("blankimage"))!=-1){g=this.STR_IMAGE_HERE
}}}var f=prompt(this.STR_LINK_URL+": ",g);
if((f!=="")&&(f!==null)){e.setAttribute("src",f)
}else{if(f===null){e.parentNode.removeChild(e);
this.currentElement=[];
this.nodeChange()
}}this.closeWindow();
this.toolbar.set("disabled",false)
},this,true)
},_handleInsertImageWindowClose:function(){this.nodeChange()
},_isLocalFile:function(e){if((e)&&(e!=="")&&((e.indexOf("file:/")!=-1)||(e.indexOf(":\\")!=-1))){return true
}return false
},_handleCreateLinkClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){YAHOO.log("Toolbar Button for (createlink) was not found, skipping exec.","info","SimpleEditor");
return false
}}this.toolbar.set("disabled",true);
this.on("afterExecCommand",function(){var g=this.currentElement[0],f="";
if(g){if(g.getAttribute("href",2)!==null){f=g.getAttribute("href",2)
}}var i=prompt(this.STR_LINK_URL+": ",f);
if((i!=="")&&(i!==null)){var h=i;
if((h.indexOf("://")==-1)&&(h.substring(0,1)!="/")&&(h.substring(0,6).toLowerCase()!="mailto")){if((h.indexOf("@")!=-1)&&(h.substring(0,6).toLowerCase()!="mailto")){h="mailto:"+h
}else{if(h.substring(0,1)!="#"){}}}g.setAttribute("href",h)
}else{if(i!==null){var e=this._getDoc().createElement("span");
e.innerHTML=g.innerHTML;
c.addClass(e,"yui-non");
g.parentNode.replaceChild(e,g)
}}this.closeWindow();
this.toolbar.set("disabled",false)
},this)
},_handleCreateLinkWindowClose:function(){this.nodeChange();
this.currentElement=[]
},render:function(){if(this._rendered){return false
}YAHOO.log("Render","info","SimpleEditor");
if(!this.DOMReady){YAHOO.log("!DOMReady","info","SimpleEditor");
this._queue[this._queue.length]=["render",arguments];
return false
}if(this.get("element")){if(this.get("element").tagName){this._textarea=true;
if(this.get("element").tagName.toLowerCase()!=="textarea"){this._textarea=false
}}else{YAHOO.log("No Valid Element","error","SimpleEditor");
return false
}}else{YAHOO.log("No Element","error","SimpleEditor");
return false
}this._rendered=true;
var e=this;
window.setTimeout(function(){e._render.call(e)
},4)
},_render:function(){var e=this;
this.set("textarea",this.get("element"));
this.get("element_cont").setStyle("display","none");
this.get("element_cont").addClass(this.CLASS_CONTAINER);
this.set("iframe",this._createIframe());
window.setTimeout(function(){e._setInitialContent.call(e)
},10);
this.get("editor_wrapper").appendChild(this.get("iframe").get("element"));
if(this.get("disabled")){this._disableEditor(true)
}var f=this.get("toolbar");
if(f instanceof b){this.toolbar=f;
this.toolbar.set("disabled",true)
}else{f.disabled=true;
this.toolbar=new b(this.get("toolbar_cont"),f)
}YAHOO.log("fireEvent::toolbarLoaded","info","SimpleEditor");
this.fireEvent("toolbarLoaded",{type:"toolbarLoaded",target:this.toolbar});
this.toolbar.on("toolbarCollapsed",function(){if(this.currentWindow){this.moveWindow()
}},this,true);
this.toolbar.on("toolbarExpanded",function(){if(this.currentWindow){this.moveWindow()
}},this,true);
this.toolbar.on("fontsizeClick",this._handleFontSize,this,true);
this.toolbar.on("colorPickerClicked",function(g){this._handleColorPicker(g);
return false
},this,true);
this.toolbar.on("alignClick",this._handleAlign,this,true);
this.on("afterNodeChange",this._handleAfterNodeChange,this,true);
this.toolbar.on("insertimageClick",this._handleInsertImageClick,this,true);
this.on("windowinsertimageClose",this._handleInsertImageWindowClose,this,true);
this.toolbar.on("createlinkClick",this._handleCreateLinkClick,this,true);
this.on("windowcreatelinkClose",this._handleCreateLinkWindowClose,this,true);
this.get("parentNode").replaceChild(this.get("element_cont").get("element"),this.get("element"));
this.setStyle("visibility","hidden");
this.setStyle("position","absolute");
this.setStyle("top","-9999px");
this.setStyle("left","-9999px");
this.get("element_cont").appendChild(this.get("element"));
this.get("element_cont").setStyle("display","block");
c.addClass(this.get("iframe").get("parentNode"),this.CLASS_EDITABLE_CONT);
this.get("iframe").addClass(this.CLASS_EDITABLE);
this.get("element_cont").setStyle("width",this.get("width"));
c.setStyle(this.get("iframe").get("parentNode"),"height",this.get("height"));
this.get("iframe").setStyle("width","100%");
this.get("iframe").setStyle("height","100%");
this._setupDD();
window.setTimeout(function(){e._setupAfterElement.call(e)
},0);
this.fireEvent("afterRender",{type:"afterRender",target:this})
},execCommand:function(h,g){var k=this.fireEvent("beforeExecCommand",{type:"beforeExecCommand",target:this,args:arguments});
if((k===false)||(this.STOP_EXEC_COMMAND)){this.STOP_EXEC_COMMAND=false;
return false
}this._lastCommand=h;
this._setMarkupType(h);
if(this.browser.ie){this._getWindow().focus()
}var f=true;
if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue(h)){YAHOO.log("Toolbar Button for ("+h+") was not found, skipping exec.","info","SimpleEditor");
f=false
}}this.editorDirty=true;
if((typeof this["cmd_"+h.toLowerCase()]=="function")&&f){YAHOO.log("Found execCommand override method: (cmd_"+h.toLowerCase()+")","info","SimpleEditor");
var j=this["cmd_"+h.toLowerCase()](g);
f=j[0];
if(j[1]){h=j[1]
}if(j[2]){g=j[2]
}}if(f){YAHOO.log("execCommand::("+h+"), ("+g+")","info","SimpleEditor");
try{this._getDoc().execCommand(h,false,g)
}catch(i){YAHOO.log("execCommand Failed","error","SimpleEditor")
}}else{YAHOO.log("OVERRIDE::execCommand::("+h+"),("+g+") skipped","warn","SimpleEditor")
}this.on("afterExecCommand",function(){this.unsubscribeAll("afterExecCommand");
this.nodeChange()
},this,true);
this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this})
},cmd_underline:function(f){if(!this.browser.webkit){var e=this._getSelectedElement();
if(e&&this._isElement(e,"span")){if(e.style.textDecoration=="underline"){e.style.textDecoration="none"
}else{e.style.textDecoration="underline"
}return[false]
}}return[true]
},cmd_backcolor:function(h){var e=true,f=this._getSelectedElement(),g="backcolor";
if(this.browser.gecko||this.browser.opera){this._setEditorStyle(true);
g="hilitecolor"
}if(!this._isElement(f,"body")&&!this._hasSelection()){c.setStyle(f,"background-color",h);
this._selectNode(f);
e=false
}else{if(!this._isElement(f,"body")&&this._hasSelection()){c.setStyle(f,"background-color",h);
this._selectNode(f);
e=false
}else{if(this.get("insert")){f=this._createInsertElement({backgroundColor:h})
}else{this._createCurrentElement("span",{backgroundColor:h});
this._selectNode(this.currentElement[0])
}e=false
}}return[e,g]
},cmd_forecolor:function(g){var e=true,f=this._getSelectedElement();
if(!this._isElement(f,"body")&&!this._hasSelection()){c.setStyle(f,"color",g);
this._selectNode(f);
e=false
}else{if(!this._isElement(f,"body")&&this._hasSelection()){c.setStyle(f,"color",g);
this._selectNode(f);
e=false
}else{if(this.get("insert")){f=this._createInsertElement({color:g})
}else{this._createCurrentElement("span",{color:g});
this._selectNode(this.currentElement[0])
}e=false
}}return[e]
},cmd_unlink:function(e){this._swapEl(this.currentElement[0],"span",function(f){f.className="yui-non"
});
return[false]
},cmd_createlink:function(g){var f=this._getSelectedElement(),e=null;
if(this._hasParent(f,"a")){this.currentElement[0]=this._hasParent(f,"a")
}else{if(!this._isElement(f,"a")){this._createCurrentElement("a");
e=this._swapEl(this.currentElement[0],"a");
this.currentElement[0]=e
}else{this.currentElement[0]=f
}}return[false]
},cmd_insertimage:function(k){var e=true,f=null,j="insertimage",h=this._getSelectedElement();
if(k===""){k=this.get("blankimage")
}YAHOO.log("InsertImage: "+h.tagName,"info","SimpleEditor");
if(this._isElement(h,"img")){this.currentElement[0]=h;
e=false
}else{if(this._getDoc().queryCommandEnabled(j)){this._getDoc().execCommand("insertimage",false,k);
var l=this._getDoc().getElementsByTagName("img");
for(var g=0;
g<l.length;
g++){if(!YAHOO.util.Dom.hasClass(l[g],"yui-img")){YAHOO.util.Dom.addClass(l[g],"yui-img");
this.currentElement[0]=l[g]
}}e=false
}else{if(h==this._getDoc().body){f=this._getDoc().createElement("img");
f.setAttribute("src",k);
YAHOO.util.Dom.addClass(f,"yui-img");
this._getDoc().body.appendChild(f)
}else{this._createCurrentElement("img");
f=this._getDoc().createElement("img");
f.setAttribute("src",k);
YAHOO.util.Dom.addClass(f,"yui-img");
this.currentElement[0].parentNode.replaceChild(f,this.currentElement[0])
}this.currentElement[0]=f;
e=false
}}return[e]
},cmd_inserthtml:function(h){var e=true,g="inserthtml",f=null,i=null;
if(this.browser.webkit&&!this._getDoc().queryCommandEnabled(g)){YAHOO.log("More Safari DOM tricks (inserthtml)","info","EditorSafari");
this._createCurrentElement("img");
f=this._getDoc().createElement("span");
f.innerHTML=h;
this.currentElement[0].parentNode.replaceChild(f,this.currentElement[0]);
e=false
}else{if(this.browser.ie){i=this._getRange();
if(i.item){i.item(0).outerHTML=h
}else{i.pasteHTML(h)
}e=false
}}return[e]
},cmd_list:function(A){var u=true,x=null,n=0,g=null,s="",y=this._getSelectedElement(),v="insertorderedlist";
if(A=="ul"){v="insertunorderedlist"
}if(this.browser.webkit){if(this._isElement(y,"li")&&this._isElement(y.parentNode,A)){YAHOO.log("We already have a list, undo it","info","SimpleEditor");
g=y.parentNode;
x=this._getDoc().createElement("span");
YAHOO.util.Dom.addClass(x,"yui-non");
s="";
var f=g.getElementsByTagName("li");
for(n=0;
n<f.length;
n++){s+="<div>"+f[n].innerHTML+"</div>"
}x.innerHTML=s;
this.currentElement[0]=g;
this.currentElement[0].parentNode.replaceChild(x,this.currentElement[0])
}else{YAHOO.log("Create list item","info","SimpleEditor");
this._createCurrentElement(A.toLowerCase());
x=this._getDoc().createElement(A);
for(n=0;
n<this.currentElement.length;
n++){var k=this._getDoc().createElement("li");
k.innerHTML=this.currentElement[n].innerHTML+'<span class="yui-non">&nbsp;</span>&nbsp;';
x.appendChild(k);
if(n>0){this.currentElement[n].parentNode.removeChild(this.currentElement[n])
}}this.currentElement[0].parentNode.replaceChild(x,this.currentElement[0]);
this.currentElement[0]=x;
var h=this.currentElement[0].firstChild;
h=c.getElementsByClassName("yui-non","span",h)[0];
this._getSelection().setBaseAndExtent(h,1,h,h.innerText.length)
}u=false
}else{g=this._getSelectedElement();
YAHOO.log(g.tagName);
if(this._isElement(g,"li")&&this._isElement(g.parentNode,A)||(this.browser.ie&&this._isElement(this._getRange().parentElement,"li"))||(this.browser.ie&&this._isElement(g,"ul"))||(this.browser.ie&&this._isElement(g,"ol"))){YAHOO.log("We already have a list, undo it","info","SimpleEditor");
if(this.browser.ie){if((this.browser.ie&&this._isElement(g,"ul"))||(this.browser.ie&&this._isElement(g,"ol"))){g=g.getElementsByTagName("li")[0]
}YAHOO.log("Undo IE","info","SimpleEditor");
s="";
var i=g.parentNode.getElementsByTagName("li");
for(var w=0;
w<i.length;
w++){s+=i[w].innerHTML+"<br>"
}var z=this._getDoc().createElement("span");
z.innerHTML=s;
g.parentNode.parentNode.replaceChild(z,g.parentNode)
}else{this.nodeChange();
this._getDoc().execCommand(v,"",g.parentNode);
this.nodeChange()
}u=false
}if(this.browser.opera){var r=this;
window.setTimeout(function(){var j=r._getDoc().getElementsByTagName("li");
for(var t=0;
t<j.length;
t++){if(j[t].innerHTML.toLowerCase()=="<br>"){j[t].parentNode.parentNode.removeChild(j[t].parentNode)
}}},30)
}if(this.browser.ie&&u){var l="";
if(this._getRange().html){l="<li>"+this._getRange().html+"</li>"
}else{var m=this._getRange().text.split("\n");
if(m.length>1){l="";
for(var q=0;
q<m.length;
q++){l+="<li>"+m[q]+"</li>"
}}else{var p=this._getRange().text;
if(p===""){l='<li id="new_list_item">'+p+"</li>"
}else{l="<li>"+p+"</li>"
}}}this._getRange().pasteHTML("<"+A+">"+l+"</"+A+">");
var e=this._getDoc().getElementById("new_list_item");
if(e){var o=this._getDoc().body.createTextRange();
o.moveToElementText(e);
o.collapse(false);
o.select();
e.id=""
}u=false
}}return u
},cmd_insertorderedlist:function(e){return[this.cmd_list("ol")]
},cmd_insertunorderedlist:function(e){return[this.cmd_list("ul")]
},cmd_fontname:function(h){var e=true,g=this._getSelectedElement();
this.currentFont=h;
if(g&&g.tagName&&!this._hasSelection()&&!this._isElement(g,"body")&&!this.get("insert")){YAHOO.util.Dom.setStyle(g,"font-family",h);
e=false
}else{if(this.get("insert")&&!this._hasSelection()){YAHOO.log("No selection and no selected element and we are in insert mode","info","SimpleEditor");
var f=this._createInsertElement({fontFamily:h});
e=false
}}return[e]
},cmd_fontsize:function(g){var e=null;
if(this.currentElement&&(this.currentElement.length>0)&&(!this._hasSelection())&&(!this.get("insert"))){YAHOO.util.Dom.setStyle(this.currentElement,"fontSize",g)
}else{if(!this._isElement(this._getSelectedElement(),"body")){e=this._getSelectedElement();
YAHOO.util.Dom.setStyle(e,"fontSize",g);
if(this.get("insert")&&this.browser.ie){var f=this._getRange();
f.collapse(false);
f.select()
}else{this._selectNode(e)
}}else{if(this.get("insert")&&!this._hasSelection()){e=this._createInsertElement({fontSize:g});
this.currentElement[0]=e;
this._selectNode(this.currentElement[0])
}else{this._createCurrentElement("span",{fontSize:g});
this._selectNode(this.currentElement[0])
}}}return[false]
},_swapEl:function(f,e,h){var g=this._getDoc().createElement(e);
if(f){g.innerHTML=f.innerHTML
}if(typeof h=="function"){h.call(this,g)
}if(f){f.parentNode.replaceChild(g,f)
}return g
},_createInsertElement:function(e){this._createCurrentElement("span",e);
var f=this.currentElement[0];
if(this.browser.webkit){f.innerHTML='<span class="yui-non">&nbsp;</span>';
f=f.firstChild;
this._getSelection().setBaseAndExtent(f,1,f,f.innerText.length)
}else{if(this.browser.ie||this.browser.opera){f.innerHTML="&nbsp;"
}}this._focusWindow();
this._selectNode(f,true);
return f
},_createCurrentElement:function(h,m){h=((h)?h:"a");
var v=null,g=[],k=this._getDoc();
if(this.currentFont){if(!m){m={}
}m.fontFamily=this.currentFont;
this.currentFont=null
}this.currentElement=[];
var q=function(i,o){var j=null;
i=((i)?i:"span");
i=i.toLowerCase();
switch(i){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":j=k.createElement(i);
break;
default:j=k.createElement(i);
if(i==="span"){YAHOO.util.Dom.addClass(j,"yui-tag-"+i);
YAHOO.util.Dom.addClass(j,"yui-tag");
j.setAttribute("tag",i)
}for(var e in o){if(YAHOO.lang.hasOwnProperty(o,e)){j.style[e]=o[e]
}}break
}return j
};
if(!this._hasSelection()){if(this._getDoc().queryCommandEnabled("insertimage")){this._getDoc().execCommand("insertimage",false,"yui-tmp-img");
var p=this._getDoc().getElementsByTagName("img");
for(var u=0;
u<p.length;
u++){if(p[u].getAttribute("src",2)=="yui-tmp-img"){g=q(h,m);
p[u].parentNode.replaceChild(g,p[u]);
this.currentElement[this.currentElement.length]=g
}}}else{if(this.currentEvent){v=YAHOO.util.Event.getTarget(this.currentEvent)
}else{v=this._getDoc().body
}}if(v){g=q(h,m);
if(this._isElement(v,"body")||this._isElement(v,"html")){if(this._isElement(v,"html")){v=this._getDoc().body
}v.appendChild(g)
}else{if(v.nextSibling){v.parentNode.insertBefore(g,v.nextSibling)
}else{v.parentNode.appendChild(g)
}}this.currentElement[this.currentElement.length]=g;
this.currentEvent=null;
if(this.browser.webkit){this._getSelection().setBaseAndExtent(g,0,g,0);
if(this.browser.webkit3){this._getSelection().collapseToStart()
}else{this._getSelection().collapse(true)
}}}}else{this._setEditorStyle(true);
this._getDoc().execCommand("fontname",false,"yui-tmp");
var f=[],t,z=["font","span","i","b","u"];
if(!this._isElement(this._getSelectedElement(),"body")){z[z.length]=this._getDoc().getElementsByTagName(this._getSelectedElement().tagName);
z[z.length]=this._getDoc().getElementsByTagName(this._getSelectedElement().parentNode.tagName)
}for(var n=0;
n<z.length;
n++){var l=this._getDoc().getElementsByTagName(z[n]);
for(var y=0;
y<l.length;
y++){f[f.length]=l[y]
}}for(var w=0;
w<f.length;
w++){if((YAHOO.util.Dom.getStyle(f[w],"font-family")=="yui-tmp")||(f[w].face&&(f[w].face=="yui-tmp"))){g=q(h,m);
g.innerHTML=f[w].innerHTML;
if(this._isElement(f[w],"ol")||(this._isElement(f[w],"ul"))){var r=f[w].getElementsByTagName("li")[0];
f[w].style.fontFamily="inherit";
r.style.fontFamily="inherit";
g.innerHTML=r.innerHTML;
r.innerHTML="";
r.appendChild(g);
this.currentElement[this.currentElement.length]=g
}else{if(this._isElement(f[w],"li")){f[w].innerHTML="";
f[w].appendChild(g);
f[w].style.fontFamily="inherit";
this.currentElement[this.currentElement.length]=g
}else{if(f[w].parentNode){f[w].parentNode.replaceChild(g,f[w]);
this.currentElement[this.currentElement.length]=g;
this.currentEvent=null;
if(this.browser.webkit){this._getSelection().setBaseAndExtent(g,0,g,0);
if(this.browser.webkit3){this._getSelection().collapseToStart()
}else{this._getSelection().collapse(true)
}}if(this.browser.ie&&m&&m.fontSize){this._getSelection().empty()
}if(this.browser.gecko){this._getSelection().collapseToStart()
}}}}}}var x=this.currentElement.length;
for(var s=0;
s<x;
s++){if((s+1)!=x){if(this.currentElement[s]&&this.currentElement[s].nextSibling){if(this._isElement(this.currentElement[s],"br")){this.currentElement[this.currentElement.length]=this.currentElement[s].nextSibling
}}}}}},saveHTML:function(){var f=this.cleanHTML();
if(this._textarea){this.get("element").value=f
}else{this.get("element").innerHTML=f
}if(this.get("saveEl")!==this.get("element")){var e=this.get("saveEl");
if(d.isString(e)){e=c.get(e)
}if(e){if(e.tagName.toLowerCase()==="textarea"){e.value=f
}else{e.innerHTML=f
}}}return f
},setEditorHTML:function(f){var e=this._cleanIncomingHTML(f);
this._getDoc().body.innerHTML=e;
this.nodeChange()
},getEditorHTML:function(){var e=this._getDoc().body;
if(e===null){YAHOO.log("Body is null, returning null.","error","SimpleEditor");
return null
}return this._getDoc().body.innerHTML
},show:function(){if(this.browser.gecko){this._setDesignMode("on");
this._focusWindow()
}if(this.browser.webkit){var e=this;
window.setTimeout(function(){e._setInitialContent.call(e)
},10)
}if(this.currentWindow){this.closeWindow()
}this.get("iframe").setStyle("position","static");
this.get("iframe").setStyle("left","")
},hide:function(){if(this.currentWindow){this.closeWindow()
}if(this._fixNodesTimer){clearTimeout(this._fixNodesTimer);
this._fixNodesTimer=null
}if(this._nodeChangeTimer){clearTimeout(this._nodeChangeTimer);
this._nodeChangeTimer=null
}this._lastNodeChange=0;
this.get("iframe").setStyle("position","absolute");
this.get("iframe").setStyle("left","-9999px")
},_cleanIncomingHTML:function(e){e=e.replace(/<strong([^>]*)>/gi,"<b$1>");
e=e.replace(/<\/strong>/gi,"</b>");
e=e.replace(/<embed([^>]*)>/gi,"<YUI_EMBED$1>");
e=e.replace(/<\/embed>/gi,"</YUI_EMBED>");
e=e.replace(/<em([^>]*)>/gi,"<i$1>");
e=e.replace(/<\/em>/gi,"</i>");
e=e.replace(/<YUI_EMBED([^>]*)>/gi,"<embed$1>");
e=e.replace(/<\/YUI_EMBED>/gi,"</embed>");
if(this.get("plainText")){YAHOO.log("Filtering as plain text","info","SimpleEditor");
e=e.replace(/\n/g,"<br>").replace(/\r/g,"<br>");
e=e.replace(/  /gi,"&nbsp;&nbsp;");
e=e.replace(/\t/gi,"&nbsp;&nbsp;&nbsp;&nbsp;")
}e=e.replace(/<script([^>]*)>/gi,"<bad>");
e=e.replace(/<\/script([^>]*)>/gi,"</bad>");
e=e.replace(/&lt;script([^>]*)&gt;/gi,"<bad>");
e=e.replace(/&lt;\/script([^>]*)&gt;/gi,"</bad>");
e=e.replace(/\n/g,"<YUI_LF>").replace(/\r/g,"<YUI_LF>");
e=e.replace(new RegExp("<bad([^>]*)>(.*?)</bad>","gi"),"");
e=e.replace(/<YUI_LF>/g,"\n");
return e
},cleanHTML:function(g){if(!g){g=this.getEditorHTML()
}var f=this.get("markup");
g=this.pre_filter_linebreaks(g,f);
g=g.replace(/<img([^>]*)\/>/gi,"<YUI_IMG$1>");
g=g.replace(/<img([^>]*)>/gi,"<YUI_IMG$1>");
g=g.replace(/<input([^>]*)\/>/gi,"<YUI_INPUT$1>");
g=g.replace(/<input([^>]*)>/gi,"<YUI_INPUT$1>");
g=g.replace(/<ul([^>]*)>/gi,"<YUI_UL$1>");
g=g.replace(/<\/ul>/gi,"</YUI_UL>");
g=g.replace(/<blockquote([^>]*)>/gi,"<YUI_BQ$1>");
g=g.replace(/<\/blockquote>/gi,"</YUI_BQ>");
g=g.replace(/<embed([^>]*)>/gi,"<YUI_EMBED$1>");
g=g.replace(/<\/embed>/gi,"</YUI_EMBED>");
if((f=="semantic")||(f=="xhtml")){g=g.replace(/<i(\s+[^>]*)?>/gi,"<em$1>");
g=g.replace(/<\/i>/gi,"</em>");
g=g.replace(/<b(\s+[^>]*)?>/gi,"<strong$1>");
g=g.replace(/<\/b>/gi,"</strong>")
}g=g.replace(/<font/gi,"<font");
g=g.replace(/<\/font>/gi,"</font>");
g=g.replace(/<span/gi,"<span");
g=g.replace(/<\/span>/gi,"</span>");
if((f=="semantic")||(f=="xhtml")||(f=="css")){g=g.replace(new RegExp('<font([^>]*)face="([^>]*)">(.*?)</font>',"gi"),'<span $1 style="font-family: $2;">$3</span>');
g=g.replace(/<u/gi,'<span style="text-decoration: underline;"');
if(this.browser.webkit){g=g.replace(new RegExp('<span class="Apple-style-span" style="font-weight: bold;">([^>]*)</span>',"gi"),"<strong>$1</strong>");
g=g.replace(new RegExp('<span class="Apple-style-span" style="font-style: italic;">([^>]*)</span>',"gi"),"<em>$1</em>")
}g=g.replace(/\/u>/gi,"/span>");
if(f=="css"){g=g.replace(/<em([^>]*)>/gi,"<i$1>");
g=g.replace(/<\/em>/gi,"</i>");
g=g.replace(/<strong([^>]*)>/gi,"<b$1>");
g=g.replace(/<\/strong>/gi,"</b>");
g=g.replace(/<b/gi,'<span style="font-weight: bold;"');
g=g.replace(/\/b>/gi,"/span>");
g=g.replace(/<i/gi,'<span style="font-style: italic;"');
g=g.replace(/\/i>/gi,"/span>")
}g=g.replace(/  /gi," ")
}else{g=g.replace(/<u/gi,"<u");
g=g.replace(/\/u>/gi,"/u>")
}g=g.replace(/<ol([^>]*)>/gi,"<ol$1>");
g=g.replace(/\/ol>/gi,"/ol>");
g=g.replace(/<li/gi,"<li");
g=g.replace(/\/li>/gi,"/li>");
g=this.filter_safari(g);
g=this.filter_internals(g);
g=this.filter_all_rgb(g);
g=this.post_filter_linebreaks(g,f);
if(f=="xhtml"){g=g.replace(/<YUI_IMG([^>]*)>/g,"<img $1 />");
g=g.replace(/<YUI_INPUT([^>]*)>/g,"<input $1 />")
}else{g=g.replace(/<YUI_IMG([^>]*)>/g,"<img $1>");
g=g.replace(/<YUI_INPUT([^>]*)>/g,"<input $1>")
}g=g.replace(/<YUI_UL([^>]*)>/g,"<ul$1>");
g=g.replace(/<\/YUI_UL>/g,"</ul>");
g=this.filter_invalid_lists(g);
g=g.replace(/<YUI_BQ([^>]*)>/g,"<blockquote$1>");
g=g.replace(/<\/YUI_BQ>/g,"</blockquote>");
g=g.replace(/<YUI_EMBED([^>]*)>/g,"<embed$1>");
g=g.replace(/<\/YUI_EMBED>/g,"</embed>");
g=g.replace(" &amp; ","YUI_AMP");
g=g.replace("&amp;","&");
g=g.replace("YUI_AMP","&amp;");
g=YAHOO.lang.trim(g);
if(this.get("removeLineBreaks")){g=g.replace(/\n/g,"").replace(/\r/g,"");
g=g.replace(/  /gi," ")
}if(g.substring(0,6).toLowerCase()=="<span>"){g=g.substring(6);
if(g.substring(g.length-7,g.length).toLowerCase()=="</span>"){g=g.substring(0,g.length-7)
}}for(var e in this.invalidHTML){if(YAHOO.lang.hasOwnProperty(this.invalidHTML,e)){if(d.isObject(e)&&e.keepContents){g=g.replace(new RegExp("<"+e+"([^>]*)>(.*?)</"+e+">","gi"),"$1")
}else{g=g.replace(new RegExp("<"+e+"([^>]*)>(.*?)</"+e+">","gi"),"")
}}}this.fireEvent("cleanHTML",{type:"cleanHTML",target:this,html:g});
return g
},filter_invalid_lists:function(e){e=e.replace(/<\/li>\n/gi,"</li>");
e=e.replace(/<\/li><ol>/gi,"</li><li><ol>");
e=e.replace(/<\/ol>/gi,"</ol></li>");
e=e.replace(/<\/ol><\/li>\n/gi,"</ol>\n");
e=e.replace(/<\/li><ul>/gi,"</li><li><ul>");
e=e.replace(/<\/ul>/gi,"</ul></li>");
e=e.replace(/<\/ul><\/li>\n?/gi,"</ul>\n");
e=e.replace(/<\/li>/gi,"</li>\n");
e=e.replace(/<\/ol>/gi,"</ol>\n");
e=e.replace(/<ol>/gi,"<ol>\n");
e=e.replace(/<ul>/gi,"<ul>\n");
return e
},filter_safari:function(e){if(this.browser.webkit){e=e.replace(/<span class="Apple-tab-span" style="white-space:pre">([^>])<\/span>/gi,"&nbsp;&nbsp;&nbsp;&nbsp;");
e=e.replace(/Apple-style-span/gi,"");
e=e.replace(/style="line-height: normal;"/gi,"");
e=e.replace(/<li><\/li>/gi,"");
e=e.replace(/<li> <\/li>/gi,"");
e=e.replace(/<li>  <\/li>/gi,"");
if(this.get("ptags")){e=e.replace(/<div([^>]*)>/g,"<p$1>");
e=e.replace(/<\/div>/gi,"</p>")
}else{e=e.replace(/<div>/gi,"");
e=e.replace(/<\/div>/gi,"<br>")
}}return e
},filter_internals:function(e){e=e.replace(/\r/g,"");
e=e.replace(/<\/?(body|head|html)[^>]*>/gi,"");
e=e.replace(/<YUI_BR><\/li>/gi,"</li>");
e=e.replace(/yui-tag-span/gi,"");
e=e.replace(/yui-tag/gi,"");
e=e.replace(/yui-non/gi,"");
e=e.replace(/yui-img/gi,"");
e=e.replace(/ tag="span"/gi,"");
e=e.replace(/ class=""/gi,"");
e=e.replace(/ style=""/gi,"");
e=e.replace(/ class=" "/gi,"");
e=e.replace(/ class="  "/gi,"");
e=e.replace(/ target=""/gi,"");
e=e.replace(/ title=""/gi,"");
if(this.browser.ie){e=e.replace(/ class= /gi,"");
e=e.replace(/ class= >/gi,"");
e=e.replace(/_height="([^>])"/gi,"");
e=e.replace(/_width="([^>])"/gi,"")
}return e
},filter_all_rgb:function(j){var h=new RegExp("rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)","gi");
var e=j.match(h);
if(d.isArray(e)){for(var g=0;
g<e.length;
g++){var f=this.filter_rgb(e[g]);
j=j.replace(e[g].toString(),f)
}}return j
},filter_rgb:function(h){if(h.toLowerCase().indexOf("rgb")!=-1){var k=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");
var f=h.replace(k,"$1,$2,$3,$4,$5").split(",");
if(f.length==5){var j=parseInt(f[1],10).toString(16);
var i=parseInt(f[2],10).toString(16);
var e=parseInt(f[3],10).toString(16);
j=j.length==1?"0"+j:j;
i=i.length==1?"0"+i:i;
e=e.length==1?"0"+e:e;
h="#"+j+i+e
}}return h
},pre_filter_linebreaks:function(f,e){if(this.browser.webkit){f=f.replace(/<br class="khtml-block-placeholder">/gi,"<YUI_BR>");
f=f.replace(/<br class="webkit-block-placeholder">/gi,"<YUI_BR>")
}f=f.replace(/<br>/gi,"<YUI_BR>");
f=f.replace(/<br (.*?)>/gi,"<YUI_BR>");
f=f.replace(/<br\/>/gi,"<YUI_BR>");
f=f.replace(/<br \/>/gi,"<YUI_BR>");
f=f.replace(/<div><YUI_BR><\/div>/gi,"<YUI_BR>");
f=f.replace(/<p>(&nbsp;|&#160;)<\/p>/g,"<YUI_BR>");
f=f.replace(/<p><br>&nbsp;<\/p>/gi,"<YUI_BR>");
f=f.replace(/<p>&nbsp;<\/p>/gi,"<YUI_BR>");
f=f.replace(/<YUI_BR>$/,"");
f=f.replace(/<YUI_BR><\/p>/g,"</p>");
if(this.browser.ie){f=f.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g,"\t")
}return f
},post_filter_linebreaks:function(f,e){if(e=="xhtml"){f=f.replace(/<YUI_BR>/g,"<br />")
}else{f=f.replace(/<YUI_BR>/g,"<br>")
}return f
},clearEditorDoc:function(){this._getDoc().body.innerHTML="&nbsp;"
},openWindow:function(e){},moveWindow:function(){},_closeWindow:function(){},closeWindow:function(){this.toolbar.resetAllButtons();
this._focusWindow()
},destroy:function(){YAHOO.log("Destroying Editor","warn","SimpleEditor");
if(this.resize){YAHOO.log("Destroying Resize","warn","SimpleEditor");
this.resize.destroy()
}if(this.dd){YAHOO.log("Unreg DragDrop Instance","warn","SimpleEditor");
this.dd.unreg()
}if(this.get("panel")){YAHOO.log("Destroying Editor Panel","warn","SimpleEditor");
this.get("panel").destroy()
}this.saveHTML();
this.toolbar.destroy();
YAHOO.log("Restoring TextArea","info","SimpleEditor");
this.setStyle("visibility","visible");
this.setStyle("position","static");
this.setStyle("top","");
this.setStyle("left","");
var e=this.get("element");
this.get("element_cont").get("parentNode").replaceChild(e,this.get("element_cont").get("element"));
this.get("element_cont").get("element").innerHTML="";
this.set("handleSubmit",false);
return true
},toString:function(){var e="SimpleEditor";
if(this.get&&this.get("element_cont")){e="SimpleEditor (#"+this.get("element_cont").get("id")+")"+((this.get("disabled")?" Disabled":""))
}return e
}});
YAHOO.widget.EditorInfo={_instances:{},blankImage:"",window:{},panel:null,getEditorById:function(e){if(!YAHOO.lang.isString(e)){e=e.id
}if(this._instances[e]){return this._instances[e]
}return false
},toString:function(){var e=0;
for(var f in this._instances){if(d.hasOwnProperty(this._instances,f)){e++
}}return"Editor Info ("+e+" registered intance"+((e>1)?"s":"")+")"
}}
})();
(function(){var c=YAHOO.util.Dom,a=YAHOO.util.Event,d=YAHOO.lang,b=YAHOO.widget.Toolbar;
YAHOO.widget.Editor=function(f,e){YAHOO.log("Editor Initalizing","info","Editor");
YAHOO.widget.Editor.superclass.constructor.call(this,f,e)
};
YAHOO.extend(YAHOO.widget.Editor,YAHOO.widget.SimpleEditor,{_undoCache:null,_undoLevel:null,_hasUndoLevel:function(){return(this._undoCache.length&&this._undoLevel)
},_undoNodeChange:function(){var e=this.toolbar.getButtonByValue("undo"),f=this.toolbar.getButtonByValue("redo");
if(e&&f){if(this._hasUndoLevel()){this.toolbar.enableButton(e)
}if(this._undoLevel<this._undoCache.length){this.toolbar.enableButton(f)
}}},_checkUndo:function(){var e=this._undoCache.length,g=[];
if(e>=this.get("maxUndo")){for(var f=(e-this.get("maxUndo"));
f<e;
f++){g.push(this._undoCache[f])
}this._undoCache=g
}},_putUndo:function(e){this._undoCache.push(e)
},_getUndo:function(e){return this._undoCache[e]
},_storeUndo:function(){if(this._lastCommand==="undo"||this._lastCommand==="redo"){return false
}if(!this._undoCache){this._undoCache=[]
}this._checkUndo();
var f=this.getEditorHTML();
var e=this._undoCache[this._undoCache.length-1];
if(e){if(f!==e){this._putUndo(f)
}}else{this._putUndo(f)
}this._undoLevel=this._undoCache.length;
this._undoNodeChange()
},STR_BEFORE_EDITOR:"This text field can contain stylized text and graphics. To cycle through all formatting options, use the keyboard shortcut Control + Shift + T to place focus on the toolbar and navigate between option heading names. <h4>Common formatting keyboard shortcuts:</h4><ul><li>Control Shift B sets text to bold</li> <li>Control Shift I sets text to italic</li> <li>Control Shift U underlines text</li> <li>Control Shift [ aligns text left</li> <li>Control Shift | centers text</li> <li>Control Shift ] aligns text right</li> <li>Control Shift L adds an HTML link</li> <li>To exit this text editor use the keyboard shortcut Control + Shift + ESC.</li></ul>",STR_CLOSE_WINDOW:"Close Window",STR_CLOSE_WINDOW_NOTE:"To close this window use the Control + Shift + W key",STR_IMAGE_PROP_TITLE:"Image Options",STR_IMAGE_URL:"Image URL",STR_IMAGE_TITLE:"Description",STR_IMAGE_SIZE:"Size",STR_IMAGE_ORIG_SIZE:"Original Size",STR_IMAGE_COPY:'<span class="tip"><span class="icon icon-info"></span><strong>Note:</strong>To move this image just highlight it, cut, and paste where ever you\'d like.</span>',STR_IMAGE_PADDING:"Padding",STR_IMAGE_BORDER:"Border",STR_IMAGE_BORDER_SIZE:"Border Size",STR_IMAGE_BORDER_TYPE:"Border Type",STR_IMAGE_TEXTFLOW:"Text Flow",STR_LOCAL_FILE_WARNING:'<span class="tip"><span class="icon icon-warn"></span><strong>Note:</strong>This image/link points to a file on your computer and will not be accessible to others on the internet.</span>',STR_LINK_PROP_TITLE:"Link Options",STR_LINK_PROP_REMOVE:"Remove link from text",STR_LINK_NEW_WINDOW:"Open in a new window.",STR_LINK_TITLE:"Description",CLASS_LOCAL_FILE:"warning-localfile",CLASS_HIDDEN:"yui-hidden",init:function(f,e){YAHOO.log("init","info","Editor");
this._windows={};
this._defaultToolbar={collapse:true,titlebar:"Text Editing Tools",draggable:false,buttonType:"advanced",buttons:[{group:"fontstyle",label:"Font Name and Size",buttons:[{type:"select",label:"Arial",value:"fontname",disabled:true,menu:[{text:"Arial",checked:true},{text:"Arial Black"},{text:"Comic Sans MS"},{text:"Courier New"},{text:"Lucida Console"},{text:"Tahoma"},{text:"Times New Roman"},{text:"Trebuchet MS"},{text:"Verdana"}]},{type:"spin",label:"13",value:"fontsize",range:[9,75],disabled:true}]},{type:"separator"},{group:"textstyle",label:"Font Style",buttons:[{type:"push",label:"Bold CTRL + SHIFT + B",value:"bold"},{type:"push",label:"Italic CTRL + SHIFT + I",value:"italic"},{type:"push",label:"Underline CTRL + SHIFT + U",value:"underline"},{type:"separator"},{type:"push",label:"Subscript",value:"subscript",disabled:true},{type:"push",label:"Superscript",value:"superscript",disabled:true}]},{type:"separator"},{group:"textstyle2",label:"&nbsp;",buttons:[{type:"color",label:"Font Color",value:"forecolor",disabled:true},{type:"color",label:"Background Color",value:"backcolor",disabled:true},{type:"separator"},{type:"push",label:"Remove Formatting",value:"removeformat",disabled:true},{type:"push",label:"Show/Hide Hidden Elements",value:"hiddenelements"}]},{type:"separator"},{group:"undoredo",label:"Undo/Redo",buttons:[{type:"push",label:"Undo",value:"undo",disabled:true},{type:"push",label:"Redo",value:"redo",disabled:true}]},{type:"separator"},{group:"alignment",label:"Alignment",buttons:[{type:"push",label:"Align Left CTRL + SHIFT + [",value:"justifyleft"},{type:"push",label:"Align Center CTRL + SHIFT + |",value:"justifycenter"},{type:"push",label:"Align Right CTRL + SHIFT + ]",value:"justifyright"},{type:"push",label:"Justify",value:"justifyfull"}]},{type:"separator"},{group:"parastyle",label:"Paragraph Style",buttons:[{type:"select",label:"Normal",value:"heading",disabled:true,menu:[{text:"Normal",value:"none",checked:true},{text:"Header 1",value:"h1"},{text:"Header 2",value:"h2"},{text:"Header 3",value:"h3"},{text:"Header 4",value:"h4"},{text:"Header 5",value:"h5"},{text:"Header 6",value:"h6"}]}]},{type:"separator"},{group:"indentlist2",label:"Indenting and Lists",buttons:[{type:"push",label:"Indent",value:"indent",disabled:true},{type:"push",label:"Outdent",value:"outdent",disabled:true},{type:"push",label:"Create an Unordered List",value:"insertunorderedlist"},{type:"push",label:"Create an Ordered List",value:"insertorderedlist"}]},{type:"separator"},{group:"insertitem",label:"Insert Item",buttons:[{type:"push",label:"HTML Link CTRL + SHIFT + L",value:"createlink",disabled:true},{type:"push",label:"Insert Image",value:"insertimage"}]}]};
this._defaultImageToolbarConfig={buttonType:this._defaultToolbar.buttonType,buttons:[{group:"textflow",label:this.STR_IMAGE_TEXTFLOW+":",buttons:[{type:"push",label:"Left",value:"left"},{type:"push",label:"Inline",value:"inline"},{type:"push",label:"Block",value:"block"},{type:"push",label:"Right",value:"right"}]},{type:"separator"},{group:"padding",label:this.STR_IMAGE_PADDING+":",buttons:[{type:"spin",label:"0",value:"padding",range:[0,50]}]},{type:"separator"},{group:"border",label:this.STR_IMAGE_BORDER+":",buttons:[{type:"select",label:this.STR_IMAGE_BORDER_SIZE,value:"bordersize",menu:[{text:"none",value:"0",checked:true},{text:"1px",value:"1"},{text:"2px",value:"2"},{text:"3px",value:"3"},{text:"4px",value:"4"},{text:"5px",value:"5"}]},{type:"select",label:this.STR_IMAGE_BORDER_TYPE,value:"bordertype",disabled:true,menu:[{text:"Solid",value:"solid",checked:true},{text:"Dashed",value:"dashed"},{text:"Dotted",value:"dotted"}]},{type:"color",label:"Border Color",value:"bordercolor",disabled:true}]}]};
YAHOO.widget.Editor.superclass.init.call(this,f,e)
},_render:function(){YAHOO.widget.Editor.superclass._render.apply(this,arguments);
var e=this;
window.setTimeout(function(){e._renderPanel.call(e)
},800)
},initAttributes:function(e){YAHOO.widget.Editor.superclass.initAttributes.call(this,e);
this.setAttributeConfig("localFileWarning",{value:e.locaFileWarning||true});
this.setAttributeConfig("hiddencss",{value:e.hiddencss||".yui-hidden font, .yui-hidden strong, .yui-hidden b, .yui-hidden em, .yui-hidden i, .yui-hidden u, .yui-hidden div,.yui-hidden p,.yui-hidden span,.yui-hidden img, .yui-hidden ul, .yui-hidden ol, .yui-hidden li, .yui-hidden table { border: 1px dotted #ccc; } .yui-hidden .yui-non { border: none; } .yui-hidden img { padding: 2px; }",writeOnce:true})
},_windows:null,_defaultImageToolbar:null,_defaultImageToolbarConfig:null,_fixNodes:function(){YAHOO.widget.Editor.superclass._fixNodes.call(this);
var h="";
var i=this._getDoc().getElementsByTagName("img");
for(var f=0;
f<i.length;
f++){if(i[f].getAttribute("href",2)){h=i[f].getAttribute("src",2);
if(this._isLocalFile(h)){c.addClass(i[f],this.CLASS_LOCAL_FILE)
}else{c.removeClass(i[f],this.CLASS_LOCAL_FILE)
}}}var g=this._getDoc().body.getElementsByTagName("a");
for(var e=0;
e<g.length;
e++){if(g[e].getAttribute("href",2)){h=g[e].getAttribute("href",2);
if(this._isLocalFile(h)){c.addClass(g[e],this.CLASS_LOCAL_FILE)
}else{c.removeClass(g[e],this.CLASS_LOCAL_FILE)
}}}},_disabled:["createlink","forecolor","backcolor","fontname","fontsize","superscript","subscript","removeformat","heading","indent"],_alwaysDisabled:{outdent:true},_alwaysEnabled:{hiddenelements:true},_handleKeyDown:function(g){YAHOO.widget.Editor.superclass._handleKeyDown.call(this,g);
var f=false,h=null,e=false;
switch(g.keyCode){case this._keyMap.JUSTIFY_LEFT.key:if(this._checkKey(this._keyMap.JUSTIFY_LEFT,g)){h="justifyleft";
f=true
}break;
case this._keyMap.JUSTIFY_CENTER.key:if(this._checkKey(this._keyMap.JUSTIFY_CENTER,g)){h="justifycenter";
f=true
}break;
case 221:case this._keyMap.JUSTIFY_RIGHT.key:if(this._checkKey(this._keyMap.JUSTIFY_RIGHT,g)){h="justifyright";
f=true
}break
}if(f&&h){this.execCommand(h,null);
a.stopEvent(g);
this.nodeChange()
}},_renderCreateLinkWindow:function(){var h='<label for="'+this.get("id")+'_createlink_url"><strong>'+this.STR_LINK_URL+':</strong> <input type="text" name="'+this.get("id")+'_createlink_url" id="'+this.get("id")+'_createlink_url" value=""></label>';
h+='<label for="'+this.get("id")+'_createlink_target"><strong>&nbsp;</strong><input type="checkbox" name="'+this.get("id")+'_createlink_target" id="'+this.get("id")+'_createlink_target" value="_blank" class="createlink_target"> '+this.STR_LINK_NEW_WINDOW+"</label>";
h+='<label for="'+this.get("id")+'_createlink_title"><strong>'+this.STR_LINK_TITLE+':</strong> <input type="text" name="'+this.get("id")+'_createlink_title" id="'+this.get("id")+'_createlink_title" value=""></label>';
var e=document.createElement("div");
e.innerHTML=h;
var g=document.createElement("div");
g.className="removeLink";
var f=document.createElement("a");
f.href="#";
f.innerHTML=this.STR_LINK_PROP_REMOVE;
f.title=this.STR_LINK_PROP_REMOVE;
a.on(f,"click",function(i){a.stopEvent(i);
this.execCommand("unlink");
this.closeWindow()
},this,true);
g.appendChild(f);
e.appendChild(g);
this._windows.createlink={};
this._windows.createlink.body=e;
e.style.display="none";
this.get("panel").editor_form.appendChild(e);
this.fireEvent("windowCreateLinkRender",{type:"windowCreateLinkRender",panel:this.get("panel"),body:e});
return e
},_handleCreateLinkClick:function(){var e=this._getSelectedElement();
if(this._isElement(e,"img")){this.STOP_EXEC_COMMAND=true;
this.currentElement[0]=e;
this.toolbar.fireEvent("insertimageClick",{type:"insertimageClick",target:this.toolbar});
this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});
return false
}if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){YAHOO.log("Toolbar Button for (createlink) was not found, skipping exec.","info","Editor");
return false
}}this.on("afterExecCommand",function(){var k=new YAHOO.widget.EditorWindow("createlink",{width:"350px"});
var i=this.currentElement[0],h="",l="",j="",g=false;
if(i){k.el=i;
if(i.getAttribute("href",2)!==null){h=i.getAttribute("href",2);
if(this._isLocalFile(h)){YAHOO.log("Local file reference found, show local warning","warn","Editor");
k.setFooter(this.STR_LOCAL_FILE_WARNING);
g=true
}else{k.setFooter(" ")
}}if(i.getAttribute("title")!==null){l=i.getAttribute("title")
}if(i.getAttribute("target")!==null){j=i.getAttribute("target")
}}var f=null;
if(this._windows.createlink&&this._windows.createlink.body){f=this._windows.createlink.body
}else{f=this._renderCreateLinkWindow()
}k.setHeader(this.STR_LINK_PROP_TITLE);
k.setBody(f);
a.purgeElement(this.get("id")+"_createlink_url");
c.get(this.get("id")+"_createlink_url").value=h;
c.get(this.get("id")+"_createlink_title").value=l;
c.get(this.get("id")+"_createlink_target").checked=((j)?true:false);
a.onAvailable(this.get("id")+"_createlink_url",function(){var m=this.get("id");
window.setTimeout(function(){try{YAHOO.util.Dom.get(m+"_createlink_url").focus()
}catch(n){}},50);
if(this._isLocalFile(h)){c.addClass(this.get("id")+"_createlink_url","warning");
YAHOO.log("Local file reference found, show local warning","warn","Editor");
this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING)
}else{c.removeClass(this.get("id")+"_createlink_url","warning");
this.get("panel").setFooter(" ")
}a.on(this.get("id")+"_createlink_url","blur",function(){var n=c.get(this.get("id")+"_createlink_url");
if(this._isLocalFile(n.value)){c.addClass(n,"warning");
YAHOO.log("Local file reference found, show local warning","warn","Editor");
this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING)
}else{c.removeClass(n,"warning");
this.get("panel").setFooter(" ")
}},this,true)
},this,true);
this.openWindow(k)
})
},_handleCreateLinkWindowClose:function(){var g=c.get(this.get("id")+"_createlink_url"),i=c.get(this.get("id")+"_createlink_target"),k=c.get(this.get("id")+"_createlink_title"),h=arguments[0].win.el,e=h;
if(g&&g.value){var j=g.value;
if((j.indexOf("://")==-1)&&(j.substring(0,1)!="/")&&(j.substring(0,6).toLowerCase()!="mailto")){if((j.indexOf("@")!=-1)&&(j.substring(0,6).toLowerCase()!="mailto")){j="mailto:"+j
}else{if(j.substring(0,1)!="#"){j="http://"+j
}}}h.setAttribute("href",j);
if(i.checked){h.setAttribute("target",i.value)
}else{h.setAttribute("target","")
}h.setAttribute("title",((k.value)?k.value:""))
}else{var f=this._getDoc().createElement("span");
f.innerHTML=h.innerHTML;
c.addClass(f,"yui-non");
h.parentNode.replaceChild(f,h)
}c.removeClass(g,"warning");
c.get(this.get("id")+"_createlink_url").value="";
c.get(this.get("id")+"_createlink_title").value="";
c.get(this.get("id")+"_createlink_target").checked=false;
this.nodeChange();
this.currentElement=[]
},_renderInsertImageWindow:function(){var g=this.currentElement[0];
var m='<label for="'+this.get("id")+'_insertimage_url"><strong>'+this.STR_IMAGE_URL+':</strong> <input type="text" id="'+this.get("id")+'_insertimage_url" value="" size="40"></label>';
var k=document.createElement("div");
k.innerHTML=m;
var j=document.createElement("div");
j.id=this.get("id")+"_img_toolbar";
k.appendChild(j);
var i='<label for="'+this.get("id")+'_insertimage_title"><strong>'+this.STR_IMAGE_TITLE+':</strong> <input type="text" id="'+this.get("id")+'_insertimage_title" value="" size="40"></label>';
i+='<label for="'+this.get("id")+'_insertimage_link"><strong>'+this.STR_LINK_URL+':</strong> <input type="text" name="'+this.get("id")+'_insertimage_link" id="'+this.get("id")+'_insertimage_link" value=""></label>';
i+='<label for="'+this.get("id")+'_insertimage_target"><strong>&nbsp;</strong><input type="checkbox" name="'+this.get("id")+'_insertimage_target_" id="'+this.get("id")+'_insertimage_target" value="_blank" class="insertimage_target"> '+this.STR_LINK_NEW_WINDOW+"</label>";
var e=document.createElement("div");
e.innerHTML=i;
k.appendChild(e);
var f={};
d.augmentObject(f,this._defaultImageToolbarConfig);
var h=new YAHOO.widget.Toolbar(j,f);
h.editor_el=g;
this._defaultImageToolbar=h;
var n=h.get("cont");
var l=document.createElement("div");
l.className="yui-toolbar-group yui-toolbar-group-height-width height-width";
l.innerHTML="<h3>"+this.STR_IMAGE_SIZE+":</h3>";
l.innerHTML+='<span tabIndex="-1"><input type="text" size="3" value="" id="'+this.get("id")+'_insertimage_width"> x <input type="text" size="3" value="" id="'+this.get("id")+'_insertimage_height"></span>';
n.insertBefore(l,n.firstChild);
a.onAvailable(this.get("id")+"_insertimage_width",function(){a.on(this.get("id")+"_insertimage_width","blur",function(){var o=parseInt(c.get(this.get("id")+"_insertimage_width").value,10);
if(o>5){this._defaultImageToolbar.editor_el.style.width=o+"px"
}},this,true)
},this,true);
a.onAvailable(this.get("id")+"_insertimage_height",function(){a.on(this.get("id")+"_insertimage_height","blur",function(){var o=parseInt(c.get(this.get("id")+"_insertimage_height").value,10);
if(o>5){this._defaultImageToolbar.editor_el.style.height=o+"px"
}},this,true)
},this,true);
h.on("colorPickerClicked",function(u){var q="1",t="solid",p="black",s=this._defaultImageToolbar.editor_el;
if(s.style.borderLeftWidth){q=parseInt(s.style.borderLeftWidth,10)
}if(s.style.borderLeftStyle){t=s.style.borderLeftStyle
}if(s.style.borderLeftColor){p=s.style.borderLeftColor
}var r=q+"px "+t+" #"+u.color;
s.style.border=r
},this,true);
h.on("buttonClick",function(w){var u=w.button.value,t=this._defaultImageToolbar.editor_el,s="";
if(w.button.menucmd){u=w.button.menucmd
}var q="1",r="solid",p="black";
if(t.style.borderLeftWidth){q=parseInt(t.style.borderLeftWidth,10)
}if(t.style.borderLeftStyle){r=t.style.borderLeftStyle
}if(t.style.borderLeftColor){p=t.style.borderLeftColor
}switch(u){case"bordersize":if(this.browser.webkit&&this._lastImage){c.removeClass(this._lastImage,"selected");
this._lastImage=null
}s=parseInt(w.button.value,10)+"px "+r+" "+p;
t.style.border=s;
if(parseInt(w.button.value,10)>0){h.enableButton("bordertype");
h.enableButton("bordercolor")
}else{h.disableButton("bordertype");
h.disableButton("bordercolor")
}break;
case"bordertype":if(this.browser.webkit&&this._lastImage){c.removeClass(this._lastImage,"selected");
this._lastImage=null
}s=q+"px "+w.button.value+" "+p;
t.style.border=s;
break;
case"right":case"left":h.deselectAllButtons();
t.style.display="";
t.align=w.button.value;
break;
case"inline":h.deselectAllButtons();
t.style.display="";
t.align="";
break;
case"block":h.deselectAllButtons();
t.style.display="block";
t.align="center";
break;
case"padding":var v=h.getButtonById(w.button.id);
t.style.margin=v.get("label")+"px";
break
}h.selectButton(w.button.value);
if(u!=="padding"){this.moveWindow()
}},this,true);
if(this.get("localFileWarning")){a.on(this.get("id")+"_insertimage_link","blur",function(){var o=c.get(this.get("id")+"_insertimage_link");
if(this._isLocalFile(o.value)){c.addClass(o,"warning");
YAHOO.log("Local file reference found, show local warning","warn","Editor");
this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING)
}else{c.removeClass(o,"warning");
this.get("panel").setFooter(" ");
if((this.browser.webkit&&!this.browser.webkit3||this.browser.air)||this.browser.opera){this.get("panel").setFooter(this.STR_IMAGE_COPY)
}}},this,true)
}a.on(this.get("id")+"_insertimage_url","blur",function(){var q=c.get(this.get("id")+"_insertimage_url");
if(q.value&&g){if(q.value==g.getAttribute("src",2)){YAHOO.log("Images are the same, bail on blur handler","info","Editor");
return false
}}YAHOO.log("Images are different, process blur handler","info","Editor");
if(this._isLocalFile(q.value)){c.addClass(q,"warning");
YAHOO.log("Local file reference found, show local warning","warn","Editor");
this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING)
}else{if(this.currentElement[0]){c.removeClass(q,"warning");
this.get("panel").setFooter(" ");
if((this.browser.webkit&&!this.browser.webkit3||this.browser.air)||this.browser.opera){this.get("panel").setFooter(this.STR_IMAGE_COPY)
}if(q&&q.value&&(q.value!=this.STR_IMAGE_HERE)){this.currentElement[0].setAttribute("src",q.value);
var p=this,o=new Image();
o.onerror=function(){q.value=p.STR_IMAGE_HERE;
o.setAttribute("src",p.get("blankimage"));
p.currentElement[0].setAttribute("src",p.get("blankimage"));
YAHOO.util.Dom.get(p.get("id")+"_insertimage_height").value=o.height;
YAHOO.util.Dom.get(p.get("id")+"_insertimage_width").value=o.width
};
var r=this.get("id");
window.setTimeout(function(){YAHOO.util.Dom.get(r+"_insertimage_height").value=o.height;
YAHOO.util.Dom.get(r+"_insertimage_width").value=o.width;
if(p.currentElement&&p.currentElement[0]){if(!p.currentElement[0]._height){p.currentElement[0]._height=o.height
}if(!p.currentElement[0]._width){p.currentElement[0]._width=o.width
}}},800);
if(q.value!=this.STR_IMAGE_HERE){o.src=q.value
}}}}},this,true);
this._windows.insertimage={};
this._windows.insertimage.body=k;
k.style.display="none";
this.get("panel").editor_form.appendChild(k);
this.fireEvent("windowInsertImageRender",{type:"windowInsertImageRender",panel:this.get("panel"),body:k,toolbar:h});
return k
},_handleInsertImageClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("insertimage")){YAHOO.log("Toolbar Button for (insertimage) was not found, skipping exec.","info","Editor");
return false
}}this.on("afterExecCommand",function(){var h=this.currentElement[0],p=null,m="",B="",g=null,C="",l="",z="",t=75,x=75,r=0,n=0,k=0,u=false,j=new YAHOO.widget.EditorWindow("insertimage",{width:"415px"});
if(!h){h=this._getSelectedElement()
}if(h){j.el=h;
if(h.getAttribute("src")){l=h.getAttribute("src",2);
if(l.indexOf(this.get("blankimage"))!=-1){l=this.STR_IMAGE_HERE;
u=true
}}if(h.getAttribute("alt",2)){C=h.getAttribute("alt",2)
}if(h.getAttribute("title",2)){C=h.getAttribute("title",2)
}if(h.parentNode&&this._isElement(h.parentNode,"a")){m=h.parentNode.getAttribute("href",2);
if(h.parentNode.getAttribute("target")!==null){B=h.parentNode.getAttribute("target")
}}t=parseInt(h.height,10);
x=parseInt(h.width,10);
if(h.style.height){t=parseInt(h.style.height,10)
}if(h.style.width){x=parseInt(h.style.width,10)
}if(h.style.margin){r=parseInt(h.style.margin,10)
}if(!h._height){h._height=t
}if(!h._width){h._width=x
}n=h._height;
k=h._width
}if(this._windows.insertimage&&this._windows.insertimage.body){p=this._windows.insertimage.body;
this._defaultImageToolbar.resetAllButtons()
}else{p=this._renderInsertImageWindow()
}g=this._defaultImageToolbar;
g.editor_el=h;
var f="0";
var w="solid";
if(h.style.borderLeftWidth){f=parseInt(h.style.borderLeftWidth,10)
}if(h.style.borderLeftStyle){w=h.style.borderLeftStyle
}var A=g.getButtonByValue("bordersize");
var y=((parseInt(f,10)>0)?"":"none");
A.set("label",'<span class="yui-toolbar-bordersize-'+f+'">'+y+"</span>");
this._updateMenuChecked("bordersize",f,g);
var o=g.getButtonByValue("bordertype");
o.set("label",'<span class="yui-toolbar-bordertype-'+w+'"></span>');
this._updateMenuChecked("bordertype",w,g);
if(parseInt(f,10)>0){g.enableButton(o);
g.enableButton(A);
g.enableButton("bordercolor")
}if((h.align=="right")||(h.align=="left")){g.selectButton(h.align)
}else{if(h.style.display=="block"){g.selectButton("block")
}else{g.selectButton("inline")
}}if(parseInt(h.style.marginLeft,10)>0){g.getButtonByValue("padding").set("label",""+parseInt(h.style.marginLeft,10))
}if(h.style.borderSize){g.selectButton("bordersize");
g.selectButton(parseInt(h.style.borderSize,10))
}g.getButtonByValue("padding").set("label",""+r);
j.setHeader(this.STR_IMAGE_PROP_TITLE);
j.setBody(p);
if((this.browser.webkit&&!this.browser.webkit3||this.browser.air)||this.browser.opera){j.setFooter(this.STR_IMAGE_COPY)
}this.openWindow(j);
c.get(this.get("id")+"_insertimage_url").value=l;
c.get(this.get("id")+"_insertimage_title").value=C;
c.get(this.get("id")+"_insertimage_link").value=m;
c.get(this.get("id")+"_insertimage_target").checked=((B)?true:false);
c.get(this.get("id")+"_insertimage_width").value=x;
c.get(this.get("id")+"_insertimage_height").value=t;
var i="";
if((t!=n)||(x!=k)){var q=document.createElement("span");
q.className="info";
q.innerHTML=this.STR_IMAGE_ORIG_SIZE+": ("+k+" x "+n+")";
if(c.get(this.get("id")+"_insertimage_height").nextSibling){var e=c.get(this.get("id")+"_insertimage_height").nextSibling;
e.parentNode.removeChild(e)
}c.get(this.get("id")+"_insertimage_height").parentNode.appendChild(q)
}this.toolbar.selectButton("insertimage");
var v=this.get("id");
window.setTimeout(function(){try{YAHOO.util.Dom.get(v+"_insertimage_url").focus();
if(u){YAHOO.util.Dom.get(v+"_insertimage_url").select()
}}catch(s){}},50)
})
},_handleInsertImageWindowClose:function(){var e=c.get(this.get("id")+"_insertimage_url"),l=c.get(this.get("id")+"_insertimage_title"),i=c.get(this.get("id")+"_insertimage_link"),j=c.get(this.get("id")+"_insertimage_target"),h=arguments[0].win.el;
if(e&&e.value&&(e.value!=this.STR_IMAGE_HERE)){h.setAttribute("src",e.value);
h.setAttribute("title",l.value);
h.setAttribute("alt",l.value);
var g=h.parentNode;
if(i.value){var k=i.value;
if((k.indexOf("://")==-1)&&(k.substring(0,1)!="/")&&(k.substring(0,6).toLowerCase()!="mailto")){if((k.indexOf("@")!=-1)&&(k.substring(0,6).toLowerCase()!="mailto")){k="mailto:"+k
}else{k="http://"+k
}}if(g&&this._isElement(g,"a")){g.setAttribute("href",k);
if(j.checked){g.setAttribute("target",j.value)
}else{g.setAttribute("target","")
}}else{var f=this._getDoc().createElement("a");
f.setAttribute("href",k);
if(j.checked){f.setAttribute("target",j.value)
}else{f.setAttribute("target","")
}h.parentNode.replaceChild(f,h);
f.appendChild(h)
}}else{if(g&&this._isElement(g,"a")){g.parentNode.replaceChild(h,g)
}}}else{h.parentNode.removeChild(h)
}c.get(this.get("id")+"_insertimage_url").value="";
c.get(this.get("id")+"_insertimage_title").value="";
c.get(this.get("id")+"_insertimage_link").value="";
c.get(this.get("id")+"_insertimage_target").checked=false;
c.get(this.get("id")+"_insertimage_width").value=0;
c.get(this.get("id")+"_insertimage_height").value=0;
this._defaultImageToolbar.resetAllButtons();
this.currentElement=[];
this.nodeChange()
},EDITOR_PANEL_ID:"-panel",_renderPanel:function(){var e=new YAHOO.widget.Overlay(this.get("id")+this.EDITOR_PANEL_ID,{width:"300px",iframe:true,visible:false,underlay:"none",draggable:false,close:false});
this.set("panel",e);
this.get("panel").setBody("---");
this.get("panel").setHeader(" ");
this.get("panel").setFooter(" ");
var j=document.createElement("div");
j.className=this.CLASS_PREFIX+"-body-cont";
for(var k in this.browser){if(this.browser[k]){c.addClass(j,k);
break
}}c.addClass(j,((YAHOO.widget.Button&&(this._defaultToolbar.buttonType=="advanced"))?"good-button":"no-button"));
var h=document.createElement("h3");
h.className="yui-editor-skipheader";
h.innerHTML=this.STR_CLOSE_WINDOW_NOTE;
j.appendChild(h);
var f=document.createElement("form");
f.setAttribute("method","GET");
e.editor_form=f;
a.on(f,"submit",function(n){a.stopEvent(n)
},this,true);
j.appendChild(f);
var g=document.createElement("span");
g.innerHTML="X";
g.title=this.STR_CLOSE_WINDOW;
g.className="close";
a.on(g,"click",this.closeWindow,this,true);
var l=document.createElement("span");
l.innerHTML="^";
l.className="knob";
e.editor_knob=l;
var m=document.createElement("h3");
e.editor_header=m;
m.innerHTML="<span></span>";
e.setHeader(" ");
e.appendToHeader(m);
m.appendChild(g);
m.appendChild(l);
e.setBody(" ");
e.setFooter(" ");
e.appendToBody(j);
a.on(e.element,"click",function(n){a.stopPropagation(n)
});
var i=function(){};
e.showEvent.subscribe(i,this,true);
e.renderEvent.subscribe(function(){this._renderInsertImageWindow();
this._renderCreateLinkWindow();
this.fireEvent("windowRender",{type:"windowRender",panel:e})
},this,true);
if(this.DOMReady){this.get("panel").render(document.body);
c.addClass(this.get("panel").element,"yui-editor-panel")
}else{a.onDOMReady(function(){this.get("panel").render(document.body);
c.addClass(this.get("panel").element,"yui-editor-panel")
},this,true)
}this.get("panel").showEvent.subscribe(function(){YAHOO.util.Dom.setStyle(this.element,"display","block")
});
return this.get("panel")
},openWindow:function(k){YAHOO.log("openWindow: "+k.name,"info","Editor");
var p=this;
window.setTimeout(function(){p.toolbar.set("disabled",true)
},10);
a.on(document,"keydown",this._closeWindow,this,true);
if(this.currentWindow){this.closeWindow()
}var q=c.getXY(this.currentElement[0]),n=c.getXY(this.get("iframe").get("element")),e=this.get("panel"),h=[(q[0]+n[0]-20),(q[1]+n[1]+10)],g=(parseInt(k.attrs.width,10)/2),l="center",j=null;
this.fireEvent("beforeOpenWindow",{type:"beforeOpenWindow",win:k,panel:e});
var f=e.editor_form;
var i=this._windows;
for(var o in i){if(d.hasOwnProperty(i,o)){if(i[o]&&i[o].body){if(o==k.name){c.setStyle(i[o].body,"display","block")
}else{c.setStyle(i[o].body,"display","none")
}}}}if(this._windows[k.name].body){c.setStyle(this._windows[k.name].body,"display","block");
f.appendChild(this._windows[k.name].body)
}else{if(d.isObject(k.body)){f.appendChild(k.body)
}else{var m=document.createElement("div");
m.innerHTML=k.body;
f.appendChild(m)
}}e.editor_header.firstChild.innerHTML=k.header;
if(k.footer!==null){e.setFooter(k.footer);
c.addClass(e.footer,"open")
}else{c.removeClass(e.footer,"open")
}e.cfg.setProperty("width",k.attrs.width);
this.currentWindow=k;
this.moveWindow(true);
e.show();
this.fireEvent("afterOpenWindow",{type:"afterOpenWindow",win:k,panel:e})
},moveWindow:function(g){if(!this.currentWindow){return false
}var k=this.currentWindow,l=c.getXY(this.currentElement[0]),D=c.getXY(this.get("iframe").get("element")),q=this.get("panel"),B=[(l[0]+D[0]),(l[1]+D[1])],t=(parseInt(k.attrs.width,10)/2),x="center",s=q.cfg.getProperty("xy")||[0,0],i=q.editor_knob,A=0,n=0,v=false;
B[0]=((B[0]-t)+20);
B[0]=B[0]-c.getDocumentScrollLeft(this._getDoc());
B[1]=B[1]-c.getDocumentScrollTop(this._getDoc());
if(this._isElement(this.currentElement[0],"img")){if(this.currentElement[0].src.indexOf(this.get("blankimage"))!=-1){B[0]=(B[0]+(75/2));
B[1]=(B[1]+75)
}else{var p=parseInt(this.currentElement[0].width,10);
var z=parseInt(this.currentElement[0].height,10);
B[0]=(B[0]+(p/2));
B[1]=(B[1]+z)
}B[1]=B[1]+15
}else{var m=c.getStyle(this.currentElement[0],"fontSize");
if(m&&m.indexOf&&m.indexOf("px")!=-1){B[1]=B[1]+parseInt(c.getStyle(this.currentElement[0],"fontSize"),10)+5
}else{B[1]=B[1]+20
}}if(B[0]<D[0]){B[0]=D[0]+5;
x="left"
}if((B[0]+(t*2))>(D[0]+parseInt(this.get("iframe").get("element").clientWidth,10))){B[0]=((D[0]+parseInt(this.get("iframe").get("element").clientWidth,10))-(t*2)-5);
x="right"
}try{A=(B[0]-s[0]);
n=(B[1]-s[1])
}catch(E){}if(this.get("autoHeight")===false){var r=D[1]+parseInt(this.get("height"),10);
var j=D[0]+parseInt(this.get("width"),10);
if(B[1]>r){B[1]=r
}if(B[0]>j){B[0]=(j/2)
}}A=((A<0)?(A*-1):A);
n=((n<0)?(n*-1):n);
if(((A>10)||(n>10))||g){var u=0,y=0;
if(this.currentElement[0].width){y=(parseInt(this.currentElement[0].width,10)/2)
}var o=l[0]+D[0]+y;
u=o-B[0];
if(u>(parseInt(k.attrs.width,10)-1)){u=((parseInt(k.attrs.width,10)-30)-1)
}else{if(u<40){u=1
}}if(isNaN(u)){u=1
}if(g){if(i){i.style.left=u+"px"
}q.cfg.setProperty("xy",B)
}else{if(this.get("animate")){v=new YAHOO.util.Anim(q.element,{},0.5,YAHOO.util.Easing.easeOut);
v.attributes={top:{to:B[1]},left:{to:B[0]}};
v.onComplete.subscribe(function(){q.cfg.setProperty("xy",B)
});
var C=new YAHOO.util.Anim(q.iframe,v.attributes,0.5,YAHOO.util.Easing.easeOut);
var f=new YAHOO.util.Anim(i,{left:{to:u}},0.6,YAHOO.util.Easing.easeOut);
v.animate();
C.animate();
f.animate()
}else{i.style.left=u+"px";
q.cfg.setProperty("xy",B)
}}}},_closeWindow:function(e){if(this._checkKey(this._keyMap.CLOSE_WINDOW,e)){if(this.currentWindow){this.closeWindow()
}}},closeWindow:function(e){YAHOO.log("closeWindow: "+this.currentWindow.name,"info","Editor");
this.fireEvent("window"+this.currentWindow.name+"Close",{type:"window"+this.currentWindow.name+"Close",win:this.currentWindow,el:this.currentElement[0]});
this.fireEvent("closeWindow",{type:"closeWindow",win:this.currentWindow});
this.currentWindow=null;
this.get("panel").hide();
this.get("panel").cfg.setProperty("xy",[-900,-900]);
this.get("panel").syncIframe();
this.unsubscribeAll("afterExecCommand");
this.toolbar.set("disabled",false);
this.toolbar.resetAllButtons();
this._focusWindow();
a.removeListener(document,"keydown",this._closeWindow)
},cmd_undo:function(f){if(this._hasUndoLevel()){if(!this._undoLevel){this._undoLevel=this._undoCache.length
}this._undoLevel=(this._undoLevel-1);
if(this._undoCache[this._undoLevel]){var e=this._getUndo(this._undoLevel);
this.setEditorHTML(e)
}else{this._undoLevel=null;
this.toolbar.disableButton("undo")
}}return[false]
},cmd_redo:function(f){this._undoLevel=this._undoLevel+1;
if(this._undoLevel>=this._undoCache.length){this._undoLevel=this._undoCache.length
}YAHOO.log(this._undoLevel+" :: "+this._undoCache.length,"warn","SimpleEditor");
if(this._undoCache[this._undoLevel]){var e=this._getUndo(this._undoLevel);
this.setEditorHTML(e)
}else{this.toolbar.disableButton("redo")
}return[false]
},cmd_heading:function(i){var f=true,g=null,h="heading",j=this._getSelection(),e=this._getSelectedElement();
if(e){j=e
}if(this.browser.ie){h="formatblock"
}if(i=="none"){if((j&&j.tagName&&(j.tagName.toLowerCase().substring(0,1)=="h"))||(j&&j.parentNode&&j.parentNode.tagName&&(j.parentNode.tagName.toLowerCase().substring(0,1)=="h"))){if(j.parentNode.tagName.toLowerCase().substring(0,1)=="h"){j=j.parentNode
}if(this._isElement(j,"html")){return[false]
}g=this._swapEl(e,"span",function(k){k.className="yui-non"
});
this._selectNode(g);
this.currentElement[0]=g
}f=false
}else{if(this._isElement(e,"h1")||this._isElement(e,"h2")||this._isElement(e,"h3")||this._isElement(e,"h4")||this._isElement(e,"h5")||this._isElement(e,"h6")){g=this._swapEl(e,i);
this._selectNode(g);
this.currentElement[0]=g
}else{this._createCurrentElement(i);
this._selectNode(this.currentElement[0])
}f=false
}return[f,h]
},cmd_hiddenelements:function(e){if(this._showingHiddenElements){this._lastButton=null;
YAHOO.log("Enabling hidden CSS File","info","SimpleEditor");
this._showingHiddenElements=false;
this.toolbar.deselectButton("hiddenelements");
c.removeClass(this._getDoc().body,this.CLASS_HIDDEN)
}else{YAHOO.log("Disabling hidden CSS File","info","SimpleEditor");
this._showingHiddenElements=true;
c.addClass(this._getDoc().body,this.CLASS_HIDDEN);
this.toolbar.selectButton("hiddenelements")
}return[false]
},cmd_removeformat:function(h){var f=true;
if(this.browser.webkit&&!this._getDoc().queryCommandEnabled("removeformat")){var e=this._getSelection()+"";
this._createCurrentElement("span");
this.currentElement[0].className="yui-non";
this.currentElement[0].innerHTML=e;
for(var g=1;
g<this.currentElement.length;
g++){this.currentElement[g].parentNode.removeChild(this.currentElement[g])
}f=false
}return[f]
},cmd_script:function(k,j){var g=true,e=k.toLowerCase().substring(0,3),h=null,f=this._getSelectedElement();
if(this.browser.webkit){YAHOO.log("Safari dom fun again ("+k+")..","info","EditorSafari");
if(this._isElement(f,e)){YAHOO.log("we are a child of tag ("+e+"), reverse process","info","EditorSafari");
h=this._swapEl(this.currentElement[0],"span",function(l){l.className="yui-non"
});
this._selectNode(h)
}else{this._createCurrentElement(e);
var i=this._swapEl(this.currentElement[0],e);
this._selectNode(i);
this.currentElement[0]=i
}g=false
}return g
},cmd_superscript:function(e){return[this.cmd_script("superscript",e)]
},cmd_subscript:function(e){return[this.cmd_script("subscript",e)]
},cmd_indent:function(h){var e=true,g=this._getSelectedElement(),i=null;
if(this.browser.ie){if(this._isElement(g,"blockquote")){i=this._getDoc().createElement("blockquote");
i.innerHTML=g.innerHTML;
g.innerHTML="";
g.appendChild(i);
this._selectNode(i)
}else{i=this._getDoc().createElement("blockquote");
var f=this._getRange().htmlText;
i.innerHTML=f;
this._createCurrentElement("blockquote");
this.currentElement[0].parentNode.replaceChild(i,this.currentElement[0]);
this.currentElement[0]=i;
this._selectNode(this.currentElement[0])
}e=false
}else{h="blockquote"
}return[e,"formatblock",h]
},cmd_outdent:function(i){var e=true,h=this._getSelectedElement(),j=null,f=null;
if(this.browser.webkit||this.browser.ie){h=this._getSelectedElement();
if(this._isElement(h,"blockquote")){var g=h.parentNode;
if(this._isElement(h.parentNode,"blockquote")){g.innerHTML=h.innerHTML;
this._selectNode(g)
}else{f=this._getDoc().createElement("span");
f.innerHTML=h.innerHTML;
YAHOO.util.Dom.addClass(f,"yui-non");
g.replaceChild(f,h);
this._selectNode(f)
}}else{YAHOO.log("Can not outdent, we are not inside a blockquote","warn","Editor")
}e=false
}else{i=false
}return[e,"outdent",i]
},cmd_justify:function(e){if(this.browser.ie){if(this._hasSelection()){this._createCurrentElement("span");
this._swapEl(this.currentElement[0],"div",function(f){f.style.textAlign=e
});
return[false]
}}return[true,"justify"+e,""]
},cmd_justifycenter:function(){return[this.cmd_justify("center")]
},cmd_justifyleft:function(){return[this.cmd_justify("left")]
},cmd_justifyright:function(){return[this.cmd_justify("right")]
},toString:function(){var e="Editor";
if(this.get&&this.get("element_cont")){e="Editor (#"+this.get("element_cont").get("id")+")"+((this.get("disabled")?" Disabled":""))
}return e
}});
YAHOO.widget.EditorWindow=function(f,e){this.name=f.replace(" ","_");
this.attrs=e
};
YAHOO.widget.EditorWindow.prototype={header:null,body:null,footer:null,setHeader:function(e){this.header=e
},setBody:function(e){this.body=e
},setFooter:function(e){this.footer=e
},toString:function(){return"Editor Window ("+this.name+")"
}}
})();
YAHOO.register("editor",YAHOO.widget.Editor,{version:"2.6.0",build:"1321"});