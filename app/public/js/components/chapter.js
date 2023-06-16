function addParagraphToContainer(contentContainer, data, isStrong) {
    const paragraph = document.createElement("p");
    paragraph.className = "chapter-content__paragraph" + (isStrong ? " chapter-content__paragraph--strong" : "");
    paragraph.innerHTML = data;
    contentContainer.appendChild(paragraph);
}

function addImageToContainer(contentContainer, imageUrl) {
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "chapter-content__image-wrapper";
    const image = document.createElement("img");
    image.className = "chapter-content__image";
    image.src = imageUrl;
    image.alt = "";
    imageWrapper.appendChild(image);
    contentContainer.appendChild(imageWrapper);
}

function addSubsectionToContainer(contentContainer, data) {
    const subsection = document.createElement("h1");
    subsection.className = "chapter-content__subsection chapter-content__subsection--green";
    subsection.textContent = "Articole de referință din legislația în vigoare";
    contentContainer.appendChild(subsection);
}


function addFooterSectionToContainer(contentContainer, chapterId, courseId) {
    const footer = document.createElement("div");
    footer.className = "chapter-footer";

    const prevButton = document.createElement("a");
    const nextButton = document.createElement("a");
    const chaptersButton = document.createElement("a");

    prevButton.className = "chapter-footer__link";
    nextButton.className = "chapter-footer__link";
    chaptersButton.className = "chapter-footer__link";

    prevButton.href = "#";
    nextButton.href = "#";
    chaptersButton.href = "categorii_cursuri.html";

    prevButton.innerHTML = "<h1>Lecția Precedentă</h1>";
    nextButton.innerHTML = "<h1>Lecția Următoare</h1>";
    chaptersButton.innerHTML = "<h1>Cuprins</h1>";

    // handler for the prev button
    prevButton.addEventListener('click', () => {
        getPrevChapter(chapterId, courseId)
            .then(chapter => {
                if (chapter) {
                    window.location.href = `capitol_curs.html?chapterID=${chapter._id}`;
                }
                else {
                    console.error('chapter is not defined');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });

    // handler for the next button 
    nextButton.addEventListener('click', () => {
        getNextChapter(chapterId, courseId)
            .then(chapter => {
                if (chapter) {
                    window.location.href = `capitol_curs.html?chapterID=${chapter._id}`;
                }
                else {
                    console.error('chapter is not defined');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });

    footer.appendChild(prevButton);
    footer.appendChild(chaptersButton);
    footer.appendChild(nextButton);

    contentContainer.appendChild(footer);
}


function createChapterPage(chapterData, chapterContent) {
    const mainContainer = document.getElementById("container");

    // create and append the header with the title 
    const header = document.createElement("h1");
    header.className = "chapter-title chapter-title--green";
    header.innerHTML = chapterData.title;

    const contentList = chapterContent.content;

    const contentContainer = document.createElement("div");
    contentContainer.className = "chapter-content";

    contentList.forEach(pageElement => {
        const { elementType, data, tags } = pageElement;
        switch (elementType) {
            case "paragraph":
                const isStrong = tags.includes("strong");
                addParagraphToContainer(contentContainer, data, isStrong);
                break;

            case "image":
                addImageToContainer(contentContainer, data);
                break;

            case "subsection":
                addSubsectionToContainer(contentContainer, data);
                break;
        }
    });

    addFooterSectionToContainer(contentContainer, chapterData._id, chapterData.parentId);

    mainContainer.appendChild(header);
    mainContainer.appendChild(contentContainer);
}

const id = new URLSearchParams(window.location.search).get('chapterID');

getChapter(id)
    .then(chapterData => {
        getChapterContent(id)
            .then(chapterContent => {
                createChapterPage(chapterData, chapterContent);
            });
    })
    .catch(error => {
        console.error(error);
    });