# modalTips
全局提示框调用组件（样式基于Bootstrap框架规范modal）

### 调用示例

```javascript
//事件内部
new CancelAlert({
    title : "提示标题",
    content : "带标题和取消的提示框",
    confirm : "确定键",
    cancel : "取消键",
    size: "simple",
    success : function(){
        console.log("ok");
    },
    fail : function(){
        console.log("cancel");
    }
}).init();
```

### 方法列表

|    方法名称     |       方法说明       |
| :---------: | :--------------: |
| TitleAlert  |    调用带标题的提示框     |
| CancelAlert |    带标题取消键的提示框    |
|    Alert    | 父类基础提示框（无标题无取消键） |

#### Alert(data[,savecallback])

|       参数名称        |    类型    | 是否必须 |          示例          |                参数说明                |
| :---------------: | :------: | :--: | :------------------: | :--------------------------------: |
|      content      |  String  |  否   |     “确认是否返回列表？”      |              提示框提示信息               |
|      confirm      |  String  |  否   |        "确认键"         |           确认键文字提示，默认“确定”           |
|       size        |  String  |  否   |       “large”        | 提示框大小 可选"large"  "simple"（默认400px） |
| success(callback) | function |  否   | success:function(){} |           点击“确定”之后的回调函数            |



#### TitleAlert(data[,savecallback])	(继承Alert所有参数，额外参数如下)

| 参数名称  |   类型   | 是否必须 |    示例    |   参数说明   |
| :---: | :----: | :--: | :------: | :------: |
| Title | String |  否   | “提示信息标题” | 提示信息标题文案 |



#### CancelAlert(data[,savecallback])	(继承TitleAlert所有参数，额外参数如下)

|      参数名称      |    类型    | 是否必须 |        示例         |     参数说明      |
| :------------: | :------: | :--: | :---------------: | :-----------: |
| fail(callback) | function |  否   | fail:function(){} | 点击“取消”之后的回调函数 |

