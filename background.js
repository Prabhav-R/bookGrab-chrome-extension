chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.action === "open_new_tab") {
    chrome.tabs.create({ url: req.url });
    res({});
  }
});
