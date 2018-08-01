## interest项目总结
###  项目简介
以发帖为主的类似朋友圈的网站平台
### 所用技术
- html、css、js
- vue、vue-router、vue-resource、vuex、vue-cli的全家桶
- 采用express搭的Node后台
- mysql数据库
### 功能简介
- 注册登录
-  查询好友
-   接收推送
-  发帖
-  对帖子进行操作
	- 查看帖
	- 点赞
	- 转发
	- 评论
		- 回复
-  信息修改
	     - 头像
	     - 基本信息
	     - 密码 
###  路由布置
- 登录注册以及其他详情类功能界面（这部分的路由是单个单个直接和/目录同级的 比较杂）
- /index主功能界面
	- 世界、关注
	- 个人动态
		- 我发表的
		- 发布帖子
	- 个人信息
> 由于很多功能是后期加的 路由没有层次 比较混乱 用的比较多的是router.push(path||{options})和router.go(-1)
### 组件部分
一开始什么并没有领会到组件的意义和内涵，写到后面其实发现其实只有复用比较多的才需要写成组件，例如button、帖子card、导航栏、评论框、个人信息、加载动画等。命名不统一
### 布局
- 上线之后手机端因为弹出软键盘导致的布局问题。
	-	解决办法：在window.onload中获取clientHeight用来固定body高度，然后再去调整页面中其他的小布局。
	-	原因：因为整体布局为百分比全局布局，且有背景图。当弹出软键盘时，body的高度就变小了，所以整体的高度都会变小。
- 	rem的适配是后期才加的，花了一些时间调整界面，包括屏宽和高比例不同进行适配，建议在最开始的时候就进行适配，后期调整太花时间。
- 	在跳转或者等待请求响应期间可以加入一些动画 。例如进入页面通过动画fixed在最上层，当window.onload时再将其隐藏，这样可以避免白屏的尴尬和首页背景图一卡一卡加载的问题。
- 	实现整屏效果需要设置html,body如下，因为body相当于是根元素，使用百分比设置就会继承它:
```
html,body{
	padding:0;
	margin:0;
	width:100%;
	height:100;
}
```
- 	在利用百分比设置方形或者原型时有这种方法↓：
```
width:100%;
height:0;
padding-bottom:100%;
background:url('xxx.png') no-repeat;
background-siize: 100% auto;
background-position: center;
```
- flex布局真的很方便 推荐√
- 使用position相对父级定位要注意是否父级设置了定位
- 注意高度塌陷问题 BFC
- 根据需求使用html标签 不要总是使用id 也尽量不要嵌套无用的div
- 应该尝试使用less，sass写Css，效率会高很多（下一个项目就用！）
### 功能模块撰写总结
#### 1、登录注册
##### 思路：
1）注册：采用邮箱注册的方式，后台采用nodemailer模块。由于需要使用SMTP方式发送，需要开启相关功能。首先得登录邮箱，开启这个设置，然后在Node后台中配置相关参数，如下：
```
let nodeMailer = require('nodemailer');		//引入nodemailer
let mailTransport = nodeMailer.createTransport({
		"domains": [
 			"qq.com"    //用的邮箱后缀，这里是qq邮箱
 		],
 		"host": "smtp.qq.com",    //主机
 		"port": 465,   //SMTP 端口
 		"secure": true,   //使用SSL
		"auth" : {    //发邮件的邮箱信息
			user : 'xxxx@qq.com',    //账号
			pass : 'xxxxx'    //不是邮箱密码（也可以使用邮箱密码 但是不安全），最好使用开启SMTP后的邮箱授权码
		}
});
```
> [什么是授权码，它又是如何设置？](http://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28)

配置好之后就可以发邮件了，发送邮件使用自带的sendMail函数，配置好options就可以开始用啦！看代码
```
//这里的options是发送邮件的参数 如下
let options = {
	from : 'xxxx@qq.com',    //发件地址 也就是上面你授权的邮箱
	to : xxx@qq.com,    /收件地址  邮箱号
	// cc : '' ,  //抄送
	// bcc : '' ,   //密送
	subject : '验证码',   //标题
	text : '验证码',   //
	html : '<h4>Hi, xiongdei.</h4>'  //html内容,
	atachments : [   //附件信息（如果没有就可以直接删掉）
					{
						filename : 'img1.png',  //附件名
						path : 'xxx/src/img1.png',  //附件路径
						cid: '0000001'   //cid 可被邮箱使用
					}
	]
};	
//发送邮件
mailTransport.sendMail(options, function(err, data){
	if(err) {
		//出错的话执行操作
	}else {
		//成功执行的操作
	}
})
```
邮箱配置好之后就差不多好了一半啦！剩下的怎么验证验证码？？？
....
在这里我采用的是在收到注册请求时，通过判断邮箱合法，利用随机数生成6位验证码，并把它存在session中（因为session是存在服务器的，比存在cookie里面更安全）而且记录下了当前的时间，在下一次收到验证请求时会对比session上的验证码和请求中的验证码以及当前时间与session中存储的时间之差，如若验证码一致，且时间在3分钟之内则将用户信息存入数据库中，给客户端返回注册成功的响应。前端接收到响应后自动push到登录页面。
> 这里需要注意的是在使用vue-resource时要在请求中带上withCredeneials : true的参数，这样才能带cookie。并在后台中设置响应头,Access-Control-Allow-Credentials : true，才能接收前端发过来的cookie
> 
更多可以参考博客：[vue-resource跨域和Node session保存问题](https://blog.csdn.net/Beng_shakalaka/article/details/78745319)

2）登录：提供用户名和邮箱登录两种选择，点击登录判断信息合法后切换隐藏登录button换成加载button向后台发送登录请求。后台通过提取用户密码比对相等时，则代表登录成功，在session中加入用户登录信息并设置有效时间，最后响应前端请求登录成功。前端接收到响应后自动push到世界页面。
> 通过判断session中是否带有infor来判断用户是否登录。

3）修改密码：通过核实用户名和邮箱对应之后，再次利用nodemailer发送验证码，和注册一样核实验证码之后session中加入已验证信息，跳转至修改密码页面，前端比较两次密码一致后发送给后台，后台通过判断session中是否有已验证信息，再修改用户密码。前端接收到响应后自动push到登录页面。

4）加密：采用的是node里自带的crypto模块的公钥私钥，前端请求公钥加密发给后台，只能用私钥解开，只有在登录是需要将数据库内的密码和前端发过来的密码进行比对。（解密的原因是即使是同一个公钥，加密之后的串也不一样）所有与密码相关的部分都是通过加密传给后台的
```
/后台私钥解密
 let decrypt = function(data) {
    let result = crypto.privateDecrypt({
            padding : crypto.constants.RSA_PKCS1_PADDING,       //参数
            key: keys.privKey             //私钥
        },
        Buffer.from(data,'base64'),             //解密data必须把data转成Buffer 需要注意后面的参数
    )
    return result.toString();     //解密之后的result为Buffer对象，需要转成字符串才好比对
 }

//前端公钥加密  引了一个JSEncrypt的js
let encrypt = new JSEncrypt();      //创建一个JSE对象
encrypt.setPublicKey(this.key);     //给这个实例对象添加公钥
let pass = encrypt.encrypt(this.pass);      //用这个对象对pass加密  转完之后就是字符串base64格式的默认

```
