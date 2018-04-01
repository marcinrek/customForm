/* 
 * customForm
 * @author https://marcinrek.pl/atelier/customform
 * @version 0.0.1
 */

import * as cR from 'customForm.rules';
import * as cF from 'customForm.functions';

export const init = (inputRules, formId) => {

    // Sanitize input rules
    const sanitizedRules = cR.sanitizeRules(inputRules);

    // Create rules object
    const rules = {
        validationRules: sanitizedRules,
        depsTargetList:  cR.createRuleDependencies(sanitizedRules),
        listnersList:    cR.createListnersList(sanitizedRules)
    };

    // Add event listeners
    rules.listnersList.map((item, i) => {
        cR.addListener(item, rules); 
    });

    // Save current values as data-value
    cF.saveValues(formId);

    // Dispatch event on all form elements on start 
    cF.dispatchEventOnFormElements(formId);

}
