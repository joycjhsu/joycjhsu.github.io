const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
const topicButtons = Array.from(document.querySelectorAll(".topic[data-topic]"));
const topicControls = document.querySelector(".topic-controls");
const publications = Array.from(document.querySelectorAll(".pub"));

// Keep filtering available for later, while showing every publication by default.
let mode = "all";
let activeTopic = topicButtons[0].dataset.topic;

function setActiveButton(buttons, attr, value) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset[attr] === value);
  });
}

function renderPublications() {
  topicControls.classList.toggle("is-visible", mode === "topic");

  publications.forEach((publication) => {
    const isSelected = publication.dataset.selected === "true";
    const matchesTopic = publication.dataset.topic === activeTopic;

    publication.hidden =
      (mode === "selected" && !isSelected) ||
      (mode === "topic" && !matchesTopic);
  });
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    if (mode === "topic") {
      const activeTopicButton = topicButtons.find((topicButton) =>
        topicButton.classList.contains("is-active"),
      );
      activeTopic = activeTopicButton
        ? activeTopicButton.dataset.topic
        : topicButtons[0].dataset.topic;
    }
    setActiveButton(modeButtons, "mode", mode);
    setActiveButton(topicButtons, "topic", activeTopic);
    renderPublications();
  });
});

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTopic = button.dataset.topic;
    setActiveButton(topicButtons, "topic", activeTopic);
    renderPublications();
  });
});

renderPublications();
