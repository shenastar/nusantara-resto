const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    // for (let i = 0; i < url.length; i++) {
    //   console.log(url[i]);
    // }
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    for (let i = 0; i < urlsSplits.length; i++) {
      console.log(urlsSplits[i]);
    }
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      key: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    console.log(`rescource: ${splitedUrl.resource}`);
    console.log(`id: ${splitedUrl.id}`);
    console.log(`key: ${splitedUrl.verb}`);
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
        + (splitedUrl.id ? '/:id' : '')
        + (splitedUrl.key ? '/:key' : '');
  },
};

export default UrlParser;
