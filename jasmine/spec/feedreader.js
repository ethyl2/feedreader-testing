/* feedreader.js
 *
 * This is the spec file that Jasmine reads and contains
 * all of the tests that will be run against the application.
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
       expect($menu).toBeDefined();
       expect($menu.classList).toContain('menu-hidden');
     });

     /* A test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * has two expectations: does the menu display when
      * clicked and does it hide when clicked again:
      */

      it('changes visibility by displaying once clicked and hiding once clicked again', function() {
        $hamburger = document.getElementsByTagName('i')[0];
        expect($hamburger).toBeDefined();
        $hamburger.click();
        expect($menu.classList).not.toContain('menu-hidden');
        $hamburger.click();
        expect($menu.classList).toContain('menu-hidden');
      });
    }); // end test suite 'The menu'

    /* A new test suite named 'Initial Entries': */
    describe('Initial Entries', function() {

      /* A test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Since loadFeed() is asynchronous, this test requires
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
        expect($feed).toBeDefined();
        expect($entries).toBeDefined();
        expect($entries.length).toBeGreaterThan(0);
        expect($feed.contains($entries[0])).toBe(true);
        done();
      });
    }); // end test suite 'Initial Entries'


    /* A new test suite named 'New Feed Selection' */
    describe('New Feed Selection', function() {

      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */

      var content0; //original content of 1st entry with allFeeds[0]
      var $entries = document.getElementsByClassName('entry');

      beforeEach(function(done) {
        content0 = $entries[0].textContent;
        loadFeed(1, function() {
          done();
        });
      });

      it('has content which changes when a new feed' +
        ' is loaded by loadFeed()', function(done) {
        expect($entries).toBeDefined();
        expect(content0).toBeDefined();
        var content1 = $entries[0].textContent; //new content of 1st entry with allFeeds[1]
        expect(content1).toBeDefined();
        expect(content0).not.toMatch(content1);
        done();
      });
    }); // end test suite New Feed Selection

    /* Here's my new test suites for future features for
     * this feedreader:
     */

    describe('New Feed Additions', function() {
      /* A test to see whether new feeds can be added to the current selection
       * of feeds. Helpful once DOM elements are added (input, submit button)
       * for adding feeds.
       */

      it('can be added to the allFeeds array', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
        var oldNumFeeds = allFeeds.length;
        var newFeedName = 'Slashdot';
        var newFeedUrl = 'http://rss.slashdot.org/Slashdot/slashdot';

        allFeeds[oldNumFeeds] = {
          name: newFeedName,
          url: newFeedUrl
          }
        expect(allFeeds.length).toBe(oldNumFeeds + 1);
        expect(allFeeds.slice(-1)[0].name).toBe(newFeedName);
        expect(allFeeds.slice(-1)[0].url).toBe(newFeedUrl);
      });
    }); // end of New Feed Additions test suite

    describe('Deleting Feeds', function() {
      /* A test to see whether feeds can be deleted from the current selection
       * of feeds. Helpful once DOM elements are added (edit-mode button, checkboxes?)
       * for deleting feeds.
       */

      it('is possible by removing a feed from the allFeeds array', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
        var oldNumFeeds = allFeeds.length;
        var indexToRemove = 2;

        allFeeds.splice(indexToRemove, 1);
        expect(allFeeds.length).toBe(oldNumFeeds - 1);

      });
    }); // end of Deleting Feeds test suite

    describe('Entries', function() {

      it('can be deleted', function() {
        /* A test to see whether entries can be deleted. Helpful once DOM elements
         * are added (edit-mode button, checkboxes?)
         * and a corresponding function in js/app.js
         */
        var $entries = document.getElementsByClassName('entry-link');
        expect($entries.length).toBeGreaterThan(0);
        var oldNumEntries = $entries.length;
        var indexToRemove = 0;
        if ($entries[indexToRemove]) {
          $entries[indexToRemove].parentNode.removeChild($entries[indexToRemove]);
        }
        expect($entries.length).toEqual(oldNumEntries - 1);
      });

      it('can be marked as favorites by changing the background color', function() {
        var $entries = document.getElementsByClassName('entry');
        expect($entries.length).toBeGreaterThan(0);
        var indexToFavorite = 2;
        var indexNotFavorite = 0;
        // Apply background color -- alternatively could be done by adding a class:
        $entries[indexToFavorite].style.backgroundColor = 'rgba(243, 243, 57, 0.2)';
        expect($entries[indexToFavorite].style.backgroundColor).not.toEqual($entries[indexNotFavorite].style.backgroundColor);
      });

      it('can have their order reversed', function() {
        /* A test to see whether entries can be reordered. Helpful once DOM elements
         * are added (edit-mode button, drop-down menu of ways to reorder the entries?)
         * and a corresponding function in js/app.js
         */

        var $container = $('.feed');
        var $entries = $container.children();
        expect($entries.length).toBeGreaterThan(0);

        var oldFirstEntry = $entries[0];
        var oldLastEntry = $entries[$entries.length - 1];

        $entries = $entries.get().reverse();
        var newFirstEntry = $entries[0];
        var newLastEntry = $entries[$entries.length - 1];

        // To display the entries in their new order:
        $container.empty();
        $container.append($entries);

        // Testing to make sure that the order is reversed
        expect(oldFirstEntry.textContent).toEqual(newLastEntry.textContent);
        expect(oldLastEntry.textContent).toEqual(newFirstEntry.textContent);
        expect(oldFirstEntry.textContent).not.toEqual(newFirstEntry.textContent);
        expect(oldLastEntry.textContent).not.toEqual(newLastEntry.textContent);
        });

      it('can have their titles translated into another language', function() {
        /* A test to see whether entries' titles can be translated to another language.
         * Helpful once DOM elements are added (translate button, checkboxes for
         * the user to show which ones to translate)
         * and a corresponding function in js/app.js
         */

        var $container = $('.feed');
        var $entries = $container.children();
        expect($entries.length).toBeGreaterThan(0);
        var firstEntry = $entries[0]; //For this example, the entry title I want to translate
        var firstEntryText = firstEntry.textContent;
        var oldFirstEntryText = firstEntryText;
        var newFirstEntryText;
        var languages = 'en-es'; //For this example, English to Spanish

        var translationUrl = 'https://translate.yandex.net/api/v1.5/tr.json/' +
        'translate?key=trnsl.1.1.20170208T050757Z.3178e56b73c7d5ef.9647cf12c00202e6e3a6d7e1527b9093309b9ff2' +
        '&text='+ firstEntryText + '&lang=' + languages + '&plain';

        $.getJSON(translationUrl, function (data) {
          newFirstEntryText = data.text[0];
          firstEntry.innerHTML = '<article class = "entry"><h2>' + newFirstEntryText + '</h2></article>';
          $container.after('<a style="font-size:150%" href="http://translate.yandex.com/" target="_blank">Powered by Yandex.Translate</a>');
          }).fail(function() {
            console.log('Translation is not available');
          });
          expect(oldFirstEntryText).not.toEqual(newFirstEntryText);
        });

      }); // end of Entries test suite
}());
