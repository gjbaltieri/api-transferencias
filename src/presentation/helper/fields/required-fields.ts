import { MissingParamError } from '../../errors/missing-param-error'
import Joi from 'joi'

export class RequiredFieldValidation {
  signupCompare(fieldsToCompare: any) {
    const schema = Joi.object().keys({
      username: Joi.required(),
      password: Joi.required()
    })
    const isValid = schema.validate(fieldsToCompare)
    if (isValid.error) {
      const missingParam = isValid.error.details[0].path[0] as string
      return new MissingParamError(missingParam)
    }
  }
  transactionCompare(fieldsToCompare: any) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      value: Joi.number().required().min(0.01).precision(2).message('The minimum value is 0.01 and two decimal places are accepted')
    })
    const isValid = schema.validate(fieldsToCompare, { convert: false })
    if (isValid.error) {
      const missingParam = isValid.error.details[0].message
      console.log
      return new MissingParamError(missingParam)
    }
  }
}
