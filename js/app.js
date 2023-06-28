
var cont_1 = 0
document.querySelector("#next_1").addEventListener("click", ()=> {
  cont_1++
  check_1()
});

document.querySelector("#prev_1").addEventListener("click", ()=> {
  cont_1--
  check_1()
});

function check_1() {
  let itemIndex = document.querySelectorAll("#destaques_1 .item").length - 2;
  let slider = cont_1 * 100
  if (cont <= itemIndex) {
    document.querySelector("#destaques_1 .item:nth-child(1)").style.marginLeft = "-" + slider + "%";
  }
  if (cont_1 <= 0) {
    cont_1 = itemIndex
  }
  if (cont_1 >= itemIndex) {
    cont_1 = 0
  }


}


var cont = 0
document.querySelector("#next").addEventListener("click", ()=> {
  cont++
  check()
});

function check() {
  let itemIndex = document.querySelectorAll("#destaques .item").length - 2;
  let slider = cont * 90 - 5
  if (cont <= itemIndex) {
    document.querySelector("#destaques .item:nth-child(1)").style.marginLeft = "-" + slider + "%";
  }
  if (cont <= 0) {
    cont = itemIndex
  }
  if (cont >= itemIndex) {
    cont = 0
  }


}


var nav_bar = document.querySelector("header");

window.addEventListener("scroll", ()=> {
  nav_bar.classList.toggle("sticky", window.scrollY > 0);
});

const animated_elements = document.querySelectorAll(".animated_elements");

var windowHeight = window.innerHeight;

function animate_elements() {
  animated_elements.forEach((animated_element) => {
    let bounding = animated_element.getBoundingClientRect();
    if (bounding.bottom > windowHeight) {
      animated_element.classList.add("is-down");
    } else if (bounding.top < 0) {
      animated_element.classList.remove("is-up");
    } else {
      animated_element.classList.add("is-up");
      animated_element.classList.add("is-down");
    }
  });
}

document.addEventListener("scroll", function () {
  animate_elements();
  document.removeEventListener("scroll", this);
});


const nav_mobile = document.querySelectorAll('.nav_mobile');
const allSideMenu = document.querySelectorAll('.nav_mobile .content_button');

allSideMenu.forEach(item=> {
  const marker = item;

  item.addEventListener('click', function () {
    allSideMenu.forEach(i=> {
      i.classList.remove('active');
    })
    // removendo nome active do atributo class
    marker.classList.add('active');
  })
});

const buttonPage_2 = document.querySelector('.nav_mobile .content_button:nth-child(2)');
const buttonPage_3 = document.querySelector('.nav_mobile .content_button:nth-child(3)');
const buttonPage_4 = document.querySelector('.nav_mobile .content_button:nth-child(4)');
const buttonPage_5 = document.querySelector('.nav_mobile .content_button:nth-child(5)');

buttonPage_2.addEventListener('click', ()=> {
  window.location.href = "index.html"
});

buttonPage_3.addEventListener('click', ()=> {
  window.location.href = "downloads.html"
});

buttonPage_4.addEventListener('click', ()=> {
  window.location.href = "series.html"
});

buttonPage_5.addEventListener('click', ()=> {
  window.location.href = "cofee.html"
});

