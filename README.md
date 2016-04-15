[![Build Status](https://travis-ci.org/codebubb/quickapi.svg?branch=master)](https://travis-ci.org/codebubb/quickapi)

QuickAPI
========

Generates a JSON API based on the contents of an SQLite database.

Visiting /tablename queries the database and returns rows as JSON.

To start the QuickAPI server, change in to the directory then:
```
node serve
```

A sample database is provided in ```sample.db``` which will be used by default.  You can specify your own database to use either by updating ```config.js``` or by specifying on the command line:

```
node serve usethis.db
```

 
