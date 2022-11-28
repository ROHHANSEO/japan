AWS.config.region = 'ap-northeast-2';

// API Key는 농민신문꺼로 발급 받아야 됩니다.
// 설정파일에 설정 값으로 사용합니다.
// 현재 키는 농민 신문꺼로 발급받은 키입니다.
AWS.config.credentials = new AWS.Credentials("AKIAUVTA3QORXLLBODF4", "eRrIuXS7WgnUeh4hiJahzhZMKUvL1+lxnjIQpm6v");
        
var polly = new AWS.Polly();
var isLoaded = false;
var a;

function doSynthesize(text) {
    var pollyParams = {
        OutputFormat: "mp3", 
        SampleRate: "8000", 
        Text: text, 
        TextType: "text", 
        VoiceId: "Seoyeon"
    };
         
    polly.synthesizeSpeech(pollyParams, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            alert("Error calling Amazon Polly. " + err.message);
        }
        else {
            var uInt8Array = new Uint8Array(data.AudioStream);
            var arrayBuffer = uInt8Array.buffer;
            var blob = new Blob([arrayBuffer]);
            var url = URL.createObjectURL(blob);
            
            isLoaded = true;
            audioElement = new Audio([url]);
            audioElement.play();
        }
    });
}

function doSynthesizeBySSML(ssml) {
    var pollyParams = {
        OutputFormat: "mp3", 
        SampleRate: "8000", 
        Text: ssml, 
        TextType: "ssml", 
        VoiceId: "Seoyeon"
    };
         
    polly.synthesizeSpeech(pollyParams, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            alert("Error calling Amazon Polly. " + err.message);
        }
        else {
            var uInt8Array = new Uint8Array(data.AudioStream);
            var arrayBuffer = uInt8Array.buffer;
            var blob = new Blob([arrayBuffer]);
            var url = URL.createObjectURL(blob);
        
            // isLoaded = true;
            audioElement = new Audio([url]);
            // audioElement.play();
            // audioTime(audioElement);

            a = audioElement;
            $("#audioBox").html(a);
            $("#audioBox audio").attr('muted','muted');
        }
    });
}

function play() {
    if (!isLoaded) {
        return;
    }
    audioElement.play();
}

function stop() {
    if (!isLoaded) {
        return;
    }
    audioElement.pause();
}







//TTS 기능구현

var delayObject = {
	sectionDelay : '2s',
	articleDelay : '0.5s',
}

var tags = {
	speakStart : '<speak>',
	articleDelay : '<break time='+'"'+delayObject.articleDelay+'"'+'/>',
	sectionDelay : '<break time='+'"'+delayObject.sectionDelay+'"'+'/>',
	speakEnd : '</speak>'
}

//클릭시 상태값구분
function TTSTrigger(e,page){
    detailTTS();
}

//주요뉴스리스트 
//첫 TTS 작동시 리스트 데이터 수집후 출력 요청
function listTTS(){
	
	var listLength = $(".article_list li").length;
	var html;
	for(var i = 0; i < listLength; i++){
		var title = contentReplace($(".article_list li .news_tit").eq(i).text());
		var content = contentReplace($(".article_list li .nows_content").eq(i).text());
		
		
		if(i == 0) html = tags.speakStart + '오늘의 주요뉴스 입니다. <break time="1s"/>' + title + tags.articleDelay + content;
		else html += tags.sectionDelay + title + tags.articleDelay + content;
		
		if(i == (listLength - 1)) html += tags.speakEnd;
	}
	
	doSynthesizeBySSML(html);
	
//	$("#textEntry").val(html);
//	
//	start();
	
}

//상세기사 
//첫 TTS 작동시 데이터 수집후 출력 요청
$(function(){
	
	var title = contentReplace($(".siteViewTitle").val());
	var content = contentReplace($(".siteViewContent").val());
	
	var html = tags.speakStart + title + tags.articleDelay + content + tags.speakEnd;
	
	doSynthesizeBySSML(html);

//	$("#textEntry").val(html);
//	
//	start();
})

//TTS 출력 완료후 재실행을 할수있게 처리를 하기위한 함수
function audioTime(audioElement){
    
    var nowPlayTime;
    var allPlayTime;
    
    interval = setInterval(function(){
        allPlayTime = audioElement.duration;
        nowPlayTime = audioElement.currentTime;

        if(allPlayTime.toFixed(3) == nowPlayTime.toFixed(3)) {
            clearInterval(interval)
            $("#TTSBtn").attr("data-status","play");
            $("#TTSBtn").removeClass("on");
        }
    }, 100)

}

function contentReplace(text){
	
	var reg =/\([^)]*\)/g;
	
	var replaceTexts = {
		'&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
        [reg] : ''
	}
	
	var textsArr = ['&',reg];
	
	var returnText = text;
	
	for(var i = 0; i < textsArr.length; i++){
		
		var texts = textsArr[i];
		
		returnText = returnText.replaceAll(texts,replaceTexts[texts]);
	}
	
	return returnText;
}

$('#btn').click(function(){
    $("#audioBox audio").play();
    $("#audioBox audio").attr('muted',false);
})