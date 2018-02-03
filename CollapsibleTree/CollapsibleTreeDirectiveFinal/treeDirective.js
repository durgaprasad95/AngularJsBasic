
var app = angular.module('App',[]);
var values={"name":"functions","children":[{"name":"updateSortType","children":[{"name":"detail-metric-summary"}]},{"name":"onsliceChange","children":[{"name":"detail-graph"}]},{"name":"handleMouseActions","children":[{"name":"detail-selected-filters-summary"},{"name":"detail-header"},{"name":"detail-filter-threshold"},{"name":"detail-metric-summary"}]},{"name":"hideShowInfo","children":[{"name":"detail-recommended-metrics"}]},{"name":"addRowsToFilter","children":[{"name":"detail-exclusion-filter-tab"},{"name":"detail-filter-slider"}]},{"name":"hideExlusionError","children":[{"name":"detail-exclusion-filter-tab"},{"name":"detail-filter-slider"},{"name":"switchTab"}]},{"name":"navBenchmarkFilter","children":[{"name":"updateBenchmarkData"},{"name":"detail-selected-filters-summary"},{"name":"displaySimilarTitles"},{"name":"clearSearch"}]},{"name":"toggleNavOverlays","children":[{"name":"detail-filter-overlay"}]},{"name":"toggleNavFilters","children":[{"name":"detail-filter-slider"},{"name":"detail-exclusion-filter-tab"}]},{"name":"closeNavFilter","children":[{"name":"closeSliderWindow"},{"name":"detail-exclusion-filter-tab"},{"name":"detail-filter-slider"},{"name":"CloseBenchmark"},{"name":"LoadDetailGraph"}]},{"name":"closeThresholdFilter","children":[{"name":"detaiil-threshold"}]},{"name":"filterPaginateSearch","children":[{"name":"detail-exclusion"},{"name":"detail-filter-slider"}]},{"name":"getSearchIndustries","children":[{"name":"detail-filter-benchmarks"}]},{"name":"loadIndustryTitles","children":[{"name":"detail-filter-benchmarks"}]},{"name":"updateDisplayTitles","children":[{"name":"detail-filter-benchmarks"}]},{"name":"updateSelectedIndustry","children":[{"name":"detail-filter-benchmarks"},{"name":"detail-selected-filter-summary"}]},{"name":"displaySimilarTitles","children":[{"name":"detail-filter-benchmarks"}]},{"name":"toggleSubFilter","children":[{"name":"detail-filter-slider"},{"name":"detail-exclusion-filter-tab"}]},{"name":"removeAllThresholds","children":[{"name":"detail-selected-filter-summary"},{"name":"detail-filter-threshold"}]},{"name":"showDetailInfo","children":[{"name":"detail-header"}]}]}
app.controller("treeCrtl", function () {
    var model = this;
    model.data = values;
});

app.directive("collapsibleTree", function () {
    return {
        restrict: 'E',
        scope:{
            data:'='
        },
        link: function link(scope, el, attr) {

            var margin = { top: 20, right: 120, bottom: 20, left: 120 },
                width = 960 - margin.right - margin.left,
                height = 800 - margin.top - margin.bottom;
            var i = 0,duration = 750,root,select2_data;
            var diameter = 960;
            var tree = d3.layout.tree()
                .size([height, width]);

            var diagonal = d3.svg.diagonal()
                .projection(function (d) { return [d.y, d.x]; });

            var svg = d3.select(el[0]).append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //recursively collapse children
            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            // Toggle children on click.
            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                }
                else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }

            function openPaths(paths) {
                for (var i = 0; i < paths.length; i++) {
                    if (paths[i].id !== "1") {//i.e. not root
                        paths[i].class = 'found';
                        if (paths[i]._children) { //if children are hidden: open them, otherwise: don't do anything
                            paths[i].children = paths[i]._children;
                            paths[i]._children = null;
                        }
                        update(paths[i]);
                    }
                }
            }

            root = scope.data;
            //data is the functions.json
            select2_data = extract_select2_data(values, [], 0)[1];
            root.x0 = height / 2;
            root.y0 = 0;
            root.children.forEach(collapse);
            update(root);
            //init search box
            $("#search").select2({
                data: select2_data,
                containerCssClass: "search"
            });

            //attach search box listener
            $("#search").on("select2-selecting", function(e) {
                var paths = searchTree(root, e.object.text, []);
                if (typeof (paths) !== "undefined") {
                    openPaths(paths);
                } else {
                    alert(e.object.text + " not found!");
                }
            });

            d3.select(self.frameElement).style("height", "800px");

            function update(source) {
                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

                // Normalize for fixed-depth.
                nodes.forEach(function (d) { d.y = d.depth * 180; });

                // Update the nodesâ€¦
                var node = svg.selectAll("g.node")
                    .data(nodes, function (d) { return d.id || (d.id = ++i); });

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click);

                nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

                nodeEnter.append("text")
                    .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                    .text(function (d) { return d.name; })
                    .style("fill-opacity", 1e-6);

                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

                nodeUpdate.select("circle")
                    .attr("r", 4.5)
                    .style("fill", function (d) {
                        if (d.class === "found") {
                            return "#ff4136"; //red
                        }
                        else if (d._children) {
                            return "lightsteelblue";
                        }
                        else {
                            return "#fff";
                        }
                    })
                    .style("stroke", function (d) {
                        if (d.class === "found") {
                            return "#ff4136"; //red
                        }
                    });

                nodeUpdate.select("text")
                    .style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
                    .remove();

                nodeExit.select("circle")
                    .attr("r", 1e-6);

                nodeExit.select("text")
                    .style("fill-opacity", 1e-6);

                // Update the linksâ€¦
                var link = svg.selectAll("path.link")
                    .data(links, function (d) { return d.target.id; });

                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", function (d) {
                        var o = { x: source.x0, y: source.y0 };
                        return diagonal({ source: o, target: o });
                    });

                // Transition links to their new position.
                link.transition()
                    .duration(duration)
                    .attr("d", diagonal)
                    .style("stroke", function (d) {
                        if (d.target.class === "found") {
                            return "#ff4136";
                        }
                    });

                // Transition exiting nodes to the parent's new position.
                link.exit().transition()
                    .duration(duration)
                    .attr("d", function (d) {
                        var o = { x: source.x, y: source.y };
                        return diagonal({ source: o, target: o });
                    })
                    .remove();

                // Stash the old positions for transition.
                nodes.forEach(function (d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            function searchTree(obj, search, path) {
                if (obj.name === search) { //if search is found return, add the object to the path and return it
                    path.push(obj);
                    return path;
                }
                else if (obj.children || obj._children) { //if children are collapsed d3 object will have them instantiated as _children
                    var children = (obj.children) ? obj.children : obj._children;
                    for (var i = 0; i < children.length; i++) {
                        path.push(obj);// we assume this path is the right one
                        var found = searchTree(children[i], search, path);
                        if (found) {// we were right, this should return the bubbled-up path from the first if statement
                            return found;
                        }
                        else {//we were wrong, remove this parent from the path and continue iterating
                            path.pop();
                        }
                    }
                }
                else {//not the right object, return false so it will continue to iterate in the loop
                    return false;
                }
            }

            function extract_select2_data(node, leaves, index) {
                if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                        index = extract_select2_data(node.children[i], leaves, index)[0];
                    }
                }
                else {
                    leaves.push({ id: ++index, text: node.name });
                }
                return [index, leaves];
            }

        }
    }
});


