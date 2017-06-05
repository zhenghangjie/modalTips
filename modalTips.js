/**
* 全局提示框组件
* @author zhenghangjie 2017/05/31
**/
var Alert = function(data) {
    // 没有数据则返回，防止后面程序执行
    if (!data) {
        return;
    }
    // 设置内容
    this.content = data.content;
    // 创建提示框面板
    this.panel = document.createElement("div");
    // 为提示框面板添加类
    this.panel.className = "modal fade";

    // 创建dialog
    this.dialog = document.createElement("div");
    // 为dialog添加类
    switch(data.size)
    {
        case "large":
            this.dialog.className = "modal-dialog modal-lg";
            break;
        case "simple":
            this.dialog.className = "modal-dialog";
        case "small":
            this.dialog.className = "modal-dialog modal-sm";
            break;
        default:
            this.dialog.className = "modal-dialog modal-400";
    }
    if (data.backdrop) {
        this.rowCol = document.createElement("div");
        this.rowCol.className = "row-col";
        this.panel.appendChild(this.rowCol)
        this.rowCol.appendChild(this.dialog);
    } else {
        this.panel.appendChild(this.dialog);
    }
    // 创建modal
    this.modal = document.createElement("div");
    // 为modal添加类
    this.modal.className = "modal-content";

    // 创建提示内容组件
    this.contentNode = document.createElement("div");
    // 提示内容
    this.contentDetail = document.createElement("p");
    // 为提示内容添加类
    this.contentNode.className = "modal-body text-center p-a-lg";

    // 提示框底部
    this.footerNode = document.createElement("div");
    this.footerNode.className = "modal-footer";

    // 创建确定按钮组件
    this.confirmBtn = document.createElement("button");
    // 为确定按钮添加类
    this.confirmBtn.className = "btn green";
    this.confirmBtn.setAttribute("data-dismiss","modal");
    
    // 创建取消按钮组件
    this.closeBtn = document.createElement("button");
    // 为取消按钮添加类
    this.closeBtn.className = "btn dark-white";

    // 为确定按钮添加文案
    this.confirmBtn.innerHTML = data.confirm || "确认";

    // 为提示内容添加文案
    this.contentDetail.innerHTML = this.content;

    // 点击确定按钮执行方法
    // 如果data中有success方法则为success方法，否则为空函数
    this.success = data.success || function(){};
    // 点击关闭按钮执行方法
    this.fail = data.fail || function(){};
    // 生成提示框
    this.dialog.appendChild(this.modal);
    this.modal.appendChild(this.contentNode);
    this.contentNode.appendChild(this.contentDetail);
    this.modal.appendChild(this.footerNode);
    this.footerNode.appendChild(this.confirmBtn);
}
// 提示框原型方法
Alert.prototype = {
    // 创建方法
    init : function(){
        // 一次DOM渲染
        document.body.appendChild(this.panel);
        // 绑定事件
        this.bindEvent();
        // 显示提示框
        var $panelobj = $(this.panel);   
        $panelobj.modal("show");
        $panelobj.on('hidden.bs.modal', function () {
            $(this).remove();
        })
    },
    bindEvent : function(){
        var me = this;
        this.confirmBtn.onclick = function(){
            me.success();
        }
    },
    // 显示弹窗方法
    show : function(){
        this.panel.style.display = "block";
    },
    hasClass : function(ele,cls){ 
        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
    },
    addClass : function(ele,cls){ 
        if (!this.hasClass(ele,cls)) ele.className += " "+cls; 
    }
}
// 带标题的提示框
var TitleAlert = function(data){
    // 继承基础提示框的构造函数
    Alert.call(this,data);
    // 设置标题内容
    this.title = data.title;
    // 创建标题组件
    this.titleNode = document.createElement("div");
    this.titleNode.className = "modal-header";
    if (data.close) {
        // 创建关闭按钮
        this.titleCloseBtn = document.createElement("button");
        this.titleCloseBtn.className = "close";
        this.titleCloseBtn.setAttribute("data-dismiss","modal");
        this.titleCloseSpan = document.createElement("span");
        this.titleCloseSpan.innerHTML = "×";
        this.titleCloseSpan.setAttribute("aria-hidden",true);
        this.titleCloseBtn.appendChild(this.titleCloseSpan);
        this.titleNode.appendChild(this.titleCloseBtn);
    }
    // 创建标题内容
    this.titleContent = document.createElement("h4");
    this.titleContent.className = "modal-title";
    // 标题组件中写入标题内容
    this.titleContent.innerHTML = this.title;
}
TitleAlert.prototype = new Alert();

// 对基础提示框创建方法扩展
TitleAlert.prototype.init = function(){
    // 插入标题
    this.titleNode.appendChild(this.titleContent);
    this.modal.insertBefore(this.titleNode, this.modal.firstChild);
    // 继承基础提示框init方法
    Alert.prototype.init.call(this);
}

// 带取消按钮弹出层
var CancelAlert = function(data) {
    // 继承基础提示框的构造函数
    TitleAlert.call(this,data);
    // 取消按钮文案
    this.cancel = data.cancel;
    // 创建取消按钮
    this.cancelBtn = document.createElement("button");
    // 为取消按钮添加类
    this.cancelBtn.className = "btn dark-white";
    this.cancelBtn.setAttribute("data-dismiss","modal");
    // 设置取消按钮内容
    this.cancelBtn.innerHTML = this.cancel || "取消";
}

// 继承标题提示框原型方法
CancelAlert.prototype = new Alert();
CancelAlert.prototype.init = function(){
    // 继承标题提示框创建方法
    TitleAlert.prototype.init.call(this);
    // 创建完其他组件后添加取消按钮
    this.footerNode.insertBefore(this.cancelBtn, this.footerNode.firstChild);
}
CancelAlert.prototype.bindEvent = function(){
    var me = this;
    // 标题提示框绑定方法继承
    TitleAlert.prototype.bindEvent.call(me);
    // 取消按钮绑定事件
    this.cancelBtn.onclick = function(){
        // 取消回调函数
        me.fail();
    }
}
