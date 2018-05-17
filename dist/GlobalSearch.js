define(["require", "exports", "olive/components/form"], function (require, exports, form_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var GlobalSearch = /** @class */ (function () {
        function GlobalSearch(targetInput) {
            this.awaitingAutocompleteResponses = 0;
            this.input = targetInput;
        }
        GlobalSearch.enable = function (selector) {
            selector.each(function (i, e) { return new GlobalSearch($(e)).enable(); });
        };
        GlobalSearch.prototype.enable = function () {
            var _this = this;
            if (this.input.is("[data-typeahead-enabled=true]"))
                return;
            else
                this.input.attr("data-typeahead-enabled", true);
            this.input.wrap("<div class='typeahead__container'></div>");
            this.valueField = $("[name='" + this.input.attr("name").slice(0, -5) + "']");
            if (this.valueField.length === 0) {
                console.log("Failed to find the value field for auto-complete:");
                console.log(this.input);
            }
            var url = this.input.attr("autocomplete-source") || '';
            $.ajax({
                url: url,
                type: 'GET',
                xhrFields: { withCredentials: true },
                success: function (response) {
                    var _loop_1 = function (item) {
                        postData = _this.toObject(form_1.default.getPostData(_this.input));
                        postData[_this.input.attr("name")] = "{{query}}";
                        _this.input
                            .data("selected-text", "")
                            .on('input', function () { return _this.clearValue(); })
                            .on("typeahead:selected", function (e, i) { return _this.itemSelected(i); })
                            .typeahead({
                            minLength: 1,
                            delay: 500,
                            backdrop: false,
                            emptyTemplate: "<div class='tt-suggestion'>Not found</div>",
                            display: "Title",
                            template: "<a href=\"{{Url}}\" style=\"color: inherit;text-decoration:inherit\">\n                        <div>\n                          <img style=\"float: left; max-width: 60px; max-height: 60px\" src=\"{{IconUrl}}\" />\n                            <div style=\"margin-left: 65px\">\n                              <h5>{{Title}}</h5>\n                              <p style=\"font-size: 11px;opacity: 0.85;\">{{Description}}</p>\n                            </div>\n                          </div>\n                      </a>",
                            source: {
                                data: [{
                                        "Url": "",
                                        "Title": "",
                                        "IconUrl": "",
                                        "Description": ""
                                    }],
                                ajax: function (query) {
                                    return {
                                        type: "GET",
                                        url: item + "api/search",
                                        data: postData
                                    };
                                }
                            },
                            callback: {
                                onNavigateAfter: function (node, lis, a, item, query, event) {
                                    if (~[38, 40].indexOf(event.keyCode)) {
                                        var resultList = node.closest("form").find("ul.typeahead__list"), activeLi = lis.filter("li.active"), offsetTop = activeLi[0] && activeLi[0].offsetTop - (resultList.height() / 2) || 0;
                                        resultList.scrollTop(offsetTop);
                                    }
                                },
                                onClickAfter: function (node, a, item, event) {
                                    event.preventDefault();
                                    $('#result-container').text('');
                                },
                                onResult: function (node, query, result, resultCount) {
                                    if (query === "")
                                        return;
                                    var text = "";
                                    if (result.length > 0 && result.length < resultCount) {
                                        text = "Showing <strong>" + result.length + "</strong> of <strong>" + resultCount + '</strong> elements matching "' + query + '"';
                                    }
                                    else if (result.length > 0) {
                                        text = 'Showing <strong>' + result.length + '</strong> elements matching "' + query + '"';
                                    }
                                    else {
                                        text = 'No results matching "' + query + '"';
                                    }
                                    $('#result-container').html(text);
                                },
                                onMouseEnter: function (node, a, item, event) {
                                    if (item.group === "country") {
                                        $(a).append('<span class="flag-chart flag-' + item.display.replace(' ', '-').toLowerCase() + '"></span>');
                                    }
                                },
                                onMouseLeave: function (node, a, item, event) {
                                    $(a).find('.flag-chart').remove();
                                }
                            }
                        });
                    };
                    var postData;
                    for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                        var item = response_1[_i];
                        _loop_1(item);
                    }
                }
            });
        };
        GlobalSearch.prototype.clearValue = function () {
            if (this.input.val() === "")
                this.valueField.val("");
            if (this.input.val() !== this.input.data("selected-text"))
                this.valueField.val("");
        };
        GlobalSearch.prototype.itemSelected = function (item) {
            if (item != undefined) {
                this.valueField.val(item.Value);
                this.input.data("selected-text", item.Display);
                this.input.val(item.Display);
            }
            else {
                console.log("Clearing text, item is undefined");
                this.input.data("selected-text", "");
            }
            // This will invoke RunOnLoad M# method as typeahead does not fire textbox change event when it sets its value from drop down
            this.input.trigger("change");
        };
        // Convert current form array to simple plain object
        GlobalSearch.prototype.toObject = function (arr) {
            var rv = {};
            for (var i = 0; i < arr.length; ++i)
                rv[arr[i].name] = arr[i].value;
            return rv;
        };
        return GlobalSearch;
    }());
    exports.default = GlobalSearch;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2xvYmFsU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dsb2JhbFNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUVBO1FBU0ksc0JBQVksV0FBZ0I7WUFQNUIsa0NBQTZCLEdBQVcsQ0FBQyxDQUFDO1lBUXRDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQzdCLENBQUM7UUFOYSxtQkFBTSxHQUFwQixVQUFxQixRQUFnQjtZQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7UUFDN0QsQ0FBQztRQU1ELDZCQUFNLEdBQU47WUFBQSxpQkErR0M7WUE5R0csSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztnQkFBRSxPQUFPOztnQkFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1lBRUQs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