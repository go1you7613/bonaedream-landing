(function () {
  const root = document.querySelector(".bnd-wrap");
  if (!root) return;

  const revealItems = root.querySelectorAll(".fade-up");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const alumniTrack = root.querySelector(".alumni-track");
  if (alumniTrack && !alumniTrack.dataset.cloned) {
    const cards = Array.from(alumniTrack.children);
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      alumniTrack.appendChild(clone);
    });
    alumniTrack.dataset.cloned = "true";
    alumniTrack.classList.add("is-visible");
  }

  const groupTabs = root.querySelectorAll(".group-tab");
  const serviceTabList = root.querySelector(".service-category-tabs");
  const serviceTitle = root.querySelector(".service-feature-card h3");
  const serviceDesc = root.querySelector(".service-feature-card p");
  const serviceCount = root.querySelector(".service-count");
  const serviceTags = root.querySelector(".service-feature-tags");
  const serviceImage = root.querySelector(".service-feature-img");

  const serviceGroups = {
    repair: {
      label: "생활수리·보수",
      services: [
        { id: "wallpaper", title: "도배·필름", desc: "벽면과 공간 분위기를 새롭게 바꾸고 싶을 때", count: "가용 인력 32명", image: "image/services/service-feature-wallpaper.jpg", tags: ["#도배", "#필름", "#시트지", "#벽면 보수"] },
        { id: "interior", title: "인테리어", desc: "집과 매장을 더 편리하고 보기 좋게 꾸밀 때", count: "가용 인력 18명", image: "image/services/interior.jpg", tags: ["#공간 개선", "#소규모 시공", "#리폼", "#집수리"] },
        { id: "aircon", title: "에어컨", desc: "냉난방기 설치와 점검이 필요할 때", count: "가용 인력 8명", image: "image/services/aircon.jpg", tags: ["#에어컨 설치", "#청소", "#점검", "#이전 설치"] },
        { id: "paint", title: "도장·방수", desc: "칠이 벗겨졌거나 누수 예방이 필요할 때", count: "가용 인력 6명", image: "image/services/paint-waterproof.jpg", tags: ["#도장", "#페인트", "#방수", "#균열 보수"] },
        { id: "plumbing", title: "배관·설비", desc: "물 사용 설비와 배관 점검이 필요할 때", count: "가용 인력 12명", image: "image/services/plumbing.jpg", tags: ["#배관", "#수전", "#누수 점검", "#설비 보수"] },
        { id: "wood", title: "목공·가구", desc: "가구 조립이나 목공 보수가 필요할 때", count: "가용 인력 10명", image: "image/services/carpentry-furniture.jpg", tags: ["#목공", "#가구 조립", "#수납 제작", "#문짝 보수"] },
        { id: "tile", title: "타일·줄눈", desc: "타일 시공과 줄눈 보수가 필요할 때", count: "가용 인력 14명", image: "image/services/tile-grout.jpg", tags: ["#타일", "#줄눈", "#욕실", "#주방"] },
        { id: "door", title: "문·창문", desc: "문과 창문의 수리나 교체가 필요할 때", count: "가용 인력 16명", image: "image/services/door-window.jpg", tags: ["#방문", "#창문", "#방충망", "#손잡이"] },
        { id: "electric", title: "전기·조명", desc: "콘센트, 스위치, 조명 설치가 필요할 때", count: "가용 인력 9명", image: "image/services/electric-lighting.jpg", tags: ["#전기 점검", "#조명", "#스위치", "#콘센트"] },
        { id: "welding", title: "용접·금속", desc: "금속 제작과 보강 작업이 필요할 때", count: "가용 인력 15명", image: "image/services/welding-metal.jpg", tags: ["#용접", "#금속 보수", "#난간", "#맞춤 제작"] },
      ],
    },
    it: {
      label: "IT·디자인",
      services: [
        { id: "design", title: "디자인", desc: "브랜드와 콘텐츠를 보기 좋게 다듬고 싶을 때", count: "가용 인력 14명", image: "image/services/design.jpg", tags: ["#그래픽", "#상세페이지", "#편집 디자인", "#브랜딩"] },
        { id: "development", title: "개발", desc: "웹과 디지털 기능을 구현하고 싶을 때", count: "가용 인력 16명", image: "image/services/development.jpg", tags: ["#웹사이트", "#앱", "#자동화", "#테스트"] },
        { id: "planning-marketing", title: "기획·마케팅", desc: "서비스 홍보와 운영 전략이 필요할 때", count: "가용 인력 9명", image: "image/services/planning-marketing.jpg", tags: ["#콘텐츠 기획", "#마케팅", "#SNS", "#광고"] },
        { id: "etc", title: "기타", desc: "분류되지 않은 디지털 업무 도움이 필요할 때", count: "가용 인력 15명", image: "image/services/etc.jpg", tags: ["#문서", "#데이터", "#운영 지원", "#기타 요청"] },
      ],
    },
  };

  function updateFeature(service) {
    if (!service || !serviceTitle || !serviceDesc || !serviceCount || !serviceImage || !serviceTags) return;
    serviceTitle.textContent = service.title;
    serviceDesc.textContent = service.desc;
    serviceCount.textContent = service.count;
    serviceImage.src = service.image;
    serviceImage.alt = `${service.title} 서비스`;

    const tagItems = service.tags.map((tag) => {
      const item = document.createElement("em");
      item.textContent = tag;
      return item;
    });
    serviceTags.replaceChildren(...tagItems);
  }

  function renderServiceTabs(groupKey) {
    const group = serviceGroups[groupKey];
    if (!group || !serviceTabList) return;

    const tabs = group.services.map((service, index) => {
      const button = document.createElement("button");
      button.className = `service-category${index === 0 ? " is-active" : ""}`;
      button.type = "button";
      button.dataset.service = service.id;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(index === 0));
      button.textContent = service.title;
      return button;
    });

    serviceTabList.setAttribute("aria-label", `${group.label} 서비스`);
    serviceTabList.replaceChildren(...tabs);
    updateFeature(group.services[0]);
  }

  groupTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      groupTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      renderServiceTabs(tab.dataset.groupTab);
    });
  });

  if (serviceTabList) {
    serviceTabList.addEventListener("click", (event) => {
      const tab = event.target.closest(".service-category");
      if (!tab) return;

      const activeGroup = root.querySelector(".group-tab.is-active");
      const group = serviceGroups[activeGroup?.dataset.groupTab || "repair"];
      const service = group?.services.find((item) => item.id === tab.dataset.service);
      if (!service) return;

      serviceTabList.querySelectorAll(".service-category").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      updateFeature(service);
    });
  }

  renderServiceTabs("repair");

  root.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      item.classList.toggle("is-open");
    });
  });

  const reviewModal = document.getElementById("reviewModal");
  const reviewCards = root.querySelectorAll(".review-card");
  if (reviewModal && reviewCards.length > 0) {
    const modalPanel = reviewModal.querySelector(".review-modal-panel");
    const modalTitle = reviewModal.querySelector("#reviewModalTitle");
    const modalAuthor = reviewModal.querySelector("#reviewModalAuthor");
    const modalStars = reviewModal.querySelector("#reviewModalStars");
    const modalText = reviewModal.querySelector("#reviewModalText");
    const modalCategory = reviewModal.querySelector("#reviewModalCategory");
    const beforeImage = reviewModal.querySelector("#reviewBeforeImage");
    const afterImage = reviewModal.querySelector("#reviewAfterImage");
    let lastFocused = null;

    function openReviewModal(card) {
      const title = card.querySelector("h3")?.textContent.trim() || "";
      const author = card.querySelector(".review-meta p:first-child")?.textContent.trim() || "";
      const stars = card.querySelector(".stars")?.textContent.trim() || "";
      const text = card.querySelector(":scope > p")?.textContent.trim() || "";
      const category = card.querySelector(":scope > span")?.textContent.trim() || "";

      if (modalTitle) modalTitle.textContent = title;
      if (modalAuthor) modalAuthor.textContent = author;
      if (modalStars) modalStars.textContent = stars;
      if (modalText) modalText.textContent = text;
      if (modalCategory) modalCategory.textContent = category;
      if (beforeImage) beforeImage.src = card.dataset.beforeImage || "image/reviews/before.jpg";
      if (afterImage) afterImage.src = card.dataset.afterImage || "image/reviews/after.jpg";

      lastFocused = document.activeElement;
      reviewModal.classList.add("is-open");
      reviewModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modalPanel?.focus();
    }

    function closeReviewModal() {
      reviewModal.classList.remove("is-open");
      reviewModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
    }

    reviewCards.forEach((card) => {
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${card.querySelector("h3")?.textContent.trim() || "후기"} 상세 보기`);
      card.dataset.beforeImage = card.dataset.beforeImage || "image/reviews/before.jpg";
      card.dataset.afterImage = card.dataset.afterImage || "image/reviews/after.jpg";
      card.addEventListener("click", () => openReviewModal(card));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openReviewModal(card);
        }
      });
    });

    reviewModal.querySelectorAll("[data-review-close]").forEach((button) => {
      button.addEventListener("click", closeReviewModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && reviewModal.classList.contains("is-open")) {
        closeReviewModal();
      }
    });
  }
})();
