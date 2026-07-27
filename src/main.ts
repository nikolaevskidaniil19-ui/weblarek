import { WebLarekApi } from './components/WebLarekApi';
import { Api } from './components/base/Api';
import { Cart } from './components/models/Cart';
import { Catalog } from './components/models/Catalog';
import { Customer } from './components/models/Customer';
// @ts-ignore
import './scss/styles.scss';
import { EPayment, IProduct } from './types';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';


function runCatalogTests(catalogInstance: Catalog, products: IProduct[]) {
  const targetProduct = products[0];
  
  catalogInstance.setItems(products);
  console.log('=== [Каталог] ===');
  console.log('Список товаров:', catalogInstance.getItems());
  console.log('Всего позиций:', catalogInstance.getTotal());
  console.log('Поиск по идентификатору:', catalogInstance.getItemById(targetProduct.id));
  console.log('Текущий выбор:', catalogInstance.getSelectedItem());

  catalogInstance.setSelectedItem(targetProduct);
  console.log('Выбор после обновления:', catalogInstance.getSelectedItem());
}

function runCartTests(cartInstance: Cart, products: IProduct[]) {
  const firstProd = products[0];
  const secondProd = products[1]; 
  
  console.log('=== [Корзина] ===');
  console.log('Начальное состояние:', cartInstance.getItems());
  
  cartInstance.addItem(firstProd);
  cartInstance.addItem(secondProd);
  cartInstance.addItem(firstProd);
  
  console.log('Содержимое корзины:', cartInstance.getItems());
  console.log('Общее кол-во:', cartInstance.getItemsCount());
  console.log('Итоговая сумма:', cartInstance.getTotal());
  console.log('Присутствие первого товара:', cartInstance.checkItem(firstProd.id));
  
  cartInstance.removeItem(firstProd.id);
  console.log('После удаления первого элемента:', cartInstance.getItems());
  
  cartInstance.clear();
  console.log('После полной очистки:', cartInstance.getItems());
}

function runCustomerTests(customerInstance: Customer) {
  console.log('=== [Покупатель] ===');
  console.log('Профиль по умолчанию:', customerInstance.get());
  console.log('Ошибки пустой формы:', customerInstance.validate());

  customerInstance.set({ address: 'Москва, ул. Примерная, 1' });
  console.log('После добавления адреса:', customerInstance.get());
  console.log('Ошибки формы (только адрес):', customerInstance.validate());

  customerInstance.set({ payment: EPayment.online });
  console.log('После выбора оплаты:', customerInstance.get());
  console.log('Ошибки формы (без контактов):', customerInstance.validate());

  customerInstance.set({ email: 'test@mail.ru', phone: '+79991234567' });
  console.log('Заполненный профиль:', customerInstance.get());
  console.log('Результат финальной валидации:', customerInstance.validate());

  customerInstance.clear();
  console.log('После сброса данных:', customerInstance.get());
}

function executeLocalMock() {
  console.log('>>> СТАРТ ЛОКАЛЬНЫХ ТЕСТОВ <<<');

  const catalog = new Catalog();
  runCatalogTests(catalog, apiProducts.items);

  const cart = new Cart();
  runCartTests(cart, apiProducts.items);

  const customer = new Customer();
  runCustomerTests(customer);
}

async function appInitialization() {
  console.log('>>> СТАРТ ИНИЦИАЛИЗАЦИИ API <<<');

  const coreApi = new Api(API_URL);
  const serverAdapter = new WebLarekApi(coreApi);
  
  const shoppingCart = new Cart();
  const storeCatalog = new Catalog();

  try {
    const responseData = await serverAdapter.getProductList();

    runCatalogTests(storeCatalog, responseData.items);
    runCartTests(shoppingCart, storeCatalog.getItems());
  } catch (err) {
    console.error('Критическая ошибка при связи с сервером:', err);
  }
}
executeLocalMock();
appInitialization();