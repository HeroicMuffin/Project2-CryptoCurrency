const cryptoContainer = new CryptoCardContainer();
cryptoContainer.draw();

$(document).ready(function() {
  $(".searchButton").on("click", () => {
    $(".cardName").each(function(i, name) {
      if (
        !$(name)
          .attr("id")
          .toLowerCase()
          .includes(
            $(".searchTerm")
              .val()
              .toLowerCase()
          )
      )
        $(name)
          .parent()
          .parent()
          .hide();
      else
        $(name)
          .parent()
          .parent()
          .show();
    });
  });

  $("#myModal").on("hide.bs.modal", function() {
    cryptoContainer.changedInModal.forEach(coin => {
      $(`#checkButton-${coin}-false`).click();
    });
    cryptoContainer.changedInModal = [];
  });

  $("#aboutButton").on("click", () => {
    $(".liveReportsContainer").hide();
    $(".content").hide();
    $(".aboutContainer").show();
  });

  $("#homeButton").on("click", () => {
    $(".liveReportsContainer").hide();
    $(".aboutContainer").hide();
    $(".content").show();
  });

  $("#liveReports").on("click", () => {
    $(".content").hide();
    $(".aboutContainer").hide();
    $(".liveReportsContainer").show();
  });
});
