const ValidateFields = require('./validate-fields');
const ValidateJWT = require('./validate-jwt');
const EsRole = require('./validate-roles');


module.exports = {
  ...ValidateFields,
  ...ValidateJWT,
  ...EsRole,
}