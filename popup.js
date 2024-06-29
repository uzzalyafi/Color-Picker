const picColorBTN = document.getElementById("pic-color");
const colorList = document.getElementById("color-list");
const deleteBtn = document.getElementById("delete-btn");
const colorBoxs = document.querySelector(".color-boxs");

// Load saved colors from localStorage
const savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
savedColors.forEach((color) => addColorToList(color));

// pic color function
picColorBTN.addEventListener("click", () => {
  if (!window.EyeDropper) {
    alert("Your browser does not support the EyeDropper API");
    return;
  }
  const eyeDropper = new EyeDropper();
  eyeDropper
    .open()
    .then((result) => {
      const color = result.sRGBHex;
      addColorToList(color);
      saveColor(color);
    })
    .catch((err) => {
      console.error("Error picking color:", err);
    });
});

// Function to save color to localStorage
function saveColor(color) {
  const colors = JSON.parse(localStorage.getItem("savedColors")) || [];
  colors.push(color);
  localStorage.setItem("savedColors", JSON.stringify(colors));
}

// Function to add color to the list
function addColorToList(color) {
  deleteBtn.style.display = "block";
  colorList.style.border = "1px solid gainsboro";
  colorList.innerHTML += `
      <li class="color">
        <span class="color-box" style="background-color: ${color}"></span>
        <span class="color-code">${color}</span>
      </li>
    `;
  // Copy code clipboard
  const colors = document.querySelectorAll(".color");
  colors.forEach((li) => {
    li.addEventListener("click", (e) => {
      let color = e.target.innerText;
      navigator.clipboard.writeText(color);
      e.target.innerText = "Copied";
      setTimeout(() => {
        e.target.innerText = color;
      }, 1000);
    });
  });
}

// Delete all code
deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  colorList.innerHTML = "";
  colorList.style.border = "none";
  deleteBtn.style.display = "none";
});
