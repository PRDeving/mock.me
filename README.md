### Important

this library has been updated in Nov 2016, it's actually a v2, all methods for creating mock data from v1 are deprecated

# mock.me
Define endpoints and its responses, mocks.me will intercept ajax calls and return the mocked data instead making the call

# How does it work?

define the endpoints to mock
```javascript
    MockMe.endPoints({
        "api/users": {
            name: "John Doe",
            age: 21
        }
    })
```
do your calls as usual
```javascript
    $.ajax({
        url: "http://myrealdomain.com/api/users",
        method: "POST",
        success: function(d) {
            console.log(d);
        }
    })
```

when any call tries to reach any endpoint with the "api/users" path like http://myrealdomain.com/api/users, Mock.me
will intercept the call and serve the mock instead, in this case the answer would be:
```json
    {name: "John Doe", age: 21}
```

Endpoints that doesnt has a Mock defined will be called normally.

# Support
Mock.me supports JQuery ajax calls and angularJS $http requests, it answers via callback or promise depending on the way the calls
are done.

```javascript

    // in angular, it will return a promise
    $http.get('...')
      .then(function(ans) {
        console.log("angular get promise:", ans, !!ans);
      });

    // This will return a promise too
    $.ajax('...')
      .then(function(ans) {
        // ...
      });

    // this will fire the callback
    $.ajax('...', function(ans) {
        // ...
      });

    // this will fire the success callback fn
    $.ajax({
      url: 'http://s1.api.com/jquery/config',
      success: function(ans) {
        console.log("js ajax config:", ans, !!ans);
      }

```

#Methods
There are mock methods to serve random data.

## MockMe.id(String str, Integer n)
returns an String formed by n characters from str
```javascript
    MockMe.id()
    // "1584b744" (n == 8, str == default)

    MockMe.id(10);
    // "908tj293uh (str == default);

    MockMe.id("987654321abcd");
    // "1584b744" (n == 8)

    MockMe.id("987654321abcd", 10);
    // "1584b8a744"
```
## MockMe.name()
returns a random name and surname in a String
```javascript
    MockMe.name();
    // "John Doe"
```
## MockMe.number(Integer min, Integer max)
returns an Integer between min and max
```javascript
    MockMe.number();
    // 832 ( 0 -> 1000)

    MockMe.number(4);
    // 82 ( 4 -> 1000)

    MockMe.number(0,4);
    // 3 (0 -> 4)
```
## MockMe.booolean()
returns true or false

## MockMe.randomCurrency(Integer min, Integer max)
returns a Float with two decimals
```javascript
    MockMe.money();
    // 158.31 (0 -> 1000);

    MockMe.money(40);
    // 583.10 (40 -> 1000);

    MockMe.money(40, 3000);
    // 1583.21 (40 -> 3000);

```

#Demo
```javascript
    MockMe.endPoints({
        "user/permissions": {
            canEdit: MockMe.boolean(),
            canSee: MockMe.boolean()
        },
        "user/data": {
            name: MockMe.name(),
            budget: MockMe.money(3000,5000),
            points: MockMe.number(10,50)
        }
    });

    $.ajax({
        url: "http://mydomain.com/user/permission",
        method: "GET",
        success: function(d){
            console.log(d);
            // Mocked response
            // {canEdit: true, canSee: false}
        }
    });

    $.ajax("http://mydomain.com/user/companies")
        .then(function(d){
            console.log(d);
            // prints data from real endpoint
        });

    $.ajax("http://mydomain.com/user/data")
        .then(function(d){
            console.log(d);
            // prints mocked data
        });
```

