(function() {
  const choiceMap = {
    1: {
      texts: ["Forgive Omar", "Break-up with Omar"],
      paths: [2, 3]
    },
  };
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

    const imgLink = params['src'] ? params['src'].split('.')[0] : "part1";
    image[0].src = `media/${imgLink}.png`;
    image.hide();

    if (params['src']) {
      source.setAttribute('src', `media/${params['src']}`);
      video.append(source);
      video[0].play(); // --autoplay-policy=no-user-gesture-required
    } else {
      source.setAttribute('src', `https://drive.google.com/uc?export=download&id=1HxMLFXdcsTf_Abq8wWPyl91IwCNfHk7F`);
      video.append(source);
    }

    video[0].onended = function() {
      const partStr = (params['src'] || 'part1.mp4').split('.')[0];
      const curPartNum = parseInt(partStr[partStr.length - 1]);
      if (finalStates.indexOf(curPartNum) === -1) {
        video.hide();
        image.show();
        choices.show();
      }
    }

    if (params['src']) {
      const leftBtn = $('#leftChoice');
      const rightBtn = $('#rightChoice');

      const partStr = params['src'].split('.')[0];
      const curPartNum = parseInt(partStr[partStr.length - 1]);
      if (finalStates.indexOf(curPartNum) === -1) {
        const { paths, texts } = choiceMap[curPartNum];
        const [leftPartNum, rightPartNum] = paths;
        const [leftPartText, rightPartText] = texts;

        leftBtn.data('link', `part${leftPartNum}.mp4`);
        rightBtn.data('link', `part${rightPartNum}.mp4`);
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
