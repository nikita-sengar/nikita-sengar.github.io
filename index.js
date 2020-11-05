(function() {
  const choiceMap = {
    1: {
      texts: ["Pick Lago's call"],
      paths: [2]
    },
    2: {
      texts: ["Take Lago's advice"],
      paths: [3]
    },
    3: {
      texts: ["Meet Deside's dad"],
      paths: [4]
    }
  };
  const finalStates = [4];

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
      source.setAttribute('src', `media/part1.mp4`);
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

      const partStr = params['src'].split('.')[0];
      const curPartNum = parseInt(partStr[partStr.length - 1]);
      if (finalStates.indexOf(curPartNum) === -1) {
        const { paths, texts } = choiceMap[curPartNum];
        const [nextPart] = paths;
        const [text] = texts;

        leftBtn.data('link', `part${nextPart}.mp4`);
        leftBtn.text(text);
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
