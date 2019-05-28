(function() {
  // param을 받아와서 저장하는 함수.
  function getQueryString() {
    const queries = {};
    const qs = window.location.search.slice(1);
    const arr = qs.split('&');
    for (const item of arr) {
      const [key, value] = item.split('=');
      queries[key] = value;
    }
    return queries;
  }

  // 식물 이름을 기반으로 데이터를 가져온다.
  const name = decodeURIComponent(getQueryString().name);

  const plant = data.find((item) => item.name === name);

  // 메인 이미지 전 내용 추가
  document.querySelector('.plant-name').textContent = plant.name;

  plant.category.split(', ').forEach((item) => {
    const span = document.createElement('span');
    span.textContent = `#${item} `;
    document.querySelector('.tag-names').appendChild(span);
  });

  // 이미지를 추가한다.
  document.querySelector(
    '.plant-image'
  ).style.backgroundImage = `url(./images/${plant.engname}.jpg)`;

  document.querySelector('.small').textContent = plant.sources
    ? `출처: ${plant.sources}`
    : '';

  // 탭에 클릭이벤트를 달아준다.
  document.querySelectorAll('.tab').forEach((element, index) => {
    element.addEventListener('click', (e) => {
      document.querySelectorAll('.tab').forEach((innerElement) => {
        innerElement.classList.remove('selected');
      });
      e.target.classList.add('selected');
      // index 기준으로 슬라이드 적용
      document.querySelectorAll('.section-item').forEach((innerElement) => {
        const width = innerElement.offsetWidth;
        innerElement.style.transform = `translateX(${-1 *
          (width + 4) *
          index}px)`;
        innerElement.style.transition = `all 0.5s ease-out`;
      });
    });
  });

  function createList({ title, body, image, section }) {
    const List = document.createElement('li');
    List.classList.add('tip-section-card');

    const Title = document.createElement('h4');
    Title.textContent = title;
    Title.classList.add('tip-section-title');
    List.appendChild(Title);

    const Body = document.createElement('p');
    Body.textContent = body;
    Body.classList.add('tip-section-body');
    List.appendChild(Body);

    const Image = document.createElement('img');
    Image.setAttribute('src', `./images/${image}_icon.png`);
    Image.setAttribute('alt', image);
    Image.classList.add('tip-section-icon');
    List.appendChild(Image);

    document.querySelector('.' + section).appendChild(List);
  }

  // 데이터를 기반으로 리스트를 생성한다.
  const informations = {
    water: '물주기',
    sunlight: '햇빛',
    temperature: '온도',
    soil: '토양',
    wind: '바람'
  };

  for (const information of Object.keys(informations)) {
    const infoBody = plant[information];
    // 해당 정보가 있을 때만 추가
    if (infoBody) {
      createList({
        title: informations[information],
        body: infoBody,
        image: information,
        section: 'info-section'
      });
    }
  }

  // 특징
  createList({
    title: '특징',
    body: plant.characteristic,
    image: 'characteristic',
    section: 'characteristic-section'
  });

  // tip
  const tips = ['tip1', 'tip2', 'tip3', 'tip4', 'tip5'];
  for (const tip of tips) {
    if (plant[tip]) {
      createList({
        title: '',
        body: plant[tip],
        image: tip,
        section: 'tip-section'
      });
    }
  }
})();
