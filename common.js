// 封装type
function type(target) {
    var template = {
        "[object Array]": 'array',
        "[object Object]": 'object',
        "[object Null]": 'null',
        "[object Number]": 'number Object',
        "[object String]": 'string Object',
        "[object Boolean]": 'boolean Object'
    }
    if (typeof (target) == 'object') {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return typeof (target);
    }
}


// 数组去重
Array.prototype.unique = function () {
    var arr = [],
        obj = {},
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            obj[this[i]] = 1;
            arr.push(this[i]);
        }
    }
    return arr;
}


// 遍历元素节点树，要求不能用children属性，把子元素节点的子元素节点也打印出来 （在原型链上编程）
Element.prototype.retElementChild = function () {
    var temp = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
    },
        child = this.childNodes,
        len = child.length;

    for (var i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            temp.push(child[i]);
        }
    }

    for (var l = 0; l < len; l++) {
        if (child[l].nodeType === 1) {
            for (var m = 0; m < child[l].childNodes.length; m++) {
                if (child[l].childNodes[m].nodeType === 1) {
                    temp.push(child[l].retElementChild());
                    break;
                }
            }
        }
    }
    return temp;
}


// 封装函数，返回元素e的第n层祖先元素
function retParent(e, n) {
    for (var i = 0; i < n && e; i++) {
        e = e.parentNode
    }
    return e;
}


// 封装函数，返回元素e的第n个兄弟元素节点，n为正，返回后面的兄弟元素节点，n为负，返回前面的，n为0，返回自己。
function retSibling(e, n) {
    while (n && e) {
        if (n > 0) {
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            } else {
                for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
            }
            n--;
        } else {
            if (e.previousElementSibling) {
                e = e.previousElementSibling;
            } else {
                for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
            }
            n++;
        }
    }
    return e;
}


// 编辑函数，封装children功能，解决以前部分浏览器的兼容性问题
function myChildren(node) {
    var temp = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
    },
        child = node.childNodes,
        len = child.length;

    for (var i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            temp.push(child[i]);
        }
    }
    return temp;
}


// 封装hasChildren()方法，不可用children属性
function hasChildren(node) {
    var temp = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
    },
        child = node.childNodes,
        len = child.length;

    for (var i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            return true;
        }
    }
    return false;
}


// 封装函数insertAfter()；功能类似insertBefore();直接在Element.prototype上编程
Element.prototype.insertAfter = function (a, b) {
    var c = b.nextElementSibling;
    if (c == null) {
        this.appendChild(a);
    } else {
        this.insertBefore(a, c);
    }
}


// 将目标节点内部的元素节点顺序逆序
Element.prototype.reverseElementNode = function () {
    var a = this.lastElementChild;
    for (var i = 0; i < this.children.length - 1; i++) {
        this.appendChild(a.previousElementSibling);
    }
}


// 封装兼容性方法，求滚动轮滚动距离getScrollOffset()
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            X: window.pageXOffset,
            Y: window.pageYOffset
        }
    } else {
        return {
            X: document.body.scrollLeft + document.documentElement.scrollLeft,
            Y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}


// 封装兼容性方法，返回浏览器视口尺寸getViewportOffset()
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === "CSS1Compat") {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        } else {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        }
    }
}


// 封装方法 求元素相对于文档的坐标 getElementPosition
function getElementPosition(target) {
    if (target.offsetParent == document.body) {
        return {
            left: target.offsetLeft,
            top: target.offsetTop
        }
    } else if (target.offsetParent == null) {
        return {
            left: document.body.offsetLeft,
            top: document.body.offsetTop
        }
    } else {
        return {
            left: target.offsetLeft + getElementPosition(target.offsetParent).left + parseInt(target.offsetParent.style.borderLeft),
            top: target.offsetTop + getElementPosition(target.offsetParent).top + parseInt(target.offsetParent.style.borderTop)
        }
    }
}


// 封装兼容性方法getStyle(Ele,prop);
function getStyle(Ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(Ele, null)[prop];
    } else {
        return Ele.currentStyle[prop];
    }
}


// 封装兼容性的 addEvent(elem, type, handle);方法
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        });
    } else {
        elem['on' + type] = handle;
    }
}

// 封装取消冒泡的函数 stopBubble(event)
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}


// 封装阻止默认事件的函数 cancelHandler(event);
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}


// 封装拖拽函数drag(elem);
function drag(elem) {
    var disX,
        disY;
    addEvent(elem, 'mousedown', mouseDown);
    function mouseDown(e) {
        var event = e || window.event;
        if (event.button == 0) {
            disX = event.pageX - parseInt(window.getComputedStyle(elem, null).left);
            disY = event.pageY - parseInt(window.getComputedStyle(elem, null).top);
            addEvent(document, 'mousemove', mouseMove)
            function mouseMove(e) {
                var event = e || window.event;
                elem.style.left = event.pageX - disX + 'px';
                elem.style.top = event.pageY - disY + 'px';
            }
        }
        addEvent(document, 'mouseup', mouseUp);
        function mouseUp() {
            document.removeEventListener('mousemove', mouseMove, false);
        }
        stopBubble(event);
        cancelHandler(event);
    }
}


