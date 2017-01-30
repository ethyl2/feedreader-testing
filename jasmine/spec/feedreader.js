/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty.
       */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* A test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty:
       */

      it('have defined URLs which are not empty', function() {
        for (var i=0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url.length).toBeGreaterThan(0);
        }
      });

      /* A test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */

      it('have defined names which are not empty', function() {
        for (var i=0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name.length).toBeGreaterThan(0);
        }
      });
    }); // end test suite 'RSS feeds'

    /* A new test suite named "The menu" */
    describe('The menu', function() {
      var $menu = document.getElementsByTagName('body')[0];
      /* A test that ensures the menu element is
       * hidden by default.
       */

     it('has menu element hidden by default by having class menu-hidden', function() {
       expect($menu.classList).toContain('menu-hidden');
     });

     /* A test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * has two expectations: does the menu display when
      * clicked and does it hide when clicked again:
      */

      it('changes visibility by displaying once clicked and hiding once clicked again', function() {
        $hamburger = document.getElementsByTagName('i')[0];
        $hamburger.click();
        expect($menu.classList).not.toContain('menu-hidden');
        $hamburger.click();
        expect($menu.classList).toContain('menu-hidden');
      });
    }); // end test suite 'The menu'

    /* A new test suite named 'Initial Entries': */
    describe('Initial Entries', function() {

      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it('consist of at least a single .entry element within the .feed container' +
        ' once the loadFeed function is called and completes its work', function(done) {
        var $feed = document.getElementsByClassName('feed')[0];
        var $entries = document.getElementsByClassName('entry');
        expect($entries.length).toBeGreaterThan(0);
        expect($feed.contains($entries[0])).toBe(true);
        //console.log($feed.contains($entries[0]));
        done();
      });

    }); // end test suite 'Initial Entries'


    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
