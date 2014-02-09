/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var List = Backbone.Collection.extend({

        // Reference to this collection's model
        model: app.Item,

        // Save all the items under the `"items"` namespace
        localStorage: new Backbone.LocalStorage('items-backbone'),

        // Next order number for new items
        nextOrder: function () {
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        },

        // Items are sorted by their original insertion order
        comparator: function (item) {
            return item.get('order');
        }
    });

    // Create our global collection of **Items**.
    app.list = new List();
})();
