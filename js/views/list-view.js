var app = app || {};

(function ($) {
    'use strict';

    app.AppView = Backbone.View.extend({

        el: '#list-section',

        // Create New Items
        events: {
            'keypress #new-item': 'createOnEnter'
        },

        // Bind to the relevant events at intialization 
        initialize: function () {

            this.$input = this.$('#new-item');
            this.$list = $('#items-list');

            this.listenTo(app.list, 'add', this.addOne);
            this.listenTo(app.list, 'reset', this.addAll);

            //{reset: true} - To suppresses 'add' events for intial loading  
            app.list.fetch({reset: true});
        },

        render: function () {

        },

        // Add a single list item
        addOne: function (item) {
            var view = new app.ItemView({ model: item });
            this.$list.append(view.render().el);
        },

        // Add all items in the list
        addAll: function () {
            this.$list.html('');
            app.list.each(this.addOne, this);
        },

        // Get the list of attributes for a new item
        getAttributes: function () {
            return {
                title: this.$input.val().trim(),
                order: app.list.nextOrder()
            };
        },

        // Create a new item when pressing the enter key in text box
        createOnEnter: function (e) {

            if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
                return;
            }

            app.list.create(this.getAttributes());
            this.$input.val('');
        }

    });
})(jQuery);
