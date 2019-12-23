// import genQRCode from './qrcodegen.js';

import bowser from 'bowser';
//Record canvas and try to record audio from audio element
function polyfillVideo() {
  var canvas = document.querySelector('canvas');
  var videoStream = canvas.captureStream();
  return videoStream;
}
let audioCtx = null;
let audioSource = [];
function polyfillAudio(){

  if(!audioCtx){
    audioCtx = new AudioContext();
  }

  var sound = document.querySelectorAll('audio');
  console.log('sound ');
  console.log(sound);

  if(sound && sound.length !== 0) {
    
    var destination = audioCtx.createMediaStreamDestination();
    
    for(var i=0; i<sound.length; i++){
      var source = null;
      if(audioSource[i]){
        source = audioSource[i];
      } else {
        source = audioCtx.createMediaElementSource(sound[i]);
        audioSource.push(source);
      }
      source.connect(destination);
      source.connect(audioCtx.destination);
    }

    var audioStream = destination.stream;
  
    return audioStream;
  } else {
    return null;
  }
}

function createOutputStream(){

  var videoStream = polyfillVideo();
  var audioStream = polyfillAudio();

  if(videoStream === null){
    //There must be video to record
    return null;
  }

  if(audioStream === null){
    //Only video stream
    return videoStream;
  } else {
    //If there are video and audio, mix their together
    var outputStream = new MediaStream([audioStream.getTracks()[0], videoStream.getTracks()[0]]);
    return outputStream;
  }
}

function mediaRecorderFromProject(){
  var chunks = [];
  var outputStream = createOutputStream();

  var options = {
  //  audioBitsPerSecond : 128000,
  //  videoBitsPerSecond : 2500000,
    mimeType : 'video/webm'
  };

  if(outputStream === null)
    return null;

  var mediaRecorder = new MediaRecorder(outputStream, options);

  mediaRecorder.onstart = function(e){
    console.log("mediaRecorder.onstart");
    chunks = [];
  }
        
  mediaRecorder.ondataavailable = function(e){
    console.log('mediaRecorder.ondataavailable');
    if (e.data.size > 0) {
      console.log('available data size ' + e.data.size);
      chunks.push(e.data);
    }
  }

  mediaRecorder.onstop = function(e){
    //Save the recorded video
    // console.log("mediaRecorder.onstop");
    // console.log('saverecord');
    console.log('停止录制')
    console.log(e);
    let time = e.timeStamp; // 毫秒
    console.log(time / 1000)
    // previewRecordedVideo(chunks[0]);

    outputStream.getTracks().forEach(track => track.stop());
    mediaRecorder = null;

    chunks = [];
  }

  return mediaRecorder;
}

//Media record from microphone
var mediaRecorder = null;
var timerId = null;
function mediaRecorderFromMicrophone(){

  // !会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D转换器等等），也可能是其它轨道类型。
  // !它返回一个 Promise 对象，成功后会resolve回调一个 MediaStream 对象。若用户拒绝了使用权限，或者需要的媒体源不可用，promise会reject回调一个  PermissionDeniedError 或者 NotFoundError 。 
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function(audioStream){

    console.log('getUserMedia callback');

    var chunks = [];
    var videoStream = polyfillVideo();
    //Audio from microphone
    var outputStream = new MediaStream([audioStream.getTracks()[0], videoStream.getTracks()[0]]);

    var options = {
//      audioBitsPerSecond : 128000,
//      videoBitsPerSecond : 2500000,
      mimeType : 'video/webm'
    }

    if(outputStream === null){
      // mediaRecorderMicrophone = null;
      return;
    }

    mediaRecorder = new MediaRecorder(outputStream, options);

    mediaRecorder.onstart = function(e){
      console.log("mediaRecorder.onstart");
      chunks = [];
    }

    mediaRecorder.ondataavailable = function(e){
      console.log('mediaRecorder.ondataavailable');
      if (e.data.size > 0) {
        console.log('available data size ' + e.data.size);
        chunks.push(e.data);
      }
    }

    mediaRecorder.onstop = function(e){
      //Save the recorded video
      console.log("mediaRecorder.onstop");
      console.log('saverecord');

      // previewRecordedVideo(chunks[0]);

      outputStream.getTracks().forEach(track => track.stop());
      mediaRecorder = null;

      chunks = [];
    }

    mediaRecorder.start();
    timerId = setTimeout(autoStopRecording, 60000);
  })
  .catch(function(err){
    console.log(err.message);
    // var msg = (scratchLanguage == 'zh-cn') ? '当前用户或平台，拒绝麦克风使用权限，录制失败。' : 'The current user or platform refused to use microphone privileges and failed to record.';
    // alert(msg);
    // var btnId = document.getElementById('record_canvas');
    // btnId.innerHTML = (scratchLanguage == 'zh-cn') ? '录制游戏视频' : 'Record project video';
  });
}

