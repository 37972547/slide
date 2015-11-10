/***********
 *
 *
 * wangxianfa 2015/11/10
 * ******/
(function (globle) {

    var Slide = function (options) {
        this.options = $.extend({
            'target': null,
            'width': 1000,
            'height': 500,
            'autoPlay': true, //自动播放
            'delay': 3000,    //间隔时间
            'duration': 1000, //持续时间
            'effect': 'level', //切换方式
            'easing': 'swing', //动画效果
            'control': {
                'prev': '.slide-prev',
                'next': '.slide-next',
                'iconsIsClick': false
            },
            'loop': true,
            'onSlideStart':function(slide){},//回调切换前
            'onSlideEnd': function(slide){}  //回调切换后
        }, options || {});
        if(!this.options.target){
            console.log('缺少target参数！');
            return;
        }
        this.timer = null;
        this.index = 1;
        this.length = this.options.target.find('li').size();
        this.init();
    };

    Slide.prototype = {
        init: function () {
            var that = this;
            var ul = this.options.target.find('ul'),
                li = this.options.target.find('li');

            this.options.target.css({
                'width': this.options.width,
                'height': this.options.height
            });

            this.options.target.parent().css({
                'width': this.options.width,
                'height': this.options.height,
                'position': 'relative'
            });

            li.eq(this.length - 1).clone(false, true).insertBefore(li.eq(0));
            li.eq(0).clone(false, true).appendTo(ul);

            if (this.options.effect === 'level') {
                this.options.target.find('ul').width((this.length + 2) * this.options.width).css('left', -this.options.width);
                this.options.target.find('li').css('float', 'left');
            } else if (this.options.effect === 'vertical') {
                this.options.target.find('ul').css('top', -this.options.height);
            } else if (this.options.effect === 'fade') {
                this.options.target.find('li').css({
                    position: 'absolute',
                    left: '0',
                    top: '0'
                }).hide();
                this.options.target.find('li').eq(1).show();
            }
            this.icons();
            this.play();
            this.control();
            this.options.onSlideStart(this);

            $(this.options.control.prev).bind('mouseenter', function () {
                clearTimeout(that.timer);
            }).bind('mouseleave', function () {
                that.play();
            });

            $(this.options.control.next).bind('mouseenter', function () {
                clearTimeout(that.timer);
            }).bind('mouseleave', function () {
                that.play();
            });

            this.options.target.bind('mouseenter', function () {
                clearTimeout(that.timer);
            }).bind('mouseleave', function () {
                that.play();
            });
        },
        play: function () {
            var that = this;
            if (!this.options.autoPlay) {
                return;
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                that.index++;
                that.move();
                that.play();
            }, this.options.delay);
        },
        move: function () {
            this.options.onSlideStart(this);
            clearTimeout(this.timer);
            var that = this;
            if (this.options.effect === 'level') {
                this.options.target.find('ul').stop();
                this.options.target.find('ul').animate({
                    left: -this.index * this.options.width
                }, {
                    easing: this.options.easing,
                    duration: this.options.duration,
                    complete: function () {
                        if (that.index >= that.length + 1) {
                            $(this).css('left', -that.options.width);
                            that.index = 1;
                        } else if (that.index <= 0) {
                            $(this).css('left', -that.options.width * that.length);
                            that.index = that.length;
                        }
                        that.options.onSlideEnd(that);
                        that.control();
                    }
                });

            } else if (this.options.effect === 'vertical') {
                this.options.target.find('ul').stop();
                this.options.target.find('ul').animate({
                    top: -this.index * this.options.height
                }, {
                    easing: this.options.easing,
                    duration: this.options.duration,
                    complete: function () {
                        if (that.index >= that.length + 1) {
                            $(this).css('top', -that.options.height);
                            that.index = 1;
                        } else if (that.index <= 0) {
                            $(this).css('top', -that.options.height * that.length);
                            that.index = that.length;
                        }
                        that.options.onSlideEnd(that);
                        that.control();
                    }
                });

            } else if (this.options.effect === 'fade') {
                this.options.target.find('li').fadeOut(this.options.duration);
                this.options.target.find('li').eq(this.index).fadeIn(this.options.duration, function () {
                    if (that.index > that.length) {
                        that.index = 1;
                    }
                    that.options.onSlideEnd(that);
                    that.control();
                });
            }
            console.log(this.index)
            this.options.target.parent().find('dd').removeClass('current');
            this.options.target.parent().find('dd').eq(((this.index - 1) % 3)).addClass('current');
        },
        control: function () {
            var that = this;
            $(that.options.control.prev).unbind('click');
            $(that.options.control.next).unbind('click');
            $(this.options.control.prev).bind('click', function () {
                if(!that.options.loop){
                    if(that.index > 1){
                        that.index--;
                    }else{
                        return;
                    }
                }else{
                    that.index--;
                }
                that.move();
                $(that.options.control.prev).unbind('click');
                $(that.options.control.next).unbind('click');

            });

            $(this.options.control.next).bind('click', function () {
                if(!that.options.loop){
                    if(that.index < that.length){
                        that.index++;
                    }else{
                        return;
                    }
                }else{
                    that.index++;
                }
                that.move();
                $(that.options.control.prev).unbind('click');
                $(that.options.control.next).unbind('click');

            });

        },
        icons: function () {
            var that = this;
            if(this.options.target.parent().find('.slide-icons').length <= 0){
                var icons = $('<dl class="slide-icons"></dl>');
                var li = this.options.target.find('li');
                var dd = '';
                for (var i = 1, len = li.size() - 1; i < len; i++) {
                    dd += '<dd>' + i + '</dd>';
                }
                icons.append(dd);
                this.options.target.parent().append(icons);
                this.options.target.parent().find('dl').css({
                    'margin-left': -this.options.target.parent().find('dl').width() / 2
                });
            }

            this.options.target.parent().find('dd:first').addClass('current');

            if (this.options.control.iconsIsClick) {
                this.options.target.parent().find('dd').each(function (i) {
                    $(this).unbind('click');
                    $(this).bind('click', function () {
                        $(this).unbind('click');
                        that.index = i + 1;
                        that.move();
                    });
                });
            } else {
                this.options.target.parent().find('dd').each(function (i) {
                    $(this).bind('mouseenter', function () {
                        clearTimeout(that.timer);
                        that.index = i + 1;
                        that.move();
                    }).bind('mouseleave', function () {
                        that.play();
                    });
                });
            }
        }
    };

    globle.slide = function (options) {
        return new Slide(options);
    }

})(window);