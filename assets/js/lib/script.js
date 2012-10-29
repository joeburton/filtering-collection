$(window).load(function(){

	Item = Backbone.Model.extend({	
		defaults: {
			id: "missing", 
			firstname: "missing",
			surname: "missing"
		}		
	});
	
	ItemCollection = Backbone.Collection.extend({
		model: Item
	});

	ItemListView = Backbone.View.extend({
		
		el: $('body'),
		
		initialize: function(){
			_.bindAll(this, "renderItem");
		},
		
		events: {
			"click a.filter": "filterCollection",
			"keyup .filterkey": "filterKeyup"
		},

		filterKeyup: function(){
		
			var filterinput = $('.filterkey'),
				results = $('.results');
			
			filterinput.keyup(function(){
			
				results.text(filterinput.val());
			
			});			
			
			console.log(this.collection);
			
		},

		filterCollection: function(){
		
			var newCollection = new Backbone.Collection();
			
			for (var i = 0, l = this.collection.length; i < l; i++) {
				
				if (this.collection.models[i].get('surname') === 'Burton') { 
					newCollection.add(this.collection.models[i]); 
				}
				
			}
			
			console.log(newCollection.toJSON());
			
			newCollection.each(this.renderItem);
			
		},

		render: function(){
		
			this.collection.each(this.renderItem);
			
		},
		
		renderItem: function(model){
		
			var listItem = new ItemView({model: model});
			
			listItem.render();
			
			$('#showIt').append(listItem.el);
			
		}
		
	});
	
	ItemView = Backbone.View.extend({
		
		tagName: "li",
		
		events: {
			"click a": "clicked",
			"click a.edit": "edit"
		},

		initialize: function(){
		   this.render = _.bind(this.render, this); 
		   this.model.bind('change:surname', this.render);
		},
		
		edit: function(){
		
			var name = this.model.get("surname"),
				id = this.model.get("id");
			
			if (this.model.get('id') == "2") {
				this.model.set({"surname": "Burton"});
			}
			
		},		
		
		clicked: function(){
		
			var name = this.model.get("surname"),
				id = this.model.get("id");
			
			if (this.model.get('id') == "2") {
				this.model.set({"surname": "Burton"});
			}
			
		},
		
		render: function(){
			
			var template = $("#item-template");
			
			var link = template.tmpl(this.model.toJSON());
			
			$(this.el).html(link);
			
		}  
		
	});
	
	var items = new ItemCollection([
		{id: 1, firstname: "Joe", surname: "Burton"},
		{id: 2, firstname: "Miriam", surname: "Heinke"},
		{id: 3, firstname: "Gail", surname: "Burton"},
		{id: 4, firstname: "Paul", surname: "Burton"},
		{id: 5, firstname: "Sue", surname: "Burton"}
	]);

	var app = new ItemListView({collection: items}).render();
		
});//]]>  
