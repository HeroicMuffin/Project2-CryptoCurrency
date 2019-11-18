class CryptoCardContainer {
  constructor() {
    this.state = [];
    this.listeners = [];
    this.changedInModal = [];
    const config = {
      url: "https://api.coingecko.com/api/v3/coins/list"
    };

    this.updateListener = (name, id, isChecked) => {
      this.listeners.push({ name, id, isChecked });
      if (this.listeners.length === 6) {
        drawModal(this.listeners);
        triggerModal();
      }
    };

    this.loadData = async cb => {
      const requestHandler = new HttpHandler();
      const result = await requestHandler.getRequest(config);
      result.slice(0, 1000).forEach(coin => {
        this.state.push(
          new CryptoCard(coin.id, coin.name, coin.symbol, this.updateListener)
        );
      });
      cb(this.state);
    };
  }

  draw() {
    this.loadData(data => {
      const content = document.getElementsByClassName("row")[0];
      data.forEach(element => {
        const node = element.drawCard(false);
        content.appendChild(node);
      });
    });
  }
}

const drawModal = checkedCards => {
  $(".modal-body").html("");
  checkedCards.forEach(card => {
    const uiCard = new CryptoCard(
      card.id,
      card.name,
      undefined,
      () => {},
      true
    );
    const node = uiCard.drawCard(true);
    $(".modal-body").append(node);
  });
};

const triggerModal = () => {
  $("#modalButton").trigger("click");
};
