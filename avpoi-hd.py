# -*- coding: utf-8 -*-
from flask import Flask, send_from_directory, request, jsonify, json
from flask_cors import CORS
import requests
import json
import jsonpath
import os
import zipfile
import urllib
import urllib.request

app = Flask(__name__)
CORS(app)#头处理，防止浏览器拦截
app.config['JSON_AS_ASCII'] = False#字符编码
app.config['JSON_SORT_KEYS'] = False#防止json转换自动排序
@app.route("/poi", methods=['GET'])
def poi():
    poi_ask = request.args.get("link") or 1
    if(poi_ask == 1):#判断内容是否为空
        pid = {"post": 1}
        return jsonify(pid)
    else:
        imm = bili_ask(avqie(poi_ask))
        if(jsonpath.jsonpath(imm, '$..post')[0] == 0):
            imm_picurl = str(jsonpath.jsonpath(imm, '$..img')[0])
            imm_url = str(jsonpath.jsonpath(imm, '$..dd')[0])
            imm_name = str(jsonpath.jsonpath(imm, '$..title')[0])
            print(f"C:/avlink/avlivehtml/mt/{imm_url}")
            urllib.request.urlretrieve(imm_picurl,f"C:/avlink/avlivehtml/mt/{imm_url}")
        return jsonify(imm)

@app.route("/poi/xml",methods=['GET'])
def pooi():
    poi_ask = request.args.get("link") or 1
    if(poi_ask == 1):#判断内容是否为空
        pid = {"post": 1}
        return jsonify(pid)
    else:
        aid = avqie(poi_ask)
        #av号和bv号判断
        if(aid.isdigit()):
            id_url = f"https://api.bilibili.com/x/web-interface/view?aid={aid}"
            aid = "av" + aid
        else:
            id_url = f"https://api.bilibili.com/x/web-interface/view?bvid={aid}"
            aid = "BV" + aid
        # 获取视频信息
        headers = {"user-agent": "Mozilla/5.0"}
        # url = f"https://api.bilibili.com/x/player/pagelist?aid={aid}&jsonp=jsonp"
        # response = requests.get(url, headers=headers).text
        # json_data = json.loads(response)

        id_response = requests.get(id_url, headers=headers).text
        id_json_data = json.loads(id_response)

        # 获取json的cid和标题弄成列表
        cid = jsonpath.jsonpath(id_json_data, "$..data.pages..cid")  # cid
        tap = jsonpath.jsonpath(id_json_data, "$..data.pages..part")  # 副标题(视频文件名)，用于视频分P
        id = str(jsonpath.jsonpath(id_json_data, '$..data.title')).strip('[\'\']')  # 主标题
        # page用于循环计数
        page = 0
        # 如果输入错误获取列表会返回个False
        if (cid == id == 'False'):
            page = 1
            print('视频地址错误')
        elif(len(cid) == 1):
            # 获取弹幕xml文件
            getup = requests.get("https://api.bilibili.com/x/v1/dm/list.so?oid=" + str(cid[0]), headers=headers)
            # 创建转码写入保存文件(注意修改文件夹)
            getup.encoding = 'utf-8'
            timedate = f"C:/avlink/mm/{aid}.xml"
            print(timedate)
            file = open(timedate, "w", encoding='utf-8').write(getup.text)
            return send_from_directory(r"C:\avlink\mm", f"{aid}.xml", as_attachment=True)
        else:
            for mua in cid:
                # 获取弹幕xml文件
                getup = requests.get("https://api.bilibili.com/x/v1/dm/list.so?oid=" + str(mua), headers=headers)
                # 创建转码写入保存文件(注意修改文件夹)
                getup.encoding = 'utf-8'
                mkdir(f"C:/avlink/mm/{aid}")
                # 文字替换
                por = str(tap[page])
                por = por.replace("/","-")
                por = por.replace("\\","-")
                por = por.replace("<","《")
                por = por.replace(">","》")
                por = por.replace("?","？")
                por = por.replace(":","：")
                por = por.replace("*","-")
                por = por.replace("|","-")
                por = por.replace("\"","-")
                timedate = f"C:/avlink/mm/{aid}/{por}.xml"
                print(timedate)
                file = open(timedate, "w", encoding='utf-8').write(getup.text)
                # page用于循环计数
                page = page + 1
            zipDir(f"C:/avlink/mm/{aid}", f"C:/avlink/mx/{aid}.zip")
            print("压缩完成")
            return send_from_directory(r"C:\avlink\mx", f"{aid}.zip", as_attachment=True)

