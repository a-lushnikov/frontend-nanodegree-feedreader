# TDD with Jasmine

In this project I was provided with a web-based application that reads RSS feeds. I've added some behavior tests using [Jasmine](http://jasmine.github.io/)

## Tests

RSS Feeds
- are defined (checks that there are predefined RSS feeds)
- no url is empty (checks that there's no predefined RSS feed with empty url)
- no name is empty (checks that there's no predefined RSS feed with no name)

The menu
- is hidden by default (checks that menu on the left is hidden by default)
- changes visibility when menu icon is clicked (checks that menu indeed opens/closes when button is clicked)

Initial Entries
- has at least a single entry within .feed container after loadFeed() (checks that at least one feed is present after loadFeed())

New Feed Selection
- changes content when a new feed is loaded (checks that feeds are actually reloaded after loadFeed)

## How to run

Load the index.html page in browser - tests will be executed automagically and you'll see execution results at the bottom of the page.