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

            }
        });
    });
```