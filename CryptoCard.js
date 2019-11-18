class CryptoCard {
  constructor(id, name, symbol, onlistenerClick, isChecked = false) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.isChecked = isChecked;
    this.info = undefined;
    this.updateOnlistenerClick = onlistenerClick;
  }

  createElement(type, cls, id, innerText) {
    const element = document.createElement(type);
    if (id != undefined) element.id = id;
    if (cls != undefined) element.className = cls;
    if (innerText != undefined) {
      if (innerText.length > 25) {
        innerText = `${innerText.substring(0, 20)}...`;
      }
      element.innerText = innerText;
    }
    return element;
  }

  createButton(id) {
    const button = this.createElement(
      "button",
      "btn btn-info",
      "collapseButton"
    );
    button.setAttribute("data-toggle", "collapse");
    button.setAttribute("data-target", `#${id}`);
    return button;
  }

  drawCard(isInModal) {
    const card = this.createElement("div", "col-xl-4 col-sm-12 ", "cCard");
    const info = this.createElement("div", "info");
    const h3 = this.createElement("p", "cardId", undefined, this.id);
    const p = this.createElement("p", "cardName", this.symbol, this.name);

    const collapseButton = this.createButton(this.id);

    const span = this.createElement(
      "span",
      "glyphicon glyphicon-info-sign",
      undefined,
      "Information"
    );
    const demo = this.createElement("div", "collapse", this.id);
    const demoP = this.createElement("div", "ddContent", "ddContent");

    collapseButton.addEventListener("click", () => {
      this.getInfo().then(data => {
        demoP.append(data);
      });
    });

    const checkButtonContainer = this.createElement("div", "checkButton");
    const checkButton = this.createElement("label", "switch");

    const checkButtonCheckBox = this.createElement("input");
    checkButtonCheckBox.id = `checkButton-${this.id}-${isInModal}`;
    if (!isInModal) {
      checkButtonCheckBox.addEventListener("click", () => {
        if (!this.isChecked) {
          this.updateOnlistenerClick(this.name, this.id, true);
          this.isChecked = !this.isChecked;
        } else {
          cryptoContainer.listeners = cryptoContainer.listeners.filter(
            coin => coin.id != this.id
          );
          this.isChecked = !this.isChecked;
        }
      });
    }

    if (isInModal) {
      checkButtonCheckBox.addEventListener("click", event => {
        cryptoContainer.listeners.forEach(e => {
          if (e.id == this.id) {
            e.isChecked = !e.isChecked;
            cryptoContainer.changedInModal.push(this.id);
          }
        });
      });
    }

    checkButtonCheckBox.checked = this.isChecked;
    checkButtonCheckBox.setAttribute("type", "checkbox");
    const checkButtonSpan = this.createElement("span", "slider round");

    checkButton.append(checkButtonCheckBox);
    checkButton.append(checkButtonSpan);
    collapseButton.append(span);
    demo.append(demoP);
    info.append(h3);
    info.append(p);
    info.append(collapseButton);
    info.append(demo);
    card.append(info);
    checkButtonContainer.append(checkButton);
    card.append(checkButtonContainer);

    return card;
  }

  async getInfo() {
    if (!this.info) {
      this.state = [];
      const config = {
        url: `https://api.coingecko.com/api/v3/coins/${this.id}`
      };
      const requestHandler = new HttpHandler();
      const result = await requestHandler.getRequest(config);
      const { image, market_data } = result;
      this.info = this.createCollapsedInfromation(image, market_data);
    }
    return this.info;
  }

  createCollapsedInfromation(image, market_data) {
    const cardInfo = `$${market_data.current_price.usd}
    €${market_data.current_price.eur}
    ₪${market_data.current_price.ils}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "contentDiv";
    contentDiv.innerText = cardInfo;

    contentDiv.style.backgroundImage = `url(${image.large})`;
    return contentDiv;
  }
}
