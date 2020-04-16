var faker = require("faker");
var fs = require("fs");

function generate(num) {

  let string = "";
  let rowId = 1;
  let writer = fs.createWriteStream('newReviews.csv');

  for (let i = 0; i < num; i++) {

    string += 
    rowId + ', ' +  // id
    faker.random.number({'min': 1,'max': 5000000}) + ', ' +  // product_id
    faker.random.number({'min': 1,'max': 5}) + ', ' +  // rating
    faker.date.past().toISOString()  + ', ' + // date
    faker.lorem.sentence() + ', ' + // summary
    faker.lorem.paragraph() + ', ' + // body
    faker.random.boolean() + ', ' + // recommend      
    faker.random.boolean() + ', ' +   // reported         
    faker.internet.userName()  + ', ' + // reviewer_name
    faker.internet.email() +  ', ' + // reviewer_email
    faker.random.arrayElement([faker.lorem.sentence(), null, null, null, null]) +  ', ' +  // response (sometimes null)
    faker.random.number({'min': 0, 'max': 150}) + // helpfulness
   '\n'

    // id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
    // 6,2,5,"2019-06-16","I'm not a fan!","I don't like them",false,false,"negativity","first.last@gmail.com","Sorry to hear. Is there anything in particular you don't like?",0

    writer.write(string);
    string = '';
    rowId++;
  }
  writer.end();
  console.log('Done! It worked! You\'re not an idiot!')
}

generate(10000000);

// id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
