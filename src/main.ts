import { WebLarekApi } from './components/WebLarekApi';
import { Api } from './components/base/Api';
import { Cart } from './components/models/Cart';
import { Catalog } from './components/models/Catalog';
import { Customer } from './components/models/Customer';
import './scss/styles.scss';
import { EPayment, IProduct } from './types';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const testCatalog = (catalog: Catalog, items: IProduct[]) => {
  const product = items[0];
  const productId = product.id;
  
  catalog.setItems(items)
  console.log('--- Catalog ---');
  console.log('товары в каталоге:', catalog.getItems());
  console.log('количество товаров в каталоге:', catalog.getTotal());
  console.log('товар по id:', catalog.getItemById(productId));
  console.log('выбранный товар:', catalog.getSelectedItem());

  catalog.setSelectedItem(product);
  console.log('выбранный товар после setSelectedItem:', catalog.getSelectedItem());
}

const testCart = (cart: Cart, items: IProduct[]) => {
  const product1 = items[0];
  const product2 = items[1];
  const productId = product1.id;
  
  console.log('--- Cart ---');
  console.log('товары в корзине (пустая):', cart.getItems());
  cart.addItem(product1);
  cart.addItem(product2);
  cart.addItem(product1);
  console.log('товары в корзине:', cart.getItems());
  console.log('количество товаров в корзине:', cart.getItemsCount());
  console.log('стоимость корзины:', cart.getTotal());
  console.log('товар в корзине:', cart.checkItem(productId));
  cart.removeItem(product1.id);
  console.log('товары после removeItem:', cart.getItems());
  cart.clear();
  console.log('корзина после clear:', cart.getItems());
}

const testCustomer = (customer: Customer) => {
  console.log('--- Customer ---');
  console.log('данные покупателя:', customer.get());
  console.log('валидация (пустые данные):', customer.validate());

  customer.set({ address: 'Москва, ул. Примерная, 1' });
  console.log('данные после set (только address):', customer.get());
  console.log('валидация (только address):', customer.validate());

  customer.set({ payment: EPayment.online });
  console.log('данные после set (address и payment):', customer.get());
  console.log('валидация (без контактов):', customer.validate());

  customer.set({ email: 'test@mail.ru', phone: '+79991234567' });
  console.log('данные покупателя (полные):', customer.get());
  console.log('валидация (полные данные):', customer.validate());

  customer.clear();
  console.log('данные после clear:', customer.get());
}

const testMock = () => {
  console.log('--- Test Mock ---');

  const catalog = new Catalog();
  testCatalog(catalog, apiProducts.items);

  const cart = new Cart();
  testCart(cart, apiProducts.items);

  const customer = new Customer();
  testCustomer(customer);
}

const main = async () => {
  console.log('--- Test Api ---');

  const api = new Api(API_URL);
  const webLarekApi = new WebLarekApi(api);
  const cart = new Cart();
  const catalog = new Catalog();

  try {
    const { items } = await webLarekApi.getProductList();

    testCatalog(catalog, items);
    testCart(cart, catalog.getItems());
  } catch (error) {
    console.error('Ошибка сервера:', error);
  }
};

testMock();
main();