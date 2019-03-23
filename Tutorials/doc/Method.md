# Method

- 0、Component：也就是标签、组件，也可以是一个容器，基础有view、button、input等。

- 1、 查找[微信小程序的组件及使用方法][1]

- 2、 Debug的方法：在JS代码里顺序执行时，用console.log(e)，e是要被查看的参数，任何东西都行

- 3、 快速生成文件。在右键新建时，新建Page或者Component会把基础的东西全部调好

- 4、微信组件的基本参数，【id（有唯一性）、class（没有唯一性）】用来给wxss和js找到对象，bindtap按下组件时触发JS的哪个函数，data-(xxxxxxx)设置额外加的自设的属性

- 5、JS生命周期函数。就跟函数名一样的意思，onload就是页面加载时触发函数，其他对应一样的意思。data是能把n变量内容传给wxml的，动态修改data需要用函数  
`this.setData({ DataName : New dataValue})`  
注意this究竟指什么，有时调用数据库的时候，需要用一个临时变量在外面存储this，不然在用其他函数的时候，this就不是指page，而是指其他的了。可以console.log测一下。





[1]: https://developers.weixin.qq.com/miniprogram/dev/component/
