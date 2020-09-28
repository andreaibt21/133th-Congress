//-----READ MORE AND READ LESS----------

let more = document.getElementById("more");
let less = document.getElementById("less");

more.addEventListener("click", function () {
  more.style.display = "none";
  less.style.display = "block";
})

less.addEventListener("click", function () {
  less.style.display = "none";
  more.style.display = "block";
})
