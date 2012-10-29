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
			"keyup .filterinput": "filterKeyup",
			"keyup .filterinput": "filterModels"
		},

		filterKeyup: function(){
			
			/*
			// custom css expression for a case-insensitive contains()
			jQuery.expr[':'].Contains = function(a,i,m){
					return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
			};

			var filterinput = $('.filterinput').val(),
					list = $('#showIt');			

			if (filterinput) {
				
				$(list).find("a:not(:Contains(" + filterinput + "))").parent().hide();
				
				$(list).find("a:Contains(" + filterinput + ")").parent().show();
				
			} else {
			
				$(list).find("li").slideDown();
				
			}
			*/
			
		},

		filterModels: function(){
		
			var newCollection = new Backbone.Collection();
			
			var filterinput = $('.filterinput').val(),
					list = $('#showIt');
					
			for (var i = 0, l = this.collection.length; i < l; i++) {
				
				if (this.collection.models[i].get('firstname') === filterinput || this.collection.models[i].get('surname') === filterinput) { 
					newCollection.add(this.collection.models[i]); 
				}
				
			}
			
			// only call renderItem() if model exists.
			if (newCollection.length <= 0) {
				return;
			} else {
				console.log(newCollection.length);
				newCollection.each(this.renderItem);
			}		
			
		},
				
		filterCollection: function(){
		
			var newCollection = new Backbone.Collection();
			
			for (var i = 0, l = this.collection.length; i < l; i++) {
				
				if (this.collection.models[i].get('surname') === 'Burton') { 
					newCollection.add(this.collection.models[i]); 
				}
				
			}
			
			console.log(newCollection);
			
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
		   _.bindAll(this);
			 //this.render = _.bind(this.render, this); 
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
			
			console.log(this.model);
			
		},
		
		render: function(){
			
			var template = $("#item-template");
			
			var link = template.tmpl(this.model.toJSON());
			
			$(this.el).html(link);
			
		}  
		
	});
	
	var items = new ItemCollection([
		{id: 1, firstname: "Albert", surname: "Einstein"},
		{id: 2, firstname: "William", surname: "Drake"},
		{id: 3, firstname: "Michael", surname: "Jackson"},
		{id: 4, firstname: "Walt ", surname: "Disney"},
		{id: 5, firstname: "John", surname: "Lennon"}
	]);

	var app = new ItemListView({collection: items}).render();
		
});//]]>  
