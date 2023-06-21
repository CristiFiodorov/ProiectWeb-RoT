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
    subsection.textContent = data;
    contentContainer.appendChild(subsection);
}

function appendSimpleUserFooterButtons(footer, chapterId, courseId) {
    const prevButton = document.createElement("a");
    const nextButton = document.createElement("a");
    const chaptersButton = document.createElement("a");

    prevButton.className = "chapter-footer__link";
    nextButton.className = "chapter-footer__link";
    chaptersButton.className = "chapter-footer__link";

    prevButton.href = "#";
    nextButton.href = "#";
    chaptersButton.href = "courses.html";

    prevButton.innerHTML = "<h1>Lecția Precedentă</h1>";
    nextButton.innerHTML = "<h1>Lecția Următoare</h1>";
    chaptersButton.innerHTML = "<h1>Cuprins</h1>";

    // handler for the prev button
    prevButton.addEventListener('click', () => {
        getPrevChapter(chapterId, courseId)
            .then(chapter => {
                if (chapter) {
                    window.location.href = `chapter_content.html?chapterID=${chapter._id}`;
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
                    window.location.href = `chapter_content.html?chapterID=${chapter._id}`;
                }
                else {
                    console.error('chapter is not defined');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });

    // Export To JSON button
    const exportJsonButton = document.createElement("a");
    exportJsonButton.className = "chapter-footer__link chapter-footer__link--gold";
    exportJsonButton.href = `${config.apiAddress}/api/v1/export/json/chapters/${chapterId}/contents`;
    exportJsonButton.innerHTML = "<h1>Export JSON</h1>";

    // Export to CSV button
    const exportCsvButton = document.createElement("a");
    exportCsvButton.className = "chapter-footer__link chapter-footer__link--gold";
    exportCsvButton.href = `${config.apiAddress}/api/v1/export/csv/chapters/${chapterId}/contents`;
    exportCsvButton.innerHTML = "<h1>Export CSV</h1>";

    if (isUserLoggedIn()) {
        footer.appendChild(exportJsonButton);
    }
    
    footer.appendChild(prevButton);
    footer.appendChild(chaptersButton);
    footer.appendChild(nextButton);

    if (isUserLoggedIn()) {
        footer.appendChild(exportCsvButton);
    }
}

function addFooterSectionToContainer(contentContainer, chapterId, courseId) {
    const footer = document.createElement("div");
    footer.className = "chapter-footer";

    if (!userIsAdmin()) {
        appendSimpleUserFooterButtons(footer, chapterId, courseId);
    } else {
        appendAdminFooterButtons(footer, chapterId, courseId);
    }

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
    addModalBundles();
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