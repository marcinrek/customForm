/* 
 * customForm
 * @author https://marcinrek.pl/atelier/customform
 * @version 0.0.1
 */

/**
 * Return value of radio/checkbox as array
 * @description Get input type radio/checkbox value based on input name
 * @param {string} name input name value
 * @example radioValue('q447:q1[]')
 * @returns {array} array with all values if present, false if not values, undefined if doesn't exist
 */
export const radioValue = (name) => {
    let radios = document.getElementsByName(name),
        values = [];
    
    // return undefined when input not present
    if (!radios.length) {
        return undefined;
    }

    // Loop through inputs and add values to array
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            values.push(radios[i].value);
        }
    }

    // return [''] when no values else return values array        
    return !values.length ? [''] : values;
    
}

/**
 * Get multiple select values as array
 * @param {string} name select name value
 * @example multipleSelectValue('q447:q1[]')
 * @returns {array} array with all values if present, false if not values, undefined if doesn't exist
 */
export const multipleSelectValue = (name) => {
    let select = document.getElementsByName(name)[0],
        results = [];

    // return undefined when select not present
    if (!select.length) {
        return undefined;
    }
    
    for (var i = 0, iLen = select.options.length; i < iLen; i++) {
        if (select.options[i].selected) {
            results.push(select.options[i].value || select.options[i].text);
        }
    }

    // return if has results else return ['']
    return results.length > 0 ? results : [''];

}

/**
 * Check is element a checkbox or radio
 * @param {string} name input name value
 * @example checkIsRadio('q447:q1[]')
 * @returns {boolean} true if radio/checkbox, false if not, undefined if doesn't exist
 */
export const checkIsRadio = (name) => {
    let node = document.getElementsByName(name),
        types = ['checkbox','radio'];

    // return undefined when node not present
    if (!node.length) {
        return undefined;
    }

    // check is checkbox or radio
    if (types.indexOf(node[0].type) !== -1) {
        return true;    
    } else {
        return false;
    }

}

/**
 * Check is element a multiple select
 * @param {string} name input name value
 * @example checkIsMultipleSelect('q447:q1[]')
 * @returns {boolean} true if multiple select, false if not, undefined if doesn't exist
 */
export const checkIsMultipleSelect = (name) => {
    let node = document.getElementsByName(name);

    // return undefined when node not present
    if (!node.length) {
        return undefined;
    }

    // check is present more then once
    if (node[0].type === "select-multiple") {
        return true;
    } else {
        return false;
    }

}

/**
 * Hide element based on name
 * @param {string} name input name 
 * @example hideElementByName('q447:q1[]')
 */
export const hideElementByName = (name) => {
    let nodes = document.getElementsByName(name);
    for (let i = 0, length = nodes.length; i < length; i++) {
        nodes[i].style.display = 'none';
    }

}

/**
 * Show element based on name
 * @param {string} name input name 
 * @example showElementByName('q447:q1[]')
 */
export const showElementByName = (name) => {
    let nodes = document.getElementsByName(name);

    for (let i = 0, length = nodes.length; i < length; i++) {
        nodes[i].style.display = '';
    }

}

/**
 * Hide element based on id
 * @param {string} id id to be hidden
 * @example hideElementByName('q447:q1[]')
 */
export const hideElementById = (id) => {
    let node = document.getElementById(id);

    node.style.display = 'none';
}

/**
 * Show element based on id
 * @param {string} id id to be shown
 * @example showElementByName('q447:q1[]')
 */
export const showElementById = (id) => {
    let node = document.getElementById(id);

    node.style.display = '';
}

/**
 * Compare two arrays of strings
 * @param {array} arr1 array one
 * @param {array} arr2 array two
 * @example compareArrays([array], [array])
 * @returns {boolean} true if identical ELSE false
 */
