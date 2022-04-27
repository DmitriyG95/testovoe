"use strict";
// Filter 
let filterBtn = document.querySelectorAll('.filterblock button');
let filterCard = document.querySelectorAll('.films__card')
let tag = document.querySelector('#tag')

function filterBlock() {
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener('click', function() {
            tag.style.display = 'flex'
            for (let j = 0; j < filterCard.length; j++) {
                // добавление текста в тэг
                tag.innerHTML = filterBtn[i].textContent
                // 
                if (filterBtn[i].getAttribute('data-value') == filterCard[j].getAttribute('data-genre')) {
                    filterCard[j].style.display = 'block'
                } else {
                    filterCard[j].style.display = 'none'
                }
            }
        })
    }
}
filterBlock()




// пагинация
let count = 8;
let cnt = 4;
let cnt_page = Math.ceil(count / cnt);


let paginator = document.querySelector(".pagination");
let page = "";
for (let i = 0; i < cnt_page; i++) {
    page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
}
paginator.innerHTML = page;

//выводим записи
let div_num = document.querySelectorAll(".films__card");
for (let i = 0; i < div_num.length; i++) {
    div_num[i].setAttribute('data-num', i)
    if (i < cnt) {
        div_num[i].style.display = "block";
    } else {
        div_num[i].style.display = "none";
    }
}

let main_page = document.getElementById("page1");
main_page.classList.add("paginator_active");

//листаем
function pagination(event) {
    let e = event || window.event;
    let target = e.target;
    let id = target.id;

    if (target.tagName.toLowerCase() != "span") return;

    let num_ = id.substr(4);
    let data_page = +target.dataset.page;
    main_page.classList.remove("paginator_active");
    main_page = document.getElementById(id);
    main_page.classList.add("paginator_active");

    let j = 0;
    for (let i = 0; i < div_num.length; i++) {
        let data_num = div_num[i].dataset.num;
        if (data_num <= data_page || data_num >= data_page)
            div_num[i].style.display = "none";

    }
    for (let i = data_page; i < div_num.length; i++) {
        if (j >= cnt) break;
        div_num[i].style.display = "block";
        j++;
    }
}


// coockie
let smile = document.querySelector('#smile')

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

getCookie('is_beta')

if (getCookie('is_beta')==1) {
    smile.style.display = 'block'
}


// Сброс фильтра
let firstPag = document.querySelectorAll(`.pagination span`)
tag.addEventListener('click', function() {
    for (let i = 0; i < firstPag.length; i++) {
       firstPag[i].classList.remove('paginator_active');
       firstPag[0].classList.add('paginator_active')        
    }
    for (let j = 0; j < filterCard.length; j++) {
        if (j < cnt) {
            filterCard[j].style.display = 'block'
        } else {
            filterCard[j].style.display = 'none'
        }
    }
    this.style.display = 'none'
})

// Списки дропдаунов

function listDropdown(name, dropdown) {
    let dropDown = document.querySelector(`#${dropdown} ul`);
    let list = document.querySelectorAll(`.films__${name}`)
    for (let i=0;i<list.length;i++) {
        dropDown.innerHTML += `<li>${list[i].textContent}</li>`
    }
}
listDropdown('date', 'year')
listDropdown('country', 'country')
listDropdown('ganre', 'zhanr')

let dropdownList = document.querySelectorAll('.dropdown')
for (let i=0;i<dropdownList.length;i++) {
    dropdownList[i].addEventListener('click', function(){
        this.classList.toggle('active')
    });
}

// закрытие при клике внеэлемента

for (let i=0;i<dropdownList.length;i++) {
    
    document.addEventListener( 'click', (e) => {
        const withinBoundaries = e.composedPath().includes(dropdownList[i]);
     
        if ( ! withinBoundaries ) {
            dropdownList[i].classList.remove('active')
        }
    })
}