define(["require", "exports", "olive/extensions/jQueryExtensions"], function (require, exports, jq) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemExtensions = /** @class */ (function () {
        function SystemExtensions() {
        }
        SystemExtensions.initialize = function () {
            window.download = this.download;
            Array.groupBy = this.groupBy;
            JSON.safeParse = this.safeParse;
            this.extendString();
            window.location.pathAndQuery = function () { return window.location.pathname + window.location.search; };
            jq.enableValidateForCheckboxList();
            jq.enableValidateForTimePicker();
            $.fn.extend({
                screenOffset: jq.screenOffset,
                bindFirst: jq.bindFirst,
                //clone: jq.clone,
                raiseEvent: jq.raiseEvent,
                getUniqueSelector: jq.getUniqueSelector
            });
        };
        SystemExtensions.extend = function (type, name, implementation) {
            var proto = type.prototype;
            if (implementation.length == 0)
                throw new Error("extend function needs at least one argument.");
            else if (implementation.length == 1)
                proto[name] = function () { return implementation(this); };
            else if (implementation.length == 2)
                proto[name] = function (arg) { return implementation(this, arg); };
            else if (implementation.length == 3)
                proto[name] = function (a1, a2) { return implementation(this, a1, a2); };
        };
        SystemExtensions.extendString = function () {
            this.extend(String, "endsWith", function (instance, searchString) {
                var position = instance.length - searchString.length;
                var lastIndex = instance.indexOf(searchString, position);
                return lastIndex !== -1 && lastIndex === position;
            });
            this.extend(String, "htmlEncode", function (instance) {
                var a = document.createElement('a');
                a.appendChild(document.createTextNode(instance));
                return a.innerHTML;
            });
            this.extend(String, "htmlDecode", function (instance) {
                var a = document.createElement('a');
                a.innerHTML = instance;
                return a.textContent;
            });
            this.extend(String, "startsWith", function (instance, text) { return instance.indexOf(text) === 0; });
            this.extend(String, "withPrefix", function (instance, prefix) { return instance.startsWith(prefix) === false ? prefix + instance : instance; });
            this.extend(String, "trimText", function (instance, text) { return instance.trimStart(text).trimEnd(text); });
            this.extend(String, "trimStart", function (instance, text) { return instance.startsWith(text) ? instance.slice(text.length) : instance; });
            this.extend(String, "trimEnd", function (instance, text) { return instance.endsWith(text) ? instance.slice(0, instance.lastIndexOf(text)) : instance; });
            this.extend(String, "contains", function (instance, text) { return instance.indexOf(text) > -1; });
        };
        SystemExtensions.safeParse = function (data) {
            try {
                return JSON.parse(data);
            }
            catch (error) {
                console.log(error);
                console.log('Cannot parse this data to Json: ');
                throw error;
            }
        };
        SystemExtensions.download = function (url) {
            $("<iframe style='visibility:hidden; width:1px; height:1px;'></iframe>").attr("src", url).appendTo("body");
        };
        SystemExtensions.groupBy = function (array, groupFunction) {
            var groups = {};
            array.forEach(function (o) {
                var group = JSON.stringify(groupFunction(o));
                groups[group] = groups[group] || [];
                groups[group].push(o);
            });
            return Object.keys(groups).map(function (g) { return groups[g]; });
        };
        return SystemExtensions;
    }());
    exports.default = SystemExtensions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtRXh0ZW5zaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leHRlbnNpb25zL3N5c3RlbUV4dGVuc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQUFBO1FBNkZBLENBQUM7UUEzRlUsMkJBQVUsR0FBakI7WUFDSSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDaEMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUVoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsY0FBTSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFqRCxDQUFpRCxDQUFDO1lBRXZGLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1lBQ25DLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBRWpDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFLENBQUMsWUFBWTtnQkFDN0IsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTO2dCQUN2QixrQkFBa0I7Z0JBQ2xCLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVTtnQkFDekIsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQjthQUMxQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU0sdUJBQU0sR0FBYixVQUFjLElBQUksRUFBRSxJQUFZLEVBQUUsY0FBd0I7WUFDdEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUUzQixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFBQyxNQUFNLElBQUksS0FBSyxDQUFD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