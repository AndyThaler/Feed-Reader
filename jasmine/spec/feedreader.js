/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Test to make sure every Feed has a valid URL
         it('have valid URLs', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
             expect(feed.url).toMatch(/^(http|https):\/\//);
           });
         });

        //Test to make sure every Feed has a valid name
         it('have defined and valid names', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    //The menu test suite
    describe('The menu', function() {

      var body = document.body;
      var Hamburger = document.querySelector('.menu-icon-link');

        //Test to define if the menu is hidden by default
        it('is hidden by default', function() {
          expect(body.className).toContain('menu-hidden');
        });

         //Test to define if the menu is controlled by the hamburger-icon
        it('is toggled on/off by hamburger-icon', function() {
          Hamburger.click();
          expect(body.className).not.toContain('menu-hidden');
          Hamburger.click();
          expect(body.className).toContain('menu-hidden');
        });
      });

    //Initial Entries test suite
    describe('Initial Entries', function () {
      var Entries;
      var Entrylinks;

      /*Test to define if when the loadFeed function is called and completed,
      that there is at least a single .entry in the .feed container
      IMPORTANT -- It is an asynchronous function*/
         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         it('have at least one .entry element in .feed container', function(done) {
           Entries = document.querySelector('.feed').getElementsByClassName('entry').length;
           expect(Entries).toBeGreaterThan(0);
           done();
         });
});

    // New Feed Selector suite
      describe('New Feed Selection', function() {

        //Test to ensure when a new feed is loaded, that the content changes
        var initFeed;
        beforeEach(function(done) {
          loadFeed(0, function() {
            initFeed = document.querySelector('.feed').innerHTML;
            loadFeed(1, function() {
                done();
            });
          });
        });
        it('changes its loaded content', function(done) {
          var newFeed = document.querySelector('.feed').innerHTML;
          expect(initFeed).not.toBe(newFeed);
          done();
        });
      });

}());
