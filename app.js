document.addEventListener("DOMContentLoaded", async () => {
    console.log('loaded')
    const btn = document.createElement("button");
    btn.setAttribute('click', 'button');
    btn.textContent = 'download all the pics!'
    console.log(btn)

    btn.style.width ='200px';
    btn.style.height ='200px';
    btn.style.fontSize = '20px';
    btn.style.fontFamily = 'myFont';
    btn.style.textTransform = 'uppercase';
    //add button to body 
    document.body.appendChild(btn);

    btn.onclick = function(){
        chrome.tabs.query({currentWindow: true}, function(tabs){
            var tab = tabs[2];
            // console.log("tab", tab);
            // console.log(tabs)
            if(tab){
                execScript(tab);
            } else{
                alert("there are noactive tabs")
            }
        })
    
        function execScript(tab){
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:imageFinder
                    
                }, 
                
                
                
                )
                
            }
        }
        
        
        function imageFinder(){
            
            
            function forceDownload(url, fileName){
                console.log('FORCE DOWNLOAD')
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "blob";
                xhr.onload = function(){
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(this.response);
                    var tag = document.createElement('a');
                    console.log(imageUrl)
                    tag.href = imageUrl;
                    tag.download = fileName;
                    document.body.appendChild(tag);
                    tag.click();
                    document.body.removeChild(tag);
                }
                xhr.send();
            }  


        const picsArray = document.getElementsByTagName("img");
        for (const key in picsArray){
            // console.log(picsArray[key].currentSrc);
            console.log(picsArray[key].getAttribute('width'))
            if (picsArray[key].currentSrc !== undefined){
                //if (picsArray[key].currentSrc.includes('https://')){
                    forceDownload(picsArray[key].currentSrc, 'Image from Extension')
                    // picsArray[key].currentSrc.innerHTML= "https://i.imgflip.com/4hqolz.png?a471768"
                //}
            }       
        }
    }


});

