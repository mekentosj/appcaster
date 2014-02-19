var util = require('util');
var ejs = require('ejs');
var h = require('ejs/lib/utils').escape;
var formatters = require('./formatters');

function humanizeField(field) {
  if (field === 'id') {
    return field;
  } else {
    return field.charAt(0).toUpperCase() + field.replace(/_/g, ' ').slice(1);
  }
}

module.exports = {
  breadcrumb: function() {
    var breadcrumb;
    var html = '';
    var i;

    html += '<ol class="breadcrumb">';

    for (i = 0; i < arguments.length; i++) {
      breadcrumb = arguments[i];
      if (typeof breadcrumb === 'string') {
        html += '  <li class="active">' + breadcrumb + '</li>';
      } else {
        html += '  <li><a href="' + breadcrumb[1] + '">' + breadcrumb[0] + '</a></li>';
      }
    }

    html += '</ol>';
    return html;
  },

  input: function(type, options) {
    options.type = type;

    var attrs = '';
    var disabledAttribute = options.disabled ? ' disabled="disabled"' : '';
    var readonlyAttribute = options.readonly ? ' readonly="readonly"' : '';
    var checkedAttribute = options.checked ? ' checked="checked"' : '';

    options.class = options.class || 'form-control';
    attrs += ' class="' + options.class + '" ';

    if (options.autocomplete) {
      attrs += ' autocomplete="' + options.autocomplete + '" ';
    }

    attrs += disabledAttribute + readonlyAttribute + checkedAttribute;

    return ejs.render('<input type="<%= type %>" id="<%= id %>" placeholder="<%= placeholder %>" value="<%= value || \'\' %>" name="<%= name %>"' + attrs + '>', options);
  },

  textarea: function(options) {
    var disabledAttribute = options.disabled ? ' disabled="disabled"' : '';
    var readonlyAttribute = options.readonly ? ' readonly="readonly"' : '';
    var checkedAttribute = options.checked ? ' checked="checked"' : '';
    options.placeholder = options.placeholder || '';
    options.rows = options.rows || 4;
    options.className = options.class || 'form-control';
    return ejs.render('<textarea class="<%= className %>" id="<%= id %>" placeholder="<%= placeholder %>" rows="<%= rows %>" name="<%= name %>"' + checkedAttribute + disabledAttribute + readonlyAttribute + '><%= value || \'\' %></textarea>', options);
  },

  textInput: function(options) {
    return this.input('text', options);
  },

  label: function(options) {
    return ejs.render('<label for="<%= id %>"><%= html %></label>', options);
  },

  field: function(type, args) {
    var options, model, field, modelName, html;

    html = '';

    if (args.length === 1) {
      options = args[0];
    } else {
      model = args[0];
      field = args[1];
      options = args[2] || {};
      modelName = options.name;
      options.id = options.id || (modelName + '_' + field);
      options.name = modelName + '[' + field + ']';
      options.placeholder = options.placeholder || humanizeField(field);
      options.value = options.value || model[field];

      if (type === 'checkbox' && model[field]) {
        options.checked = true;
      }
    }

    html += '<div class="form-group">';
    html += this.label({ id: options.id, html: options.label || options.placeholder });
    if (type === 'textarea') {
      html += this.textarea(options);
    } else {
      html += this.input(type, options);
    }
    html += '</div>';

    return html;
  },

  textField: function() {
    return this.field('text', arguments);
  },

  textareaField: function() {
    return this.field('textarea', arguments);
  },

  passwordField: function() {
    return this.field('password', arguments);
  },

  checkboxField: function() {
    return this.field('checkbox', arguments);
  },

  selectOptions: function(selected, selectOptions, options) {
    var html = '';
    options = options || {};

    if (options.includeBlank) {
      html += '<option value=""></option>';
    }

    return html + (util.isArray(selectOptions) ? this.selectOptionsArray(selected, selectOptions, options) : this.selectOptionsObject(selected, selectOptions, options));
  },

  selectOptionsObject: function(selected, selectOptions, options) {
    var html = '';
    var key;
    var option;
    var value;

    for (key in selectOptions) {
      if (selectOptions.hasOwnProperty(key)) {
        // Automatically map arrays of objects if they have a field named 'value'
        option = selectOptions[key];
        value = key;
        var selectedAttribute = key === selected ? ' selected="selected"' : '';
        html += '<option value="' + value + '"' + selectedAttribute + '>' + option + '</option>';
      }
    }
    return html;
  },

  selectOptionsArray: function(selected, selectOptions, options) {
    var html = '';
    selectOptions.forEach(function(option) {
      // Automatically map arrays of objects if they have a field named 'value'
      var value = option;
      if (typeof option === 'object') {
        // Cope with arrays of arrays
        if (option.hasOwnProperty('length')) {
          value = option[0];
          option = option[1];
        } else {
          value = option.id;
          option = option.value;
        }
      }

      var selectedAttribute = value === selected ? ' selected="selected"' : '';
      html += '<option value="' + value + '"' + selectedAttribute + '>' + option + '</option>';
    });
    return html;
  },

  multipleSelectOptions: function(selected, selectOptions) {
    var html = '';
    selectOptions.forEach(function(option) {
      // Automatically map arrays of objects if they have a field named 'value'
      var selectedAttribute;
      var value = option;
      var optionName = option;
      if (typeof option === 'object') {
        value = option.id;
        optionName = option.value;
        selectedAttribute = selected.some(function(s) { return s.id === value; }) ? ' selected="selected"' : '';
      } else {
        selectedAttribute = optionName === selected ? ' selected="selected"' : '';
      }
      html += '<option value="' + value + '"' + selectedAttribute + '>' + optionName + '</option>';
    });
    return html;
  },

  selectField: function(model, field, selectOptions, options) {
    options = options || {};
    var id = options.id;
    var name = options.name + '[' + field + ']';
    var selected = model[field];
    var html = '<div class="control-group">';

    html += this.label({ html: options.label || humanizeField(field), id: id });
    html += '<div class="controls">';
    html += '<select id="' + id + '" name="' + name + '"';
    if (options.class) {
      html += ' class="' + options.class + '"';
    }
    html += '>';
    html += this.selectOptions(selected, selectOptions, options);
    html += '</select>';
    if (options.help) {
      html += '<span class="help-inline show-help-order-status"><i class="icon-question-sign"></i> ' + options.help + '</span>';
    }

    html += '</div>';
    html += '</div>';
    return html;
  },

  table: function(models, fields) {
    var fieldNames = fields.map(function(f) {
      return typeof f === 'string' ? f : f.name;
    });
    var html = '<table class="table table-striped table-bordered">';
    html += '<thead>';
    html += '<tr>';
    fieldNames.forEach(function(field) {
      html += '<th>' + humanizeField(field) + '</th>';
    });
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    models.forEach(function(model) {
      html += '<tr>';
      fieldNames.forEach(function(field, i) {
        var value = model[field];
        if (typeof fields[i] === 'object' && typeof fields[i].value === 'function') {
          value = fields[i].value(model);
          html += '<td>' + value + '</td>';
          return;
        } else if (value instanceof Date) {
          value = formatters.dateTime(value);
        } else if (value === null || typeof value === 'undefined') {
          value = '';
        }
        html += '<td>' + h(value) + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  },

  tableTrunc: function(field, length) {
    length = length || 18;
    return {
      name: field,
      value: function(o) {
        var value = o[field];

        if (!value || value.length < length) {
          return value;
        } else {
          return '<span title="' + value + '">' + h(value.slice(0, length)) + '...</span>';
        }
      }
    };
  },

  chosenSelect: function(model, field, options) {
    var id = options.name + '_' + field;
    var name = options.name + '[' + field + ']';
    var selected = model[field] || [];
    var html = '<div class="control-group">';
    html += this.label({ html: humanizeField(field), id: id });
    html += '<div class="controls">';
    html += '<select id="' + id + '" name="' + name + '" multiple class="chzn-select">';
    html += this.multipleSelectOptions(selected, options);
    html += '</select>';
    html += '</div>';
    html += '</div>';
    return html;
  },

  dateField: function(model, field, options) {
    options = options || {};

    var html = '';
    var modelName = options.name;
    var fieldName = modelName + '[' + field + ']';
    var id = modelName + '_' + field;
    var value = model[field] || '';

    html += '<div class="control-group input-append">';
    html += this.label({ html: humanizeField(field), id: id });
    html += '<div class="date controls date-picker">';
    html += '  <input data-format="yyyy-MM-dd" type="text" name="' + fieldName + '" value="' + value + '"></input>';
    html += '  <span class="add-on">';
    html += '    <i data-time-icon="icon-time" data-date-icon="icon-calendar"></i>';
    html += '  </span>';
    html += '</div>';
    html += '</div>';

    return html;
  },

  button: function(button) {
    var html = '';
    html += '<a href="' + button.url + '" class="btn">' + button.name + '</a>';
    return html;
  },

  splitButton: function(button, menu) {
    var html = '<div class="btn-group">';

    html += this.button(button);

    html += '<button class="btn dropdown-toggle" data-toggle="dropdown">';
    html += '  <span class="caret"></span>';
    html += '</button>';

    html += '<ul class="dropdown-menu">';
    menu.forEach(function(item) {
      var target = item.target ? ' target="' + item.target + '" ' : '';
      var attrs = '';
      var value;
      for (var key in item) {
        if (key.match(/data-/)) {
          value = typeof(item[key]) === 'object' ? encodeURI(JSON.stringify(item[key])) : item[key];
          attrs += key + '="' + value + '" ';
        }
      }
      html += '<li><a ' + attrs + 'href="' + item.url + '"' + target + '>' + item.name + '</a></li>';
    });
    html += '</ul>';
    html += '</div>';
    return html;
  }
};