export const compareArrays = (arr1, arr2) => {
    
    if (!(arr1 instanceof Array) || !(arr1 instanceof Array)) {
        return 0;
    }
    
    if (arr1.join('|') === arr2.join('|')) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * Return form field value based on name
 * @param {string} name input name value
 * @example fieldValue('q447:q1[]')
 * @returns {array} returns field value as array
 */
export const fieldValue = (name) => {
    // Check is radio/checkbox
    if (checkIsRadio(name)) {
        return radioValue(name);
    
    // Check is multiple select
    } else if (checkIsMultipleSelect(name)) {
        return multipleSelectValue(name);
        
    // ... else just return value
    } else {
        return document.querySelector('[name="' + name + '"]').value === '' ? [''] : [document.querySelector('[name="' + name + '"]').value]
    }
}


/**
 * Create cross browser event
 * @param {string} eventType type of event to create
 * @returns {object} event
 */
export const createEvent = (eventType) => {
    if (typeof (Event) === 'function') {
        return new Event(eventType);
    } else {
        let event = document.createEvent('Event');
        event.initEvent(eventType, false, true);
        return event;
    }
}

/**
 * Dispatch event on passed form element
 * @param {nodeList} nodeList node list of dispatch event on
 */
export const dispatchEventOnElement = (nodeList) => {
    let changeEvent = createEvent('change'),
        inputEvent = createEvent('input');

    // Loop throug passed node list        
    for (let i = 0; i < nodeList.length; i += 1) { 
    
        // Dispatch triggers
        switch (nodeList[i].type) {
            case 'radio':
            case 'range':
            case 'checkbox':
            case 'select':
            case 'select-one':
            case 'select-multiple':
                nodeList[i].dispatchEvent(changeEvent);
                break;
            case 'text':
            case 'email':
            case 'number':
                nodeList[i].dispatchEvent(inputEvent);
                break;
        }
    }
}

/**
 * Resets passed form element
 * @param {nodeList} nodeList node list of elements to reset
 */
export const resetHiddenElement = (nodeList) => {

    // Loop throug passed node list        
    for (let i = 0; i < nodeList.length; i+=1) { 
        
        // Reset value
        switch (nodeList[i].type) {
            case 'radio':
            case 'checkbox':
                nodeList[i].checked = nodeList[i].value === nodeList[i].dataset.value ? true : false;
                break;
            case 'text':
            case 'email':
            case 'range':
            case 'number':
                nodeList[i].value = nodeList[i].dataset.value !== 'false' ? nodeList[i].dataset.value : '';
                break;
            case 'select':
            case 'select-one':
            case 'select-multiple':
                setMultipleSelectValue(nodeList[i].name, nodeList[i].dataset.value.split(','))
                break;
        }
    }
}

/**
 * Get form elements under id
 * @param {string} id id to look under
 * @return {array} array with all form element nodes
 */
export const getFormElements = (id) => {
    return [
        ...document.getElementById(id).getElementsByTagName('input'),
        ...document.getElementById(id).getElementsByTagName('select')
    ];
}

/**
 * Save start values to data-value
 * @param {string} formId id to look for elements in
 */
export const saveValues = (formId) => {
    let elements = getFormElements(formId);

    elements.map((element, i) => {
        element.dataset.value = fieldValue(element.name);  
    });
}

/**
 * Dispatch event on all form elements
 * @param {string} formId id to look for elements in
 */
export const dispatchEventOnFormElements = (formId) => {
    let elements = getFormElements(formId);

    elements.map((element, i) => {
        dispatchEventOnElement(document.getElementsByName(element.name));
    });
}

/**
 * Set multiple select values from
 * @param {string} name select name value
 * @param {array} values values to set
 */
export const setMultipleSelectValue = (name, values) => {
    let select = document.getElementsByName(name)[0],
        results = [];

    // return undefined when select not present
    if (!select.length) {
        return undefined;
    }

    for (var i = 0, iLen = select.options.length; i < iLen; i++) {
        if (values.indexOf(select.options[i].value) !== -1) {
            select.options[i].selected = true;
        } else {
            select.options[i].selected = false;
        }
    }
    return results.length > 0 ? results : false;

}