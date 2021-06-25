const openNewTab = (fetchBookName) => {
  const dest = fetchBookName();

  chrome.runtime.sendMessage({ action: "open_new_tab", url: dest }, (r) => {});
};

const createButton = () => {
  const btn = document.createElement("button");
  btn.textContent = "Search For PDF";
  btn.style.padding = ".9rem";
  btn.style.backgroundColor = "#337ab7";
  btn.style.borderRadius = ".1rem";
  btn.style.color = "white";
  btn.style.border = ".1rem solid #337ab7";
  btn.style.fontSize = "initial";
  btn.style.display = "block";

  return btn;
};

const get_parent = () => {
  const possible_parents = [
    // document.querySelector(
    //   "ul.a-unordered-list.a-nostyle.a-button-list.a-horizontal"
    // ),
    document.querySelector("#title"),
  ];

  return possible_parents.find((el) => !!el);
};

const is_amazon_book_page = () =>
  document
    .querySelector("#nav-global-location-data-modal-action")
    .attributes[2].value.search("books") !== -1 ||
  document
    .querySelector("#nav-global-location-data-modal-action")
    .attributes[2].value.search("audible") !== -1 ||
  document.querySelector("#add-to-ebooks-cart-button");

const amazon_addbtn = (fetchBookName) => {
  if (is_amazon_book_page()) {
    let parent = get_parent();
    if (parent) {
      const btn = createButton();
      btn.addEventListener("click", () => openNewTab(fetchBookName));
      parent.appendChild(btn);
    }
  }
};

const amazon_bookname = () => {
  const bookName = document.querySelector("#productTitle").textContent.trim();

  const dest = "https://1lib.in/s/" + encodeURI(bookName);

  return dest;
};

const goodreads_addbtn = (fetchBookName) => {
  const ul = document.querySelector("ul.buyButtonBar.left");
  if (ul) {
    const btn = createButton();
    btn.addEventListener("click", () => openNewTab(fetchBookName));
    ul.prepend(btn);
  }
};

const goodreads_bookname = () => {
  const bookName = document.querySelector("#bookTitle").textContent.trim();
  const dest = "https://1lib.in/s/" + encodeURI(bookName);
  return dest;
};

const init = () => {
  const host = window.location.hostname.split(".")[1];

  switch (host) {
    case "goodreads":
      return [goodreads_addbtn, goodreads_bookname];
    case "amazon":
      return [amazon_addbtn, amazon_bookname];
  }
  return [null, null];
};

(() => {
  const [addButton, fetchBookName] = init();

  if (addButton && fetchBookName) {
    addButton(fetchBookName);
  }
})();