@app.route("/poi/img",methods=['GET'])
def poooi():
    poi_ask = request.args.get("link") or 1
    if(poi_ask == 1):#判断内容是否为空
        pid = {"post": 1}
        return jsonify(pid)
    else:
        imm = bili_ask(avqie(poi_ask))
        if(jsonpath.jsonpath(imm, '$..post')[0] == 0):
            imm_url = str(jsonpath.jsonpath(imm, '$..dd')[0])
            #判段是否存在文件
            file = os.path.exists(f'C:/avlink/avlivehtml/mt/{imm_url}')
            print("图片是否存在：" + str(file))
            if(file == True):
                return send_from_directory(r"C:\avlink\avlivehtml\mt", f"{imm_url}", as_attachment=True)
            else:
                imm_picurl = str(jsonpath.jsonpath(imm, '$..img')[0])
                print(f"C:/avlink/avlivehtml/mt/{imm_url}")
                urllib.request.urlretrieve(imm_picurl,f"C:/avlink/avlivehtml/mt/{imm_url}")
                return send_from_directory(r"C:\avlink\avlivehtml\mt", f"{imm_url}", as_attachment=True)
#获取视频信息
def bili_ask(aid):
    if (aid.isdigit()):
        id_url = f"https://api.bilibili.com/x/web-interface/view?aid={aid}"
        aid = "av" + aid
    else:
        id_url = f"https://api.bilibili.com/x/web-interface/view?bvid={aid}"
        aid = "BV" + aid
    headers = {"user-agent": "Mozilla/5.0"}  # 反反爬取
    id_response = requests.get(id_url, headers=headers).text  # 做个美味的汤
    id_json_data = json.loads(id_response)
    if(jsonpath.jsonpath(id_json_data, '$..code')[0] == 0):
        #联合创作判断
        if(jsonpath.jsonpath(id_json_data, '$..data.staff..name') == False):
            idname = str(jsonpath.jsonpath(id_json_data, '$..data.owner.name')[0])  # 作者名字
        else:
            name = jsonpath.jsonpath(id_json_data, '$..data.staff..name')  # 作者名字
            idname = ""
            for mna in name:
                idname = idname + mna + "  "
            print(idname)
        url = str(jsonpath.jsonpath(id_json_data, '$..data.pic')[0])  # 视频封面
        upid = str(jsonpath.jsonpath(id_json_data, '$..data.title')[0])  # 主标题
        return {"post": 0, "img": url, "author": idname, "title": upid, "dd":aid + ".jpg"}
    else:
        return {"post": 2}

#创建文件夹
def mkdir(path):
    # 去除首位空格
    path = path.strip()
    # 去除尾部 \ 符号
    path = path.rstrip("\\")
    # 判断路径是否存在
    # 存在     True
    # 不存在   False
    isExists = os.path.exists(path)
    # 判断结果
    if not isExists:
        # 如果不存在则创建目录
        # 创建目录操作函数
        os.makedirs(path)
        return True
    else:
        # 如果目录存在则不创建，并提示目录已存在
        return False
#压缩文件夹
def zipDir(dirpath,outFullName):
    """
    压缩指定文件夹
    :param dirpath: 目标文件夹路径
    :param outFullName: 压缩文件保存路径+xxxx.zip
    :return: 无
    """
    zip = zipfile.ZipFile(outFullName,"w",zipfile.ZIP_DEFLATED)
    for path,dirnames,filenames in os.walk(dirpath):
        # 去掉目标跟路径，只对目标文件夹下边的文件及文件夹进行压缩
        fpath = path.replace(dirpath,'')

        for filename in filenames:
            zip.write(os.path.join(path,filename),os.path.join(fpath,filename))
    zip.close()
#获取av号
def avqie(avlink):
    address = avlink.split('video/')
    address = address[-1].split('b23.tv/')
    try:
        address = address[1].split('?')
    except:
        address = address[0].split('?')
    address = address[0].split('/')
    address2 = address[0][:2]
    if(address2 == 'BV'):
        return address[0][2:]
    elif(address2 == 'av'):
        return address[0][2:]
    else:
        return address[0]

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=233,threaded=True)