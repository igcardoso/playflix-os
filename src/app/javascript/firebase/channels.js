let iframe_rendering_channels = document.querySelector('#channels .media iframe');

let channel_1 = document.querySelector('.slide .c1');
let channel_2 = document.querySelector('.slide .c2');
let channel_3 = document.querySelector('.slide .c3');

channel_1.addEventListener('click', ()=> {
  let channel_link = "https://playertv.net/tv.php?c=megapix";
  
  iframe_rendering_channels.setAttribute('src', channel_link);
});
channel_2.addEventListener('click', ()=> {
  let channel_link = "https://playertv.net/tv.php?c=tc-premium";
  
  iframe_rendering_channels.setAttribute('src', channel_link);
});
channel_3.addEventListener('click', ()=> {
  let channel_link = "https://playertv.net/c/wbr.php?id=tcFun";
  
  iframe_rendering_channels.setAttribute('src', channel_link);
});