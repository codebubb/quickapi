var config = require('../config.js');
var request = require('request');
var base_url = 'http://' + config.ip + ':' + config.port + '/';


describe("when the server is running", function() {
  it("should respond to http requests", function(done){
    request.get(base_url, function(err, response,body){
      expect(response.statusCode).toBe(200);
      expect(err).toBeFalsy();
      done();
    });
  });

  it("should return json", function(done){
    request.get(base_url, function(err, response,body){
      expect(response.statusCode).toBe(200);
      expect(err).toBeFalsy();
      expect(response.headers['content-type'].split(';')[0]).toBe('application/json');
      var json_obj = JSON.parse(body);
      expect(json_obj).toEqual(jasmine.any(Object));
      expect(json_obj).toEqual({ status : 'OK' });
      done();
    });
  });

  describe("the test database", function(){
    it("should return users json", function(done){
        request.get(base_url + 'users', function(err, response, body){
          var json_data = JSON.parse(body);
          expect(json_data).toEqual(jasmine.any(Object));
          expect(Object.keys(json_data).length).toBeGreaterThan(0);
          done();
        });
    });

    it("should return errors", function(done){
        request.get(base_url + 'notjinghere', function(err, response, body){
          var json_data = JSON.parse(body);
          expect(json_data).toEqual(jasmine.any(Object));
          expect(Object.keys(json_data).length).toBeGreaterThan(0);
          expect(json_data).toEqual(jasmine.objectContaining({
            "errno": 1
          }))
          done();
        });
    });
  });


});
