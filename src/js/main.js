class PhotoViewer {

    constructor(rootElm, images) {
        this.rootElm = rootElm;
        this.images = images;
        this.currentIndex = 0;
    }

    init() {
        const nextButtonElm = this.rootElm.querySelector('.nextButton');
        nextButtonElm.addEventListener('click', () => {
            this.next();
        });

        const prevButtonElm = this.rootElm.querySelector('.prevButton');
        prevButtonElm.addEventListener('click', () => {
            this.prev();
        });

        this.renderImageUrls();
        this.updatePhoto();
    }

    updatePhoto() {

        const frameElm = this.rootElm.querySelector('.photoViewer_img');
        const imageIndex = this.currentIndex + 1;
        frameElm.innerHTML = `
            <p class="currentText">${imageIndex}枚目</p>
            <figure class="currentImage">
                <img src="${this.images[this.currentIndex]}" alt="" />
            </figure>
        `;

        this.startTimer();
    }

    startTimer() {
        if(this.timerKey) {
            clearTimeout(this.timerKey);
        }

        this.timerKey = setTimeout(() => {
            this.next();
        }, 3000);
    }


    next() {
        const lastIndex = this.images.length - 1;
        if(lastIndex === this.currentIndex) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }

        this.updatePhoto();
    }

    prev() {
        const lastIndex = this.images.length - 1;
        if(this.currentIndex === 0) {
            this.currentIndex = lastIndex;
        } else {
            this.currentIndex--;
        }

        this.updatePhoto();
    }

    renderImageUrls() {
        const imagesElm = this.rootElm.querySelector('.photoViewer_url_imgs');
        let imageUrlsHtml = "";
        for(const image of this.images) {
            imageUrlsHtml += `
                <li class="photoViewer_url_img">
                    <a href="${image}" target="_blank" rel="noopener noreferrer" class="photoViewer_url_img_link">${image}</a>
                </li>
            `;
        }

        imagesElm.innerHTML = imageUrlsHtml;
    }
}

const images = [
    '/src/img/start.jpg',
    '/src/img/web_design.jpg',
    '/src/img/js_furigana_recommend.png'
]

new PhotoViewer(document.getElementById('photoViewer'), images).init();