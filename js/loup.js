
(function () {
    let image = document.querySelector('.desc_show_img');
    let images = document.querySelectorAll('.desc_preview_image_wrap');
    images.forEach(function (el) {
        el.addEventListener('click', (e)=>{
            images.forEach(function (item) {
                item.style.borderColor = "#cccccc";
            })
            e.target.style.borderColor = "#00bfd3";
           image.src = el.dataset.href;
           initZoom();
        });
    });
})();



function initZoom() {
    let wrap = document.querySelector('.desc_slider_wrap');
    let previewImg = document.querySelector('.desc_slider_img');
    let result = document.querySelector('.result_desc');
    let loupe = document.querySelector('.desc_loupe');
    if(!wrap) {
        return;
    }
    function getCursorPosition(e) {
        let  x = e.pageX;
        let  y = e.pageY;
        x = x - pageXOffset;
        y = y - pageYOffset;

        return {x: x, y: y};
    }

    function moveLoupe(cursor) {
        console.log('previewImg '+previewImg);
        let rect = previewImg.getBoundingClientRect();
       console.log('rect '+rect.left);
        let x = (cursor.x-rect.left)-loupe.offsetWidth/2;
        let y =(cursor.y-rect.top)-loupe.offsetHeight/2;
        console.log('x '+x);
        console.log('cursor.x '+cursor.x);
        console.log('rect.x '+rect.left);
        console.log('loupe.offsetWidth '+loupe.offsetWidth);
        console.log('loupe.offsetWidth/2 '+loupe.offsetWidth/2);
        let checky =(cursor.y-rect.top)+loupe.offsetHeight/2;
        let checkx =(cursor.x-rect.left)+loupe.offsetWidth/2;
        if (checkx > previewImg.offsetWidth) x = previewImg.offsetWidth-loupe.offsetWidth;
        if (checky > previewImg.offsetHeight) y = previewImg.offsetHeight-loupe.offsetHeight;
        if (cursor.x-loupe.offsetWidth/2 <= rect.left) x = 0;
        if (cursor.y-loupe.offsetHeight/2 <= rect.top) y = 0;

        loupe.style.left = x +'px';
        loupe.style.top = y+'px';

        return {x: x, y: y };
    }

    function updateResult(position, cx, cy) {
        console.log('update!');
        console.log(position.x);
        console.log(cx);
        result.style.backgroundPosition = `-${position.x*cx}px -${position.y*cy}px`;
    }

    wrap.addEventListener('mousemove', (e)=>{
        e = e || window.event;
        previewImg.style.opacity = 0;
        let cx = previewImg.offsetWidth / loupe.offsetWidth;
        let cy = previewImg.offsetHeight / loupe.offsetHeight;
        loupe.style.width = '200px';
        let heigth = 200 / (previewImg.offsetWidth/previewImg.offsetHeight);

        loupe.style.height = heigth +'px';
        result.style.backgroundSize = `${cx*previewImg.offsetWidth}px ${cy*previewImg.offsetHeight}px`;
        result.style.backgroundImage = `url('${previewImg.src}')`;
        let cursor =  getCursorPosition(e);
        let pos = moveLoupe(cursor);
        updateResult(pos, cx, cy);
    });
    wrap.addEventListener('mouseleave', ()=> {
        previewImg.style.opacity = 1;
        console.log('leave');
    });
};
initZoom();
