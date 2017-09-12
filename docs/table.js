MIT License

Copyright (c) 2017 s1728k

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

$(function() {

    var data = {
        lastID: 0,
        pizzas: []
    };

    var DB = '';
    var Length = 0;
    var RowSize = 0;
    var ColumnSize = 0;
    var SheetSize = 0;

    get cell(x, y) {
    	var STR ='';
    	var ADR = '';
    	var tmp = ''; 
    	var F = '';
    	STR = this.DB;
    	ADR = "(" + String(x) + "," + String(y) + ",";
    	F = STR.indexOf(ADR, 1);
    	if(F === Len(ADR)){
    		return '';
    	}
    	tmp = STR.slice(F, STR.indexOf(",", F) - F);
    	//cell = LIB.DECODE(tmp)
    	return tmp;
    }

   //  set cell(x, y, value) {
   //  	If (this.DB.indexOf("(" + String(x) + "," + String(y) + "," , 1) !== 0){
	  //       this.DB = Replace(this.DB, "(" + String(x) + "," + String(y) + "," + LIB.ENCODE(Me.cell(x, y)) + "," + String(x) + ")", "(" + String(x) + "," + String(y) + "," + LIB.ENCODE(Value) + "," + String(x) + ")")
   //  	}else{
			// this.DB = this.DB + "(" + String(x) + "," + String(y) + "," + LIB.ENCODE(Value) + "," + String(x) + ")"
   //  	}
   //  }


    var octopus = {
        addPizza: function() {
            var thisID = ++data.lastID;

            data.pizzas.push({
                id: thisID,
                visible: true
            });
            view.render();
        },

        removePizza: function(pizza) {
            var clickedPizza = data.pizzas[ pizza.id - 1 ];
            clickedPizza.visible = false;
            view.render();
        },

        getVisiblePizzas: function() {
            var visiblePizzas = data.pizzas.filter(function(pizza) {
                return pizza.visible;
            });
            return visiblePizzas;
        },

        init: function() {
            view.init();
        }
    };


    var view = {
        init: function() {
            var addPizzaBtn = $('.add-pizza');
            addPizzaBtn.click(function() {
                octopus.addPizza();
            });

            // grab elements and html for using in the render function
            this.$pizzaList = $('.pizza-list');
            this.pizzaTemplate = $('script[data-template="pizza"]').html();

            // Delegated event to listen for removal clicks
            this.$pizzaList.on('click', '.remove-pizza', function(e) {
                var pizza = $(this).parents('.pizza').data();
                octopus.removePizza(pizza);
                return false;
            });

            this.render();
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            // Clear and render
            $pizzaList.html('');
            octopus.getVisiblePizzas().forEach(function(pizza) {
                // Replace template markers with data
                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);
                $pizzaList.append(thisTemplate);
            });
        }
    };

    octopus.init();
}());
