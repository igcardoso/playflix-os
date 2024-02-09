let iframe_rendering_channels = document.querySelector('#channels .media iframe');

let channel_1 = document.querySelector('.slide .c1');

channel_1.addEventListener('click', ()=> {
  let channel_link = "https://playertv.net/tv.php?c=megapix";
  
  iframe_rendering_channels.setAttribute('src', channel_link);
});