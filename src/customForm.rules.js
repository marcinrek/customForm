/* 
 * customForm
 * @author https://marcinrek.pl/atelier/customform
 * @version 0.0.1
 */

import * as cF from 'customForm.functions';

/**
 * Sanitize rules
 * @description Remove from rules all the ones that have targets or conditions containing elements that are not in the form
 * @param {object} inputRules input rules
 * @returns {object} sanitized rules object
 */
export const sanitizeRules = (inputRules) => {
    let outputRules = Object.assign({}, inputRules),
        missingTargets = [],
        missingFields = [];

    // Remove all rules with missing targets or elements
    for (let target in inputRules) {
        
        // Remove target if not present
        if (!document.getElementById(target)) {
            missingTargets.push(target);
            delete outputRules[target];
        }

        // Loop through conditions
        inputRules[target].map((item, i) => {
            
            // Loop through condition objects
            for (let dep in item) {

                // Element with given name not present
                if (!document.getElementsByName(dep).length) {
                    if (missingFields.indexOf(dep) === -1) {
                        missingFields.push(dep);
                    }
                    if (outputRules.hasOwnProperty(target)){
                        delete outputRules[target][i][dep];
                    }
                }
            }
        });

    }

    // Log errors
    if (missingTargets.length) {
        console.error('customForm error - missing targets:', '#'+missingTargets.join(', #'));
    }
    if (missingFields.length) {
        console.error('customForm error - missing condition elements:', missingFields.join(', '));
    }

    return outputRules;
}

/**
 * Create rule dependencies
 * @param {object} rules input rules
 * @returns {object} modified rules object
 */
export const createRuleDependencies = (rules) => {

    // Object that relates form elements to all targets it has influance on
    let depsTargetList = {};

    // Loop throug all the targets
    for (let target in rules) {

        // Hide all targets on start
        cF.hideElementById(target);

        // Loop through deps
        rules[target].map((item, i) => {
            for (let dep in item) {

                // Create an object mapping all deps and targets 
                if (!depsTargetList.hasOwnProperty(dep)) {
                    depsTargetList[dep] = [target]
                } else {
                    if (depsTargetList[dep].indexOf(target) === -1) {
                        depsTargetList[dep].push(target);
                    }
                }

            }
        });
    }

    // Return modified rules
    return depsTargetList;
}

/**
 * Create list of elements that should have a listener attached
 * @param {object} rules input rules
 * @returns {array} array of elements that should have a listener attached
 */
export const createListnersList = (rules) => {
    
    // Array of elements that should have a listener attached
    let listnersList = [];

    // Loop throug all the targets
    for (let target in rules) {

        // Loop through deps
        rules[target].map((item, i) => {
            for (let dep in item) {

                // Create array of all deps
                if (listnersList.indexOf(dep) === -1) {
                    listnersList.push(dep);
                }

            }
        });
    }

    // Return modified rules
    return listnersList;
}

/**
 * Check did all rules in given condition pass
 * @param {object} condition condition object
 * @param {object} rules rules object
 * @example checkRulesInCondition(condition, rules)
 * @returns {boolean} returns true if all conditions passed ELSE false
 */
export const checkRulesInCondition = (condition, rules) => {
    let passed = [];

    for (let dep in condition) {

        // Rule is an array of strings
        if (condition[dep] instanceof Array && typeof (condition[dep][0]) === 'string') {
            passed.push(cF.compareArrays(cF.fieldValue(dep), condition[dep]));

        // Rule is an array of arrays
        } else if (condition[dep] instanceof Array && condition[dep][0] instanceof Array) {
            let value = cF.fieldValue(dep),
                passedPartial = 0;

            condition[dep].map((partial, i) => {
                if (cF.compareArrays(value, partial)) {
                    passedPartial = 1;
                }
            });

            passed.push(passedPartial);

        // Rule is a regExp
        } else if (condition[dep] instanceof RegExp) {
            if (condition[dep].test(cF.fieldValue(dep))) {
                passed.push(1);
            } else {
                passed.push(0);
            }
        }

    }

    // Return 1 when all rules in condition passed ELSE 0
    return passed.indexOf(0) !== -1 ? 0 : 1;

}

/**
 * Check rules for given dep 
 * @param {string} name name of the element in condition
 * @param {object} rules rules object
 * @example checkRules(name, rules)
 */
export const checkRules = (name, rules) => {

    // Loop through relevant targets
    rules.depsTargetList[name].map((target, i) => {
        let effected_target = target,
            passed = [];

        // Loop through each condition obj for given target
        rules.validationRules[target].map((condition, i) => {
            passed.push(checkRulesInCondition(condition, rules));
        })

        // When at least one condition passed show target ELSE hide it
        if (passed.indexOf(1) !== -1) {           
            cF.showElementById(effected_target);
        } else {
            cF.hideElementById(effected_target);

            // Reset hidden form elements
            resetHiddenElements(effected_target);
        }

    });
}

/**
 * Reset all form elements in given id 
 * @param {string} effected_target id of element to look for form elements in
 * @param {object} rules rules object
 */
export const resetHiddenElements = (effected_target) => {
    let elements = cF.getFormElements(effected_target);

    cF.resetHiddenElement(elements);
    cF.dispatchEventOnElement(elements);
}

/**
 * Add event listener to element by its name
 * @param {string} name input name value
 * @param {object} rules rules object
 * @example addListener('q447:q1[]', rules)
 */
export const addListener = (name, rules) => {
    let nodes = document.getElementsByName(name);

    for (let i = 0, length = nodes.length; i < length; i++) {
        let eventType = 'change';

        // Change to 'input' event for text
        if (['text', 'email', 'number'].indexOf(nodes[i].type) !== -1) {
            eventType = 'input';
        }

        // Add Listener
        nodes[i].addEventListener(eventType, () => {
            checkRules(name, rules);
        });
    }
}
