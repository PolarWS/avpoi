// ................................................................................
// .......................................... .....................................
// ........................................I:. ....................................
// ......................................OI........................................
// .....................................II$........................................
// ....................................?I?...............,.........................
// ....................,.............,~I$7?:?O$7I77I7$:.+..........................
// ..................... .......$??IIIIIIIIIIIIIIIIII????O:.......$$7..............
// .........................=.$????IIIIIIII?III?????????????8:..,$$DD$+............
// .....................8I?.I++?????II????????????????????????8Z$$I???++?..........
// ....................$$DZ+++????????????????????????????????$ZZ++++++++,.........
// .................$?Z7.$?++++++???????????????????++???????$II?++++++++?.........
// ................I?$O~=+,===+++++++++++++++++++++++++.++??O?II?+++++++==I........
// ...............I$I+~7+=~============+~+~+++++++++.++:=++?IDOI?+========:........
// ..............+$=~IZ=====================?===+========++??DDI?==========........
// ..............IO8I7============?=========O==========+==+???I??===========.......
// ..............I?7NO============?=========Z==========?+==+?IDD?==========?.......
// .............=IIDD=========~~~~$~======~=?====?======?+==II8$?==========I.......
// .............~?ID~=~~~~~=~~?~~~=:~~~~~~~~=+===7==~~=~7?==?IIN?+=========$.......
// .............~?II~~=~~~~~~~=~=I?Z~~~~~~~~==:$+I?~~~~?=I+=+III7?==========.......
// .............I??~=~~=~=~?~7~,+=~~~=~~~~:==,~~~I=~~~~~II?==IIIZ?=~=======,.......
// .....,.......??I~?=~~~~==~====~..~+~~~~=+~.,?~:==~~~~~+I~=III??=+=======:.......
// ........7....++=I?~~=~~?~~=~:=,..:I~~~~~=,...~~=,?D=~~~?+=IIIII+?~~=====:.......
// ......O7.... +=~??~~~~~?7=,~I~....I~~~~~7...=?~~,.~I=~~=?+IIIII+?=~=====~.......
// ........ ....=??+==~~~~+~~.=~$ZI...~.~?+~..=$?IO?=:,I$:IO7?I~?7?7=~=====7.......
// ........+...+=~===I=~~~Z=~ZDZO+Z:.....:..:.~7$ZZ$DDZ?==~~+~+?,7?I=~~====:,......
// ........O...+==~~=~~~~=I+:$?=,,,...........,,,,:,:~I8,?==+Z=~.I??=~~~===~,......
// ........  ..~~~~~=~~I~+I,,~,,,,,,..........,,,:+:::::=~?~+=.=:???+~~~~~~:,......
// ............~~~=?=~~I?I??~::::,,,..........,,,=::::::=~?~+==,II??+=~~~~~~,......
// ............~~~~~~~~~=+?I,,:,,,,,...,=,:=::..,,,,,,,.~~+~+.:I+.+?+~~~~~~~=......
// ............=~=~~~~~~=+??,,,,,,..$:::::::::::....,..$7~~~=?Z...,?+=======~......
// ...........~~~===~~~~~+?Z?.,.....:::::::::::=.......I?~=~I......?+======~.:.....
// ...........$~====~~~=:=?8.==.~Z~:.:::::::::?........?+~~=.......?+====~~~.=.....
// ...........:====~~~=I?=?Z...=.:~.................7?.=~~+,.......?+=~~~~~~.......
// ...........~~~~~~~~==~.~~I~?.~...Z.,........+D$.....=+7.........?+=~~~~~~+.=....
// ..........:~~~=~~~~~=~ ...==~.:,7?,.IZ====7=:.......~...........I+===~~~~:.=....
// ..........=~~~~~~~~===....?......O.~=,~==..==I..................I+==~~~~~=......
// .........~~~~~~~~~~=+~..?,:.....MZ=..N:=?...~:==+...............?+=~~~~~~~..=...
// .........~~~~~~~~~~=??..~==....~~=~.~I7?+Z.~...:===I............++~~~~~~~=:.~...
// ........~=~~~~~~~~~=?...77=~Z+=O~==~.I==~~........=:............?+~~~~~~~~Z.~...
// ........~?~~~~~~~~~=?..:7777==~Z$I~..7=~~=........:..=..........?=~~~~~=~~?.,...
// .......~,~~~~~~~~~~=?..,77777777~ZI:..OI$=......................?=~~~~~~~~:..:..
// .......~.~~~~~~~~~~=+..I777777777+?O..I+D:............O.........$~~~~~~~~~~,.:..
// ......~,.~~~~~~~~~~=+..=77777777ZOO+.Z=~+=........==:=..........I~~~~~~~~~==.,..
// ......~.=~~~~~~~~~~=?..,7777777ZOO:..8=~~=.......===~ZO8........~~~~~~~~~~~~:...
// ......~.?~~~~~~~:~~=?..Z777777ZOO8...===~+:......I7777ZZ........~~:~~~~~~~~~~...
// .....:~.7~~~~~~~~~~==..Z777777ZOO=...~~~~I=......?7777ZO........~~~~~~~~~~~~=...
// .....~~.I~~~~~~~~~~~I..7777777ZOZ=...======.......77777Z.......~=~~~~~~~~~=~....
// .....,~.I~~~~~~~=~~~I..~777777ZO8~...++==+=.......77777Z8......?~~~~~~~~~~~~....
// ......~.Z~~~~~~~=+~~:...777$ZOOOO~...++++?=......~77777$8......~~~~~~~~~~~=.....
// .......~~~~~~~~~=+~~=...Z77ZOOZZ===..=???I=,.....,77777$O.....~~~~~~~~~~~~~.....
/* 控制下雪 */
function snowFall(snow) {
    /* 可配置属性 */
    snow = snow || {};
    this.maxFlake = snow.maxFlake || 15;   /* 最多片数 */
    this.flakeSize = snow.flakeSize || 4;  /* 雪花形状 */
    this.fallSpeed = snow.fallSpeed || 0.3;   /* 坠落速度 */
}
/* 兼容写法 */
requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) { setTimeout(callback, 1000 / 60); };

cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame;
/* 开始下雪 */
snowFall.prototype.start = function(){
    /* 创建画布 */
    snowCanvas.apply(this);
    /* 创建雪花形状 */
    createFlakes.apply(this);
    /* 画雪 */
    drawSnow.apply(this)
}
/* 创建画布 */
function snowCanvas() {
    /* 添加Dom结点 */
    var snowcanvas = document.createElement("canvas");
    snowcanvas.id = "snowfall";
    snowcanvas.width = window.innerWidth;
    snowcanvas.height = window.innerHeight;
    snowcanvas.setAttribute("style", "position:absolute; top: 0; left: 0; z-index: -1; pointer-events: none;");
    document.getElementsByTagName("body")[0].appendChild(snowcanvas);
    this.canvas = snowcanvas;
    this.ctx = snowcanvas.getContext("2d");
    /* 窗口大小改变的处理 */
    window.onresize = function() {
        snowcanvas.width = window.innerWidth;
        snowcanvas.height = window.innerHeight;
    }
}
/* 雪运动对象 */
function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
    this.x = Math.floor(Math.random() * canvasWidth);   /* x坐标 */
    this.y = Math.floor(Math.random() * canvasHeight);  /* y坐标 */
    this.size = Math.random() * flakeSize + 2;          /* 形状 */
    this.maxSize = flakeSize;                           /* 最大形状 */
    this.speed = Math.random() * 1 + fallSpeed;         /* 坠落速度 */
    this.fallSpeed = fallSpeed;                         /* 坠落速度 */
    this.velY = this.speed;                             /* Y方向速度 */
    this.velX = 0;                                      /* X方向速度 */
    this.stepSize = Math.random() / 30;                 /* 步长 */
    this.step = 0                                       /* 步数 */
}
flakeMove.prototype.update = function() {
    var x = this.x,
        y = this.y;
    /* 左右摆动(余弦) */
    this.velX *= 0.98;
    if (this.velY <= this.speed) {
        this.velY = this.speed
    }
    this.velX += Math.cos(this.step += .05) * this.stepSize;

    this.y += this.velY;
    this.x += this.velX;
    /* 飞出边界的处理 */
    if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
        this.reset(canvas.width, canvas.height)
    }
};
/* 飞出边界-放置最顶端继续坠落 */
flakeMove.prototype.reset = function(width, height) {
    this.x = Math.floor(Math.random() * width);
    this.y = 0;
    this.size = Math.random() * this.maxSize + 2;
    this.speed = Math.random() * 1 + this.fallSpeed;
    this.velY = this.speed;
    this.velX = 0;
};
// 渲染雪花-随机形状（此处可修改雪花颜色！！！）
flakeMove.prototype.render = function(ctx) {
    var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");  /* 此处是雪花颜色，默认是白色 */
    snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)"); /* 若要改为其他颜色，请自行查 */
    snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");    /* 找16进制的RGB 颜色代码。 */
    ctx.save();
    ctx.fillStyle = snowFlake;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
};
/* 创建雪花-定义形状 */
function createFlakes() {
    var maxFlake = this.maxFlake,
        flakes = this.flakes = [],
        canvas = this.canvas;
    for (var i = 0; i < maxFlake; i++) {
        flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed))
    }
}
/* 画雪 */
function drawSnow() {
    var maxFlake = this.maxFlake,
        flakes = this.flakes;
    ctx = this.ctx, canvas = this.canvas, that = this;
    /* 清空雪花 */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var e = 0; e < maxFlake; e++) {
        flakes[e].update();
        flakes[e].render(ctx);
    }
    /*  一帧一帧的画 */
    this.loop = requestAnimationFrame(function() {
        drawSnow.apply(that);
    });
}
/* 调用及控制方法 */
var snow = new snowFall({maxFlake:500});
snow.start();