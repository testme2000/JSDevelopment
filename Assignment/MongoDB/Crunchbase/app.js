var MongoClient = require('mongodb').MongoClient,
    commandLineArgs = require('command-line-args'), 
    assert = require('assert');


var options = commandLineOptions();

MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");
    
    var query = queryDocument(options);
    var projection = {"_id": 1, "name": 1, "founded_year": 1,
                      "number_of_employees": 1, "crunchbase_url": 1};

    var cursor = db.collection('companies').find(query, projection);
    var numMatches = 0;

    cursor.forEach(
        function(doc) {
            numMatches = numMatches + 1;
            console.log( doc );
        },
        function(err) {
            assert.equal(err, null);
            console.log("Our query was:" + JSON.stringify(query));
            console.log("Matching documents: " + numMatches);
            return db.close();
        }
    );

});


function queryDocument(options) {

    console.log(options);
    
    var query = {
        "founded_year": {
            "$gte": options.firstYear,
            "$lte": options.lastYear
        }
    };

    if ("employees" in options) {
        query.number_of_employees = { "$gte": options.employees };
    }
        
    return query;
    
}


function commandLineOptions() {

    var cli = commandLineArgs([
        { name: "firstYear", alias: "f", type: Number },
        { name: "lastYear",  alias: "l", type: Number },
        { name: "employees", alias: "e", type: Number }
    ]);
    
    var options = cli.parse()
    if ( !(("firstYear" in options) && ("lastYear" in options))) {
        console.log(cli.getUsage({
            title: "Usage",
            description: "The first two options below are required. The rest are optional."
        }));
        process.exit();
    }

    return options;
    
}




/*
var MongoClient = require('mongodb').MongoClient,
    commandLineArgs = require('command-line-args'),
    assert = require('assert');

var options = commandLineOptions();


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {
    // Verify that we don't have any error
    assert(err,null);
    console.log("Connected to Database");
    // Query to Database
    var query = queryDocument(options);
    var projection = { "_id": 0, "name": 1, "founded_year": 1,
                        "number_of_employees": 1, "crunchbase_url": 1};
    var cursor = db.collection('companies').find(query, projection);
    var numMatches = 0;
    
    cursor.forEach(
        function(doc) {
            numMatches += 1;
            console.log(doc);
        },
        function(error) {
            assert(error, null);
            console.log("Query : " + JSON.stringify(query));
            console.log("Matching document : " +  numMatches);
            return db.close();
        }
    );
});

function commandLineOptions() 
{
    var cli = commandLineArgs([
        {name:"firstYear", alias: "f", type: Number},
        {name:"lastYear", alias: "l", type: Number},
        {name:"employees", alias: "e", type: Number}
    ]);
    
    var options = cli.parse();
    if( !(("firstYear" in options) && ("lastYear" in options))) {
        console.log(cli.getUsage({
            title: "Usage",
            description: "First two options are required. The rest are optional"
        }));
        process.exit();
    }
    return options;
}

function queryDocument(options)
{
    console.log(options);
    
    var query = {
      "founded_year" : {
          "$gte": options.firstYear,
          "$lte": options.lastYear
      }  
    };
    
    if( "employees" in options) {
        query.number_of_employees = { "$gte" : options.employees };
    }
    
    return query;
}


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"category_code": "biotech"};

    db.collection('companies').find(query).toArray(function(err, docs) {

        assert.equal(err, null);
        assert.notEqual(docs.length, 0);
        
        docs.forEach(function(doc) {
            console.log( doc.name + " is a " + doc.category_code + " company." );
        });
        
        db.close();
        
    });
});
*/

