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