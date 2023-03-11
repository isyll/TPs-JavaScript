window.onload = async function () {
  "use strict";

  const content = document.querySelector(".content");
  const pageNum = document.querySelector(".header__pages");
  const search = {
    input: document.querySelector(".search__input"),
    icon: document.querySelector(".search__icon"),
  };

  const urlDatas = {};
  urlDatas.params = new URLSearchParams(window.location.search);
  urlDatas.page = urlDatas.params.get("page");
  urlDatas.search = urlDatas.params.get("search");

  const maxPageNum = 500;

  const catalog = {
    baseURL:
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1",
    page: 1,
    imgBaseURL: "https://image.tmdb.org/t/p/w500/",

    fullURL: function () {
      return this.baseURL + "&page=" + this.page;
    },

    fullImgURL: function (imgPath) {
      return imgPath && imgPath[0] === "/"
        ? this.imgBaseURL + imgPath.substring(1)
        : this.imgBaseURL + imgPath;
    },

    fullIdURL: function (id) {
      return this.baseURL + "&id=" + id;
    },

    retrieveDatas: async function () {
      const result = await fetch(this.fullURL());
      return result.json();
    },

    search: async function (title) {
      const currentPage = this.page;
      const pageMax = maxPageNum;
      title = title.toLowerCase();

      for (let i = 1; i <= pageMax; i++) {
        this.page = i;
        const data = await this.retrieveDatas();
        const results = data.results;

        for (const r of results) {
          if (
            title === r.title.toLowerCase() ||
            title === r.original_title.toLowerCase()
          ) {
            this.page = currentPage;
            return { id: r.id, page: data.page };
          }
        }
      }

      this.page = currentPage;
      return { id: -1 };
    },
  };

  function createCard() {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
  }

  function modalWindow(text) {
    const mw = {
      bcg: document.createElement("div"),
      modal: document.createElement("div"),
      modalContent: document.createElement("div"),
      closeModal: document.createElement("button"),
      closeModalContent: document.createElement("i"),

      init: function () {
        this.bcg.setAttribute("id", "modal-background");
        this.modal.setAttribute("id", "modal");
        this.closeModal.setAttribute("id", "close-modal");
        this.modalContent.setAttribute("id", "modal-content");
        this.closeModalContent.classList.add("fa-solid", "fa-x");
        // this.closeModal.textContent = 'Fermer';

        this.modalContent.textContent = text;
        this.closeModal.appendChild(this.closeModalContent);
        this.modal.appendChild(this.modalContent);
        this.modal.appendChild(this.closeModal);
        this.bcg.appendChild(this.modal);
        document.body.appendChild(this.bcg);

        // setTimeout(() => {
        //     document.body.removeChild(this.bcg);
        // }, 1500);

        this.closeModal.addEventListener("click", () => {
          this.removeModalWindow();
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") this.removeModalWindow();
        });
        this.bcg.addEventListener("click", (e) => {
          if (e.target === this.bcg) this.removeModalWindow();
        });
      },

      removeModalWindow: function () {
        this.bcg.style.visibility = "hidden";
        this.bcg.style.display = "none";
      },
    };

    mw.init();
  }

  function insertCards(data) {
    if (data.results)
      for (const movie of data.results) {
        if (movie.poster_path) {
          const card = createCard();
          const imgContainer = document.createElement("div");
          const img = document.createElement("img");
          let cardContent;
          const cardFooter = document.createElement("div");
          const cardFooterTitle = document.createElement("h4");
          const cardFooterNote = document.createElement("p");

          cardFooterNote.classList.add("card-footer__note");
          cardFooterTitle.classList.add("card-footer__title");
          cardFooter.classList.add("card__footer");
          imgContainer.classList.add("card__img-container");
          imgContainer.appendChild(img);

          img.src = catalog.fullImgURL(movie.poster_path);
          img.classList.add("card__img");
          card.appendChild(imgContainer);

          content.appendChild(card);
          cardFooterTitle.textContent = movie.title;
          cardFooterNote.textContent = movie.vote_average;
          cardFooterNote.style.color =
            movie.vote_average > 5 ? "rgba(8,191,8)" : "orange";
          cardFooter.appendChild(cardFooterTitle);
          cardFooter.appendChild(cardFooterNote);
          card.appendChild(cardFooter);

          imgContainer.addEventListener("mouseenter", () => {
            const cardContentTitle = document.createElement("h2");
            const cardContentText = document.createElement("p");
            cardContent = document.createElement("div");

            cardContent.classList.add("card__content");
            cardContentText.classList.add("card__text");
            cardContentTitle.classList.add("card__title");

            cardContentTitle.textContent = "Overview";
            cardContentText.textContent = movie.overview;

            cardContent.appendChild(cardContentTitle);
            cardContent.appendChild(cardContentText);
            imgContainer.appendChild(cardContent);
          });

          imgContainer.addEventListener("mouseleave", function () {
            imgContainer.removeChild(cardContent);
          });
        }
      }

    const currentPageForm = document.createElement("form");
    const currentPage = document.createElement("input");
    currentPage.value = data.page;
    currentPage.size = 4;
    currentPage.name = "page";
    currentPage.classList.add("header__current-page");

    currentPageForm.append(
      document.createTextNode("Page "),
      currentPage,
      document.createTextNode(" sur "),
      document.createTextNode(data.total_pages)
    );

    pageNum.appendChild(currentPageForm);
  }

  if (urlDatas.page && !isNaN(urlDatas.page)) {
    if (urlDatas.page > maxPageNum)
      modalWindow("Le numéro de page maximum est " + maxPageNum);
    else catalog.page = urlDatas.page;
  }

  let id;
  if (urlDatas.search) {
    id = await catalog.search(urlDatas.search);
    if (id !== -1) {
      catalog.page = id.page;
      id = id.id;
    } else modalWindow("Désolé, aucun film ne correspond à votre recherche.");
  }

  let datas = await catalog.retrieveDatas();
  if (id && id !== -1)
    for (let i = 0; i < datas.results.length; i++) {
      if (datas.results[i] && datas.results[i].id !== id) {
        datas.results.splice(i, 1);
        i--;
      }
    }

  insertCards(datas);
};
