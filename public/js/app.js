/*const cursorRounded = document.querySelector('.rounded');
const cursorPointed = document.querySelector('.pointed');

//custom cursor
window.addEventListener("mousemove", (mouse) => {
    const mouseY = mouse.clientY;
    const mouseX = mouse.clientX;
     
    cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
});*/

const citation = document.getElementsByClassName("citation")[0];
const text = ["Coder", "Software Engineer", "Freelancer"];
let itemIndex = 0;

const removeText = () => {
  let str = citation.innerHTML;
  let length = str.length + 1;
  const check = () => {
    if (length != 0) {
      length -= 1;
      str = str.slice(0, length);
      citation.innerHTML = str;
      setTimeout(() => {
        check();
      }, 300);
    } else {
      setTimeout(() => addText(), 3000);
    }
  };
  check();
};

setTimeout(() => removeText(), 3000);

const addText = () => {
  if(itemIndex + 1 > text.length) itemIndex = 0;
  let randomText = text[itemIndex];
  itemIndex++;

  let str = "";
  let length = randomText.length;

  const check = () => {
    if (str.length < length) {
      str += randomText[str.length];
      citation.innerHTML = str;
      setTimeout(() => {
        check();
      }, 300);
    } else {
      setTimeout(() => removeText(), 3000);
    }
  };
  check();
};
