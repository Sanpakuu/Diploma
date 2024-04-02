  import express from 'express';
  import { fileURLToPath } from 'url';
  import path from 'path';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const app = express();
  const port = 3000; // Порт, на котором будет запущен сервер

  // Указываем путь к статическим файлам (html, css, img и js)
  const staticPath = path.join(__dirname, 'html');
  const cssPath = path.join(__dirname, 'css');
  const imgPath = path.join(__dirname, 'images');
  const jsPath = path.join(__dirname, 'javascript');


  app.use('/html', express.static(staticPath));
  app.use('/css', express.static(cssPath));
  app.use('/images', express.static(imgPath));
  app.use('/javascript', express.static(jsPath));

  app.use(express.urlencoded({ extended: true }));//???

  //Главная страница
  app.get('/main', (req, res) => {
    const indexPath = path.join(staticPath, 'main.html');
    res.sendFile(indexPath);
  });
  //Информация
  app.get('/discover', (req, res) => {
    const indexPath = path.join(staticPath, 'discover.html');
    res.sendFile(indexPath);
  });
  //Астронавты
  app.get('/astronauts', (req, res) => {
    const indexPath = path.join(staticPath, 'information/i1(astro).html');
    res.sendFile(indexPath);
  });
  //Корабли
  app.get('/ships', (req, res) => {
    const indexPath = path.join(staticPath, 'information/i2(ships).html');
    res.sendFile(indexPath);
  });
  //Путешествие
  app.get('/journey', (req, res) => {
    const indexPath = path.join(staticPath, 'information/i3(journey).html');
    res.sendFile(indexPath);
  });
  //Карта
  app.get('/map', (req, res) => {
    const indexPath = path.join(staticPath, 'information/i4(map).html');
    res.sendFile(indexPath);
  });
  //О нас
  app.get('/about', (req, res) => {
    const indexPath = path.join(staticPath, 'about.html');
    res.sendFile(indexPath);
  });
  //Викторина
  app.get('/quiz', (req, res) => {
    const indexPath = path.join(staticPath, 'quiz.html');
    res.sendFile(indexPath);
  });
  //Вход
  app.get('/sign', (req, res) => {
    const indexPath = path.join(staticPath, 'sign.html');
    res.sendFile(indexPath);
  });
  app.get('/cabinet', (req, res) => {
    const indexPath = path.join(staticPath, 'cabinet.html');
    res.sendFile(indexPath);
  });
  app.get('/archive', (req, res) => {
    const indexPath = path.join(staticPath, 'information/i5(archive).html');
    res.sendFile(indexPath);
  });

  // Запуск сервера
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
