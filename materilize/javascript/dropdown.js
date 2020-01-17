document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".dropdown-trigger");
  M.Dropdown.init(elems, {
    alignment: "left",
    autoTrigger: true,
    coverTrigger: false,
    closeOnClick: true
  });
});
