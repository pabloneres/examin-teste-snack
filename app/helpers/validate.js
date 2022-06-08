const validateErrorMessages = ({
	"required"   : "Campo obrigátorio",
	"email"      : "Informe um e-mail válido",
	"equal"      : "Os valores não coincidem",
	"minlength"  : "Deve conter no mínimo ? caracteres",
	"minwords"   : "Deve conter no mínimo ? palavras",
	"number"     : "Deve conter apenas números",
	"cpf"        : "CPF inválido",
	"url"        : "URL inválida",
	"date_format": "Data inválida",
});

import moment from "moment";

/**
 * Validate field
 *
 * @param {object} field_config
 * @param {string} field_value
 *
 * ex:
 * validateField({
 *		type : "text",
 *		rules: "required|email|equal:equal_value|minlength:6|minwords:2",
 *		rules_value: {
 *			equal_value: "value_to_compare",
 *		},
 *		messages: {
 *			required: "Required field",
 *		},
 * 	},
 *  "email@site.com.br"
 * )
 *
 * @returns {boolean}
 */
const validateField = (field_config, field_value) => {
	let field_rules    = field_config.rules.split("|");
	let rules_values   = Object.assign({}, field_config.rules_value ? field_config.rules_value : {});
	let rules_messages = Object.assign({}, validateErrorMessages, field_config.messages ? field_config.messages : {});

	let has_error     = false;
	let error_rule    = "";
	let error_message = "";

	for( let i = 0; i < field_rules.length; i++ )
	{
		let rule         = field_rules[i];
		let field_filled = (!(field_value === "" || field_value === null || typeof field_value === "undefined" || !String(field_value).trim().length));

		// Required
		if( rule === "required" )
		{
			if( field_config.type === "date" )
			{
				if( !field_filled )
				{
					has_error = true;
				}
			}
			else if( field_config.type === "bank" )
			{
				if( !field_filled )
				{
					has_error = true;
				}
			}
			else if( field_config.type === "city" )
			{
				if( !field_filled )
				{
					has_error = true;
				}
			}
			else if( field_config.type === "localization" )
			{
				if( !field_filled )
				{
					has_error = true;
				}
			}
			else if( field_config.type === "select" )
			{
				if( !field_filled )
				{
					has_error = true;
				}
			}
			else if( !field_filled )
			{
				has_error = true;
			}
		}
		// E-mail
		else if( rule === "email" && field_filled && !validateRuleEmail(field_value) )
		{
			has_error = true;
		}
		// CPF
		else if( rule === "cpf" && field_filled && !validateRuleCPF(field_value) )
		{
			has_error = true;
		}
		// Url
		else if( rule === "url" && field_filled && !validateRuleUrl(field_value) )
		{
			has_error = true;
		}
		// Credit card
		else if( rule === "credit-card" && field_filled && !validateRuleCreditCard(field_value) )
		{
			has_error = true;
		}
		// Number
		else if( rule === "number" && field_filled && !validateNumber(field_value) )
		{
			has_error = true;
		}
		// Equal
		else if( rule.startsWith("equal:") )
		{
			let rule_value_key = rule.split(":")[1];

			// Change rule name
			rule = "equal";

			// Get value to compare
			let compare_value = rules_values[rule_value_key];

			if( field_value !== compare_value )
			{
				has_error = true;
			}
		}
		// MinLength
		else if( rule.startsWith("minlength:") )
		{
			let min_length = rule.split(":")[1];

			// Change rule name
			rule = "minlength";

			if( String(field_value).trim().length < min_length )
			{
				has_error = true;
			}
		}
		// Minwords
		else if( rule.startsWith("minwords:") )
		{
			let min_words = rule.split(":")[1];

			// Change rule name
			rule = "minwords";

			let string = String(field_value);

			// Exclude start and end white-space
			string = string.replace(/(^\s*)|(\s*$)/gi, "");

			// Convert 2 or more spaces to 1
			string = string.replace(/[ ]{2,}/gi, " ");

			// Exclude newline with a start spacing
			string = string.replace(/\n /, "\n");

			if( string.split(' ').length < min_words )
			{
				has_error = true;
			}
		}
		// Date format
		else if( rule.startsWith("date_format:") )
		{
			let date_format = rule.split(":")[1];

			// Change rule name
			rule = "date_format";

			if( field_filled && !moment(field_value, date_format).isValid() )
			{
				has_error = true;
			}
		}

		if( has_error )
		{
			error_rule    = rule;
			error_message = rules_messages[rule];
			break;
		}
	}

	return {
		hasError: has_error,
		rule    : error_rule,
		message : error_message,
	};
};

/**
 * Validate e-mail
 *
 * @param {string} val
 *
 * @returns {boolean}
 */
const validateRuleEmail = (val) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
};

/**
 * Validate CPF
 *
 * @param {string} val
 *
 * @returns {boolean}
 *
 */
const validateRuleCPF = (val) => {
	return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(val);
};

/**
 * Validate Credit Card
 *
 * @param {string} val
 *
 * @returns {boolean}
 */
const validateRuleCreditCard = (val) => {
	return /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(val);
};

/**
 * Validate Number
 *
 * @param {string} val
 *
 * @returns {boolean}
 */
const validateNumber = (val) => {
	return /^\d+$/.test(val);
};

const validateRuleUrl = (val, options = {}) => {
	const options_default = {
		allowEmptyProtocol: false,
		allowLocal        : false,
		protocol          : 'http, https, ftp',
	};

	if( val === "" || val === null || typeof val === "undefined" || !String(val).length )
	{
		return true;
	}

	const opts               = Object.assign({}, options_default, options);
	const allowLocal         = opts.allowLocal === true || `${opts.allowLocal}` === 'true';
	const allowEmptyProtocol = opts.allowEmptyProtocol === true || `${opts.allowEmptyProtocol}` === 'true';
	const protocol           = opts.protocol.split(',').join('|').replace(/\s/g, '');
	const urlExp             = new RegExp("^" +
		"(?:(?:" + protocol + ")://)" +
		(allowEmptyProtocol ? '?' : '') +
		"(?:\\S+(?::\\S*)?@)?" +
		"(?:" +
		(allowLocal
			? ''
			: ("(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
				"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
				"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})")) +
		"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
		"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
		"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
		"|" +
		"(?:(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9]+)" +
		"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9])*" +
		"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
		(allowLocal ? '?' : '') +
		")" +
		"(?::\\d{2,5})?" +
		"(?:/[^\\s]*)?$", "i");

	return urlExp.test(val);
}

export {
	validateErrorMessages,
	validateField,
	validateRuleEmail,
};
