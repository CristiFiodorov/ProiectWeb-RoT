function createChapterPage(chapterID){
    const container = document.getElementById("container");
    const chapterObj = chapters.find(c => c.chapterID == chapterID);
    container.innerHTML = `
    <h1 class ="chapter-title chapter-title--green">${chapterObj.title}</h1>
            <div class="chapter-content">
                <h1 class="chapter-content__subsection chapter-content__subsection--green">
                    Articole de referință din legislația în vigoare
                </h1>
                <p class="chapter-content__paragraph">
                    istinctio quod ut enim obcaecati ex voluptas debitis beatae tempore nostrum repudiandae ea! Ipsa eum dolore cumque fugit nobis doloribus beatae officiis nemo laudantium!
                    Aperiam delectus aspernatur quas sed molestias, ex deserunt temporibus! Doloribus soluta maxime amet aliquid cumque recusandae blanditiis odio maiores voluptates quidem ipsa tempora placeat possimus excepturi quo odit, vero sed.
                    Et quae, nemo beatae porro officiis iure, fugiat consequuntur temporibus mollitia rem sunt odio ullam libero dicta facere? Tenetur deleniti magni eum, hic unde consequatur nam eos. Fuga, accusantium veniam?
                    AssumenLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, cum? Ut odio fugit assumenda optio reprehenderit, vel cumque esse fugiat obcaecati unde vitae ad nulla, eum dolorem voluptates aut in?
                    Assumenda maiores dolore, officia blanditiis, eum deleniti delectus earum magni incidunt esse quia fugiat aperiam odit iste tenetur dolores animi maxime itaque sint sapiente nisi fugit! Sequi illo accusantium sed.
                    Exercitationem alias, numquam debitis similique nemo a autem est dignissimos dolores quo optio dolor fuga repudiandae animi eaque sit. Nulla vitae blanditiis saepe hic nesciunt error distinctio, voluptatibus illum fuga.
                    Exercitationem rerum aliquid asperiores debitis possimus molestias tempore beatae, nihil cum necessitatibus libero ex soluta nisi, voluptates nemo officiis sed laborum reiciendis atque expedita sunt at. Ratione nobis autem vero.
                    Odit, pariatur nulla reprehenderit dolores illum sequi architecto alias quidem sed ut omnis ullam blanditiis, enim cumque. Repellat, atque error. Nisi molestias, voluptas amet dolor nam aspernatur alias illo minus.
                    Modi, animi veniam, quasi totam quae dda sequi ut, eius maiores fugiat porro aperiam harum id. Accusamus unde asperiores numquam eaque, laboriosam autem. Atque vero alias, excepturi quis facilis reiciendis. Quo qui obcaecati aperiam aut earum?
                    Qui aut voluptatibus illo, sequi labore consequatur explicabo corporis a natus quibusdam in ipsam accusantium exercitationem quam ea et magni animi amet, dignissimos aliquam? Quod aliquid ad maxime ab incidunt.
                </p>   
                    <div class="chapter-content__image-wrapper">
                        <img src="images/mecanic-auto.png" alt="" class="chapter-content__image">
                    </div>
                <p class="chapter-content__paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis optio in hic dignissimos dolorem placeat iste, asperiores nesciunt odit adipisci sapiente ad minus. Possimus aliquam distinctio error exercitationem culpa eius!
                </p>
                <h1 class="chapter-content__subsection chapter-content__subsection--green">
                    Titlu subsectiune
                </h1>
                <p class="chapter-content__paragraph chapter-content__paragraph--strong">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eius maxime cumque asperiores doloribus sint ut labore dolorem alias quibusdam, voluptatem ex nulla, dicta, amet voluptatibus repellendus culpa provident necessitatibus.
                    Molestias sed alias veniam rerum voluptatem, excepturi atque officia laudantium repudiandae, reprehenderit saepe voluptates earum eos porro odit cumque a delectus, neque asperiores officiis placeat esse. Inventore alias consectetur nobis!
                    Vel doloremque quae accusamus sint veniam earum officia magnam dicta aliquid, reiciendis aut qui. Repellat asperiores aliquid id reprehenderit nemo nam, atque ipsum vitae saepe exercitationem? Quis est exercitationem voluptas!
                    Quasi commodi architecto ratione, qui vel eos minus dignissimos voluptates tenetur veniam ut et amet delectus sunt impedit atque molestias voluptatem possimus fugiat quam doloremque veritatis, eaque quas. Quas, dicta.
                    Fugiat pariatur quas quia hic. Numquam omnis dolorum optio, itaque nostrum qui nihil ratione, quaerat laborum magnam illum. Aspernatur ipsa aliquid dolores maiores commodi vel placeat iure repellat beatae! Id.
                </p>
                <h1 class="chapter-content__subsection chapter-content__subsection--green">
                    Titlu subsectiune
                </h1>
                <div class="chapter-content__image-wrapper">
                    <img src="images/e-drpciv_12.jpg" alt="" class="chapter-content__image">
                </div>
                <p class="chapter-content__paragraph chapter-content__paragraph--strong">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni odit nostrum porro consectetur culpa nihil saepe eius incidunt labore suscipit, totam maxime vero ducimus, sint, in quo sequi dolorum tempore.
                </p>
            </div>
            <div class="chapter-footer">
                <a class="chapter-footer__link" href="#"><h1>Lecția Precedentă</h1></a>
                <a class="chapter-footer__link" href="categorii_cursuri.html"><h1>Cuprins</h1></a>
                <a class="chapter-footer__link" href="#"><h1>Lecția Următoare</h1></a>
            </div>
    `;
}

const id = new URLSearchParams(window.location.search).get('chapterID');
createChapterPage(id);