function autoStopRecording(){
  //Auto stop recording when it is up to 60 seconds.
  // var btnId = document.getElementById('record_canvas');
  // btnId.innerHTML = (scratchLanguage == 'zh-cn') ? '录制游戏视频' : 'Record project video';

  if(mediaRecorder){
    mediaRecorder.stop();
  }

  // var msg = (scratchLanguage == 'zh-cn') ? '视频录制达到 60 秒时限': 'Recording stops at 60 seconds.';
  // alert(msg);
}

function previewRecordedVideo(videoblob){

  // var video = document.getElementById('video_preview');
  // !创建一个DOMString其中包含一个表示参数中给出的对象的URL.这个新的URL 对象表示指定的 File 对象或 Blob 对象。
  // video.src = window.URL.createObjectURL(videoblob);
  // video.play();

    // var formData = new FormData();
    // formData.append('video', videoblob, 'recordFile.flv');
    // formData.append('user', scratchUser);
    // formData.append('game', scratchGame);

    // var video_title = excludeSpecial(document.getElementById('video_title').value);
    // formData.append('title', video_title ? video_title : '');

    // var video_desc = excludeSpecial(document.getElementById('video_desc').value);
    // formData.append('desc', video_desc ? video_desc : '');

    //Setup the request
    var xhr = new XMLHttpRequest();
    //Open the connection
    xhr.open('POST', 'https://gameshow.geek-8.com/uploadVideo', true);
    //Setup event handler for when the request finishes.
    xhr.onload = function () {
  

     if(xhr.status === 200){

      //   document.getElementById('qrcode_ok').innerHTML = (scratchLanguage == 'zh-cn') ? '确认' : 'OK';

      //   var qrcodeModal = document.getElementById('qrcodeModal');
      //   var qrcodeResp = document.getElementById('qrcode_resp');

      //   var json = JSON.parse(xhr.response);

      //   qrcodeResp.innerHTML = (scratchLanguage == 'zh-cn') ? '视频上传成功，视频链接：<br>' + json.url : 'Upload success. Please access your upload on: ';
      //   var svg = genQRCode(json.url);

      //   document.getElementById('qrcode_svg').innerHTML = svg;
  
      //   qrcodeModal.style.display = 'block';
      //   var okBtn = document.getElementById('qrcode_ok');
      //   okBtn.onclick = function(){
      //     qrcodeModal.style.display = 'none';
      //     document.getElementById('qrcode_svg').innerHTML = '';
      //   };
      // } else {
      //   var failedModal = document.getElementById('failedModal');

      //   document.getElementById('conform_btn').innerHTML = (scratchLanguage == 'zh-cn') ? '确认' : 'OK';

      //   document.getElementById('failed_resp').innerHTML = (scratchLanguage == 'zh-cn') ? '视频上传失败' : 'Upload failed.';
      //   failedModal.style.display = 'block';

      //   document.getElementById('conform_btn').onclick = function(){
      //     failedModal.style.display = 'none';
      //   };
      }
    };
    //Send the data
    // xhr.send(formData);
  // };
}

/* MediaRecorder does not support recording multiple tracks of the same type at this time.
 *
 * Which means, only one audio and one video track can be added to the MediaStream, which 
 * is injected into MediaRecorder.
 *
 * If using laptop internal microphone, both project audio and your voice can be recorded.
 * If using headphone (external microphone), only your voice can be recorded.
 * 
 */

/*
 * End of canvas recording functions
 */

var inner_sound = true;
function RecordProjectVideo(){
  // !浏览器判断
  // if(!bowser.blink && !bowser.gecko){
  //   // var msg = (scratchLanguage == 'zh-cn') ? '请使用 FireFox 或 Chrome 录制视频' : 'Please use FireFox or Chrome to record project video.';
  //   // alert(msg);
  //   return;
  // }
  mediaRecorder = mediaRecorderFromProject();
  if(mediaRecorder) {
    return mediaRecorder;
  }else {
    return null;
  }
  
  // mediaRecorderFromMicrophone(); // 录制带有声音的视频
  // mediaRecorder.start(); // 开始录制
  // mediaRecorder.end(); // 停止录制
};

function stripscript(s) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
  var rs = '';

  for(var i=0; i<s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

var excludeSpecial = function(s) {  
  s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
  s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/);
  return s;
}

export default RecordProjectVideo;
