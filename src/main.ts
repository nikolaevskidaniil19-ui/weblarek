import { EventEmitter } from "./components/base/Events";
import { Api } from "./components/base/Api";
import { WebLarekApi } from "./components/WebLarekApi";
import { Cart } from "./components/models/Cart";
import { Catalog } from "./components/models/Catalog";
import { Customer } from "./components/models/Customer";
import { TopNavigationBarWidget } from "./components/view/TopNavigationBarWidget";
import { ProductsGridWrapper } from "./components/view/ProductsGridWrapper";
import { OverlayModalPopup } from "./components/view/OverlayModalPopup";
import { OrderSummaryWidget } from "./components/view/OrderSummaryWidget";
import { PurchaseCompleteWidget } from "./components/view/PurchaseCompleteWidget";
import { BillingDetailsForm } from "./components/view/form/BillingDetailsForm";
import { ContactDetailsForm } from "./components/view/form/ContactDetailsForm";
import { CatalogGridCard } from "./components/view/productCards/CatalogGridCard";
import { DetailedItemView } from "./components/view/productCards/DetailedItemView";
import { BasketRowItem } from "./components/view/productCards/BasketRowItem";
import { IProduct, TOrder } from "./types/index"; 
import { BACKEND_SERVER_URL } from "./utils/constants";
import "./scss/styles.scss";


function duplicateTemplateElement<T extends HTMLElement>(templateSelector: string): T {
  const targetTemplate = document.querySelector(templateSelector) as HTMLTemplateElement;
  if (!targetTemplate || !targetTemplate.content.firstElementChild) {
    throw new Error(`[DOM Error]: Шаблон по селектору ${templateSelector} поврежден или отсутствует.`);
  }
  return targetTemplate.content.firstElementChild.cloneNode(true) as T;
}

const uiHeaderNode = document.querySelector(".header") as HTMLElement;
const uiGalleryNode = document.querySelector(".gallery") as HTMLElement;
const uiModalNode = document.querySelector(".modal") as HTMLElement;

if (!uiHeaderNode || !uiGalleryNode || !uiModalNode) {
  throw new Error("[Fatal Error]: Главные узлы разметки приложения отсутствуют в HTML-документе.");
}

const globalEventsBus = new EventEmitter();
const productModel = new Catalog(globalEventsBus);
const shoppingModel = new Cart(globalEventsBus);
const buyerModel = new Customer(globalEventsBus);

const coreHttpClient = new Api(BACKEND_SERVER_URL);
const restServiceFacade = new WebLarekApi(coreHttpClient);

const headerWidget = new TopNavigationBarWidget(uiHeaderNode, globalEventsBus);
const mainCatalogGrid = new ProductsGridWrapper(uiGalleryNode, globalEventsBus);
const appModalPopup = new OverlayModalPopup(uiModalNode, globalEventsBus);

const cartWidget = new OrderSummaryWidget(duplicateTemplateElement("#basket"), globalEventsBus);
const billingForm = new BillingDetailsForm(duplicateTemplateElement("#order"), globalEventsBus);
const contactsForm = new ContactDetailsForm(duplicateTemplateElement("#contacts"), globalEventsBus);
const successWidget = new PurchaseCompleteWidget(duplicateTemplateElement("#success"), globalEventsBus);

const detailedCardPreview = new DetailedItemView(
  duplicateTemplateElement("#card-preview"),
  {
    onClick: () => {
      const activeUnit = productModel.getSelectedItem();
      if (!activeUnit) return;

      if (shoppingModel.checkItem(activeUnit.id)) {
        shoppingModel.removeItem(activeUnit.id);
      } else {
        shoppingModel.addItem(activeUnit);
      }
      appModalPopup.dismiss();
    },
  }
);

globalEventsBus.on("catalog:changed", () => {
  const generatedHtmlCards = productModel.getItems().map((item) => {
    return new CatalogGridCard(duplicateTemplateElement("#card-catalog"), {
      onClick: () => globalEventsBus.emit("action:catalog-item-clicked", item),
    }).render(item);
  });

  mainCatalogGrid.render({ catalog: generatedHtmlCards });
});

globalEventsBus.on("action:catalog-item-clicked", (product: IProduct) => {
  productModel.setSelectedItem(product);
});

