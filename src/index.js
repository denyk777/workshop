import './styles/main.scss';

import indexTemplate from './pages/index/index.hbs';
import articleTemplate from './components/article/article.hbs';
import spinnerTemplate from './components/spinner/spinner.hbs';

const urls = [
  'data1.json',
  'data2.json',
  'data3.json',
  'data4.json'
];

document.addEventListener("DOMContentLoaded", function() {
  const root = $('#root');
  root.append(indexTemplate());
  const content = $('.content');

  /**
   *
   * Place your code here
   */
      //сделать через forEach
      //catch использовать после первого then
      //сделать массив промисов и использовать promisAll
  var promisArray = [];

  urls.forEach((url) => {
    promisArray.push(fetch('./api/' + url).then(
        (response) => {
          return response.json();
        }
        ).catch((e) => console.log(e))
    )});
  console.log(promisArray);

  Promise.all(promisArray).then((promis) => {

    promis.forEach((field) => {
      //console.log(field);\
      if (field) {
        field.data.forEach((item) => {
              content.append((articleTemplate(item)))
            }
        )
      }
    })
  });

  /*urls.forEach((items) => {
    console.log(items);
    fetch('./api/' + items).then(
        (response) => {
          return response.json();
        }
    ).catch(
        (e) => console.log(e)
    ).then((results) => {
      results.data.forEach((item) => {
        promisArray.push(item);
        console.log(promisArray);
        content.append(articleTemplate(item));
      })
    })
    Promise.all(promisArray).then();
  })*/
});
