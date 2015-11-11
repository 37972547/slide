# slide 轮播
## 实例化：
```javascript
    $(function () {
        slide({
            'target': $('.slide'),
            'width': 1000,
            'height': 360,
            'autoPlay': false,
            'delay': 3000,
            'duration': 500,
            'effect': 'vertical',
            'easing': 'easeInOutQuart',
            'control': {
                'prev': '.slide-prev',
                'next': '.slide-next',
                'iconsIsClick': false
            },
            'loop': true,
            'callback':function(slide){

            },
            'index': 2
        });
    });
```

属性
---------------------
属性     | 说明               | 类型                                                      | 默认   | 举例
 :-----: |:-----              | :-------------------------------------------------------:| :---:  | :----:
 target  | 设置HTML元素         |  Element                                                | -      | -
 width   | 设置宽度             | 数值                                                     | 1000    | 2000
 height  | 设置高度             | 数值                                                     | 500     | 1000
 autoPlay| 自动播放             | 布尔                                                     | true    | false
 delay   | 间隔时间             | 数值                                                     | 3000    | 4000
 duration| 持续时间             | 数值                                                     | 1000    | 2000
 effect  | 滑动方向             | 字符串['level' 水平切换,'vertical'垂直切换,'fade' 淡入淡出,'show' 无效果] | 'level' | 'fade'
 easing  | 动画jquery.easing    | 字符串                                                   | 'swing' | 'easeInOutQuart'
 index   | 设置或获取slide的索引 | 数值                                                     | 1       | 2
 loop    | 是否循环播放          | 布尔                                                     | true    | false
 length  | 获取轮播长度          | 数值                                                     | -       | -

方法
---------------------
> callback -- 回调函数

