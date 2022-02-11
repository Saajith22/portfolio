const code = document.getElementById("code");
const title = document.getElementById("title");
const description = document.getElementById("description");

checkColors();

function addParams() {
  if (!title.value && !code.value && !description.value) return;
  var queryParams = new URLSearchParams();

  if (title.value) queryParams.set("title", title.value);
  if (code.value) queryParams.set("code", code.value);
  if (description.value) queryParams.set("description", description.value);

  history.replaceState(null, null, "?" + queryParams.toString());
  location.reload();
}

function checkColors() {
  const enlisted = ["const", "let", "var", "return"];
  const words = code.value.split(" ");
  words.forEach((word) => {
    if (enlisted.includes(word)) {
      console.log("ENLISTED: ", word);
    }
  });
}
