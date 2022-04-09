let typedBefore = false;
(function () {

    let expanded = false;

    let toggle = document.querySelector('.toggle_nav');

    let menu = document.querySelector('.links');

    let links = document.querySelectorAll('.link');

    let nav = document.querySelector('.nav');

    let wrap = document.querySelector('.links_wrap');

    function toggleMenu(){

        if (expanded) {
            menu.style.height = 0;
            expanded = false;
            console.log(nav);
            nav.classList.remove('black');
            toggle.classList.remove('cross');
            return;

        }
        let height = wrap.offsetHeight;
        nav.classList.add('black');
        toggle.classList.add('cross');
        menu.style.height = (height+10)+'px';
        expanded = true;

    }



    toggle.addEventListener('click', toggleMenu);
    links.forEach((link) =>{
        link.addEventListener('click', toggleMenu)
    });

    window.addEventListener('scroll', () => {

        if (window.pageYOffset > 0) {
            nav.classList.add('scrolled');
        }

        else {
            nav.classList.remove('scrolled');
        }

    });

    if (window.pageYOffset > 0) {
        nav.classList.add('scrolled');
    }

})();


(function() {
    function click(i, elem) {
        // console.log(i);
        //console.log(wraps[i]);
        // console.log(wraps[i].offsetHeight);
        if (elem.classList.contains('accordeon_active')) return;
        texts.forEach(elem => elem.style.height = '0');
        //if (wraps[i].offsetHeight > 100)
        texts[i].style.height = wraps[i].offsetHeight+'px';
        // else
        // texts[i].style.height = 100+'px';
        elems.forEach(item => item.classList.remove('accordeon_active'));
        elem.classList.add('accordeon_active');
    }
    let elems = document.querySelectorAll('.accordeon_item');
    let texts = document.querySelectorAll('.accordeon_text');
    let wraps = document.querySelectorAll('.accordeon_wrap');
    elems.forEach((elem, i) => elem.addEventListener('click', function (event) {
        elem.click = click(i, elem);
    }));

})();

function getOffset(elem)
{
    let offset = 0;
    do {

        if ( !isNaN( elem.offsetTop) )
        {
            offset += elem.offsetTop;
        }
    } while( elem = elem.offsetParent );

    return offset;

}

function scrollTo(position, time) {
    let delta =  position - window.pageYOffset;
    let chank = delta / time * 10;
    function scroll() {
        if (delta>0) {
            if (window.pageYOffset >= position || window.pageYOffset + document.documentElement.clientHeight === document.body.scrollHeight ) {
                clearInterval(interval);
                return;
            }
        }
        else {
            if (window.pageYOffset <= position || window.pageYOffset === 0 ) {
                clearInterval(interval);
                return;
            }
        }
        window.scroll(0, window.pageYOffset+chank)
    }


    let interval = setInterval(scroll, 10)
}

(function () {
    document.querySelectorAll('.js-link').forEach( el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            console.log(el);
            let selector = el.getAttribute("href");
            scrollTo(getOffset(document.querySelector(selector)),700);

        });
    });
})();

(function () {
    let elem = document.querySelector('.work_expand');
    let wrap = document.querySelector('.work_grid_inner');
    let grid = document.querySelector('.work_grid');
    let expandedgrid = false;
    elem && elem.addEventListener('click', (e) => {
        if (!expandedgrid) {
            grid.style.height = wrap.offsetHeight +'px';
            elem.innerHTML = 'Скрыть.';
            elem.style.bottom = 0;
            expandedgrid = true;
        }
        else {
            grid.style.height = 300 +'px';
            elem.innerHTML = 'Показать все.';
            elem.style.bottom = 0+'px';
            expandedgrid = false;
        }
    });
})();

(function () {

    function getOffset(elem)

    {

        let offset = 0;

        do {

            if ( !isNaN( elem.offsetTop) )

            {

                offset += elem.offsetTop;

            }

        } while( elem = elem.offsetParent );

        return offset;

    }

    let elements = document.querySelectorAll('.wow');

    elements.forEach(el => el.style.opacity = 0);

    console.log(document.documentElement.clientHeight +" window height");
    function animate(){
        elements.forEach((el) => {

            if (getOffset(el) < window.pageYOffset + document.documentElement.clientHeight-50) {

                el.style.opacity = 1;

                if (el.classList.contains('anim_type')) {
                    type();
                }
                else {
                    el.classList.add('animated');
                    el.classList.add(el.dataset.anim);
                    if (el.dataset.delay)
                        el.style.animationDelay = el.dataset.delay;
                }
            }

        });
    }
    window.addEventListener('scroll', animate);



});
(function () {
    let button = document.querySelector(".docs-expand");
    let wrap = document.querySelector(".docs-wrap");
    let main = document.querySelector(".docs_cols");
    let expanded = false;
    button && button.addEventListener('click', (e) =>{
        e.preventDefault();
        if (expanded) {  main.style.height = 0;}
        else {main.style.height = wrap.clientHeight + 'px';}
        expanded = !expanded;
    });
})();
(function () {
    document.querySelectorAll('.expand-img').forEach(el => {

        el.addEventListener('click', (e) =>{
            console.log(e.target.src);
            let win = null;
            if (el.dataset.full !== undefined) {
                win = window.open(el.dataset.full, '_blank');

            }
            else {
                win = window.open(e.target.src, '_blank');

            }

            win.focus();
        });
    });
})();
function type() {
    if (typedBefore) return;

    typedBefore = true;

    let elem = document.querySelector('.anim_type');

    let input = document.querySelector('.anim_type_input');

    elem.dataset.type.split('').forEach((letter, i) => {

        setTimeout(() => input.innerHTML += letter, 150 * i);

    });
}

(function () {
    let form = document.querySelector('.contact_form');
    if(!form) {
        return;
    }
    let element = form.elements;

    form.addEventListener('submit', (e)=> {

        if (fetch !== undefined) {


            e.preventDefault();
            if (grecaptcha.getResponse() == '') return;
            let formData = new FormData();

            formData.append("name", element['name'].value);
            formData.append("mail", element['mail'].value);
            formData.append("tel", element['tel'].value);
            formData.append("message", element['message'].value);
            console.log(element['message'].value);
            formData.append("g-recaptcha-response", grecaptcha.getResponse());

            fetch('/mail', {
                method: 'post',
                body: formData
            }).then(function (response) {
                return response.text();
            }).then(function (data) {
                console.log(data)
            });
            element['name'].value = '';
            element['mail'].value = '';
            element['tel'].value = '';
            element['message'].value = '';
        }

    });
})();
