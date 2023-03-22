// Based on: https://logfetch.com/hugo-add-copy-to-clipboard-button/
const svgCopy =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
  <path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z"/>
  </svg>`
const svgCheck =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
  <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
  </svg>`

const addCopyButtons = (clipboard) => {
  // 1. Look for pre > code elements in the DOM
  document.querySelectorAll("pre > code").forEach((codeBlock) => {
    if (!codeBlock.className.includes("language-")) return;
    // 2. Create a button that will trigger a copy operation
    const button = document.createElement("div");
    button.className = "clipboard-container";
    button.innerHTML = svgCopy;
    button.title = "Copy to clipboard";

    const code = codeBlock.innerText.replace(/\n\n/g, '\n');

    const removeSvg = () => {
      const existingSvg = button.querySelector("svg");
      if (existingSvg) existingSvg.remove();
    }

    button.addEventListener("click", () => {
      clipboard.writeText(code).then(
        () => {
          button.innerHTML = svgCheck;

          setTimeout(() => { 
            button.innerHTML = svgCopy;
           }, 2000);
        },
        (error) => (button.innerHTML = "Error")
      );
    });
    // 3. Append the button directly before the pre tag
    const pre = codeBlock.parentNode;
    pre.parentNode.insertBefore(button, pre);
  });
};
  
if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard)
}
