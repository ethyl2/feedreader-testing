# Feed Reader Tester Project

This project consists of testing a web-based application that reads RSS feeds,
using [Jasmine](http://jasmine.github.io/). For this project, I needed to write
test suites to test current and possible future features.

https://github.com/ethyl2/feedreader-testing.git
 --------------------------------------------------------
## How to Use This Application

1. Check out the repository:

  ```bash
  $> git clone https://github.com/ethyl2/feedreader-testing.git
  ````

2. You can run a local server:

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

3.  Open a browser and visit localhost:8080.

  Alternatively:

  ```bash
  $> open "http://localhost:8080"
  ```

--------------------------------------------------
## Possible Future Features

1. New feeds could be added
2. Feeds could be deleted
3. Entries from feed display results could be deleted
4. Entries could be marked as favorites by changing their background color
5. Entries' order in the feed display could be reversed
6. Entries' titles could be translated into another language. To be able to test
this feature, I used the [Yandex-Translate API](http://translate.yandex.com/)

The tests for 1 and 2 make sure that the feed list is modified correctly.

The tests for the 3 checks the length of the number of entries to ensure
that a entry is deleted.

Feature number 4 is tested by comparing the background of a normal entry to the
background color of one that is marked as a favorite.

Tests for 5 compares the entries' order before and after the call to reverse to
make sure the reverse happens.

Feature number 6 is tested by comparing the text of the selected entry before and
after the translation.

Please see jasmine/spec/feedreader.js for more documentation.
