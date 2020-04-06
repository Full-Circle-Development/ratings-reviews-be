var faker = require("faker");
var fs = require("fs");
var string = "";

function generate(num) {
  for (let i = 0; i < num; i++) {
    string += 
    null + ', ' +                                          // id
    faker.random.number({'min': 1,'max': 100}) + ', ' +    // product_id
    faker.random.number({'min': 1,'max': 5}) + ', ' +      // rating
    faker.date.past() + ', ' +                             // date
    faker.lorem.sentence() + ', ' +                        // summary
    faker.lorem.paragraph() + ', ' +                       // body
    faker.random.boolean() + ', ' +                        // recommend      
    faker.random.boolean() + ', ' +                        // reported         
    faker.name.findName()  + ', ' +                        // reviewer_name
    faker.internet.email() + ', ' +                        // reviewer_email
   '\n'

    // id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness


    // fs.writeFile("/Users/austin/Documents/HackReactor/ratings-reviews-be/generated.txt", string, err => {
    //   if (err) throw err;
    //   console.log("It's saved!");
    // });

    fs.appendFile('test.csv', string, function (err) { // TRY TO USE ASYNC VERSION HERE
      if (err) throw err;
      console.log('Saved!');
    }); 
  }
}

generate(100);

// id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

// try writing to txt file to test
