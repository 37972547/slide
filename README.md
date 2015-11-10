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
            'onSlideStart':function(slide){

            },
            'onSlideEnd': function(slide){

            },
            'index': 2
        });
    });
```

### 属性
> target -------- 设置HTML元素
>
> width --------  宽度  类型：数值 默认：1000  举例：2000
>
> height -------  高度 类型：数值 默认：500  举例：500
>
> autoPlay ------ 是否自动播放  类型：布尔  默认：true  举例：false
>
> delay --------- 间隔时间 类型：数值   默认：3000  举例：4000
>
> duration ------ 持续时间 类型：数值   默认：1000  举例：2000
>
> effect -------- 滑动方向  类型：字符串（'level' 水平切换 'vertical' 垂直切换 'fade' 淡入淡出）  默认 'level' 举例：'fade'
>
> easing -------- 动画jquery.easing  类型：字符串   默认：'swing'  举例：'easeInOutQuart'
>
> index --------- 设置或获取slide的索引。 类型：数值   默认：1  举例：2
>
> loop ---------- 是否循环切换  类型：布尔  默认：true  举例：false   注：值为 false 将autoPlay 设置false
>
> length -------- 获取轮播长度 类型：数值

### 方法
> onSlideStart -- 滚动前回调函数
> 
> onSlideEnd ---- 滚动结束回调函数

