'use strict';

$(function() {
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        it('no url is empty', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeTruthy();
            }
        });

        it('no name is empty', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeTruthy();
            }
        });
    });


    describe('The menu', function() {
        var trans1 = '';
        var trans2 = '';

        beforeAll(function(){
            // save initial transition css
            trans1 = $('.menu').css('transition');
            trans2 = $('.menu-hidden .menu').css('transition');

            // remove async transition
            $('.menu').css('transition', 'transform 0.0s');
            $('.menu-hidden .menu').css('transition', 'transform 0.0s');
        });

        it('is hidden by default', function() {
            expect($('.menu:in-viewport')).not.toExist();
        });

        it('changes visibility when menu icon is clicked', function() {
            // check if opens
            $('.menu-icon-link').click();
            expect($('.menu:in-viewport')).toExist();

            // check if closes
            $('.menu-icon-link').click();
            expect($('.menu:in-viewport')).not.toExist();
        });

        afterAll(function() {
            // restore transition values
            $('.menu').css('transition', trans1);
            $('.menu-hidden .menu').css('transition', trans2);
        });
    });



    describe('Initial Entries', function() {
        beforeEach(function(done) {

            // async call to loadFeed which will get fake object
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least a single entry within .feed container after loadFeed()', function() {
            expect($('.feed a').length).toBeGreaterThan(0);
        });
    });


    describe('New Feed Selection', function() {
        var preloaded = [];

        // preload the first feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                preloaded = $('.feed a article h2').map(function(i, el){
                    return el.innerHTML;
                }).sort();
                done();
            });
        });

        it('changes content when a new feed is loaded', function() {
            var validation = function() {
                var loaded = $('.feed a article h2').map(function(i, el){
                    return el.innerHTML;
                }).sort();

                expect(loaded).not.toEqual(preloaded);
            };

            // load the second feed and compare to the first one
            loadFeed(1, validation);
        });
    });
}());
