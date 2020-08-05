/* 
                                                  
                    -==+;:;+i;^                   
                    -i_..........~;+                 
                ^^~=~..............._= ~             
              `e+*e-.................*eo**           
               ^+..e................;i.~+^           
              .:...i-...............e...~=           
             ^:..........................~=          
             +............................~;         
            i-;===;_................~:+==+:_`        
           ;-       .=~...........:;       `+.       
         ^-ee.        `+~.......~=ee          +      
         :_ee=          ;......._oee~          ~     
         ; ee-+=+++-    ;.......~~ee`:=++=:`   .     
         `+=~~......-=.;........:~_;~.......:;=      
         _....................................+      
         =.~-___~......................~-___-.-      
         =________~...................-_______~.     
         +---------...................----------     
         :--------~...................---------:     
         :.------~.....................~-----~.:     
         ;....................................._     
         +.....................................~     
         i....................................~`     
         ;....~~........................._....:      
         .~...~+.........................=....=      
          +....=........................;-...._      
          +...._;......................~=...._       
           _....=~.....................+-....=       
           =....~=....................:;...._        
            ;....-=.................._+.....;        
            -~....-=~...............;+.....=         
             +.....~=;............~=:.....;`         
              =~....._=;~......._=+~....._^          
               =~......~;=======_.......;^           
                ;_.....................=`            
                 `=~................._;              
                   -=~............._=                
                     ^=+-......~:i_                  
                         ._::_~`                     
                                        */
document.getElementById("searchbutton").addEventListener("click",loadXMLDoc);
function loadXMLDoc(){
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true ); 
        anHttpRequest.send(); 
        }
    }
    var theurl='http://api.polarws.cn:233/poi?link=' + document.getElementById("searchbox").value;
    var client = new HttpClient();
    client.get(theurl, function(response) { 
        var bili_ask = JSON.parse(response);
        if(bili_ask.post == 0){
            document.getElementById("picture").src = "http://api.polarws.cn:234/mt/" + bili_ask.dd;
            document.getElementById("name").innerHTML = "作者：" + bili_ask.author;
            document.getElementById("video_title").innerHTML = "标题：" + bili_ask.title;
            document.getElementById("picturebox").style.visibility="visible";
            document.getElementById("contentbox").style.visibility="visible";
            document.getElementById("text1").href = "http://api.polarws.cn:233/poi/xml?link=" + document.getElementById("searchbox").value;
            document.getElementById("text2").href = "http://api.polarws.cn:233/poi/img?link=" + document.getElementById("searchbox").value;
        }else{
            document.getElementById("searchbox").value="av号或地址是否正确";
        }
    });
}