globalEventsBus.on("ui:open-basket-requested", () => {
  appModalPopup.content = cartWidget.render();
  appModalPopup.display();
});

globalEventsBus.on("product:selected", () => {
  const selectedProduct = productModel.getSelectedItem();
  if (!selectedProduct) return;

  const isAlreadyInCart = shoppingModel.checkItem(selectedProduct.id);

  let ctaCaption = "Купить";
  if (selectedProduct.price === null) ctaCaption = "Недоступно";
  else if (isAlreadyInCart) ctaCaption = "Удалить из корзины";

  appModalPopup.content = detailedCardPreview.render({
    ...selectedProduct,
    buttonText: ctaCaption,
    buttonDisabled: selectedProduct.price === null,
  });

  appModalPopup.display();
});
globalEventsBus.on("basket:changed", () => {
  const currentBasketItems = shoppingModel.getItems();

  const renderedRowViews = currentBasketItems.map((item, index) => {
    const productMatch = productModel.getItemById(item.id);
    if (!productMatch) return null;

    const rowInstance = new BasketRowItem(duplicateTemplateElement("#card-basket"), {
      onClick: () => shoppingModel.removeItem(productMatch.id),
    });
    rowInstance.index = index + 1;
    return rowInstance.render(productMatch);
  }).filter((element): element is HTMLElement => element !== null);

  cartWidget.buttonStatus = shoppingModel.getItemsCount() === 0;
  headerWidget.counter = currentBasketItems.length;
  cartWidget.totalPrice = shoppingModel.getTotal();
  cartWidget.items = renderedRowViews;
});

globalEventsBus.on("basket:submit", () => {
  appModalPopup.content = billingForm.render();
  appModalPopup.display();
});

globalEventsBus.on("payment:card", () => buyerModel.set({ payment: "card" }));
globalEventsBus.on("payment:cash", () => buyerModel.set({ payment: "cash" }));
globalEventsBus.on("form:address", (evt: { value: string }) => buyerModel.set({ address: evt.value }));
globalEventsBus.on("form:email", (evt: { value: string }) => buyerModel.set({ email: evt.value }));
globalEventsBus.on("form:phone", (evt: { value: string }) => buyerModel.set({ phone: evt.value }));

globalEventsBus.on("buyer:changed", () => {
  const activeProfileState = buyerModel.get();
  const currentValidationErrors = buyerModel.validate();

  billingForm.render({
    payment: activeProfileState.payment,
    address: activeProfileState.address,
    valid: !currentValidationErrors.payment && !currentValidationErrors.address,
    errors: currentValidationErrors.payment || currentValidationErrors.address || "",
  });
  
  contactsForm.render({
    email: activeProfileState.email,
    phone: activeProfileState.phone,
    valid: !currentValidationErrors.email && !currentValidationErrors.phone,
    errors: currentValidationErrors.email || currentValidationErrors.phone || "",
  });
});

globalEventsBus.on("ui:order-submitted", () => {
  appModalPopup.content = contactsForm.render();
});

globalEventsBus.on("ui:contacts-submitted", async () => {
  const orderPayload: TOrder = {
    items: shoppingModel.getItems().map((item) => item.id),
    total: shoppingModel.getTotal(),
    ...buyerModel.get(),
  };

  restServiceFacade.sendOrderTicket(orderPayload)
    .then((serverResponseReceipt) => {
      shoppingModel.clear(); 
      buyerModel.clear();    
      
      appModalPopup.content = successWidget.render({ total: serverResponseReceipt.total });
      appModalPopup.display();
    })
    .catch((networkError) => {
      console.error("[Network Error]: Произошел сбой при отправке формы заказа:", networkError);
    });
});

globalEventsBus.on("checkout:success-acknowledged", () => {
  appModalPopup.dismiss();
});


async function startApplicationPipeline() {
  try {
    const freshCatalogData = await restServiceFacade.downloadCatalog();
    productModel.setItems(freshCatalogData.items); 
  } catch (initFetchError) {
    console.error("[Init Pipeline Failure]: Не удалось загрузить витрину товаров:", initFetchError);
  }
}

startApplicationPipeline();