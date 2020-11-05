(function() {
  const choiceMap = {
    1: {
      texts: ["Forgive Omar", "Break-up with Omar"],
      paths: [2, 3]
    },
  };
  const links = ["", "https://drive.google.com/uc?export=download&id=1drjRP52Bo3a3-_PZmiuO2DWdieh7A6wd", "https://drive.google.com/uc?export=download&id=11Ma_EosEqWh8XXTsYsqWgMyqHlLnXcPI"];
  const finalStates = [2, 3];

  $('document').ready(function() {
    const query = window.location.href.split('?');
    const queryParams = query.length > 1 ? query[1].split('&') : [];
    const params = queryParams.reduce((prev, cur) => {
      const [key, value] = cur.split('=');
      return { ...prev, [key]: value };
    }, {});

    const video = $('video');
    const source = document.createElement('source');
    const image = $('img');
    const choices = $('.choices');

    choices.hide();

    const imgLink = params['src'] ? params['src'] : "1";
    image[0].src = `media/part${imgLink}.png`;
    image.hide();

    if (params['src']) {
      source.setAttribute('src', links[parseInt(params['src']) - 1]);
      video.append(source);
      video[0].play(); // --autoplay-policy=no-user-gesture-required
    } else {
      source.setAttribute('src', `https://www.googleapis.com/drive/v3/files/1HxMLFXdcsTf_Abq8wWPyl91IwCNfHk7F?alt=media&key=AIzaSyCQRVxJR2SseWka4lh4XVXl9zoVJMxiGos`);
      video.append(source);
    }

    video[0].onended = function() {
      const partStr = parseInt(params['src'] || '1');
      if (finalStates.indexOf(partStr) === -1) {
        video.hide();
        image.show();
        choices.show();
      }
    }

    if (params['src']) {
      const leftBtn = $('#leftChoice');
      const rightBtn = $('#rightChoice');

      const partStr = parseInt(params['src']);
      if (finalStates.indexOf(partStr) === -1) {
        const { paths, texts } = choiceMap[partStr];
        const [leftPartNum, rightPartNum] = paths;
        const [leftPartText, rightPartText] = texts;

        leftBtn.data('link', leftPartNum);
        rightBtn.data('link', rightPartNum);
        leftBtn.text(leftPartText);
        rightBtn.text(rightPartText);
      }
    }
  });

  $('#leftChoice').on("click", function() {
    const btn = $('#leftChoice');
    const link = btn.data()['link'];
    const href = `${window.location.pathname}?src=${link}`;

    window.location.href = href;
  });

  $('#rightChoice').on("click", function() {
    const btn = $('#rightChoice');
    const link = btn.data()['link'];
    const href = `${window.location.pathname}?src=${link}`;

    window.location.href = href;
  });
})();
