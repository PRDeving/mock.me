# mock.me
Define endpoints and its responses, mocks.me will intercept ajax calls and return the mocked data instead making the call

# How does it work?
Actually mock.me intercepts all $.ajax that has 'success' as argument, defined next way, Mock.me doesn't intercepts any other
kind of XHR calls, it will eventually.

```javascript
    $.ajax({
        url: "http://myrealdomain.com/api/users",
        method: "POST",
        success: function(d) {
            console.log(d);
        }
    })
```

mock endpoints are defined like this:
```javascript
    MockMe.endPoints({
        "api/users": {
            name: "John Doe",
            age: 21
        }
    })
```

when any ajax call tries to call any endpoint with the "api/users" path like http://myrealdomain.com/api/users, Mock.me
will intercept the call and serve the mock instead, in this case the answer would be:
```json
    {name: "John Doe", age: 21}
```

Endpoints that doesnt has a Mock defined will be called normally.

#Methods
There are mock methods to serve random data.

## MockMe.randomID(String str, Integer n)
returns and String formed by n characters from str
```javascript
    MockMe.randomID("987654321abcd", 10);
    // "1584b8a744"
```
## MockMe.randomName()
returns a random name and surname in a String
```javascript
    MockMe.randomName();
    // "John Doe"
```
## MockMe.randomInteger(Integer min, Integer max)
returns an Integer between min and max
```javascript
    MockMe.randomInteger(0,4);
    // 3
```
## MockMe.randomBoolean()
returns true or false

## MockMe.randomCurrency(Integer min, Integer max)
returns a Float with two decimals
```javascript
    MockMe.randomCurrency(40, 3000);
    // 1583.21
```

#Demo
```javascript
    MockMe.endPoints({
        "user/permissions": {
            canEdit: MockMe.randomBoolean(),
            canSee: MockMe.randomBoolean()
        },
        "user/data": {
            name: MockMe.randomName(),
            budget: MockMe.randomCurrency(3000,5000),
            points: MockMe.randomInteger(10,50)
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

    $.ajax({
        url: "http://mydomain.com/user/companies",
        method: "GET",
        success: function(d){
            console.log(d);
            // prints data from real endpoint
        }
    });

    $.ajax({
        url: "http://mydomain.com/user/data",
        method: "GET",
        success: function(d){
            console.log(d);
            // Mocked response
            // {name: "Anne Black", budget: 4172.50, points: 31}
        }
    });
```

