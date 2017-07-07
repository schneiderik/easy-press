var redis = require("redis");
var client = redis.createClient('11255', "barreleye.redistogo.com");
var availability = require("./../data/availability.json");

client.auth("b971ee55a0f83079e4a6e344647711b3");
client.on("error", function (err) {
  console.log("Error " + err);
});

client.del('stock', function () {
  client.hmset('stock', availability);

  client.hgetall('stock', function (err, reply) {
    console.log(reply);

    console.log('COMPLETE!');
    process.exit();
  })
})
