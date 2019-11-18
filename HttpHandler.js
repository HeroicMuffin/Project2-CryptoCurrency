class HttpHandler {
  constructor() {
    this.getRequest = async config => {
      showLoader();
      const result = await $.ajax({
        url: config.url,
        method: "GET"
      });
      hideLoader();
      return result;
    };
  }
}

const showLoader = () => {
  $("#loader").show();
};
const hideLoader = () => {
  $("#loader").hide();
};
