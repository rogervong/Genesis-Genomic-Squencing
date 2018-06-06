(function(){
	'use strict'
	angular
		.module('app')
		.controller('d3Controller', d3Ctrl)
		.directive("charts", ['d3', chartsDirective])

	function d3Ctrl($location, $scope, analysisService){

		// $scope.tree = {name:"HIV-1 isolate Cameroon1",children: [{name: "A",children: [{ name: "aaaaaaa" },{ name: "bbbbbbbbb" },{ name: "cccc" },]},{name: "B",children: [{name: "aaaaaaa",children: [{ name: "11111" },{ name: "22" },]},{name: "bbbbbbbbbbbbbbb",children: [{ name: "1111" },{ name: "22" },{ name: "3333333333333" },{ name: "444444444" }]}]},]}
		// $scope.barfreq = analysisService.getBarGraphInfo(1);
		// $scope.bar2 = analysisService.getBarGraphInfo(2);

		var matrix = [];

		for (var i = 0; i < 5; i++) {

			var row = [];
			for (var j = 0; j < 5; j++) {
				if (j <= i) {
					row.push(0);
				} else {
					row.push(analysisService.getRelation(i, j));
				}
			}
			matrix.push(row);
		}

		var namesList = analysisService.allNames();

		function Table (matrixInput, names) {
			this.columnNames = names;
			this.matrix = matrixInput;
			this.tree = {};
			this.isFloater = false;
			this.floaters = [];

			this.addTo = function(first, second) {
				this.columnNames[first] = this.columnNames[first] + "***" + this.remove(second);
			}

			this.remove = function(index){
				var nameArray = this.columnNames
				var index = 0
				var remove = '';
				for(var i=0; i< nameArray.length; i++){
					if(i === index){
						index = i
						remove = nameArray[i]
					}
				}
				while(i != nameArray.length){
					nameArray[i] = nameArray[i+1]
				}
				nameArray.pop()
				return remove
			}

			this.getSmallest = function() {

				var smallest = 1.01;
				var location = {row: null,
							column: null}
				for (var i = 0; i < this.matrix.length; i++) {
					for (var j = 0; j < this.matrix.length; j++) {
						if (j > i) {
							if(this.matrix[i][j] < smallest){
								smallest = this.matrix[i][j]
								location.row = i
								location.column = j
							}
						}
					}
				}
				var output = {
					smallest: smallest,
					location: location
				}
				return output;
			}

			this.getAvg = function(firstRef, secondRef, compare) {
				var firstValue;
				var secondValue;
				if (firstRef < compare) {
					firstValue = this.matrix[firstRef][compare];
				} else {
					firstValue = this.matrix[compare][firstRef];
				}

				if (secondRef < compare) {

					secondValue = this.matrix[secondRef][compare];
				} else {
					secondValue = this.matrix[compare][secondRef];

				}
				return (firstValue + secondValue)/2;
			}

			this.combineMatrix = function(row, column) {
				var size = this.matrix.length;
				var newMatrix = [];
				for (var i = 0; i < size-1; i++) {
					var tempRow = [];
					for (var j = 0; j < size-1; j++) {
						if (j <= i) {
							tempRow.push(0);
						} else if (i == row) {
							if (j >= column) {
								tempRow.push(this.getAvg(row, column, j+1));
							} else {
								tempRow.push(this.getAvg(row, column, j));
							}
						} else if (j == row) {
							tempRow.push(this.getAvg(row, column, i));
						} else if (j >= column){
							tempRow.push(this.matrix[i][j+1]);
						} else {
							tempRow.push(this.matrix[i][j]);
						}
					}
					newMatrix.push(tempRow);
				}
				this.matrix = newMatrix;
			}


			this.buildTree = function() {
				if (this.floaters.length >= 2) {
					this.tree = {
						name: 'Parent',
						children: [this.floaters[0], this.floaters[1], {name: 'HIV-1(DR019)', children:[]}]
					}
				} else {
					var chosenOnes = this.getSmallest();
					newTable.combineMatrix(chosenOnes.location.row, chosenOnes.location.column);
					var firstName = this.columnNames[chosenOnes.location.row];
					var lastName = this.columnNames[chosenOnes.location.column];
					if (!firstName.includes('***') && !lastName.includes('***')) {
						var smallestIndex = this.getSmallest();
						var firstChild = {
							name: firstName,
							children: [],
							number: chosenOnes.location.row
						}
						var secondChild = {
							name: lastName,
							children: [],
							number: chosenOnes.location.column
						}

						var firstParent = {
							name: '',
							children: [firstChild, secondChild]
						}
						this.tree = firstParent;
						this.floaters.push(firstParent);
					} else if (!firstName.includes('***')) {
						var newChild = {
							name: firstName,
							children: [],
							number: chosenOnes.location.row
						}

						var newParent = {
							name: '',
							children: [newChild, this.tree]
						}

						this.tree = newParent;
					} else if (!lastName.includes('***')) {
						var newChild = {
							name: lastName,
							children: [],
							number: chosenOnes.location.column
						}

						var newParent = {
							name: '',
							children: [newChild, this.tree]
						}

						this.tree = newParent;
					}
				}
			}

			this.getTree = function() {
				return this.tree;
			}
		}

		var newTable = new Table(matrix, namesList);
		newTable.buildTree();
		newTable.buildTree();
		newTable.buildTree();
		$scope.newTable = newTable.getTree()
		$scope.newTable.analysisService = analysisService
		console.log($scope.newTable)
	}

	function chartsDirective(d3, analysisService){
		return{
    		restrict: "EA",
    		link: function($scope, elem, attrs, analysisService){
				function phyTree(){
					var tree = {}
	    			d3.select(".phyTree").remove()

	    			var canvas = d3.select("#tree").append("svg")
	    				.attr("width", 500)
	    				.attr("height", 500)
	    				.attr("class", "phyTree")

	    			var tree = d3.layout.tree()
	    				.size([350, 350])

					var nodes = tree.nodes($scope.newTable)
					var links = tree.links(nodes);

					var node = canvas.selectAll(".node")
						.data(nodes)
						.enter()
						.append("g")
							.attr("class", "node")
							.attr("transform", function(d) { return "translate(" + (d.y+10) + "," + (d.x) + ")" })

					node.append("circle")
						.attr("r", 5)
						.attr("fill", "#d5aa6d")
						.on("click", click)

					node.append("text")
						.text( function(d) { return d.name })
						.attr("dx", -5)
						.attr("dy", -8)

					var diagonal = d3.svg.diagonal()
						.projection( function(d) { return [d.y+5, d.x] })

					canvas.selectAll(".link")
						.data(links)
						.enter()
						.append("path")
						.attr("class", "link")
						.attr("fill", "none")
						.attr("stroke", "#c8c6c6")
						.attr("d", diagonal)

					function click(d, analysisService){
						console.log("clicked")
						console.log(d)
						console.log(d.number)
						console.log($scope.newTable.analysisService)
						bar.update($scope.newTable.analysisService.getBarGraphInfo(d.number))
					}
					return tree
	    		}

				function barChart(){
					var bar = {}
	    			d3.select(".barChart").remove()

					var margin = {top: 20, right: 20, bottom: 30, left: 40},
					    width = 960 - margin.left - margin.right,
					    height = 500 - margin.top - margin.bottom;

					var x = d3.scale.ordinal()
					    .rangeRoundBands([0, width], .1);

					var y = d3.scale.linear()
					    .range([height, 0]);

					var xAxis = d3.svg.axis()
					    .scale(x)
					    .orient("bottom");

					var yAxis = d3.svg.axis()
					    .scale(y)
					    .orient("left")
					    .ticks(10, "%");

					var svg = d3.select("#bar").append("svg")
					    .attr("width", width + margin.left + margin.right)
					    .attr("height", height + margin.top + margin.bottom)
					  .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	    				.attr("class", "barChart")

	    			var data = $scope.newTable.analysisService.getBarGraphInfo(0)
						console.log(data)

					  x.domain(data.map(function(d) { return d.name; }));
					  y.domain([0, d3.max(data, function(d) { return d.freq; })]);

					  svg.append("g")
					      .attr("class", "x axis")
					      .attr("transform", "translate(0," + height + ")")
					      .call(xAxis)
					      .attr("fill", "white")


					  svg.append("g")
					      .attr("class", "y axis")
					      .call(yAxis)
					      .attr("fill", "white")
					    .append("text")
					      .attr("transform", "rotate(-90)")
					      .attr("y", 6)
					      .attr("dy", ".71em")
					      .style("text-anchor", "end")
					      .text("Frequency")
					      .attr("fill", "white")


					  svg.selectAll(".bar")
					      .data(data)
					    .enter().append("rect")
					      .attr("class", "bar")
					      .attr("x", function(d) { return x(d.name); })
					      .attr("width", x.rangeBand())

					      .attr("y", function(d) { return y(d.freq); })
					      .attr("height", function(d) { return height - y(d.freq); })
						  .attr("fill", "white")


					function type(d) {
					  d.freq = +d.freq;
					  return d;
					}

					bar.update = function(data2){

					    y.domain([0, d3.max(data2, function(d) { return d.freq; })]);

						svg.selectAll("rect").data(data2)
							.transition()
							.duration(1500)
					      	.attr("x", function(d) { return x(d.name); })
					      	.attr("width", x.rangeBand())
					      	.attr("y", function(d) { return y(d.freq); })
					      	.attr("height", function(d) { return height - y(d.freq); })
							.attr("fill", "#ddb06f")

						svg.selectAll("g")
							.select("text")
							.transition()
							.duration(1500)
							.attr("fill", "#ddb06f")

					}
					return bar
	    		}
	    		var tree = phyTree()
	    		var bar = barChart()
			}
		}
   	}
})()
