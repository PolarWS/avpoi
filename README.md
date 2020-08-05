## **什么是avpoi**

<code>avpoi</code>这个网站是拿来下载B站视频<code>xml</code>弹幕文件和封面所开发的

<code>avpoi</code>地址：

> <code>http://m.polarws.moe:234/</code>

## **avpoi有什么用**

<code>avpoi</code>可以用来获取B站视频封面，让你配合识图工具更快的找到封面原图

<code>avpoi</code>获取xml弹幕还能拿来转各种格式用于各种用途

ps：以后还会加个转<code>ASS</code>字幕格式和视频下载功能，麻麻再也不用担心我在<code>potplayer</code>看B站了

## **avpoi如何使用**

<img src="https://polarws-1252580753.cos.ap-chengdu.myqcloud.com/pot/mn1.png" width="95%" height="95%">

## **以下是开发信息**

因为本人是萌新，<code>avpoi</code>这个网页兼容性还有很大的问题，<code>bug</code>也在所难免，欢迎留言反馈

因为不懂前端的脚本，所以直接用<code>python-flask</code>写<code>api</code>直接让<code>js</code>对接

下面是<code>avpoi</code>开放的<code>api</code>食用方法

> http://api.polarws.moe:233/poi?link=<code>加上av/bv号或链接</code>

- 请求方式：<code>get</code>
- 会返回个<code>json</code>文件
- <code>post</code>：av/bv号正确为0错误为1
- <code>post</code>为0时才会有以下内容
- <code>img</code>：图片地址
- <code>author</code>：视频作者
- <code>title</code>：视频标题
- <code>dd</code>：存在avpoi服务器里的封面文件名称

> http://api.polarws.moe:233/poi/img?link=<code>加上av/bv号或链接</code>

- 请求方式：<code>get</code>
- 会直接返回视频的<code>jpg</code>格式封面文件

> http://api.polarws.moe:233/poi/xml?link=<code>加上av/bv号或链接</code>

- 请求方式：<code>get</code>

- 会返回视频的<code>xml</code>格式弹幕文件

- 如果视频分P会返回<code>zip</code>的压缩文件

## **目前已知问题**

互动视频只能下载一个分P的弹幕文件（在咕）

网页手机自适应排版（在咕）

### 这个名字，因为我不会取名字啊QAQ，直接简单粗暴的用了夕立的口头禅emmm

