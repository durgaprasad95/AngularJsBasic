var data2 = [{
    "functionName": "updateSortType",
    "module": "detail-metric-summary",
    "purpose": "Updates Graph based on sort type",
    "isUsedInUI": "yes",
    "getsCalledIn": ["detail-metric-summary"]
},
{
    "functionName": "onsliceChange",
    "module": "detail-graph",
    "purpose": "Updates Graph based on slice chabge",
    "isUsedInUI": "yes",
    "getsCalledIn": ["detail-graph"]
}, {
    "functionName": "handleMouseActions",
    "module": "detail-graph",
    "purpose": "Updates Graph based on slice chabge",
    "isUsedInUI": "yes",
    "getsCalledIn": ["detail-selected-filters-summary", "detail-header", "detail-filter-threshold", "detail-metric-summary"]
}, {
    "functionName": "hideShowInfo",
    "module": "detail-recommended-metrics",
    "purpose": "Shows/Hides info",
    "isUsedInUI": "yes",
    "getsCalledIn": ["detail-recommended-metrics"]
}
];
var data = [];

for (var i = 0; i < data2.length; i++) {
    data.push({
        "name": data2[i].functionName,
        "children": []
    });

    for (var j = 0; j < data2[i].getsCalledIn.length; j++) {
        data[i].children.push({
            "name": data2[i].getsCalledIn[j]
        });
    }
}
console.log(data);