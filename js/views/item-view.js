var app = app || {};

(function ($) {
    'use strict';

    app.ItemView = Backbone.View.extend({

        // Tag name for the current view
        tagName:  'li',

        // Template for a single item
        template: _.template($('#item-template').html()),

        // Events specific to an item
        events: {
            'click .destroy': 'clear'
        },

        // Listens for changes to item model
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
        },

        // Render the item
        render: function () {

            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        // Remove the item from storage and UI
        clear: function () {
            this.model.destroy();
        }
    });
})(jQuery);
