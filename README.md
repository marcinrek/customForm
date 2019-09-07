# customForm

Simple script that enables you to toggle form elements visibility based on provided input.

## Installation

Setup is really simple. You just need to define the rules and embed the script. 

```
<form id="amazing_form">
    [...]
</form>

<script src="customForm.bundle.js"></script>

<script>
    var rules = {
        [...]
    }
    customForm.init(rules, 'amazing_form');
</script>
```

## Configuration
All the configuration takes place in an object that you pass as the first parameter to customForm.init(). 

### Basic example 
```
<script> 
    var rules = {
        "id_to_toggled": [
            { 
                "form_element_name": ["this_element_value"] 
            } 
        ]
    }
</script>
```
This is the most basic rule. How to read this ? Well this is quite simple.
Element with id "id_to_toggled" will be displayed when form element with name "form_element_name" will have a value of "this_element_value". 

### We need to go deeper ... 
```
<script> 
    var rules = {
        "id_to_toggled": [
            { 
                "form_element_name": ["1","2"],
                "different_element_name": ["3"] 
            },
            {
                "another_element_name": [["1"],["1","2"]]
            } 
        ],
        "another_id": [
            {
                "ammount": /(8[0-9]|9[0-9]|100)$/
            }
        ]
    }
</script>
```
This example is a bit more complex. All you need to remember here is that
* each rule object for a target is connected with an OR
* each rule object for a target is connected with an OR
* each rule object can consist of multiple elements defined by name - those elements are connected with AND
* each value can be an array - this represents a single value or multiple values for elements like checkboxes or multi selects
* each value can be an array of arrays - in that case all the arrays are connected with an OR
* value can also be a regular expression
* an unmarked checkbox or empty text field is an array with empty string - ['']

## Supported elements
```
<input type="checkbox" />
<input type="radio" />
<input type="text" />
<input type="email" />
<input type="number" />
<input type="range" />
<input type="select" />
<input type="select" multiple />
```

## Browser support
This script should work in all major browsers. Below is a list of the ones it was tested on.
* Chrome 65+ 
* Firefox 59+ 
* Edge 41+
* Internet Explorer 11+ 

## To-Do
What is planned for the next release
* Add more form elements support
* Add validation features
