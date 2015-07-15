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
            // spyOn(window.google.feeds, 'Feed').and.callFake(function() {
            //     // return mock object so to unit test our code in isolation
            //     var mockObject = {
            //         'error': '0',
            //         'feed': {
            //             'feedUrl': 'http://blog.udacity.com/feeds/posts/default?alt=rss',
            //             'title': 'Udacity Blog',
            //             'link': 'http://blog.udacity.com/',
            //             'author': '',
            //             'description': 'Advance your education and your career with project-based, self-paced online courses in tech.',
            //             'type': 'rss20',
            //             'entries': [{
            //                 'title': '4 Times Data Science Saved the Day',
            //                 'link': 'http://blog.udacity.com/2014/12/4-times-data-science-saved-day_3.html',
            //                 'author': 'noreply@blogger.com (Mark Nguyen)',
            //                 'publishedDate': 'Wed, 03 Dec 2014 10:31:00 -0800',
            //                 'contentSnippet': '',
            //                 'content': '',
            //                 'categories': ['Data Science']
            //             }, {
            //                 'title': 'Dawoon Choi: Golfer to Programmer',
            //                 'link': 'http://blog.udacity.com/2014/11/student-stories-dawoon-choi-programmer.html',
            //                 'author': 'noreply@blogger.com (ChiWei Ranck)',
            //                 'publishedDate': 'Fri, 28 Nov 2014 07:26:00 -0800',
            //                 'contentSnippet': '',
            //                 'content': '',
            //                 'categories': ['front-end web dev', 'Nanodegrees', 'Student Stories']
            //             }, {
            //                 'title': 'Data Analysts: What You\'ll Make and Where You\'ll Make It',
            //                 'link': 'http://blog.udacity.com/2014/11/data-analysts-what-youll-make.html',
            //                 'author': 'noreply@blogger.com (Allison Stadd)',
            //                 'publishedDate': 'Wed, 26 Nov 2014 08:00:00 -0800',
            //                 'contentSnippet': '',
            //                 'content': '',
            //                 'categories': ['Careers', 'Data Science']
            //             }, {
            //                 'title': 'Informational Interviews: How to Find Your Next Job Over Coffee',
            //                 'link': 'http://blog.udacity.com/2014/11/informational-interviews-how-to-find.html',
            //                 'author': 'noreply@blogger.com (Allison Jones)',
            //                 'publishedDate': 'Fri, 21 Nov 2014 08:50:00 -0800',
            //                 'contentSnippet': '',
            //                 'content': '',
            //                 'categories': ['Careers']
            //             }],
            //         },
            //         load: function(cb) {
            //             if (cb) {
            //                 cb();
            //             }
            //         }
            //     };
            //     return mockObject;
            // });

            // async call to loadFeed which will get fake object
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least a single entry within .feed container after loadFeed()', function(done) {
            expect($('.feed a').length).toBeGreaterThan(0);
            done();
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

        it('changes content when a new feed is loaded', function(done) {
            var validation = function() {
                var loaded = $('.feed a article h2').map(function(i, el){
                    return el.innerHTML;
                }).sort();

                expect(loaded).not.toEqual(preloaded);
                done();
            };

            // load the second feed and compare to the first one
            loadFeed(1, validation);
        });
    });
}());
