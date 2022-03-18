window.onload = () => {
  document
    .querySelector(".goIndexPage")
    .addEventListener("click", function (event) {
      if (confirm("确定会首页？"))
        window.location.href = this.getAttribute("data-url");
    });
};
